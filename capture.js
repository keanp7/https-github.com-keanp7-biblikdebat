const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const artifactDir = process.argv[2]; // Path to artifact dir
  
  // Wait for server to be ready
  await page.goto('http://localhost:3005/en', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(artifactDir, 'landing.png'), fullPage: true });

  await page.goto('http://localhost:3005/en/auth/login', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(artifactDir, 'login.png'), fullPage: true });

  await page.goto('http://localhost:3005/en/groups', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(artifactDir, 'groups.png'), fullPage: true });

  await page.goto('http://localhost:3005/en/ai', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(artifactDir, 'ai.png'), fullPage: true });

  await browser.close();
  console.log("Screenshots captured successfully!");
})();
