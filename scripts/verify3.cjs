const { chromium } = require('playwright');
const fs = require('fs');
fs.mkdirSync('shots/v3', { recursive: true });

(async () => {
	const browser = await chromium.launch();
	const errors = [];
	const results = [];
	for (const w of [360, 390, 768, 1440]) {
		const page = await browser.newPage({ viewport: { width: w, height: 844 } });
		page.on('pageerror', (e) => errors.push(`${w}: ${e.message}`));
		await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
		await page.waitForTimeout(1400); // hero entrance animations
		const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
		// hero viewport shot
		await page.screenshot({ path: `shots/v3/hero-${w}.png` });
		// scroll through sections (triggers reveals + count-up), shot each
		await page.locator('#collections').scrollIntoViewIfNeeded();
		await page.waitForTimeout(1200);
		await page.screenshot({ path: `shots/v3/collections-${w}.png` });
		const overflow2 = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
		await page.locator('#about').scrollIntoViewIfNeeded();
		await page.waitForTimeout(1200);
		await page.screenshot({ path: `shots/v3/about-${w}.png` });
		const overflow3 = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
		results.push(`${w}: overflow hero=${overflow} coll=${overflow2} about=${overflow3}`);
		if (w === 390) {
			// cutout images actually loaded?
			const imgs = await page.evaluate(() =>
				[...document.querySelectorAll('#collections img, #home img')].map((i) => ({
					src: (i.currentSrc || '').split('/').pop(),
					nw: i.naturalWidth
				}))
			);
			console.log('cutout imgs:', JSON.stringify(imgs));
			// count-up finished?
			const stat = await page.evaluate(() => {
				const el = document.querySelector('[data-target="1.3"]');
				return el ? el.textContent : 'missing';
			});
			console.log('stat 1.3 after scroll =', JSON.stringify(stat));
			// search filter
			await page.locator('#site-search').fill('chair');
			await page.waitForTimeout(400);
			console.log('search "chair" articles =', await page.locator('#collections article').count());
			await page.locator('#site-search').fill('');
			// mobile menu
			await page.locator('header button[aria-label*="menu" i], header button[aria-expanded]').first().click().catch(() => {});
			await page.waitForTimeout(400);
			const menuVisible = await page.evaluate(() => {
				const links = [...document.querySelectorAll('header a')].map((a) => a.textContent.trim());
				return links.filter((t) => t === 'Collections').length;
			});
			console.log('mobile menu Collections links =', menuVisible);
		}
		await page.close();
	}
	console.log(results.join('\n'));
	console.log('page errors:', errors.length ? errors : 'none');
	await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
