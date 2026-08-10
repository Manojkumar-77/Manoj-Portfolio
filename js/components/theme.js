/**
 * js/components/theme.js
 * ─────────────────────────────────────────
 * Dark/light theme persistence helper.
 *
 * On pages using Alpine.js (index.html, projects.html, case-study.html),
 * Alpine manages the theme via x-data. This helper is kept here as a
 * reference for the theme persistence pattern:
 *
 *   Read:  localStorage.getItem('theme') === 'dark'
 *          OR (!stored && prefers-color-scheme: dark)
 *   Write: localStorage.setItem('theme', 'dark' | 'light')
 *
 * For 404.html which uses a lightweight x-data expression on body,
 * this pattern is applied inline. No standalone call needed there.
 *
 * ARCHITECTURE NOTE:
 * Theme toggle is embedded in Alpine app() / caseStudyApp() / projects()
 * functions and managed via $watch('dark'). This file documents the
 * pattern but does not replace the Alpine integration.
 */

/* ════════════════════════════════════════════
   THEME UTILITY (for non-Alpine pages if needed)
════════════════════════════════════════════ */
window.ThemeHelper = (function () {
  'use strict';

  function getPreference() {
    var stored = localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function setPreference(isDark) {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  function apply(el, isDark) {
    if (isDark) {
      el.classList.add('dark');
    } else {
      el.classList.remove('dark');
    }
  }

  return { getPreference: getPreference, setPreference: setPreference, apply: apply };
})();
