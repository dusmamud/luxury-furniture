const { chromium } = require('playwright');
const fs = require('fs');
fs.mkdirSync('shots/v4', { recursive: true });
const BASE = 'http://127.0.0.1:4176';
const ROUTES = [
	'/', '/shop', '/shop?category=sofas', '/shop?q=chair',
	'/product/modern-couches', '/product/dining-table', '/product/bamboo-swing-chair',
	'/categories', '/categories/sofas', '/rooms', '/rooms/living-room', '/deals',
	'/cart', '/checkout', '/wishlist', '/login', '/signup', '/account', '/orders', '/track-order',
	'/about', '/contact', '/faq', '/help', '/showrooms', '/trade', '/financing', '/delivery',
	'/blog', '/blog/how-to-choose-sofa-size', '/privacy-policy', '/terms', '/shipping-policy',
	'/returns-policy', '/warranty', '/sitemap'
];
(async () => {
	const browser = await chromium.launch({ channel: 'chromium', args: ['--no-sandbox'] });
	const errors = [];
	const bad = [];
	// 1) every route: status 200, no page errors, no h-overflow at 390 and 1440
	for (const w of [390, 1440]) {
		const page = await browser.newPage({ viewport: { width: w, height: 844 } });
		page.on('pageerror', (e) => errors.push(`${w} ${e.message.slice(0, 120)}`));
		for (const r of ROUTES) {
			const res = await page.goto(BASE + r, { waitUntil: 'domcontentloaded' });
			await page.waitForTimeout(500);
			const status = res ? res.status() : -1;
			const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
			const h1 = await page.evaluate(() => (document.querySelector('h1') || {}).textContent || 'NO H1');
			if (status !== 200) bad.push(`${w} ${r} status=${status}`);
			if (overflow > 0) bad.push(`${w} ${r} overflow=${overflow}`);
			if (w === 390 && r === '/') {
				await page.screenshot({ path: 'shots/v4/home-390.png', fullPage: false });
				await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45));
				await page.waitForTimeout(1000);
				await page.screenshot({ path: 'shots/v4/home-390-mid.png' });
			}
			if (w === 1440 && r === '/product/modern-couches') await page.screenshot({ path: 'shots/v4/product-1440.png' });
			if (w === 390 && r === '/shop') await page.screenshot({ path: 'shots/v4/shop-390.png' });
		}
		await page.close();
	}
	console.log('ROUTE CHECKS done. bad:', JSON.stringify(bad, null, 1));
	console.log('PAGE ERRORS:', JSON.stringify(errors, null, 1));

	// 2) interactions on desktop viewport
	const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
	page.on('pageerror', (e) => errors.push('interact: ' + e.message.slice(0, 120)));
	await page.goto(BASE + '/product/modern-couches', { waitUntil: 'domcontentloaded' });
	await page.waitForTimeout(800);
	// finish selector changes price?
	const priceBefore = await page.locator('text=$1,299').first().textContent().catch(() => 'n/a');
	await page.getByRole('button', { name: /Forest Green/i }).click().catch(() => {});
	await page.waitForTimeout(300);
	const priceAfter = await page.evaluate(() => document.body.innerText.match(/\$1,37[0-9]/)?.[0] || 'no-change');
	console.log('finish price change:', priceBefore, '->', priceAfter);
	// add to bag opens drawer
	await page.getByRole('button', { name: /Add to bag/i }).first().click();
	await page.waitForTimeout(800);
	const drawer = await page.locator('text=Your bag').count();
	const badge = await page.evaluate(() => document.body.innerText.includes('Your bag (1)'));
	console.log('drawer open:', drawer > 0, 'badge count 1:', badge);
	await page.screenshot({ path: 'shots/v4/drawer.png' });
	// go to cart page, apply promo
	await page.goto(BASE + '/cart', { waitUntil: 'domcontentloaded' });
	await page.waitForTimeout(600);
	await page.getByPlaceholder(/promo|code/i).fill('WELCOME10').catch(() => console.log('no promo input'));
	await page.getByRole('button', { name: /apply/i }).click().catch(() => console.log('no apply btn'));
	await page.waitForTimeout(500);
	const discount = await page.evaluate(() => document.body.innerText.match(/Discount[^$\n]*\$[0-9,.]+/)?.[0] || 'no-discount-line');
	console.log('promo result:', discount);
	// checkout flow
	await page.goto(BASE + '/checkout', { waitUntil: 'domcontentloaded' });
	await page.waitForTimeout(600);
	const fill = async (label, value) => {
		const el = page.getByLabel(label, { exact: false });
		if (await el.count()) await el.first().fill(value);
	};
	await fill(/full name/i, 'Test User');
	await fill(/email/i, 'test@example.com');
	await fill(/phone/i, '9855550148');
	await fill(/address/i, '123 Test St');
	await fill(/city/i, 'Covington');
	await fill(/state/i, 'LA');
	await fill(/zip/i, '70433');
	await page.getByRole('button', { name: /place order/i }).click().catch(() => console.log('no place-order btn'));
	await page.waitForTimeout(1200);
	const url = page.url();
	console.log('after place order url:', url);
	const confirmed = await page.evaluate(() => /Thank you|Order confirmed|confirmed/i.test(document.body.innerText));
	console.log('confirmation shown:', confirmed);
	await page.screenshot({ path: 'shots/v4/confirmation.png' });
	// track-order with that id
	const oid = url.match(/id=([A-Z0-9]+)/)?.[1] || '';
	if (oid) {
		await page.goto(BASE + '/track-order?id=' + oid, { waitUntil: 'domcontentloaded' });
		await page.waitForTimeout(800);
		const tracked = await page.evaluate(() => /Placed|Processing|Shipped/i.test(document.body.innerText));
		console.log('track order shows steps:', tracked, 'id:', oid);
	}
	// shop filter: category chip sofas
	await page.goto(BASE + '/shop?category=sofas', { waitUntil: 'domcontentloaded' });
	await page.waitForTimeout(700);
	const count = await page.evaluate(() => document.body.innerText.match(/(\d+) (product|item)/i)?.[0] || 'no-count');
	console.log('shop sofas filter:', count);
	// FAQ accordion
	await page.goto(BASE + '/faq', { waitUntil: 'domcontentloaded' });
	await page.waitForTimeout(500);
	const firstQ = page.locator('button[aria-expanded]').first();
	await firstQ.click();
	await page.waitForTimeout(400);
	console.log('faq first expanded:', await firstQ.getAttribute('aria-expanded'));
	// mobile menu at 390
	const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
	await mob.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
	await mob.waitForTimeout(600);
	await mob.getByLabel(/open menu/i).click();
	await mob.waitForTimeout(400);
	const menuLinks = await mob.evaluate(() => [...document.querySelectorAll('nav a')].length);
	console.log('mobile menu links:', menuLinks);
	await mob.screenshot({ path: 'shots/v4/mobile-menu.png' });
	console.log('INTERACT ERRORS:', JSON.stringify(errors, null, 1));
	await browser.close();
})().catch((e) => {
	console.error('FATAL', e);
	process.exit(1);
});
