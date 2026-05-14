// main.js — v3

// ── Theme Toggle ──────────────────────────────────────────────────────────────

(function () {
  var themes = ['theme-vercel-minimal', 'theme-linear-dark'];
  var labels = ['Dark', 'Light'];
  var current = 0;
  var btn = document.getElementById('theme-toggle');

  function applyTheme(idx) {
    document.documentElement.className = themes[idx];
    btn.textContent = labels[idx]; // label = what you'll switch TO
    current = idx;
  }

  btn.addEventListener('click', function () {
    applyTheme(1 - current);
  });

  applyTheme(0); // default: Vercel Minimal
})();

// ── SVG Icons ─────────────────────────────────────────────────────────────────

function svgLinkedIn() {
  return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>';
}

function svgEmail() {
  return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>';
}

function svgCalendar() {
  return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>';
}

function svgChevronDown() {
  return '<svg class="summary-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
}

function progressRingSVG() {
  return '<svg class="progress-ring" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">' +
    '<circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" stroke-opacity="0.2" stroke-width="1.5"/>' +
    '<circle class="ring-progress" cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="34.56" stroke-dashoffset="34.56" transform="rotate(-90 7 7)"/>' +
    '</svg>';
}

// ── Auto-Rotator Factory ──────────────────────────────────────────────────────

function createRotator(opts) {
  var panels = opts.panels;
  var tabBtns = opts.tabBtns || [];
  var dotBtns = opts.dotBtns || [];
  var prevBtn = opts.prevBtn;
  var nextBtn = opts.nextBtn;
  var progressRings = opts.progressRings || [];
  var intervalMs = opts.intervalMs || 5000;

  var current = 0, paused = false, autoTimer = null, ringRaf = null, ringStart = null;
  var CIRC = 34.56;

  function resetAllRings() {
    progressRings.forEach(function (r) {
      if (r) r.style.strokeDashoffset = String(CIRC);
    });
  }

  function show(idx) {
    panels.forEach(function (p, i) { p.classList.toggle('active', i === idx); });
    tabBtns.forEach(function (b, i) { b.classList.toggle('active', i === idx); });
    dotBtns.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
    current = idx;
    if (!paused) startRing();
  }

  function startRing() {
    cancelAnimationFrame(ringRaf);
    resetAllRings();
    ringStart = performance.now();
    animateRing();
  }

  function animateRing() {
    if (paused) return;
    var ring = progressRings[current];
    if (!ring) return;
    var pct = Math.min((performance.now() - ringStart) / intervalMs, 1);
    ring.style.strokeDashoffset = String(CIRC * (1 - pct));
    if (pct < 1) {
      ringRaf = requestAnimationFrame(animateRing);
    }
  }

  function pause() {
    if (paused) return;
    paused = true;
    clearInterval(autoTimer);
    cancelAnimationFrame(ringRaf);
    resetAllRings();
  }

  tabBtns.forEach(function (btn, i) {
    btn.addEventListener('click', function () { pause(); show(i); });
  });

  dotBtns.forEach(function (dot, i) {
    dot.addEventListener('click', function () { pause(); show(i); });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      pause();
      show((current - 1 + panels.length) % panels.length);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      pause();
      show((current + 1) % panels.length);
    });
  }

  show(0);
  autoTimer = setInterval(function () {
    if (!paused) show((current + 1) % panels.length);
  }, intervalMs);
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function renderHero() {
  var root = document.getElementById('hero-inner');
  root.innerHTML =
    '<div class="hero-layout">' +
      '<div class="hero-text">' +
        '<div class="hero-top-row">' +
          '<span class="status-pill"><span class="status-dot"></span><span id="hero-status-text"></span></span>' +
        '</div>' +
        '<h1 class="hero-name" id="hero-name"></h1>' +
        '<p class="hero-role" id="hero-role"></p>' +
        '<p class="hero-rotating">' +
          '<span class="hero-prefix" id="hero-prefix"></span>&nbsp;' +
          '<span class="hero-word" id="hero-word"></span>' +
        '</p>' +
        '<p class="hero-desc" id="hero-desc"></p>' +
        '<div class="hero-ctas">' +
          '<a class="btn-primary" id="hero-cta-primary" href="#"></a>' +
          '<a class="btn-secondary" id="hero-cta-secondary" href="#"></a>' +
          '<a class="hero-linkedin" id="hero-linkedin" href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">' +
            svgLinkedIn() +
          '</a>' +
        '</div>' +
        '<p class="hero-meta caption" id="hero-meta"></p>' +
      '</div>' +
      '<div class="hero-headshot">' +
        '<img id="hero-img" src="" alt="Sajan Vaidhyanathan" loading="eager">' +
      '</div>' +
    '</div>';

  document.getElementById('hero-status-text').textContent = HERO.statusPill;
  document.getElementById('hero-name').textContent = HERO.name;
  document.getElementById('hero-role').textContent = HERO.role;
  document.getElementById('hero-prefix').textContent = HERO.rotatingPrefix;
  document.getElementById('hero-desc').textContent = HERO.description;
  document.getElementById('hero-cta-primary').href = HERO.primaryCTA.href;
  document.getElementById('hero-cta-primary').textContent = HERO.primaryCTA.label;
  document.getElementById('hero-cta-secondary').href = HERO.secondaryCTA.href;
  document.getElementById('hero-cta-secondary').textContent = HERO.secondaryCTA.label;
  document.getElementById('hero-linkedin').href = HERO.linkedInURL;
  document.getElementById('hero-meta').textContent = HERO.metaRow;
  document.getElementById('hero-img').src = HERO.headshot;

  // Word rotator
  var words = HERO.rotatingWords;
  var wordEl = document.getElementById('hero-word');
  var wi = 0;
  wordEl.textContent = words[0];
  wordEl.style.opacity = '1';
  wordEl.style.transition = 'opacity 260ms ease';

  setInterval(function () {
    wordEl.style.opacity = '0';
    setTimeout(function () {
      wi = (wi + 1) % words.length;
      wordEl.textContent = words[wi];
      wordEl.style.opacity = '1';
    }, 280);
  }, HERO.rotateIntervalMs);
}

// ── Metrics ───────────────────────────────────────────────────────────────────

function renderMetrics() {
  var root = document.getElementById('metrics-inner');
  var grid = '<div class="metrics-grid">';
  METRICS.forEach(function (m) {
    grid +=
      '<div class="metric-card">' +
        '<div class="metric-number" data-target="' + esc(m.number) + '">' + esc(m.number) + '</div>' +
        '<div class="metric-label">' + esc(m.label) + '</div>' +
        '<div class="metric-context">' + esc(m.context) + '</div>' +
      '</div>';
  });
  grid += '</div>';
  root.innerHTML = grid;
}

// ── Case Studies (accordion) ──────────────────────────────────────────────────

function buildCaseStudiesHTML() {
  var html = '<div class="cs-list">';
  CASE_STUDIES.forEach(function (cs) {
    html +=
      '<details class="cs-item">' +
        '<summary>' +
          '<div class="cs-summary-inner">' +
            '<span class="cs-tag">' + esc(cs.category) + '</span>' +
            '<span class="cs-title">' + esc(cs.title) + '</span>' +
            '<span class="cs-hook">' + esc(cs.oneLineHook) + '</span>' +
          '</div>' +
          svgChevronDown() +
        '</summary>' +
        '<div class="details-body cs-body">' +
          '<div class="cs-sections">' +
            csSection('The Problem',    cs.sections.problem) +
            csSection('The Approach',   cs.sections.approach) +
            csSection('How I Built It', cs.sections.howBuilt) +
            csSection('The ROI',        cs.sections.roi) +
          '</div>' +
          '<div class="cs-tools">' +
            cs.tools.map(function (t) { return '<span class="tool-chip">' + esc(t) + '</span>'; }).join('') +
          '</div>' +
        '</div>' +
      '</details>';
  });
  html += '</div>';
  return html;
}

function csSection(heading, text) {
  return '<div class="cs-section"><h4>' + heading + '</h4><p>' + esc(text) + '</p></div>';
}

// ── Work Experience (timeline + details) ──────────────────────────────────────

function buildWorkExperienceHTML() {
  var html = '<div class="work-timeline">';
  WORK_EXPERIENCE.forEach(function (job) {
    var companyLink = job.companyURL
      ? '<a href="' + job.companyURL + '" target="_blank" rel="noopener noreferrer">' + esc(job.company) + '</a>'
      : esc(job.company);

    html +=
      '<div class="job-entry">' +
        '<div class="job-header">' +
          '<div class="job-role">' + esc(job.role) + '</div>' +
          '<div class="job-company">' + companyLink + ' &middot; <span class="caption">' + esc(job.dates) + ' &middot; ' + esc(job.location) + '</span></div>' +
        '</div>' +
        '<p class="job-summary">' + esc(job.summary) + '</p>' +
        '<details class="job-details">' +
          '<summary>Key Accomplishments ' + svgChevronDown() + '</summary>' +
          '<div class="details-body">' +
            job.accomplishments.map(function (a) {
              return '<div class="detail-item"><strong>' + esc(a.headline) + '</strong> ' + esc(a.detail) + '</div>';
            }).join('') +
          '</div>' +
        '</details>' +
        '<details class="job-details">' +
          '<summary>Responsibilities ' + svgChevronDown() + '</summary>' +
          '<div class="details-body">' +
            job.responsibilities.map(function (r) {
              return '<div class="detail-item"><strong>' + esc(r.headline) + '</strong> ' + esc(r.detail) + '</div>';
            }).join('') +
          '</div>' +
        '</details>' +
      '</div>';
  });
  html += '</div>';
  return html;
}

// ── Tech Stack ────────────────────────────────────────────────────────────────

function buildTechStackHTML() {
  var html = '<div class="tech-grid">';
  TECH_STACK.forEach(function (cat) {
    html +=
      '<div class="tech-category">' +
        '<div class="tech-cat-label">' + esc(cat.category) + '</div>' +
        '<div class="tech-tools">' +
          cat.tools.map(function (t) { return '<span class="tool-chip">' + esc(t) + '</span>'; }).join('') +
        '</div>' +
      '</div>';
  });
  html += '</div>';
  return html;
}

// ── The Work (tabbed rotator) ─────────────────────────────────────────────────

function renderTheWork() {
  var root = document.getElementById('the-work-inner');

  var tabDefs = [
    { label: 'Case Studies',    id: 'wtab-0' },
    { label: 'Work Experience', id: 'wtab-1' },
    { label: 'Tech Stack',      id: 'wtab-2' }
  ];

  var tabBarHTML = '<div class="work-section-header">' +
    '<p class="eyebrow">The Work</p>' +
    '<div class="tab-bar" id="work-tab-bar">';

  tabDefs.forEach(function (t, i) {
    tabBarHTML +=
      '<button class="tab-btn' + (i === 0 ? ' active' : '') + '" id="' + t.id + '">' +
        esc(t.label) + progressRingSVG() +
      '</button>';
  });

  tabBarHTML += '</div>' +
    '<div class="rotator-nav" id="work-rotator-nav">' +
      '<button class="arrow-btn" id="work-prev" aria-label="Previous tab">&#8592;</button>' +
      tabDefs.map(function (t, i) {
        return '<button class="rotator-dot' + (i === 0 ? ' active' : '') + '" aria-label="Tab ' + (i + 1) + '"></button>';
      }).join('') +
      '<button class="arrow-btn" id="work-next" aria-label="Next tab">&#8594;</button>' +
    '</div>' +
  '</div>';

  var panelsHTML =
    '<div class="tab-panel active" id="wpanel-0">' + buildCaseStudiesHTML() + '</div>' +
    '<div class="tab-panel" id="wpanel-1">' + buildWorkExperienceHTML() + '</div>' +
    '<div class="tab-panel" id="wpanel-2">' + buildTechStackHTML() + '</div>';

  root.innerHTML = tabBarHTML + panelsHTML;

  var tabBtns  = tabDefs.map(function (t) { return document.getElementById(t.id); });
  var panels   = [0, 1, 2].map(function (i) { return document.getElementById('wpanel-' + i); });
  var dots     = Array.from(root.querySelectorAll('#work-rotator-nav .rotator-dot'));
  var rings    = tabBtns.map(function (btn) { return btn.querySelector('.ring-progress'); });

  createRotator({
    panels:       panels,
    tabBtns:      tabBtns,
    dotBtns:      dots,
    prevBtn:      document.getElementById('work-prev'),
    nextBtn:      document.getElementById('work-next'),
    progressRings: rings,
    intervalMs:   5000
  });
}

// ── The Person (3-card rotator) ───────────────────────────────────────────────

function renderThePerson() {
  var root = document.getElementById('the-person-inner');

  var cardDefs = [
    { id: 'ptab-0', label: PERSON_STORY.eyebrowLabel },
    { id: 'ptab-1', label: PERSON_NOW.eyebrowLabel },
    { id: 'ptab-2', label: PERSON_ADVISE.eyebrowLabel }
  ];

  var tabBarHTML = '<div class="person-section-header">' +
    '<p class="eyebrow">The Person</p>' +
    '<div class="person-tab-bar" id="person-tab-bar">';

  cardDefs.forEach(function (c, i) {
    tabBarHTML +=
      '<button class="tab-btn' + (i === 0 ? ' active' : '') + '" id="' + c.id + '">' +
        esc(c.label) + progressRingSVG() +
      '</button>';
  });

  tabBarHTML += '</div>' +
    '<div class="rotator-nav" id="person-rotator-nav">' +
      '<button class="arrow-btn" id="person-prev" aria-label="Previous">&#8592;</button>' +
      cardDefs.map(function (c, i) {
        return '<button class="rotator-dot' + (i === 0 ? ' active' : '') + '" aria-label="Card ' + (i + 1) + '"></button>';
      }).join('') +
      '<button class="arrow-btn" id="person-next" aria-label="Next">&#8594;</button>' +
    '</div>' +
  '</div>';

  var panelsHTML =
    '<div class="person-panel active" id="ppanel-0">' + buildPersonStoryHTML() + '</div>' +
    '<div class="person-panel" id="ppanel-1">' + buildPersonNowHTML() + '</div>' +
    '<div class="person-panel" id="ppanel-2">' + buildPersonAdviseHTML() + '</div>';

  root.innerHTML = tabBarHTML + panelsHTML;

  var tabBtns = cardDefs.map(function (c) { return document.getElementById(c.id); });
  var panels  = [0, 1, 2].map(function (i) { return document.getElementById('ppanel-' + i); });
  var dots    = Array.from(root.querySelectorAll('#person-rotator-nav .rotator-dot'));
  var rings   = tabBtns.map(function (btn) { return btn.querySelector('.ring-progress'); });

  createRotator({
    panels:        panels,
    tabBtns:       tabBtns,
    dotBtns:       dots,
    prevBtn:       document.getElementById('person-prev'),
    nextBtn:       document.getElementById('person-next'),
    progressRings: rings,
    intervalMs:    5000
  });
}

function buildPersonStoryHTML() {
  var s = PERSON_STORY;
  return '<div class="person-card">' +
    '<p class="person-lead">' + esc(s.leadLine) + '</p>' +
    s.paragraphs.map(function (p) { return '<p class="person-para">' + esc(p) + '</p>'; }).join('') +
    '</div>';
}

function buildPersonNowHTML() {
  var n = PERSON_NOW;
  var html = '<div class="person-card">';
  n.rows.forEach(function (row) {
    html +=
      '<div class="person-now-row">' +
        '<span class="person-now-label">' + esc(row.label) + '</span>' +
        '<p class="person-now-content">' + esc(row.content) + '</p>' +
      '</div>';
  });
  html += '</div>';
  return html;
}

function buildPersonAdviseHTML() {
  var a = PERSON_ADVISE;
  return '<div class="person-card">' +
    '<p class="person-lead">' + esc(a.leadLine) + '</p>' +
    a.paragraphs.map(function (p) { return '<p class="person-para">' + esc(p) + '</p>'; }).join('') +
    '<div class="avail-pill">' + esc(a.availability.label) + '</div>' +
    '</div>';
}

// ── Certifications ────────────────────────────────────────────────────────────

function renderCertifications() {
  var root = document.getElementById('certifications-inner');
  var html =
    '<div class="certs-header">' +
      '<p class="eyebrow">Certifications</p>' +
      '<h2 class="section-title">Formally qualified,<br>perpetually learning.</h2>' +
    '</div>' +
    '<div class="certs-grid">';

  CERTIFICATIONS.forEach(function (group) {
    html +=
      '<div class="cert-group">' +
        '<div class="cert-issuer">' + esc(group.issuer) + '</div>' +
        '<ul class="cert-list">' +
          group.certs.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') +
        '</ul>' +
      '</div>';
  });

  html += '</div>';
  root.innerHTML = html;
}

// ── Contact ───────────────────────────────────────────────────────────────────

function renderContact() {
  var root = document.getElementById('contact-inner');
  var c = CONTACT;

  var channelIcons = { email: svgEmail(), linkedin: svgLinkedIn(), calendly: svgCalendar() };

  var channelsHTML = c.channels.map(function (ch) {
    var isPlaceholder = ch.href === 'PLACEHOLDER_CALENDLY_URL';
    var href = isPlaceholder ? '#' : ch.href;
    var external = !isPlaceholder && ch.type !== 'email';
    return '<a class="channel-link' + (isPlaceholder ? ' disabled' : '') + '" href="' + href + '"' +
      (external ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' +
      (channelIcons[ch.type] || '') +
      '<span>' + esc(ch.label) + '</span>' +
      '</a>';
  }).join('');

  var reasonsHTML = c.reasons.map(function (r) {
    return '<div class="reason-card">' +
      '<h3 class="reason-title">' + esc(r.title) + '</h3>' +
      '<p class="reason-body">' + esc(r.body) + '</p>' +
      '</div>';
  }).join('');

  root.innerHTML =
    '<div class="contact-layout">' +
      '<div class="contact-copy">' +
        '<p class="eyebrow">Contact</p>' +
        '<h2 class="section-title contact-headline">' + esc(c.headline) + '</h2>' +
        '<p class="contact-subhead">' + esc(c.subhead) + '</p>' +
        '<div class="channels">' + channelsHTML + '</div>' +
      '</div>' +
      '<div class="reasons-grid">' + reasonsHTML + '</div>' +
    '</div>' +
    '<hr class="divider">' +
    '<footer class="site-footer">' +
      '<div class="footer-left">' +
        '<span class="footer-name">' + esc(HERO.name) + '</span>' +
        '<span class="caption">' + esc(c.footer.location) + '</span>' +
      '</div>' +
      '<span class="footer-tagline caption">' + esc(c.footer.tagline) + '</span>' +
      '<span class="footer-copy caption">&copy; ' + esc(c.footer.copyright) + '</span>' +
    '</footer>';
}

// ── Counter Animation ─────────────────────────────────────────────────────────

function initCounters() {
  var cards = document.querySelectorAll('.metric-card');
  if (!cards.length || !window.IntersectionObserver) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var numEl = entry.target.querySelector('.metric-number');
      if (!numEl || numEl.dataset.animated) return;
      numEl.dataset.animated = '1';
      observer.unobserve(entry.target);
      animateCounter(numEl);
    });
  }, { threshold: 0.4 });

  cards.forEach(function (card) { observer.observe(card); });
}

function animateCounter(numEl) {
  var raw = numEl.dataset.target;
  // Match: optional prefix chars, number, optional suffix chars
  var m = raw.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)([^0-9]*)$/);
  if (!m) return; // non-numeric (e.g. "9/10") — leave as-is

  var prefix  = m[1];
  var num     = parseFloat(m[2]);
  var suffix  = m[3];
  var hasDecimal = raw.indexOf('.') !== -1;
  var decimals = hasDecimal ? (m[2].split('.')[1] || '').length : 0;

  var start    = performance.now();
  var duration = 1600;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  (function frame() {
    var pct = Math.min((performance.now() - start) / duration, 1);
    var val = num * easeOutCubic(pct);
    numEl.textContent = prefix + (decimals > 0 ? val.toFixed(decimals) : Math.floor(val)) + suffix;
    if (pct < 1) requestAnimationFrame(frame);
  })();
}

// ── Text Escaping ─────────────────────────────────────────────────────────────

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Boot ──────────────────────────────────────────────────────────────────────

renderHero();
renderMetrics();
renderTheWork();
renderThePerson();
renderCertifications();
renderContact();
initCounters();
