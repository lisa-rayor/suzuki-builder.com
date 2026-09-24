import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(path.join(path.dirname(process.execPath), '../node_modules/playwright/package.json'));
const { chromium } = require('playwright');
const origin = process.env.SITE_URL || 'http://127.0.0.1:8081';
const cases = [
  ['1', '外観をスタイリッシュにリフォーム'],
  ['2', '家の全てを支える基礎工事'],
  ['3', '家づくりの後半、建方・棟上げ'],
  ['4', 'ウッドデッキ'],
  ['5', '居酒屋'],
  ['6', '喫茶店'],
  ['7', '増築']
];

for (const [id, title] of cases) {
  const response = await fetch(`${origin}/works-detail.php?id=${id}`);
  assert.equal(response.status, 200, `Detail page missing: ${id}`);
  const html = await response.text();
  assert(html.includes(title), `Wrong case: ${id}`);
  assert(!/<\?php|(?:Warning|Fatal error):/.test(html), `PHP error: ${id}`);
}
for (const query of ['id=0', 'id=999', 'id=missing', 'id[]=1', 'id=../../index', 'id=%3Cscript%3E']) {
  assert.equal((await fetch(`${origin}/works-detail.php?${query}`)).status, 404, query);
}

const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const context = await browser.newContext();
  await context.route('**/*cloudflareinsights.com/**', route => route.fulfill({ status: 200, body: '' }));
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const out = path.resolve('docs/verification');
  fs.mkdirSync(out, { recursive: true });

  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${origin}/works.php`, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.work-link').count(), 7);
    assert.equal(await page.locator('.work-detail-button').count(), 7);
    for (const [index, [id, title]] of cases.entries()) {
      assert.equal(await page.locator('.work-link').nth(index).getAttribute('href'), `works-detail.php?id=${id}`);
      assert((await page.locator('.work-link').nth(index).innerText()).includes(title));
      const button = page.locator('.work-detail-button').nth(index);
      assert.equal(await button.getAttribute('href'), `works-detail.php?id=${id}`);
      assert.equal(await button.innerText(), '詳細を見る');
      await button.click();
      await page.waitForURL(`**/works-detail.php?id=${id}`);
      assert.equal(await page.locator('.work-detail__title').innerText(), title);
      await page.getByRole('link', { name: '施工事例一覧へ戻る' }).click();
      await page.waitForURL('**/works.php');
    }
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map(image => image.decode()));
    });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'List horizontal overflow');
    await page.screenshot({ path: path.join(out, `works-buttons-${width}.png`), fullPage: true });
    await page.locator('.work-link').first().click();
    await page.waitForURL('**/works-detail.php?id=1');
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map(image => image.decode()));
    });
    assert.equal(await page.locator('.work-detail__title').innerText(), cases[0][1]);
    assert.equal(await page.locator('.work-detail__photos figure').count(), 2);
    assert.equal(await page.locator('.work-detail__photos img').count(), 2);
    assert.match(await page.locator('.work-detail__notice').innerText(), /仮/);
    assert((await page.locator('.work-detail__comment').innerText()).length > 60);
    const boxes = await page.locator('.work-detail__photos figure').evaluateAll(figures => figures.map(figure => {
      const { x, y, width, height } = figure.getBoundingClientRect();
      return { x, y, width, height };
    }));
    if (width === 1440) {
      assert.equal(boxes[0].y, boxes[1].y);
      assert(boxes[1].x > boxes[0].x);
    } else {
      assert.equal(boxes[0].x, boxes[1].x);
      assert(boxes[1].y >= boxes[0].y + boxes[0].height);
    }
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Horizontal overflow');
    await page.screenshot({ path: path.join(out, `work-detail-${width}.png`), fullPage: true });
    await page.getByRole('link', { name: '施工事例一覧へ戻る' }).click();
    await page.waitForURL('**/works.php');
    console.log(`PASS ${width}px: list → detail → list, photos, comment, responsive layout`);
  }
  assert.deepEqual(errors, []);
  console.log('PASS: all 7 cases and invalid IDs');
} finally {
  await browser.close();
}
