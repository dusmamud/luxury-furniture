const { chromium } = require('playwright');
(async () => {
	const browser = await chromium.launch();
	const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
	const errors = [];
	page.on('pageerror', (e) => errors.push(e.message));
	await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
	await page.waitForTimeout(1000);
	await page.screenshot({ path: 'shots/hero-390.png' });
	const h1 = await page.locator('h1').textContent();
	console.log('h1 =', JSON.stringify(h1));
	console.log('h1 visible =', await page.locator('h1').isVisible());
	// scroll to about, wait for reveal
	await page.locator('#about').scrollIntoViewIfNeeded();
	await page.waitForTimeout(1200);
	await page.screenshot({ path: 'shots/about-390.png' });
	console.log('about img visible =', await page.locator('#about img').isVisible());
	console.log('about img naturalWidth =', await page.evaluate(() => { const i = document.querySelector('#about img'); return i ? i.naturalWidth : -1; }));
	// collections at 390
	await page.locator('#collections').scrollIntoViewIfNeeded();
	await page.waitForTimeout(1200);
	await page.screenshot({ path: 'shots/collections-390.png' });
	console.log('overflow 390 =', await page.evaluate(() => document.documentElement.scrollWidth + '/' + window.innerWidth));
	console.log('errors:', errors.length ? errors : 'none');
	await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
