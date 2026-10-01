const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1400 } });

  await page.goto('https://abehiroshi.la.coocan.jp/', { waitUntil: 'domcontentloaded' });

  const results = await page.locator('a, button, span, div').evaluateAll(nodes => {
    return nodes.map((n) => {
      const text = ((n.textContent || '').replace(/\s+/g, ' ')).trim();
      const href = n instanceof HTMLAnchorElement ? n.href : '';
      return {
        tag: n.tagName,
        href,
        text: text.slice(0, 120),
      };
    }).filter((x) => /映画|出演|トップ|ドラマ|English|管理者/.test(x.text) || x.href);
  });

  console.log(JSON.stringify(results.slice(0, 120), null, 2));
  console.log('text count:', await page.getByText('映画出演').count());
  console.log('role link count:', await page.getByRole('link').count());
  await browser.close();
})();
