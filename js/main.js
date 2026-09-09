/**
 * 2ThumbZ Website - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  initHeaderScroll();

  // Mobile menu toggle
  initMobileMenu();

  // Tabs functionality
  initTabs();

  // Smooth scroll for anchor links
  initSmoothScroll();

  // Form validation
  initFormValidation();

  // Animate on scroll
  initScrollAnimations();
});

/**
 * Header scroll effect
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', function() {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('active');

    // Toggle body scroll
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      toggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Tabs functionality
 */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (!tabButtons.length) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      const targetContent = document.getElementById(tabId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Form validation
 */
function initFormValidation() {
  const forms = document.querySelectorAll('form.contact-form');

  forms.forEach(form => {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Basic validation
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });

      // Email validation
      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          isValid = false;
          emailField.classList.add('error');
        }
      }

      if (!isValid) return;

      // Collect the form, including multi-value checkboxes
      const fd = new FormData(form);
      const payload = {};
      fd.forEach((value, key) => {
        if (payload[key] === undefined) {
          payload[key] = value;
        } else if (Array.isArray(payload[key])) {
          payload[key].push(value);
        } else {
          payload[key] = [payload[key], value];
        }
      });

      const submitBtn = form.querySelector('[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }
      clearFormError(form);

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        let data = {};
        try { data = await res.json(); } catch (_) {}

        if (res.ok && data.ok) {
          // Only claim success when the server actually accepted it
          showFormSuccess(form);
          return;
        }

        showFormError(form, data.error || 'Something went wrong. Please email licensing@2thumbz.com directly.');
      } catch (err) {
        showFormError(form, 'We could not reach the server. Please email licensing@2thumbz.com directly.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        }
      }
    });

    // Remove error class on input
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', function() {
        this.classList.remove('error');
      });
    });
  });
}

/**
 * Show an inline error above the submit button. Used whenever delivery failed,
 * so the visitor knows to reach us another way instead of assuming we got it.
 */
function showFormError(form, msg) {
  clearFormError(form);
  const box = document.createElement('div');
  box.className = 'form-error-box';
  box.setAttribute('role', 'alert');
  box.textContent = msg;
  const submitBtn = form.querySelector('[type="submit"]');
  if (submitBtn && submitBtn.parentNode) {
    submitBtn.parentNode.insertBefore(box, submitBtn);
  } else {
    form.appendChild(box);
  }
}

function clearFormError(form) {
  const existing = form.querySelector('.form-error-box');
  if (existing) existing.remove();
}

/**
 * Show form success message
 */
function showFormSuccess(form) {
  const successMessage = document.createElement('div');
  successMessage.className = 'form-success';
  successMessage.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <h3>Thank You!</h3>
    <p>We've received your inquiry and will be in touch within 1 business day.</p>
  `;

  // Add styles
  successMessage.style.cssText = `
    text-align: center;
    padding: 3rem;
    animation: fadeIn 0.3s ease;
  `;
  successMessage.querySelector('svg').style.cssText = `
    color: #27AE60;
    margin-bottom: 1rem;
  `;
  successMessage.querySelector('h3').style.cssText = `
    color: #1A1A1A;
    margin-bottom: 0.5rem;
  `;
  successMessage.querySelector('p').style.cssText = `
    color: #6C757D;
  `;

  // Replace form with success message
  form.innerHTML = '';
  form.appendChild(successMessage);
}

/**
 * Scroll animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.card, .process-step, .benefit-card, .pricing-card');

  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(el);
  });
}

/**
 * Counter animation for stats
 */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach(counter => {
    const target = counter.innerText;
    const numericValue = parseInt(target.replace(/\D/g, ''));
    const suffix = target.replace(/[\d,]/g, '');
    const duration = 2000;
    const increment = numericValue / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < numericValue) {
        counter.innerText = Math.floor(current).toLocaleString() + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
}

// Trigger counter animation when stats are visible
const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statsObserver.observe(statsBar);
}

/**
 * Filter functionality for catalog page
 */
function initFilters() {
  const filterCheckboxes = document.querySelectorAll('.filter-option input');
  const catalogCards = document.querySelectorAll('.catalog-card');

  if (!filterCheckboxes.length) return;

  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const activeFilters = Array.from(filterCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      catalogCards.forEach(card => {
        const cardType = card.dataset.type;
        const cardConference = card.dataset.conference;

        if (activeFilters.length === 0) {
          card.style.display = 'block';
        } else {
          const matchesFilter = activeFilters.some(filter =>
            cardType === filter || cardConference === filter
          );
          card.style.display = matchesFilter ? 'block' : 'none';
        }
      });
    });
  });
}

// Initialize filters if on catalog page
if (document.querySelector('.catalog-layout')) {
  initFilters();
}

/* ============================================
   Hero: Content Solutions Showcase (auto-rotate)
   ============================================ */
function initShowcase() {
  const stage = document.getElementById('showcaseStage');
  const dotsWrap = document.getElementById('showcaseDots');
  if (!stage) return;

  const cards = Array.from(stage.querySelectorAll('.showcase-card'));
  if (cards.length === 0) return;

  let current = 0;
  let timer = null;
  const INTERVAL = 4000;

  // Build navigation dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Show example ' + (i + 1));
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => { show(i); restart(); });
    dotsWrap && dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

  function show(index) {
    current = (index + cards.length) % cards.length;
    cards.forEach((c, i) => c.classList.toggle('is-active', i === current));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
  }

  function next() { show(current + 1); }

  function start() { timer = setInterval(next, INTERVAL); }
  function restart() { if (timer) clearInterval(timer); start(); }

  start();

  // Pause on hover
  const window_ = stage.closest('.showcase-window');
  if (window_) {
    window_.addEventListener('mouseenter', () => timer && clearInterval(timer));
    window_.addEventListener('mouseleave', restart);
  }
}
initShowcase();

/* ============================================
   Hero: Collegiate Logo Stream (seamless loop)
   Duplicate the track contents so the marquee
   can scroll -50% without a visible gap.
   ============================================ */
function initLogoStream() {
  const track = document.getElementById('logoStream');
  if (!track) return;
  const chips = Array.from(track.children);
  chips.forEach(chip => track.appendChild(chip.cloneNode(true)));
}
initLogoStream();

/* ============================================
   Phone number — assembled at runtime
   The digits are never in the page source, so
   scrapers harvesting tel: links / number
   patterns come up empty. Humans see a normal,
   tappable number.
   ============================================ */
function initPhone() {
  document.querySelectorAll('.contact-phone').forEach(function (el) {
    var payload = el.getAttribute('data-c');
    if (!payload) return;

    var digits;
    try { digits = atob(payload).replace(/\D/g, ''); } catch (e) { return; }
    if (digits.length < 10) return;

    // drop a leading country code for display purposes
    var local = (digits.length === 11 && digits.charAt(0) === '1') ? digits.slice(1) : digits;
    var pretty = '(' + local.slice(0, 3) + ') ' + local.slice(3, 6) + '-' + local.slice(6);

    var link = document.createElement('a');
    link.className = 'phone-link';
    link.href = 'tel:+1' + local;
    link.textContent = pretty;

    el.textContent = '';
    el.appendChild(link);
    el.removeAttribute('data-c');
  });
}
initPhone();

/* ============================================
   Preselect contact dropdown from ?interest=
   (License/Distribute/Build CTAs deep-link here)
   ============================================ */
function initInterestPreselect() {
  const params = new URLSearchParams(window.location.search);
  const interest = params.get('interest');
  if (!interest) return;
  const select = document.getElementById('type');
  if (!select) return;
  const match = Array.from(select.options).some(o => o.value === interest);
  if (match) select.value = interest;
}
initInterestPreselect();
