// ─────────────────────────────────────────────────────────────────────────────
// MAIN.JS — interactivity: theme toggle, rotating words, counters,
//            accordion, carousel, mobile menu, smooth-scroll chips
// ─────────────────────────────────────────────────────────────────────────────

(function() {
  'use strict';

  // ── Theme toggle ────────────────────────────────────────────────────────────
  var root   = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var theme  = 'linear-dark';

  root.classList.add('theme-' + theme);
  updateThemeIcon();

  toggle.addEventListener('click', function() {
    root.classList.remove('theme-' + theme);
    theme = (theme === 'linear-dark') ? 'vercel-minimal' : 'linear-dark';
    root.classList.add('theme-' + theme);
    updateThemeIcon();
  });

  function updateThemeIcon() {
    var sunIcon  = document.getElementById('icon-sun');
    var moonIcon = document.getElementById('icon-moon');
    if (theme === 'linear-dark') {
      sunIcon.style.display  = 'block';
      moonIcon.style.display = 'none';
      toggle.setAttribute('aria-label', 'Switch to light theme');
    } else {
      sunIcon.style.display  = 'none';
      moonIcon.style.display = 'block';
      toggle.setAttribute('aria-label', 'Switch to dark theme');
    }
  }

  // ── Mobile menu ─────────────────────────────────────────────────────────────
  var ham        = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  ham.addEventListener('click', function() {
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
    });
  });

  // ── Rotating hero word ───────────────────────────────────────────────────────
  var wordEl  = document.getElementById('rotating-word');
  var wordIdx = 0;

  function showWord(i) {
    wordEl.style.opacity = '0';
    setTimeout(function() {
      wordEl.textContent   = HERO.rotatingWords[i];
      wordEl.style.opacity = '1';
    }, 300);
  }

  showWord(wordIdx);
  setInterval(function() {
    wordIdx = (wordIdx + 1) % HERO.rotatingWords.length;
    showWord(wordIdx);
  }, 2700);

  // ── Counter animation (IntersectionObserver) ──────────────────────────────
  function parseNum(str) {
    return parseFloat(str.replace(/[^0-9.]/g, '')) || 0;
  }

  function animateCounter(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = '1';

    var rawTarget  = el.getAttribute('data-target');
    var target     = parseNum(rawTarget);
    var prefix     = el.getAttribute('data-prefix') || '';
    var suffix     = el.getAttribute('data-suffix') || '';
    var isDecimal  = rawTarget.indexOf('.') !== -1;
    var duration   = 1600;
    var startTs    = null;

    function step(ts) {
      if (!startTs) startTs = ts;
      var progress = Math.min((ts - startTs) / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3);
      var current  = eased * target;
      el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = prefix + rawTarget + suffix;
    }

    requestAnimationFrame(step);
  }

  var counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.querySelectorAll('[data-target]').forEach(animateCounter);
      }
    });
  }, { threshold: 0.2 });

  var metricsSection = document.getElementById('metrics');
  if (metricsSection) counterObserver.observe(metricsSection);

  // ── Accordion case studies ──────────────────────────────────────────────────
  document.querySelectorAll('.accordion-trigger').forEach(function(trigger) {
    trigger.addEventListener('click', function() {
      var item      = trigger.closest('.accordion-item');
      var isOpen    = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-item.open').forEach(function(el) {
        el.classList.remove('open');
      });

      // Open clicked (if it wasn't already open)
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Case study chip scroll (career timeline) ──────────────────────────────
  document.querySelectorAll('.cs-chip[data-target-id]').forEach(function(chip) {
    chip.addEventListener('click', function() {
      var id  = chip.getAttribute('data-target-id');
      var el  = document.getElementById(id);
      if (!el) return;

      // Open the accordion item if not already open
      var item = el.closest('.accordion-item');
      if (item) {
        document.querySelectorAll('.accordion-item.open').forEach(function(o) {
          o.classList.remove('open');
        });
        item.classList.add('open');
      }

      var csSection = document.getElementById('case-studies');
      if (csSection) {
        csSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Photo carousel (drag / touch scroll) ─────────────────────────────────
  document.querySelectorAll('.carousel').forEach(function(carousel) {
    var isDown   = false;
    var startX   = 0;
    var scrollL  = 0;

    carousel.addEventListener('mousedown', function(e) {
      isDown  = true;
      startX  = e.pageX - carousel.offsetLeft;
      scrollL = carousel.scrollLeft;
      carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseleave', function() {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', function() {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', function(e) {
      if (!isDown) return;
      e.preventDefault();
      var x    = e.pageX - carousel.offsetLeft;
      var walk = (x - startX) * 1.2;
      carousel.scrollLeft = scrollL - walk;
    });

    carousel.style.cursor = 'grab';
  });

})();
