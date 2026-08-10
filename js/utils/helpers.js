/**
 * js/utils/helpers.js
 * ─────────────────────────────────────────
 * Utility functions used across the portfolio.
 */

window.AppHelpers = (function () {
  'use strict';

  function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  function escHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function setCopyrightYear(elementId) {
    var id = elementId || 'yr';
    var target = document.getElementById(id);
    if (target) {
      target.textContent = new Date().getFullYear();
    }
  }

  return {
    getQueryParam: getQueryParam,
    escHtml: escHtml,
    setCopyrightYear: setCopyrightYear
  };
})();
