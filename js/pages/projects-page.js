/**
 * js/pages/projects-page.js
 * ─────────────────────────────────────────
 * Page initialization script for projects.html.
 */

document.addEventListener('DOMContentLoaded', function () {
  if (window.AnimationManager) {
    window.AnimationManager.initScrollReveal();
    window.AnimationManager.initTouchFeedback('.project-card');
  }
  if (window.AppHelpers) {
    window.AppHelpers.setCopyrightYear('year');
  }
});
