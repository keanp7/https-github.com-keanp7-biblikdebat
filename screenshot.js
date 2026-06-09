const { chromium } = require('@playwright/test');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const outDir = 'C:\\Users\\jeana\\.gemini\\antigravity\\brain\\134401b3-c82e-41fd-9a83-81f1d45fa8bc';
  
  const urls = [
    { name: 'login', url: 'https://biblik-debat.vercel.app/en/auth/login' },
    { name: 'signup', url: 'https://biblik-debat.vercel.app/en/auth/signup' },
    { name: 'admin', url: 'https://biblik-debat.vercel.app/en/admin' },
    { name: 'community', url: 'https://biblik-debat.vercel.app/en/groups' }
  ];

  for (const {name, url} of urls) {
    console.log('Navigating to', url);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000); // Wait an extra second for animations
    await page.screenshot({ path: path.join(outDir, `${name}_live.png`), fullPage: true });
    console.log(`Saved ${name}_live.png`);
  }

  await browser.close();
})();
