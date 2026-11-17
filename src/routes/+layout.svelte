<script lang="ts">
	import '../app.css';
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import CartDrawer from '#lib/components/CartDrawer.svelte';
	import Toast from '#lib/components/Toast.svelte';

	// TEMPORARY diagnostic (product pages flip to a 500 in the browser with no
	// message exposed): surface the real client error where it can be read —
	// page title, a fixed banner and localStorage. Remove once the cause is fixed.
	if (browser && !(window as unknown as Record<string, unknown>).__furnitureErrorTrap) {
		(window as unknown as Record<string, unknown>).__furnitureErrorTrap = true;
		const show = (label: string, text: string) => {
			const msg = `${label}: ${text}`.slice(0, 3000);
			try {
				localStorage.setItem('furniture_last_error', msg);
			} catch {}
			document.title = msg.slice(0, 150);
			let el = document.getElementById('js-error-trap');
			if (!el) {
				el = document.createElement('div');
				el.id = 'js-error-trap';
				el.style.cssText =
					'position:fixed;left:0;bottom:0;z-index:99999;max-height:45vh;overflow:auto;background:#fff;color:#000;font:12px/1.5 monospace;padding:10px;white-space:pre-wrap;word-break:break-word;border-top:2px solid red;';
				document.body.appendChild(el);
			}
			el.textContent = msg;
		};
		const fmt = (a: unknown) =>
			a instanceof Error ? `${a.name}: ${a.message}\n${a.stack ?? ''}` : String(a);
		const origError = console.error.bind(console);
		console.error = (...args: unknown[]) => {
			try {
				show('JSERR', args.map(fmt).join(' '));
			} catch {}
			origError(...args);
		};
		window.addEventListener('error', (e) => show('WINERR', fmt(e.error ?? e.message)));
		window.addEventListener('unhandledrejection', (e) => show('REJERR', fmt(e.reason)));
	}

	let { children }: LayoutProps = $props();

	const siteUrl = 'https://luxury-furniture.pages.dev';
	const canonical = $derived(`${siteUrl}${page.url.pathname}`);

	const storeJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'FurnitureStore',
		name: 'Furniture',
		slogan: 'Make you feel luxury',
		url: siteUrl,
		telephone: '+1-985-555-0148',
		email: 'hello@furniture.example',
		priceRange: '$$',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '800 Winward Drive, Suite A',
			addressLocality: 'Covington',
			addressRegion: 'LA',
			postalCode: '70433',
			addressCountry: 'US'
		},
		aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '13200' }
	};
</script>

<svelte:head>
	<title>Furniture — Make You Feel Luxury | Sofas, Chairs &amp; Lighting</title>
	<meta
		name="description"
		content="Handcrafted sofas, outdoor lounge chairs, modern couches and lighting. 1.3M+ happy customers, 4.7M+ members, 3-day delivery. Make you feel luxury."
	/>
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Furniture — Make You Feel Luxury" />
	<meta
		property="og:description"
		content="Handcrafted sofas, outdoor lounge chairs, modern couches and lighting. 1.3M+ happy customers, 3-day delivery."
	/>
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={`${siteUrl}/images/hero-sofa.webp`} />
	<meta name="twitter:card" content="summary_large_image" />
	{@html `<script type="application/ld+json">${JSON.stringify(storeJsonLd)}</script>`}
</svelte:head>

<Header />
<main>{@render children()}</main>
<Footer />
<CartDrawer />
<Toast />
