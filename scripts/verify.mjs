import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';
import { isDeepStrictEqual } from 'node:util';

const require = createRequire(path.join(path.dirname(process.execPath), '../node_modules/playwright/package.json'));
const { chromium } = require('playwright');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch').default;
const root = path.resolve(import.meta.dirname, '..');
const crawl = JSON.parse(fs.readFileSync(path.join(root, 'docs/site-crawl/crawl-data.json'), 'utf8').replace(/^\uFEFF/, ''));
const names = ['index', 'company', 'service', 'works', 'contact'];
for (const name of names) assert(fs.existsSync(path.join(root, `${name}.php`)), `Missing page: ${name}.php`);
const phpOrigin = process.env.SITE_URL || 'http://127.0.0.1:8081';
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.ico': 'image/x-icon' };
const server = http.createServer(async (req, res) => {
  let url = new URL(req.url, 'http://localhost').pathname;
  if (url.startsWith('/before/') && /\.php$/.test(url)) {
    const original = crawl.pages.find(p => p.url.endsWith(url.slice(7)));
    res.writeHead(original ? 200 : 404, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(original?.html);
  }
  if (/^\/[\w-]+\.php$/.test(url)) {
    try {
      const response = await fetch(phpOrigin + req.url);
      res.writeHead(response.status, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(await response.text());
    } catch { res.writeHead(502); return res.end('Start Docker with docker compose up -d'); }
  }
  url = url === '/before/css/creative.css' ? '/docs/site-crawl/creative.css' : url.replace(/^\/before\//, '/');
  const file = path.resolve(root, '.' + url);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': `${types[path.extname(file)] || 'application/octet-stream'}; charset=utf-8` });
  fs.createReadStream(file).pipe(res);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = [], external = new Map();
const out = path.join(root, 'docs/verification');
fs.mkdirSync(out, { recursive: true });
try {
  const context = await browser.newContext({ deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await context.route('**/*', async route => {
    const url = route.request().url();
    if (url.startsWith(origin)) return route.continue();
    if (url.includes('cloudflareinsights.com')) return route.fulfill({ status: 200, body: '', contentType: 'text/javascript' });
    if (!external.has(url)) external.set(url, (async () => {
      const response = await route.fetch();
      assert.equal(response.status(), 200, `External resource failed: ${url}`);
      return { status: response.status(), headers: response.headers(), body: await response.body() };
    })());
    return route.fulfill(await external.get(url));
  });
  const snapshot = async page => page.evaluate(() => {
    const visible = [...document.body.querySelectorAll('*')].filter(el => !['SCRIPT', 'STYLE'].includes(el.tagName) && !el.matches('.work-link'));
    return visible.map(el => {
      const rect = el.getBoundingClientRect(), style = getComputedStyle(el);
      return { tag: el.tagName, text: el.children.length ? '' : el.textContent.replace(/\s+/g, ' ').trim(), box: [rect.x, rect.y, rect.width, rect.height], styles: [...style].map(key => [key, key === 'cursor' && el.closest('.work-link') ? 'auto' : style.getPropertyValue(key).replaceAll('/before/', '/')]) };
    });
  });
  const same = (actual, expected, label) => {
    if (isDeepStrictEqual(actual, expected)) return;
    const index = actual.findIndex((value, i) => !isDeepStrictEqual(value, expected[i]));
    fs.writeFileSync(path.join(out, 'layout-difference.json'), JSON.stringify({ label, index, actual: actual[index], expected: expected[index] }, null, 2));
    assert.fail(`${label}: element ${index}; see docs/verification/layout-difference.json`);
  };
  for (const width of [1440, 390]) for (const name of names) {
    const pages = await Promise.all([context.newPage(), context.newPage()]);
    const errors = [];
    for (const page of pages) page.on('pageerror', error => errors.push(error.message));
    for (const [i, page] of pages.entries()) {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(`${origin}/${i ? `${name}.php` : `before/${name}.php`}`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, `${name}: HTTP response`);
      assert(!/<\?php|(?:Warning|Fatal error):/.test(await response.text()), `${name}: PHP render error`);
      await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(image => image.decode())); });
    }
    assert.deepEqual(errors, [], `${name}/${width}: JavaScript errors`);
    // 新規ボタン・商品メニューは専用テストで確認し、ここでは既存部分を比較する。
    await pages[1].locator('header li.products, .footer_nav li.products').evaluateAll(nodes => nodes.forEach(node => node.remove()));
    await pages[1].locator('header').evaluate(node => node.classList.remove('site-header'));
    // スライドショーは専用テストで確認。ここでは元の背景で既存レイアウトを比較する。
    if (name === 'index') {
      await pages[1].locator('.top-slideshow__slides').evaluateAll(nodes => nodes.forEach(node => node.remove()));
      await pages[1].locator('.top_main').evaluate(node => node.classList.remove('top-slideshow'));
    }
    if (name === 'works') {
      await pages[1].locator('.work-detail-button').evaluateAll(buttons => buttons.forEach(button => button.remove()));
    }
    assert.equal(await pages[1].title(), await pages[0].title(), `${name}: page title changed`);
    assert.equal(await pages[1].locator('header').count(), 1);
    assert.equal(await pages[1].locator('footer').count(), 1);
    const cssRules = page => page.evaluate(() => [...[...document.styleSheets].find(sheet => sheet.href?.endsWith('/css/creative.css')).cssRules].map(rule => rule.cssText).filter(rule => !/\.work-(?:link|detail)|\.products?-|\.site-header|\.top-slideshow/.test(rule)));
    assert.deepEqual(await cssRules(pages[1]), await cssRules(pages[0]), 'CSS rules changed');
    same(await snapshot(pages[1]), await snapshot(pages[0]), `${name}/${width}: layout/style/content changed`);
    const shots = await Promise.all(pages.map((page, i) => page.screenshot({ fullPage: true, animations: 'disabled', path: path.join(out, `${name}-${width}-${i ? 'after' : 'before'}.png`) })));
    const [before, after] = shots.map(buffer => PNG.sync.read(buffer));
    assert.equal(after.width, before.width); assert.equal(after.height, before.height);
    const diff = new PNG({ width: before.width, height: before.height });
    const changed = pixelmatch(before.data, after.data, diff.data, before.width, before.height, { threshold: 0.01 });
    if (changed) fs.writeFileSync(path.join(out, `${name}-${width}-diff.png`), PNG.sync.write(diff));
    assert.equal(changed, 0, `${name}/${width}: changed pixels`);
    if (width === 390) {
      for (const page of pages) {
        await page.locator('.btn-trigger').click();
        await page.waitForFunction(() => getComputedStyle(document.querySelector('.sp_menu')).display !== 'none' && !window.jQuery(':animated').length);
        await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished)));
      }
      same(await snapshot(pages[1]), await snapshot(pages[0]), `${name}: opened mobile menu changed`);
      await pages[1].locator('.btn-trigger').click();
      await pages[1].waitForFunction(() => getComputedStyle(document.querySelector('.sp_menu')).display === 'none');
    } else {
      for (const page of pages) await page.locator('header .company a').hover();
      assert.equal(await pages[1].locator('header .company a').innerText(), '会社概要');
    }
    const links = await pages[1].locator('a[href]').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')).filter(href => /^[\w-]+\.(?:php|html)$/.test(href)));
    for (const link of new Set(links)) {
      assert(fs.existsSync(path.join(root, link)), `Broken local link: ${link}`);
      assert.equal((await pages[1].request.get(`${origin}/${link}`)).status(), 200, `Unreachable page: ${link}`);
    }
    if (name === 'contact') {
      assert.equal(await pages[1].locator('form').getAttribute('method'), 'post');
      assert.equal(await pages[1].locator('form').getAttribute('action'), 'mail.php');
      assert.equal(await pages[1].locator('input, textarea').count(), 4);
    }
    results.push({ page: name, width, changedPixels: changed, layout: 'identical', menu: 'passed' });
    console.log(`PASS ${name} ${width}px: identical CSS/layout, no visual differences (threshold 0.01); menu and links checked`);
    await Promise.all(pages.map(page => page.close()));
  }
  fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify({ verifiedAt: new Date().toISOString(), pixelThreshold: 0.01, results }, null, 2) + '\n');
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
