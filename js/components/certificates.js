/**
 * js/components/certificates.js
 * ─────────────────────────────────────────
 * Dual-Mode Certificates Controller:
 *   - Desktop (>= 768px): 3D Coverflow Showcase with pointer drag & arrow navigation
 *   - Mobile (< 768px): Simple Centered 3-Card Feature Carousel (Prev, Active, Next)
 *
 * Mobile Index Model:
 *   - Single integer currentIndex (0..count-1)
 *   - Circular modulo distance math: pos = ((offset + count) % count)
 *   - Only pos === -1, 0, 1 rendered visible; all others hidden
 *   - Visible Left / Right arrows as primary control + optional threshold swipe
 *   - PDF Lightbox Modal integration preserved 100%
 */

(function () {
  'use strict';

  /* ────────────────────────────────────────────
     ICONS & HELPERS
  ──────────────────────────────────────────── */
  var PDF_ICON_SVG = [
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
      '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>',
      '<path d="M14 2v6h6M9 13h6M9 17h4"/>',
    '</svg>',
  ].join('');

  function normalizeIndex(index, count) {
    if (!count || count <= 0) return 0;
    return ((index % count) + count) % count;
  }

  /* ────────────────────────────────────────────
     CERTIFICATE MANAGER
  ──────────────────────────────────────────── */
  var CertManager = {
    wrapper: null,
    stage: null,
    track: null,
    filterContainer: null,
    metaContainer: null,
    btnPrev: null,
    btnNext: null,
    modal: null,

    activeFilter: 'all',
    filteredCerts: [],
    activeIndex: 0,
    fractionalIndex: 0,

    isDragging: false,
    dragMoved: false,
    intentConfirmed: false,
    startX: 0,
    startY: 0,
    startFractionalIndex: 0,
    animFrameId: null,
    currentCert: null,

    init: function () {
      this.wrapper         = document.getElementById('certCoverflowWrapper');
      this.stage           = document.getElementById('certCoverflowStage');
      this.track           = document.getElementById('certGrid');
      this.filterContainer = document.getElementById('certFilters');
      this.metaContainer   = document.getElementById('certActiveMeta');
      this.btnPrev         = document.getElementById('certNavPrev');
      this.btnNext         = document.getElementById('certNavNext');
      this.modal           = document.getElementById('certModal');

      if (!this.track || !this.modal) return;
      if (typeof CERTIFICATES === 'undefined' || !Array.isArray(CERTIFICATES)) return;
      if (typeof CERTIFICATE_CATEGORIES === 'undefined' || !Array.isArray(CERTIFICATE_CATEGORIES)) return;

      this.buildFilters();
      this.setFilter('all');
      this.initModal();
      this.initGestures();
      this.initKeyboard();
    },

    isDesktopMode: function () {
      return window.innerWidth >= 768;
    },

    /* ── Filter Buttons ── */
    buildFilters: function () {
      var _this = this;
      if (!this.filterContainer) return;
      this.filterContainer.innerHTML = '';

      CERTIFICATE_CATEGORIES.forEach(function (cat) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('data-filter', cat.key);
        btn.className = 'cert-filter-btn' + (cat.key === 'all' ? ' active' : '');
        btn.textContent = cat.label;
        btn.setAttribute('aria-pressed', cat.key === 'all' ? 'true' : 'false');

        btn.addEventListener('click', function () {
          _this.setFilter(cat.key);
        });

        _this.filterContainer.appendChild(btn);
      });
    },

    setFilter: function (key) {
      this.activeFilter = key;

      // Update filter buttons
      if (this.filterContainer) {
        this.filterContainer.querySelectorAll('.cert-filter-btn').forEach(function (btn) {
          var isActive = btn.getAttribute('data-filter') === key;
          btn.classList.toggle('active', isActive);
          btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
      }

      // Filter dataset
      this.filteredCerts = key === 'all'
        ? CERTIFICATES.slice()
        : CERTIFICATES.filter(function (c) { return c.category === key; });

      this.activeIndex = 0;
      this.fractionalIndex = 0;

      this.buildSlides();
      this.renderMode();
    },

    /* ── Build Certificate Slides ── */
    buildSlides: function () {
      var _this = this;
      this.track.innerHTML = '';

      if (this.filteredCerts.length === 0) {
        var empty = document.createElement('p');
        empty.className = 'text-zinc-400 text-sm py-12 text-center w-full';
        empty.textContent = 'No certificates in this category yet.';
        this.track.appendChild(empty);

        if (this.metaContainer) this.metaContainer.innerHTML = '';
        if (this.btnPrev) this.btnPrev.disabled = true;
        if (this.btnNext) this.btnNext.disabled = true;
        return;
      }

      this.filteredCerts.forEach(function (cert, idx) {
        var slide = document.createElement('div');
        slide.className = 'cert-slide' + (idx === 0 ? ' is-active' : '');
        slide.setAttribute('data-index', idx);
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'slide');
        slide.setAttribute('aria-label', cert.title + ' (' + (idx + 1) + ' of ' + _this.filteredCerts.length + ')');

        slide.innerHTML = [
          '<article class="cert-card" tabindex="0" role="button" aria-label="View certificate: ' + _this.escHtml(cert.title) + '">',
            '<div class="cert-preview" aria-hidden="true">',
              '<div class="cert-preview-icon">',
                PDF_ICON_SVG,
                '<span class="cert-preview-label">PDF</span>',
              '</div>',
            '</div>',
            '<div class="cert-content">',
              '<p class="cert-category-badge">' + _this.escHtml(cert.category) + '</p>',
              '<h3 class="cert-title">' + _this.escHtml(cert.title) + '</h3>',
              '<p class="cert-issuer">' + _this.escHtml(cert.issuer) + '</p>',
              '<p class="cert-date">' + _this.escHtml(cert.date) + '</p>',
              '<span class="cert-action" aria-hidden="true">View certificate <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="w-3.5 h-3.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>',
            '</div>',
          '</article>'
        ].join('');

        _this.track.appendChild(slide);
      });

      // Reveal observer trigger
      if (window.AnimationManager && typeof window.AnimationManager.initScrollReveal === 'function') {
        window.AnimationManager.initScrollReveal('#certificates .reveal');
      }
    },

    /* ── Mode Switcher ── */
    renderMode: function () {
      if (this.isDesktopMode()) {
        this.render3D(this.fractionalIndex);
      } else {
        this.renderMobile3Card(this.activeIndex);
      }
    },

    /* ── Render Mobile 3-Card Centered Carousel (< 768px) ── */
    renderMobile3Card: function (currentIndex) {
      var count = this.filteredCerts.length;
      if (count === 0) return;

      this.activeIndex = normalizeIndex(currentIndex, count);
      this.fractionalIndex = this.activeIndex;

      var slides = this.track.querySelectorAll('.cert-slide');
      var _this = this;

      slides.forEach(function (slide, idx) {
        var rawOffset = idx - _this.activeIndex;
        var pos = ((rawOffset % count) + count) % count;
        if (pos > Math.floor(count / 2)) {
          pos -= count;
        }

        if (pos === 0) {
          // ACTIVE CENTER CARD
          slide.style.transform = 'translate(-50%, -50%) scale(1) rotateY(0deg)';
          slide.style.opacity = '1';
          slide.style.zIndex = '10';
          slide.style.visibility = 'visible';
          slide.style.pointerEvents = 'auto';
          slide.classList.add('is-active');
        } else if (pos === -1) {
          // PREVIOUS CARD
          slide.style.transform = 'translate(-142%, -50%) scale(0.82) rotateY(10deg)';
          slide.style.opacity = '0.35';
          slide.style.zIndex = '2';
          slide.style.visibility = 'visible';
          slide.style.pointerEvents = 'auto';
          slide.classList.remove('is-active');
        } else if (pos === 1) {
          // NEXT CARD
          slide.style.transform = 'translate(42%, -50%) scale(0.82) rotateY(-10deg)';
          slide.style.opacity = '0.35';
          slide.style.zIndex = '2';
          slide.style.visibility = 'visible';
          slide.style.pointerEvents = 'auto';
          slide.classList.remove('is-active');
        } else {
          // HIDDEN CARDS
          slide.style.transform = 'translate(-50%, -50%) scale(0.7)';
          slide.style.opacity = '0';
          slide.style.zIndex = '0';
          slide.style.visibility = 'hidden';
          slide.style.pointerEvents = 'none';
          slide.classList.remove('is-active');
        }
      });

      if (this.btnPrev) this.btnPrev.disabled = false;
      if (this.btnNext) this.btnNext.disabled = false;

      this.updateActiveMeta();
    },

    /* ── Render Desktop 3D Coverflow Math (>= 768px) ── */
    render3D: function (fracIndex) {
      this.fractionalIndex = fracIndex;
      var count = this.filteredCerts.length;
      if (count === 0) return;

      var roundedIndex = Math.round(fracIndex);
      this.activeIndex = normalizeIndex(roundedIndex, count);

      var stepX = 195;
      var maxRot = 36;
      var depthZ = 120;

      var slides = this.track.querySelectorAll('.cert-slide');

      slides.forEach(function (slide, idx) {
        var offset = idx - fracIndex;
        var absOffset = Math.abs(offset);

        // 3D Transforms
        var posX = offset * stepX;
        var rotY = offset === 0 ? 0 : Math.max(-maxRot, Math.min(maxRot, -offset * 32));
        var posZ = -Math.min(4, absOffset) * depthZ;
        var scale = offset === 0 ? 1 : Math.max(0.72, 1 - absOffset * 0.1);
        var opacity = absOffset > 3.2 ? 0 : Math.max(0.25, 1 - absOffset * 0.28);
        var zIndex = Math.round(100 - absOffset * 10);

        slide.style.transform = [
          'translate(-50%, -50%)',
          'translateX(' + posX.toFixed(2) + 'px)',
          'translateZ(' + posZ.toFixed(2) + 'px)',
          'rotateY(' + rotY.toFixed(2) + 'deg)',
          'scale(' + scale.toFixed(3) + ')'
        ].join(' ');

        slide.style.opacity = opacity.toFixed(3);
        slide.style.zIndex = zIndex;
        slide.style.visibility = opacity < 0.1 ? 'hidden' : 'visible';
        slide.style.pointerEvents = opacity < 0.1 ? 'none' : 'auto';

        var isActive = Math.abs(offset) < 0.3;
        slide.classList.toggle('is-active', isActive);
      });

      if (this.btnPrev) this.btnPrev.disabled = false;
      if (this.btnNext) this.btnNext.disabled = false;

      this.updateActiveMeta();
    },

    updateActiveMeta: function () {
      if (!this.metaContainer) return;
      var cert = this.filteredCerts[this.activeIndex];
      if (!cert) {
        this.metaContainer.innerHTML = '';
        return;
      }

      var curr = this.activeIndex + 1;
      var total = this.filteredCerts.length;
      var counterStr = (curr < 10 ? '0' + curr : curr) + ' / ' + (total < 10 ? '0' + total : total);

      this.metaContainer.innerHTML = [
        '<div class="cert-active-info">',
          '<span class="cert-active-counter">' + counterStr + '</span>',
          '<h4 class="cert-active-title">' + this.escHtml(cert.title) + '</h4>',
          '<p class="cert-active-sub">' + this.escHtml(cert.issuer) + ' · ' + this.escHtml(cert.date) + '</p>',
        '</div>',
        '<button type="button" id="certActiveViewBtn" class="cert-action" style="font-size:.85rem; font-weight:700; background:none; border:none; padding:0; cursor:pointer;">',
          'View Certificate →',
        '</a>'
      ].join('');

      var viewBtn = document.getElementById('certActiveViewBtn');
      if (viewBtn) {
        var _this = this;
        viewBtn.addEventListener('click', function () {
          _this.openModal(cert);
        });
      }
    },

    /* ── Prev / Next Controls ── */
    prev: function () {
      var count = this.filteredCerts.length;
      if (!count) return;
      var target = normalizeIndex(this.activeIndex - 1, count);
      this.animateTo(target);
    },

    next: function () {
      var count = this.filteredCerts.length;
      if (!count) return;
      var target = normalizeIndex(this.activeIndex + 1, count);
      this.animateTo(target);
    },

    /* ── Smooth Navigation ── */
    animateTo: function (targetIndex) {
      var count = this.filteredCerts.length;
      if (!count) return;

      targetIndex = normalizeIndex(targetIndex, count);

      if (!this.isDesktopMode()) {
        this.renderMobile3Card(targetIndex);
        return;
      }

      cancelAnimationFrame(this.animFrameId);
      var _this = this;
      var startFrac = this.fractionalIndex;
      var dist = targetIndex - startFrac;
      var startTime = null;
      var duration = 280;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var elapsed = timestamp - startTime;
        var progress = Math.min(1, elapsed / duration);
        var ease = 1 - Math.pow(1 - progress, 3);
        var currentFrac = startFrac + dist * ease;

        _this.render3D(currentFrac);

        if (progress < 1) {
          _this.animFrameId = requestAnimationFrame(step);
        }
      }

      this.animFrameId = requestAnimationFrame(step);
    },

    /* ── Gestures: Edge Safety & Threshold Swipe Command Only ── */
    initGestures: function () {
      var _this = this;
      if (!this.stage) return;

      var stepDistance = 160;

      this.stage.addEventListener('pointerdown', function (e) {
        if (e.button && e.button !== 0) return;

        // Edge Safety: allow browser back gesture if < 24px from viewport edge
        if (e.clientX < 24 || e.clientX > window.innerWidth - 24) return;

        _this.isDragging = true;
        _this.dragMoved = false;
        _this.intentConfirmed = false;
        _this.startX = e.clientX;
        _this.startY = e.clientY;
        _this.startFractionalIndex = _this.fractionalIndex;
        cancelAnimationFrame(_this.animFrameId);

        _this.track.querySelectorAll('.cert-slide').forEach(function (s) {
          s.classList.add('dragging');
        });
      });

      window.addEventListener('pointermove', function (e) {
        if (!_this.isDragging) return;
        var dx = e.clientX - _this.startX;
        var dy = e.clientY - _this.startY;

        if (!_this.intentConfirmed) {
          if (Math.abs(dy) > Math.abs(dx)) {
            _this.isDragging = false; // vertical scroll -> abort
            return;
          }
          if (Math.abs(dx) >= 8) {
            _this.intentConfirmed = true;
          } else {
            return;
          }
        }

        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
          _this.dragMoved = true;
        }

        if (_this.isDesktopMode()) {
          var count = _this.filteredCerts.length;
          var newIndex = _this.startFractionalIndex - (dx / stepDistance);
          newIndex = Math.max(-0.4, Math.min(count - 0.6, newIndex));
          _this.render3D(newIndex);
        }
      });

      var endDrag = function (e) {
        if (!_this.isDragging) return;
        _this.isDragging = false;

        _this.track.querySelectorAll('.cert-slide').forEach(function (s) {
          s.classList.remove('dragging');
        });

        if (_this.isDesktopMode() && _this.dragMoved) {
          var targetIndex = Math.round(_this.fractionalIndex);
          _this.animateTo(targetIndex);
        } else if (!_this.isDesktopMode() && _this.intentConfirmed) {
          // Mobile/Tablet threshold swipe command (NO continuous drag)
          var dx = e.clientX - _this.startX;
          if (Math.abs(dx) > 40) {
            if (dx < 0) {
              _this.next();
            } else {
              _this.prev();
            }
          }
        }
      };

      window.addEventListener('pointerup', endDrag);
      window.addEventListener('pointercancel', endDrag);

      // Handle clicks on slides
      this.track.addEventListener('click', function (e) {
        if (_this.dragMoved) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        var slide = e.target.closest('.cert-slide');
        if (!slide) return;
        var idx = parseInt(slide.getAttribute('data-index'), 10);
        if (isNaN(idx)) return;

        if (idx !== _this.activeIndex) {
          _this.animateTo(idx);
        } else {
          var cert = _this.filteredCerts[idx];
          if (cert) _this.openModal(cert);
        }
      });

      // Navigation Arrow Buttons
      if (this.btnPrev) {
        this.btnPrev.addEventListener('click', function () {
          _this.prev();
        });
      }

      if (this.btnNext) {
        this.btnNext.addEventListener('click', function () {
          _this.next();
        });
      }

      // Handle Window Resize Mode Switching
      window.addEventListener('resize', function () {
        _this.renderMode();
      }, { passive: true });
    },

    /* ── Keyboard Navigation ── */
    initKeyboard: function () {
      var _this = this;
      var wrapper = this.wrapper || document.getElementById('certificates');
      if (!wrapper) return;

      wrapper.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          _this.prev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          _this.next();
        }
      });
    },

    escHtml: function (str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    },

    /* ── Modal (100% Preserved) ── */
    initModal: function () {
      var _this = this;

      var closeBtn = document.getElementById('certModalClose');
      if (closeBtn) {
        closeBtn.addEventListener('click', function () { _this.closeModal(); });
      }

      this.modal.addEventListener('click', function (e) {
        if (e.target === _this.modal) _this.closeModal();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && _this.modal.classList.contains('open')) {
          _this.closeModal();
        }
      });
    },

    openModal: function (cert) {
      this.currentCert = cert;

      var titleEl = document.getElementById('certModalTitle');
      var metaEl  = document.getElementById('certModalMeta');
      var bodyEl  = document.getElementById('certModalBody');
      var openBtn = document.getElementById('certModalOpenBtn');

      if (titleEl) titleEl.textContent = cert.title;
      if (metaEl)  metaEl.textContent  = cert.issuer + ' · ' + cert.date;

      if (bodyEl) {
        bodyEl.innerHTML = [
          '<embed',
            ' src="' + cert.file + '#toolbar=1&navpanes=0&scrollbar=0"',
            ' type="application/pdf"',
            ' aria-label="Certificate PDF: ' + this.escHtml(cert.title) + '"',
          '>',
          '<p class="hidden-pdf-fallback text-sm text-zinc-400 p-4">',
            'Your browser cannot display PDFs.',
            ' <a href="' + cert.file + '" target="_blank" rel="noopener noreferrer" class="text-accent underline">Open PDF</a>',
          '</p>',
        ].join('');
      }

      if (openBtn) {
        openBtn.href = cert.file;
      }

      this.modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      var closeBtn = document.getElementById('certModalClose');
      if (closeBtn) closeBtn.focus();
    },

    closeModal: function () {
      this.modal.classList.remove('open');
      document.body.style.overflow = '';
      this.currentCert = null;
    },
  };

  /* ── Init on DOM ready ── */
  document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('certCoverflowWrapper') || document.getElementById('certGrid')) {
      CertManager.init();
    }
  });

  window.CertManager = CertManager;
})();
