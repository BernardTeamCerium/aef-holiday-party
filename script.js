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

  // Claim modal
  var modal = document.getElementById("claim-modal");
  var payCard = document.getElementById("pay-card");
  var payBond = document.getElementById("pay-bond");

  function setPay(el, link, tier, method) {
    if (link) {
      el.href = link;
      el.target = "_blank";
      el.onclick = null;
    } else {
      el.href = "#contact";
      el.removeAttribute("target");
      el.onclick = function () {
        modal.close();
        document.getElementById("contact-subject").value = tier.name + " Sponsorship (" + method + ")";
      };
    }
  }

  document.getElementById("tiers").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-tier]");
    if (!btn) return;
    var t = E.tiers[+btn.getAttribute("data-tier")];
    document.getElementById("claim-title").textContent = t.name;
    document.getElementById("claim-price").textContent = t.price;
    setPay(payCard, t.creditCardLink, t, "Credit Card");
    setPay(payBond, t.bondAccountLink, t, "Bond Account");
    document.getElementById("claim-note").textContent = (t.creditCardLink && t.bondAccountLink)
      ? "Payment opens in a secure Stripe checkout in a new tab."
      : "Online payment is coming soon. Choose a method and send us a note to reserve your spot.";
    modal.showModal();
  });
  modal.querySelector(".modal__close").addEventListener("click", function () { modal.close(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });

  // Contact form → mailto
  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(e.target), lines = [];
    data.forEach(function (v, k) { lines.push(k.charAt(0).toUpperCase() + k.slice(1) + ": " + v); });
    window.location.href = "mailto:" + E.contactEmail +
      "?subject=" + encodeURIComponent(data.get("subject") || "Holiday Party Sponsorship") +
      "&body=" + encodeURIComponent(lines.join("\n"));
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
