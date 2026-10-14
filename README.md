# AEF Preppy Holiday Party

Static sponsorship campaign site for Allied Elite Financial's '80s Preppy themed holiday party.

## Editing
All event details live in **`config.js`**: date/time (drives the countdown), venue, contact email, and the
sponsorship tiers (price, spots available, perks, Stripe payment links). Values marked `TODO` need confirming.

- Set `available: 0` on a tier to show it as **Sold Out**.
- Add this year's Stripe links to each tier's `creditCardLink`. Until a link is set, "Pay by Credit Card"
  sends the visitor to the contact form instead.
- "Pay by Bond Account" always sends the visitor to the contact form with the package and
  "Bond Account" pre-selected.

## Running
No build step. Open `index.html` in a browser, or upload the folder (`index.html`, `styles.css`, `script.js`,
`config.js`, `assets/`) to any static host or a WordPress page.

## Logo files
- `assets/aef-logo.png`: full logo, transparent background (for light backgrounds)
- `assets/aef-logo-white.png`: full logo with white wordmark (for the navy footer)
- `assets/aef-mark.png`: AE mark only (nav bar and browser tab icon)

## Contact form (Netlify Forms)
The contact form posts to Netlify Forms (form name `sponsor-contact`) and shows a thank-you message on the
page. In Netlify: **Forms → Enable form detection**, redeploy, then add an email under
**Site configuration → Notifications → Emails and webhooks → Form submission notifications**.
When the page is opened as a local file it falls back to opening an email to `contactEmail`.

## Promo flyer
`flyer/` holds a shareable event flyer (no sponsorship info): `aef-preppy-holiday-party-flyer.png`
(1080x1350 at 2x, for social/email) and `aef-preppy-holiday-party-flyer.pdf` (8.5x11 print).
Edit `flyer/flyer.html`, then re-render with `node flyer/render.js` (needs the `playwright` package).
Fonts are bundled in `flyer/fonts/` so it renders offline. The flyer is not part of the Netlify upload.
