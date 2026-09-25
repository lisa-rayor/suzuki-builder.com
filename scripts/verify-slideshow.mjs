import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(path.join(path.dirname(process.execPath), '../node_modules/playwright/package.json'));
const { chromium } = require('playwright');
const origin = process.env.SITE_URL || 'http://127.0.0.1:8081';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const out = path.resolve('docs/verification');
fs.mkdirSync(out, { recursive: true });
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*cloudflareinsights.com/**', route => route.fulfill({ status: 200, body: '' }));
    await page.clock.install();
    await page.goto(origin, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.top-slideshow__slides img').count(), 3);
    assert.equal(await page.locator('.top_main button').count(), 0);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map(image => image.decode()));
    });
    const active = () => page.locator('.top-slideshow__slides .is-active').getAttribute('src');
    const initial = await active();
    const catchBox = await page.locator('.top_main_catch').boundingBox();
    const seen = new Set([initial]);
    for (let i = 0; i < 3; i++) {
      await page.clock.fastForward(4000);
      seen.add(await active());
      assert.deepEqual(await page.locator('.top_main_catch').boundingBox(), catchBox);
    }
    assert.equal(seen.size, 3, 'All three photos must appear');
    assert.equal(await active(), initial, 'Slideshow must loop');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
    const reduced = await active();
    await page.clock.fastForward(15000);
    assert.equal(await active(), reduced, 'Reduced motion must stop autoplay');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: path.join(out, `slideshow-${width}.png`) });
    if (width === 390) {
      await page.locator('.btn-trigger').click();
      await page.clock.fastForward(1000);
      await page.locator('.sp_menu .products a').click();
      await page.waitForURL('**/products.php');
    }
    assert.deepEqual(errors, []);
    console.log(`PASS ${width}px: no controls, 3 photos, loop, reduced motion, stable layout`);
    await page.close();
  }
  const fallback = await browser.newPage({ javaScriptEnabled: false });
  await fallback.goto(origin);
  assert.equal(await fallback.locator('.top-slideshow__slides .is-active').count(), 1);
  assert.equal(await fallback.locator('.top_main button').count(), 0);
  console.log('PASS: static first photo without JavaScript');
  await fallback.close();
  const failed = await browser.newPage();
  await failed.route('**/images/{top_main,top_company}.jpg', route => route.abort());
  await failed.goto(origin, { waitUntil: 'networkidle' });
  assert.equal(await failed.locator('.top-slideshow__slides .is-active').getAttribute('src'), 'images/service_img.jpg');
  assert.equal(await failed.locator('.top_main button').count(), 0);
  console.log('PASS: available photo displayed when other photos fail');
  await failed.close();
} finally {
  await browser.close();
}
