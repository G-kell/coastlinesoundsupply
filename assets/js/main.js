/* ============================================================================
   MAIN.JS — mobile nav, site-config hydration, FAQ accordion, theme toggle,
   and the enquiry form (validation + fetch submit + query-string prefill).

   No build step, no dependencies. Loaded with <script defer> on every page.
   ============================================================================ */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    hydrateSiteConfig();
    initMobileNav();
    initActiveNav();
    initFaqAccordion();
    initThemeToggle();
    initLeadForm();
  });

  /* --------------------------------------------------------------------------
     Active nav highlighting — header markup is byte-identical on every
     page, so "which link is current" is set here at runtime rather than
     baked into the shared HTML.
     -------------------------------------------------------------------------- */
  function initActiveNav() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav__link").forEach(function (link) {
      if (link.getAttribute("href") === path) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* --------------------------------------------------------------------------
     Site config hydration
     data-site="fieldName"        -> element.textContent = config.fieldName
     data-site-href="mailto:{{email}}" -> element.href with {{field}} replaced
     Falls back to whatever is already written in the HTML if window.SITE_CONFIG
     is missing (e.g. blocked script, offline copy) or a key is undefined.
     -------------------------------------------------------------------------- */
  function hydrateSiteConfig() {
    var config = window.SITE_CONFIG;
    if (!config) return;

    document.querySelectorAll("[data-site]").forEach(function (el) {
      var key = el.getAttribute("data-site");
      if (key === "year") {
        el.textContent = new Date().getFullYear();
        return;
      }
      var value = resolvePath(config, key);
      if (value !== undefined) el.textContent = value;
    });

    document.querySelectorAll("[data-site-href]").forEach(function (el) {
      var template = el.getAttribute("data-site-href");
      var resolved = template.replace(/\{\{([\w.]+)\}\}/g, function (_, key) {
        var value = resolvePath(config, key);
        return value !== undefined ? value : "";
      });
      el.setAttribute("href", resolved);
    });
  }

  function resolvePath(obj, path) {
    return path.split(".").reduce(function (acc, part) {
      return acc && acc[part] !== undefined ? acc[part] : undefined;
    }, obj);
  }

  /* --------------------------------------------------------------------------
     Mobile nav
     -------------------------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("nav--open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.matches(".nav__link") && window.innerWidth < 960) {
        nav.classList.remove("nav--open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("nav--open")) {
        nav.classList.remove("nav--open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     FAQ accordion
     -------------------------------------------------------------------------- */
  function initFaqAccordion() {
    var questions = document.querySelectorAll(".faq__question");
    questions.forEach(function (button) {
      var answer = document.getElementById(button.getAttribute("aria-controls"));
      if (!answer) return;

      button.addEventListener("click", function () {
        var isOpen = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!isOpen));
        answer.style.maxHeight = isOpen ? "0px" : answer.scrollHeight + "px";
      });
    });
  }

  /* --------------------------------------------------------------------------
     Theme toggle — persists an explicit choice in localStorage; absent a
     choice, tokens.css follows prefers-color-scheme on its own.
     -------------------------------------------------------------------------- */
  function initThemeToggle() {
    var STORAGE_KEY = "coastline-theme";
    var root = document.documentElement;
    var button = document.querySelector(".theme-toggle");

    var saved = safeGetItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") {
      root.setAttribute("data-theme", saved);
    }
    updateToggleLabel();

    if (!button) return;

    button.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      var currentlyDark = current === "dark" || (!current && prefersDark);
      var next = currentlyDark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      safeSetItem(STORAGE_KEY, next);
      updateToggleLabel();
    });

    function updateToggleLabel() {
      if (!button) return;
      var current = root.getAttribute("data-theme");
      var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      var currentlyDark = current === "dark" || (!current && prefersDark);
      button.setAttribute("aria-pressed", String(currentlyDark));
      button.setAttribute("aria-label", currentlyDark ? "Switch to light theme" : "Switch to dark theme");
    }
  }

  function safeGetItem(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSetItem(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  /* --------------------------------------------------------------------------
     Lead form
     -------------------------------------------------------------------------- */
  function initLeadForm() {
    var form = document.querySelector("[data-form='lead']");
    if (!form) return;

    prefillFromQueryString(form);

    var statusEl = form.querySelector("[data-form-status]");
    var fallbackEl = form.querySelector("[data-form-fallback]");
    var config = window.SITE_CONFIG || {};
    var endpoint = config.formEndpoint;

    if (!endpoint && fallbackEl) {
      fallbackEl.hidden = false;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Honeypot: if a bot filled the hidden field, pretend to succeed and
      // do nothing further.
      var honeypot = form.querySelector("input[name='company']");
      if (honeypot && honeypot.value.trim() !== "") {
        showStatus("success");
        form.reset();
        return;
      }

      if (!validateForm(form)) return;

      if (!endpoint) {
        showStatus("error", "The enquiry form isn't fully wired up yet — please use the email link below instead.");
        return;
      }

      var submitButton = form.querySelector("[data-form-submit]");
      if (submitButton) submitButton.disabled = true;

      fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then(function (response) {
          return response.json().catch(function () { return null; }).then(function (body) {
            // Some providers return HTTP 200 even for a rejected submission,
            // signalling failure only via a `success: false` body field —
            // so check both, not just the HTTP status.
            var succeeded = response.ok && (!body || body.success !== false);
            if (succeeded) {
              showStatus("success");
              form.reset();
            } else {
              showStatus("error");
            }
          });
        })
        .catch(function () {
          showStatus("error");
        })
        .finally(function () {
          if (submitButton) submitButton.disabled = false;
        });
    });

    function showStatus(kind, customMessage) {
      if (!statusEl) return;
      var successMsg = "Thanks — your enquiry is in. We reply " + (config.responseTime || "within 1 business day") + ".";
      var errorMsg = customMessage || "Something went wrong sending that. Please try again, or email us directly below.";

      statusEl.textContent = kind === "success" ? successMsg : errorMsg;
      statusEl.classList.remove("form__status--success", "form__status--error");
      statusEl.classList.add(kind === "success" ? "form__status--success" : "form__status--error");
      statusEl.setAttribute("data-visible", "true");
      statusEl.focus();
    }

    function validateForm(formEl) {
      var valid = true;
      var firstInvalid = null;

      // Plain required fields (currently just "name") — must not be empty.
      var requiredFields = formEl.querySelectorAll("[data-required='true']");
      requiredFields.forEach(function (field) {
        var fieldWrap = field.closest(".form__field");
        var isEmpty = field.value.trim() === "";
        if (isEmpty) {
          valid = false;
          field.setAttribute("aria-invalid", "true");
          if (fieldWrap) fieldWrap.setAttribute("data-invalid", "true");
          if (!firstInvalid) firstInvalid = field;
        } else {
          field.setAttribute("aria-invalid", "false");
          if (fieldWrap) fieldWrap.removeAttribute("data-invalid");
        }
      });

      // Email format — checked whenever a value is present, whether or not
      // email itself is the field satisfying "a way to reach them" below.
      var emailField = formEl.querySelector("#field-email");
      if (emailField && emailField.value.trim() !== "" && !isValidEmail(emailField.value)) {
        valid = false;
        emailField.setAttribute("aria-invalid", "true");
        var emailWrap = emailField.closest(".form__field");
        if (emailWrap) emailWrap.setAttribute("data-invalid", "true");
        if (!firstInvalid) firstInvalid = emailField;
      } else if (emailField) {
        emailField.setAttribute("aria-invalid", "false");
      }

      // At least one contact method: email or phone.
      var phoneField = formEl.querySelector("#field-phone");
      var contactWrap = document.querySelector("[data-contact-check]");
      if (emailField && phoneField) {
        var hasContact = emailField.value.trim() !== "" || phoneField.value.trim() !== "";
        if (!hasContact) {
          valid = false;
          if (contactWrap) contactWrap.setAttribute("data-invalid", "true");
          if (!firstInvalid) firstInvalid = emailField;
        } else if (contactWrap) {
          contactWrap.removeAttribute("data-invalid");
        }
      }

      // hCaptcha (Web3Forms spam protection) — only enforced if the widget
      // is actually present on the page (it renders asynchronously via
      // Web3Forms' client script, so this only runs at submit time).
      var captchaWrap = formEl.querySelector("[data-captcha-check]");
      if (captchaWrap) {
        var captchaResponse = formEl.querySelector('textarea[name="h-captcha-response"]');
        var captchaComplete = captchaResponse && captchaResponse.value.trim() !== "";
        if (!captchaComplete) {
          valid = false;
          captchaWrap.setAttribute("data-invalid", "true");
          if (!firstInvalid) firstInvalid = captchaWrap;
        } else {
          captchaWrap.removeAttribute("data-invalid");
        }
      }

      if (!valid && firstInvalid) {
        firstInvalid.focus();
      }

      return valid;
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    }
  }

  /* Prefill from the query string. A CTA elsewhere on the site can pass
     what it already knows (contact.html?event_type=Wedding&source=weddings-hero)
     so the visitor isn't asked again: the matching field is filled and its
     wrapper hidden, but it still submits with the form. Unknown values for a
     <select> are ignored (the field stays visible). "source" and "package"
     go into hidden inputs and only ever show up in the email. */
  function prefillFromQueryString(form) {
    if (!window.location.search) return;
    var params = new URLSearchParams(window.location.search);

    var eventType = setAndHide(form, "#field-event-type", params.get("event_type"));
    setAndHide(form, "#field-venue-sound", params.get("venue_sound"));

    // Package is a hidden input: only ever set from a package card's link.
    var packageParam = params.get("package");
    var packageField = form.querySelector("#field-package");
    if (packageParam && packageField) packageField.value = packageParam.slice(0, 80);

    var services = params.get("services");
    if (services) {
      var radio = form.querySelector("input[name='services'][value='" + cssEscape(services) + "']");
      if (radio) {
        radio.checked = true;
        hideField(radio.closest(".form__field"));
      }
    }

    // The spaces question only applies to weddings.
    if (eventType && eventType !== "Wedding") {
      var spaces = form.querySelector("#field-spaces");
      if (spaces) hideField(spaces.closest(".form__field"));
    }

    var source = params.get("source");
    var sourceField = form.querySelector("#field-source");
    if (source && sourceField) sourceField.value = source.slice(0, 80);

    var subject = form.querySelector("input[name='subject']");
    if (eventType && subject) {
      subject.value = "New enquiry (" + eventType + ") — Coastline Sound Supply";
    }
  }

  // Sets a field's value from a query param and hides it. For a <select>,
  // only an existing option can be selected; returns the applied value or null.
  function setAndHide(form, selector, value) {
    if (!value) return null;
    var field = form.querySelector(selector);
    if (!field) return null;
    field.value = value;
    if (field.value !== value) return null;
    hideField(field.closest(".form__field"));
    return value;
  }

  function hideField(wrap) {
    if (wrap) wrap.hidden = true;
  }

  function cssEscape(value) {
    return window.CSS && CSS.escape ? CSS.escape(value) : value.replace(/["'\\]/g, "\\$&");
  }
})();
