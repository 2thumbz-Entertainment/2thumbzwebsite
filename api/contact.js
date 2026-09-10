/**
 * POST /api/contact — partnership enquiry handler.
 *
 * Runs as a Vercel Serverless Function. No npm dependencies: Node 18+ has a
 * global fetch, so the whole thing works in a repo with no package.json.
 *
 * Required env var:
 *   RESEND_API_KEY   — from resend.com
 * Optional:
 *   CONTACT_TO       — recipient (default licensing@2thumbz.com)
 *   CONTACT_FROM     — verified sender (default Resend's shared test sender)
 *
 * If RESEND_API_KEY is absent the endpoint returns 503 rather than pretending
 * to succeed. Never tell a prospect their message was sent when it wasn't.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INTEREST_LABELS = {
  apps: 'Mobile Apps',
  gaming: 'Gaming Assets',
  fashion: 'Digital Fashion',
  audio: 'Audio / Fight Songs',
  stickers: 'Stickers / Emojis',
  graphics: 'Graphics',
};

const TYPE_LABELS = {
  license: 'License — add collegiate IP to my product',
  distribute: 'Distribute — reach fans through your channels',
  build: 'Build — have 2ThumbZ build a product for me',
  university: 'University / rights-holder',
  other: 'Other / not sure yet',
};

function esc(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};

  // Honeypot: a field hidden from humans. Bots fill it in. Accept and discard
  // so the bot sees success and doesn't retry with a different shape.
  if (body.website) return res.status(200).json({ ok: true });

  const company = trim(body.company);
  const name = trim(body.name);
  const email = trim(body.email);
  const phone = trim(body.phone);
  const type = trim(body.type);
  const message = trim(body.message);
  const interests = Array.isArray(body.interests)
    ? body.interests
    : body.interests ? [body.interests] : [];

  const missing = [];
  if (!company) missing.push('company');
  if (!name) missing.push('name');
  if (!email) missing.push('email');
  if (missing.length) {
    return res.status(400).json({ error: `Missing required field(s): ${missing.join(', ')}` });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'That email address does not look valid.' });
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: 'Message is too long.' });
  }

  // --- Cloudflare Turnstile ---------------------------------------------
  // Only enforced when a secret is configured, so a missing key degrades to
  // "no CAPTCHA" rather than "no leads". Verification MUST happen here: the
  // widget alone proves nothing, since anyone can POST straight to this route.
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const token = trim(body['cf-turnstile-response']);
    if (!token) {
      return res.status(400).json({ error: 'Please complete the verification check.' });
    }
    try {
      const params = new URLSearchParams({ secret: turnstileSecret, response: token });
      const ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'];
      if (ip) params.append('remoteip', String(ip).split(',')[0].trim());

      const vr = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
      });
      const verdict = await vr.json();
      if (!verdict.success) {
        console.warn('[contact] Turnstile rejected:', verdict['error-codes']);
        return res.status(400).json({ error: 'Verification failed. Please try again.' });
      }
    } catch (err) {
      console.error('[contact] Turnstile verification threw:', err);
      return res.status(502).json({ error: 'Could not complete verification. Please try again.' });
    }
  } else {
    console.warn('[contact] TURNSTILE_SECRET_KEY not set — CAPTCHA is NOT being enforced.');
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set — cannot deliver enquiry from', email);
    return res.status(503).json({
      error: 'Our form is temporarily unavailable. Please email licensing@2thumbz.com directly.',
    });
  }

  const to = process.env.CONTACT_TO || 'licensing@2thumbz.com';
  const from = process.env.CONTACT_FROM || '2ThumbZ Website <onboarding@resend.dev>';

  // Diagnostic: shows in Vercel logs whether the env var actually reached the
  // function. The from/to addresses are not secrets, so they are safe to log.
  console.log(
    '[contact] CONTACT_FROM set:', Boolean(process.env.CONTACT_FROM),
    '| sending from:', from,
    '| to:', to
  );

  const interestLine = interests.length
    ? interests.map((i) => INTEREST_LABELS[i] || i).join(', ')
    : '—';

  const rows = [
    ['Company', company],
    ['Name', name],
    ['Email', email],
    ['Phone', phone || '—'],
    ['How we can work together', TYPE_LABELS[type] || type || '—'],
    ['Interested in', interestLine],
  ];

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;font-size:15px;color:#1a1a1a">
      <h2 style="margin:0 0 4px">New partnership enquiry</h2>
      <p style="margin:0 0 20px;color:#666">Submitted via 2thumbz.com</p>
      <table cellpadding="6" style="border-collapse:collapse;width:100%;max-width:640px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="background:#f5f7f9;font-weight:600;width:200px;vertical-align:top">${esc(
                k
              )}</td><td>${esc(v)}</td></tr>`
          )
          .join('')}
      </table>
      <h3 style="margin:24px 0 6px">Project</h3>
      <div style="white-space:pre-wrap;background:#f5f7f9;padding:12px;border-radius:6px">${
        esc(message) || '<em style="color:#888">(no message)</em>'
      }</div>
    </div>`;

  const text = [
    'New partnership enquiry — 2thumbz.com',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Project:',
    message || '(no message)',
  ].join('\n');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email, // reply goes straight back to the prospect
        subject: `Partnership enquiry — ${company}`,
        html,
        text,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error('[contact] Resend rejected the send:', r.status, detail);
      return res.status(502).json({
        error: 'We could not send your message. Please email licensing@2thumbz.com directly.',
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contact] delivery threw:', err);
    return res.status(502).json({
      error: 'We could not send your message. Please email licensing@2thumbz.com directly.',
    });
  }
}

function trim(v) {
  return typeof v === 'string' ? v.trim() : '';
}

function safeParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
