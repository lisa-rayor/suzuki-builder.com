import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(path.join(path.dirname(process.execPath), '../node_modules/playwright/package.json'));
const { chromium } = require('playwright');
const origin = process.env.SITE_URL || 'http://127.0.0.1:8081';
const products = [
  ['1', '木製スツール', '8,800'],
  ['2', '木製サイドテーブル', '19,800'],
  ['3', '木製オープンシェルフ', '33,000']
];

assert.equal((await fetch(`${origin}/products.php`)).status, 200, 'Product listing must exist');
for (const query of ['id=unknown', 'id[]=1', 'id=0', 'id=999', 'id=%3Cscript%3E']) {
  assert.equal((await fetch(`${origin}/product-detail.php?${query}`)).status, 404);
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
  const ready = () => page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(image => image.decode()));
  });

  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${origin}/products.php`, { waitUntil: 'networkidle' });
    await ready();
    assert.equal(await page.locator('.product-card').count(), 3);
    assert.match(await page.locator('.product-notice').first().innerText(), /仮/);
    assert.match(await page.locator('#shipping').innerText(), /送料/);
    assert.equal(await page.locator('#order .product-order li').count(), 4);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'List overflow');
    await page.screenshot({ path: path.join(out, `products-${width}.png`), fullPage: true });

    for (const [id, name, price] of products) {
      assert.equal(await page.locator(`.product-card__link[href="product-detail.php?id=${id}"]`).count(), 1);
      await page.locator(`.product-card .product-button[href="product-detail.php?id=${id}"]`).click();
      await page.waitForURL(`**/product-detail.php?id=${id}`);
      await ready();
      assert.equal(await page.locator('.product-detail__title').innerText(), name);
      assert((await page.locator('.product-detail__price').innerText()).includes(price));
      assert.equal(await page.locator('.product-detail__consult').getAttribute('href'), 'tel:0663911382');
      assert(!/<\?php|(?:Warning|Fatal error):/.test(await page.content()));
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Detail overflow');
      if (id === '1') await page.screenshot({ path: path.join(out, `product-detail-${width}.png`), fullPage: true });
      await page.getByRole('link', { name: '商品一覧へ戻る' }).click();
      await page.waitForURL('**/products.php');
    }

    if (width === 390) {
      await page.locator('.btn-trigger').click();
      await page.waitForFunction(() => !window.jQuery(':animated').length && getComputedStyle(document.querySelector('.sp_menu')).display !== 'none');
      const menu = await page.locator('.sp_menu').boundingBox();
      const last = await page.locator('.sp_menu li').last().boundingBox();
      assert(last.y + last.height <= menu.y + menu.height, 'Mobile navigation clipped');
      await page.locator('.sp_menu li.products a').hover();
      await page.locator('.sp_menu li').first().hover();
      assert.equal(await page.locator('.sp_menu li.products a').innerText(), '商品一覧');
      await page.locator('.sp_menu li.products a').click();
      await page.waitForURL('**/products.php');
    } else {
      await page.locator('header > .wrap > ul .products a').hover();
      assert.equal(await page.locator('header > .wrap > ul .products a').innerText(), '商品一覧');
    }
    console.log(`PASS ${width}px: 3 products, detail links, photos, prices, guides and navigation`);
  }
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}
