(function () {
  var E = window.EVENT;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Simple text fields
  document.querySelectorAll("[data-field]").forEach(function (el) {
    var v = E[el.getAttribute("data-field")];
    if (v) el.textContent = v;
    else if (v === "") el.remove();
  });
  document.querySelectorAll("[data-field-href]").forEach(function (el) {
    el.href = "mailto:" + E[el.getAttribute("data-field-href")];
  });

  document.querySelectorAll("[data-href]").forEach(function (el) {
    var v = E[el.getAttribute("data-href")];
    if (v) el.href = v; else el.remove();
  });
  var venueLinks = document.querySelector(".card__links");
  if (venueLinks && !venueLinks.querySelector("a")) venueLinks.remove();

  // Sponsorship tiers
  document.getElementById("tiers").innerHTML = E.tiers.map(function (t, i) {
    var soldOut = t.available === 0;
    return '<article class="tier tier--' + esc(t.color) + (t.featured ? ' tier--featured' : '') + (soldOut ? ' tier--soldout' : '') + '">' +
      (t.featured ? '<span class="tier__ribbon">Presenting Sponsor</span>' : '') +
      '<p class="tier__tag">' + esc(t.nickname) + '</p>' +
      '<h3 class="tier__name">' + esc(t.name) + '</h3>' +
      '<p class="tier__price">' + esc(t.price) + '</p>' +
      '<p class="tier__limit">' + (soldOut ? 'Sold Out!' : esc(t.available) + ' Available') + '</p>' +
      '<ul>' + t.perks.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join("") + '</ul>' +
      (soldOut
        ? '<span class="btn btn--block btn--disabled" aria-disabled="true">Sold Out</span>'
        : '<button class="btn btn--block" type="button" data-tier="' + i + '">Claim Spot</button>') +
      '</article>';
  }).join("");

  // Contact form package / payment fields
  var pkgSelect = document.getElementById("contact-package");
  var paySelect = document.getElementById("contact-payment");
  var bondNote = document.getElementById("bond-note");
  pkgSelect.innerHTML = '<option value="">Select a package</option>' + E.tiers.map(function (t) {
    return '<option value="' + esc(t.name) + '">' + esc(t.name) + ' (' + esc(t.price) + ')</option>';
  }).join("") + '<option value="General question">General question</option>';

  function syncBondNote() { bondNote.hidden = paySelect.value !== "Bond Account"; }
  paySelect.addEventListener("change", syncBondNote);

  function prefillForm(tier, method) {
    pkgSelect.value = tier.name;
    paySelect.value = method;
    document.getElementById("contact-subject").value = tier.name + " Sponsorship (" + method + ")";
    syncBondNote();
    setTimeout(function () { document.querySelector('#contact-form input[name="name"]').focus({ preventScroll: true }); }, 500);
  }

  // Claim modal
  var modal = document.getElementById("claim-modal");
  var payCard = document.getElementById("pay-card");
  var payBond = document.getElementById("pay-bond");
  var currentTier = null;

  payCard.addEventListener("click", function () {
    if (currentTier && currentTier.creditCardLink) return; // opens Stripe in a new tab
    modal.close();
    prefillForm(currentTier, "Credit Card");
  });
  payBond.addEventListener("click", function () {
    modal.close();
    prefillForm(currentTier, "Bond Account");
  });

  document.getElementById("tiers").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-tier]");
    if (!btn) return;
    var t = currentTier = E.tiers[+btn.getAttribute("data-tier")];
    document.getElementById("claim-title").textContent = t.name;
    document.getElementById("claim-price").textContent = t.price;
    if (t.creditCardLink) {
      payCard.href = t.creditCardLink;
      payCard.target = "_blank";
      payCard.rel = "noopener";
    } else {
      payCard.href = "#contact";
      payCard.removeAttribute("target");
    }
    document.getElementById("claim-note").textContent = t.creditCardLink
      ? "Credit card opens a secure Stripe checkout in a new tab. Bond account takes you to our sponsor form to reserve your spot."
      : "Choose a payment method and we'll take you to our sponsor form to reserve your spot.";
    modal.showModal();
  });
  modal.querySelector(".modal__close").addEventListener("click", function () { modal.close(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });

  // Contact form → Netlify Forms (falls back to email when not hosted on Netlify)
  var form = document.getElementById("contact-form");
  var status = document.getElementById("contact-status");
  var submitBtn = form.querySelector('button[type="submit"]');

  function mailtoFallback(data) {
    var lines = [];
    data.forEach(function (v, k) {
      if (k === "form-name" || k === "bot-field") return;
      lines.push(k.charAt(0).toUpperCase() + k.slice(1) + ": " + v);
    });
    window.location.href = "mailto:" + E.contactEmail +
      "?subject=" + encodeURIComponent(data.get("subject") || "Holiday Party Sponsorship") +
      "&body=" + encodeURIComponent(lines.join("\n"));
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    if (location.protocol === "file:") { mailtoFallback(data); return; }

    submitBtn.disabled = true;
    status.className = "form__status";
    status.textContent = "Sending...";
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString()
    }).then(function (res) {
      if (!res.ok) throw new Error(res.status);
      form.reset();
      syncBondNote();
      status.className = "form__status is-success";
      status.textContent = "Thanks! Your message is in. Our events team will be in touch soon.";
    }).catch(function () {
      status.className = "form__status is-error";
      status.innerHTML = 'Sorry, that didn\'t go through. Please email <a href="mailto:' + esc(E.contactEmail) + '">' + esc(E.contactEmail) + '</a>.';
    }).then(function () { submitBtn.disabled = false; });
  });

  // Countdown
  var target = new Date(E.startISO).getTime();
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function tick() {
    var d = Math.max(0, target - Date.now());
    document.getElementById("cd-days").textContent = Math.floor(d / 864e5);
    document.getElementById("cd-hours").textContent = pad(Math.floor(d / 36e5) % 24);
    document.getElementById("cd-mins").textContent = pad(Math.floor(d / 6e4) % 60);
    document.getElementById("cd-secs").textContent = pad(Math.floor(d / 1e3) % 60);
  }
  if (!isNaN(target)) { tick(); setInterval(tick, 1000); }

  // Mobile nav
  var toggle = document.querySelector(".nav__toggle"), links = document.getElementById("nav-links");
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { links.classList.remove("is-open"); toggle.setAttribute("aria-expanded", false); }
  });

  // Snow
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var snow = document.querySelector(".snow"), flakes = ["❄", "✦", "★", "❅"];
    for (var i = 0; i < 28; i++) {
      var f = document.createElement("span");
      f.textContent = flakes[i % flakes.length];
      f.style.left = Math.random() * 100 + "vw";
      f.style.animationDuration = 8 + Math.random() * 10 + "s";
      f.style.animationDelay = -Math.random() * 18 + "s";
      f.style.fontSize = 10 + Math.random() * 14 + "px";
      snow.appendChild(f);
    }
  }
})();
