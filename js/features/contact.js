/**
 * js/features/contact.js
 * ─────────────────────────────────────────
 * Contact form validation, honeypot & submission logic.
 */

(function () {
  'use strict';

  function initContactForm() {
    var form       = document.getElementById('contactForm');
    var button     = document.getElementById('contactSubmitBtn');
    var buttonText = document.getElementById('contactSubmitText');
    var toast      = document.getElementById('contactToast');
    var toastTitle = document.getElementById('contactToastTitle');
    var toastMsg   = document.getElementById('contactToastMessage');
    var toastClose = document.getElementById('contactToastClose');
    var honeypot   = document.getElementById('website');
    var nameInput  = document.getElementById('fname');
    var emailInput = document.getElementById('femail');
    var subjectInput = document.getElementById('fsubject');
    var messageInput = document.getElementById('fmessage');

    if (!form || !button || !buttonText || !toast) return;

    var isSubmitting = false;
    var toastTimer;

    function hideToast() {
      clearTimeout(toastTimer);
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', '-translate-y-4', 'pointer-events-none');
    }

    function showToast(kind, title, message) {
      if (toastTitle) toastTitle.textContent = title;
      if (toastMsg) toastMsg.textContent = message;
      toast.classList.remove('opacity-0', '-translate-y-4', 'pointer-events-none');
      toast.classList.add('opacity-100', 'translate-y-0');
      toast.setAttribute('data-state', kind);
      clearTimeout(toastTimer);
      toastTimer = setTimeout(hideToast, 5000);
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (isSubmitting) return;

      if (honeypot && honeypot.value.trim()) return;

      var name    = (nameInput ? nameInput.value : '').trim();
      var email   = (emailInput ? emailInput.value : '').trim();
      var subject = (subjectInput ? subjectInput.value : '').trim();
      var message = (messageInput ? messageInput.value : '').trim();

      if (!name || !email || message.length < 20) {
        showToast('error', 'Please complete the form', 'Add your name, a valid email and a message of at least 20 characters.');
        return;
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showToast('error', 'Please enter a valid email', 'Use a standard email address so I can reply.');
        return;
      }

      if (!subject) {
        showToast('error', 'Please add a subject', 'A short subject helps me understand your inquiry.');
        return;
      }

      isSubmitting = true;
      button.disabled = true;
      buttonText.textContent = 'Sending...';
      hideToast();

      var formData = new FormData(form);
      formData.delete('website');

      fetch(form.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      })
      .then(function () {
        form.reset();
        showToast('success', 'Message sent successfully ✓', "I'll get back to you as soon as possible.");
      })
      .catch(function () {
        showToast('error', 'Unable to send message', 'Please reach out directly at manojkumarsdeveloper07@gmail.com.');
      })
      .finally(function () {
        isSubmitting = false;
        button.disabled = false;
        buttonText.textContent = 'Send message →';
      });
    });

    if (toastClose) {
      toastClose.addEventListener('click', hideToast);
    }
  }

  document.addEventListener('DOMContentLoaded', initContactForm);
})();
