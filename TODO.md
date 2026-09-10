# 2ThumbZ Website — Punch List

> Audited against the live site 2026-09-09, the day `2thumbz.com` cut over from
> WordPress to this static site on Vercel. Ordered by what actually costs you
> money or credibility, not by effort.

---

## P0 — Broken, and costing you leads right now

### 1. ~~The contact form doesn't submit anywhere~~ ✅ DONE 2026-09-09
Both forms previously used `action="#"` with JS that displayed a fake "Thank
You" without sending anything. Now: `api/contact.js` (Vercel function) →
Resend → `licensing@2thumbz.com`, with `reply_to` set to the prospect.
Protected by a honeypot plus Cloudflare Turnstile **verified server-side**.
Success is only ever shown when the server confirms delivery.

Env vars in Vercel: `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`,
`CONTACT_FROM=2ThumbZ Website <website@send.2thumbz.com>`.
Sender domain `send.2thumbz.com` is verified in Resend (DKIM/SPF/MX on the
subdomain only — root Google Workspace mail untouched).

### 2. `pages/universities.html` is a 0-byte file
Linked from the main nav **and** the footer on every page. Anyone clicking
"For Universities" gets a blank page. Per MESSAGING.md §10 this page targets
schools/rights-holders — the supply side — and it has never been written.

---

## P1 — Accuracy and credibility (publicly live now)

### 3. Invented metrics in the homepage showcase
`2.1M+` streams · `Gen Z reach` · `Store-featured` · `Catalog-wide` ·
`Fan engagement` — all fabricated placeholders. They now sit under **real**
school logos and real partner logos, which makes them read as verified fact on
a site being shown to Meta and 2K. Replace with real figures or cut the metric
line entirely.

### 4. Fake testimonial
"2ThumbZ helped us launch our college sports app… 150 schools in 6 weeks" from
an anonymous *"VP of Product, Sports Technology Company."* Either get a real
attributable quote or remove the section.

### 5. Four interior pages still carry the OLD messaging
`about.html`, `catalog.html`, `contact.html`, `developers.html` were never
rebuilt against MESSAGING.md. They still use the pre-repositioning language and
the old **"Platform Solutions" / "Content Catalog"** nav, so the site contradicts
itself: the homepage sells License/Distribute/Build, the interior pages sell
something else. `about.html` still tells the "ringtone provider" origin story as
current identity.

### 6. Navigation is inconsistent across the site
The new nav (Solutions → License/Distribute/Build, "Content Library") exists only
on `index.html` and the three product pages. The other four still show the old
structure — clicking between them visibly changes the header.

---

## P2 — Polish, SEO, trust signals

### 7. 14 dead links (`href="#"`)
index 6 · about 2 · developers 2 · contact 2 · catalog 2. Mostly footer
social icons and "Careers". Either point them somewhere or remove them.

### 8. No `sitemap.xml`, no `robots.txt`
The old WordPress site had a sitemap; this one has nothing. Search engines are
re-crawling a completely changed site right now — worth giving them a map.

### 9. No Open Graph / Twitter card tags on any page
Sharing `2thumbz.com` in Slack, email, or LinkedIn produces a bare grey link with
no title, description, or image. This matters when a BD contact forwards the site
internally at Meta or 2K.

### 10. Favicon missing on 6 pages
Present only on `index.html` and the three product pages. Missing on
`privacy.html`, `about`, `catalog`, `contact`, `developers`, `universities`.

### 11. `developers.html` is a leftover
Still linked from the homepage tabbed section, but absent from the new nav and
superseded by the License/Distribute/Build pages. Decide: rewrite, redirect to
`#solutions`, or delete.

### 12. Catalog art is school logos, not product splashes
Placeholder by agreement — Andy to supply official app splash images. When they
arrive, swap `object-fit: contain` back to `cover` in `.catalog-card-image img`.

---

## Infrastructure follow-ups (post-migration)

- [ ] **Back up WordPress** via cPanel/FTP — *before* cancelling Namecheap
- [ ] **Cancel Namecheap hosting** (only after the backup + a few days of stability)
- [ ] **Trim SPF** to `v=spf1 include:_spf.google.com ~all` once the old host is gone
- [ ] **Delete dead DNS records**: `cpanel`, `ftp`, `webdisk`, `whm`, `cpcalendars`,
      `cpcontacts`, `server1`, `ns1`, `ns2`, `default._domainkey`
- [ ] **Add Workspace DKIM** — Google Admin → Gmail → Authenticate email →
      generate, then add `google._domainkey` TXT in Cloudflare
- [ ] **Revoke the old GitHub PAT** (`ghp_…`) — removed from the remote, but it was
      exposed in plaintext for months
- [ ] **Vercel scope** — the project sits in the `vivaspot` **Hobby** scope. Hobby is
      designated non-commercial, and this mixes 2ThumbZ with VivaSpot billing.
      Consider a separate 2ThumbZ team.

---

## Verified working — don't regress these

- `/privacy` serves the real policy at the URL all 118 live app listings reference
- Legacy WordPress URLs redirect: `/collegeemoji`, `/sample-page`, `/privacy/`
- Phone renders at runtime; digits never appear in page source
- Email: 5 Google MX intact, SPF now authorizes Google, DMARC monitoring on
- Asset `?v=` cache-busting — **bump it whenever you regenerate CSS/JS/images**
