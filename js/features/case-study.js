/**
 * js/features/case-study.js
 * ─────────────────────────────────────────
 * Dynamic Case Study resolution and state management for Alpine.js.
 * Also handles touch interaction for Development Process workflow cards.
 *
 * Reads query parameter: ?project=<slug>
 * Resolves against canonical data in data/projects.js.
 */

window.caseStudyApp = function () {
  return {
    scrolled: false,
    mobileMenu: false,
    dark: false,
    progress: 0,
    projectSlug: '',
    project: null,

    init: function () {
      var self = this;

      // Theme
      this.dark = localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

      this.$watch('dark', function (val) {
        localStorage.setItem('theme', val ? 'dark' : 'light');
      });

      // Parse slug
      var urlParams = new URLSearchParams(window.location.search);
      this.projectSlug = urlParams.get('project') || 'social-mood-matcher';

      // Find in PROJECTS canonical array
      if (typeof PROJECTS !== 'undefined' && Array.isArray(PROJECTS)) {
        var found = PROJECTS.find(function (p) {
          return p.slug === self.projectSlug;
        });
        this.project = found || PROJECTS[0];
      } else {
        this.project = null;
      }

      if (this.project) {
        this.updateMetadata();
      }

      // Progress bar & scroll events
      var updateScroll = function () {
        self.scrolled = window.scrollY > 20;
        var scrollable = document.documentElement.scrollHeight - window.innerHeight;
        self.progress = scrollable > 0
          ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100))
          : 0;
      };

      window.addEventListener('scroll', updateScroll, { passive: true });
      updateScroll();

      window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) self.mobileMenu = false;
      }, { passive: true });
    },

    updateMetadata: function () {
      if (!this.project) return;
      var title = this.project.title + ' | Case Study | Manoj Kumar S';
      document.title = title;

      var descEl = document.getElementById('metaDescription');
      if (descEl) descEl.setAttribute('content', this.project.subtitle || this.project.desc);

      var ogTitleEl = document.getElementById('ogTitle');
      if (ogTitleEl) ogTitleEl.setAttribute('content', title);

      var ogDescEl = document.getElementById('ogDescription');
      if (ogDescEl) ogDescEl.setAttribute('content', this.project.subtitle || this.project.desc);
    },

    get relatedProjects() {
      var self = this;
      if (typeof PROJECTS === 'undefined' || !Array.isArray(PROJECTS)) return [];
      return PROJECTS.filter(function (item) {
        return item.slug !== (self.project ? self.project.slug : '');
      }).slice(0, 3);
    }
  };
};

/* ── Single Active Card Touch Handler for Development Process Cards ── */
(function initProcessCardTouch() {
  var startX = 0, startY = 0;

  document.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'touch') return;
    startX = e.clientX;
    startY = e.clientY;
  }, { passive: true });

  document.addEventListener('pointerup', function (e) {
    if (e.pointerType !== 'touch') return;

    var card = e.target.closest('.process-card');

    if (!card) {
      // Tapped outside Development Process cards — clear active state
      document.querySelectorAll('.process-card.process-active').forEach(function (el) {
        el.classList.remove('process-active');
      });
      return;
    }

    // Ignore if user was scrolling/swiping (movement > 10px)
    var dist = Math.hypot(e.clientX - startX, e.clientY - startY);
    if (dist > 10) return;

    var wasActive = card.classList.contains('process-active');

    // Single active card rule: clear all active process cards first
    document.querySelectorAll('.process-card.process-active').forEach(function (el) {
      el.classList.remove('process-active');
    });

    // Toggle clicked card
    if (!wasActive) {
      card.classList.add('process-active');
    }
  }, { passive: true });
})();
