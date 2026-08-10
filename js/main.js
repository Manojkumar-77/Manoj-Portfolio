/**
 * js/main.js
 * ─────────────────────────────────────────
 * Shared initialization — runs on every page.
 *
 * Responsibilities:
 *   - Set copyright year in #yr elements
 *   - Wire up touch feedback for .card-h and .stag elements
 *   - Initialize scroll-reveal IntersectionObserver
 *
 * NOTE: Alpine.js handles theme and navigation state on pages
 * that use x-data. This file handles non-Alpine shared behavior.
 */

(function () {
  'use strict';

  /* ── Copyright year ──────────────────────────────── */
  function initYear() {
    var year = new Date().getFullYear();
    document.querySelectorAll('#yr, #year').forEach(function (el) {
      el.textContent = year;
    });
  }

  /* ── DOMContentLoaded init ────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initYear();
    if (window.AnimationManager) {
      window.AnimationManager.initTouchFeedback('.card-h, .stag, .cert-card, .project-card');
      window.AnimationManager.initScrollReveal();
    }
  });

})();
