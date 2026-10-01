const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://example.com');
  console.log('タイトル:', await page.title());

  await page.screenshot({ path: 'example.png', fullPage: true });
  console.log('スクリーンショットを保存しました: example.png');

  await browser.close();
})();
