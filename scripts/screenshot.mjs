import puppeteer from 'puppeteer-core';

const OUT = process.argv[2] || '/tmp/site.png';
const URL = process.argv[3] || 'http://localhost:3400';
const W = Number(process.argv[4] || 1440);

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'shell',
  args: ['--no-sandbox', '--hide-scrollbars', '--force-color-profile=srgb'],
});
const page = await browser.newPage();
await page.setViewport({ width: W, height: 900, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });

// walk the page so IntersectionObservers + ScrollTriggers all fire
const height = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < height; y += 400) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await new Promise((r) => setTimeout(r, 90));
}
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 1200));

// freeze: settle every animation so nothing is captured mid-flight
await page.evaluate(() => {
  document.querySelectorAll('*').forEach((el) => {
    el.getAnimations?.().forEach((a) => { try { a.finish(); } catch {} });
  });
});
await new Promise((r) => setTimeout(r, 400));

// NOTE: do not resize the viewport to the full page height before capturing —
// that would make `svh`/`vh` units resolve against the whole document and
// distort every viewport-sized section. Puppeteer's fullPage handles it.
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: OUT, fullPage: true });
console.log('saved', OUT, W, height);
await browser.close();
