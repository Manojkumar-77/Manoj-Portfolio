/**
 * js/features/animations.js
 * ─────────────────────────────────────────
 * Reusable animation, scroll reveal observers & touch interactions.
 */

window.AnimationManager = (function () {
  'use strict';

  function initScrollReveal(selector) {
    var targetSelector = selector || '.reveal';
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(targetSelector).forEach(function (el) {
        el.classList.add('in');
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll(targetSelector).forEach(function (el) {
      observer.observe(el);
    });
  }

  function initTouchFeedback(selector) {
    var targetSelector = selector || '.card-h, .stag, .cert-card, .project-card, .filter-btn, .cert-filter-btn, .shimmer, .btn-primary';

    // Delegation on document for temporary active card/button touch feedback
    document.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'touch') return;
      var target = e.target.closest(targetSelector);
      if (!target) return;

      target.classList.add('touch-active');
      clearTimeout(target._touchTimer);
    }, { passive: true });

    var clearTouch = function (e) {
      if (e.pointerType !== 'touch') return;
      var target = e.target.closest(targetSelector);
      if (!target) return;

      clearTimeout(target._touchTimer);
      target._touchTimer = setTimeout(function () {
        target.classList.remove('touch-active');
      }, 220);
    };

    document.addEventListener('pointerup', clearTouch, { passive: true });
    document.addEventListener('pointercancel', clearTouch, { passive: true });

    // Dedicated single-active-pill tap handler for #tech-stack
    initTechStackTouch();
    initEducationTouch();
  }

  function initTechStackTouch() {
    var techSelector = '#tech-stack .skill-tag';

    if (!document.querySelector(techSelector)) return;

    function clearTechPills() {
      document.querySelectorAll(techSelector + '.tech-active').forEach(function (pill) {
        pill.classList.remove('tech-active');
      });
    }

    document.addEventListener('click', function (e) {
      var tag = e.target.closest(techSelector);
      if (!tag) {
        clearTechPills();
        return;
      }

      var wasActive = tag.classList.contains('tech-active');
      clearTechPills();
      if (!wasActive) tag.classList.add('tech-active');
    });
  }

  function initEducationTouch() {
    var educationSelector = '#about .about-edu-item';

    if (!document.querySelector(educationSelector)) return;

    function clearEducationCards() {
      document.querySelectorAll(educationSelector + '.education-active').forEach(function (card) {
        card.classList.remove('education-active');
      });
    }

    document.addEventListener('click', function (e) {
      var card = e.target.closest(educationSelector);
      if (!card) {
        clearEducationCards();
        return;
      }

      var wasActive = card.classList.contains('education-active');
      clearEducationCards();
      if (!wasActive) card.classList.add('education-active');
    });
  }

  return {
    initScrollReveal: initScrollReveal,
    initTouchFeedback: initTouchFeedback,
    initTechStackTouch: initTechStackTouch,
    initEducationTouch: initEducationTouch
  };
})();
