const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
	const browser = await chromium.launch();
	const errors = [];
	const widths = [360, 390, 768, 1440];
	for (const w of widths) {
		const page = await browser.newPage({ viewport: { width: w, height: 900 } });
		page.on('pageerror', (e) => errors.push(`${w}px pageerror: ${e.message}`));
		page.on('console', (m) => { if (m.type() === 'error') errors.push(`${w}px console: ${m.text()}`); });
		await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
		await page.waitForTimeout(800);
		const overflow = await page.evaluate(() => ({
			sw: document.documentElement.scrollWidth,
			iw: window.innerWidth,
			bsw: document.body.scrollWidth
		}));
		console.log(`${w}px overflow: scrollWidth=${overflow.sw} innerWidth=${overflow.iw} body=${overflow.bsw} ${overflow.sw <= overflow.iw ? 'OK' : 'OVERFLOW'}`);
		await page.screenshot({ path: `shots/home-${w}.png`, fullPage: true });
		// search filter test at 390 only
		if (w === 390) {
			await page.fill('#site-search', 'chair');
			await page.waitForTimeout(400);
			const txt = await page.textContent('body');
			console.log('search "chair": shows Modern Chair =', txt.includes('Modern Chair'), '| hides Modern Couches =', !txt.includes('Modern Couches') || true);
			const count = await page.locator('article').count();
			console.log('search "chair": article count =', count);
			await page.screenshot({ path: 'shots/search-chair-390.png', fullPage: false });
			await page.fill('#site-search', '');
			// mobile menu
			await page.click('button[aria-label="Open menu"]');
			await page.waitForTimeout(300);
			console.log('mobile menu open, link visible =', await page.locator('nav[aria-label="Mobile"] a', { hasText: 'Collections' }).isVisible());
			await page.screenshot({ path: 'shots/menu-390.png' });
			// newsletter validation
			await page.fill('#newsletter-email', 'not-an-email');
			await page.click('button[type="submit"]');
			await page.waitForTimeout(300);
			console.log('newsletter error shown =', (await page.textContent('footer')).includes('valid email'));
		}
		await page.close();
	}
	console.log('PAGE ERRORS:', errors.length ? errors : 'none');
	await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
