const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1500, height: 2200 },
    ignoreHTTPSErrors: true,
  });

  await page.goto('https://abehiroshi.la.coocan.jp/', {
    waitUntil: 'networkidle',
    timeout: 120000,
  });

  const leftFrame = page.frames()[1];
  if (!leftFrame) {
    throw new Error('左メニューのフレームが見つかりませんでした。');
  }

  const movieLink = leftFrame.getByRole('link', { name: '映画出演' }).first();
  const linkCount = await movieLink.count();

  if (linkCount === 0) {
    throw new Error('「映画出演」リンクが見つかりませんでした。');
  }

  await movieLink.click();
  await page.waitForTimeout(1500);

  await page.screenshot({
    path: 'abehiroshi_full_page.png',
    fullPage: true,
  });

  console.log('ページ全体のスクリーンショットを保存しました: abehiroshi_full_page.png');
  console.log('現在のURL:', page.url());

  await browser.close();
})();
