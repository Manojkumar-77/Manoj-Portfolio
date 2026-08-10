/**
 * js/components/navigation.js
 * ─────────────────────────────────────────
 * Navigation controller logic.
 *
 * Manages scroll-dependent header styles and mobile menu states.
 */

window.NavigationManager = (function () {
  'use strict';

  function initNavScroll(callback) {
    var onScroll = function () {
      var scrolled = window.scrollY > 20;
      if (typeof callback === 'function') {
        callback(scrolled);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initResizeMenu(callback) {
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) {
        if (typeof callback === 'function') {
          callback(false);
        }
      }
    }, { passive: true });
  }

  return {
    initNavScroll: initNavScroll,
    initResizeMenu: initResizeMenu
  };
})();
