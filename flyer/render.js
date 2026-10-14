// Renders flyer.html to a shareable PNG (1080x1350, 2x) and a letter-size PDF.
// Usage: node flyer/render.js   (requires the `playwright` package)
const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const url = "file://" + path.join(__dirname, "flyer.html");
  const ctx = await browser.newContext({ deviceScaleFactor: 2, ignoreHTTPSErrors: true });
  const page = await ctx.newPage();

  await page.setViewportSize({ width: 1080, height: 1350 });
  await page.goto(url + "?size=social", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.locator(".flyer").screenshot({ path: path.join(__dirname, "aef-preppy-holiday-party-flyer.png") });

  await page.setViewportSize({ width: 816, height: 1056 });
  await page.goto(url + "?size=letter", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: path.join(__dirname, "aef-preppy-holiday-party-flyer.pdf"),
    width: "8.5in", height: "11in", printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }, pageRanges: "1"
  });

  const fonts = await page.evaluate(() => [...document.fonts].filter(f => f.status === "loaded").map(f => f.family));
  console.log("fonts loaded:", [...new Set(fonts)].join(", ") || "NONE");
  await browser.close();
})();
