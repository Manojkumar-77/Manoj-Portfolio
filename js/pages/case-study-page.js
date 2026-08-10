/**
 * js/pages/case-study-page.js
 * ─────────────────────────────────────────
 * Page initialization script for case-study.html.
 */

document.addEventListener('DOMContentLoaded', function () {
  if (window.AnimationManager) {
    window.AnimationManager.initScrollReveal();
    window.AnimationManager.initTouchFeedback('.card-h, .feature-card, .process-card');
  }
  if (window.AppHelpers) {
    window.AppHelpers.setCopyrightYear('yr');
  }
});
