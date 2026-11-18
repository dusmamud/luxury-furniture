<script lang="ts">
	import '../app.css';
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import CartDrawer from '#lib/components/CartDrawer.svelte';
	import Toast from '#lib/components/Toast.svelte';

	let { children }: LayoutProps = $props();

	const siteUrl = 'https://luxury-furniture.pages.dev';
	const canonical = $derived(`${siteUrl}${page.url.pathname}`);

	// App-only pages are functional, not content: keep them out of search results
	// (and out of sitemap.xml) with a robots noindex.
	const appRoutes = ['/cart', '/checkout', '/login', '/signup', '/account', '/orders', '/track-order', '/wishlist'];
	const noindex = $derived(appRoutes.includes(page.url.pathname));

	// Open Graph / Twitter Card: derived from the page's own loaded data so
	// every share shows that page's title, description and image instead of
	// the generic home card. Pages without data fall back to the home card.
	type PageMetaData = {
		product?: { name: string; blurb: string; photo: string };
		category?: { name: string; blurb: string };
		items?: { photo: string }[];
		room?: { name: string; blurb: string; photo: string };
		article?: { title: string; excerpt: string; cover: string };
	};
	const og = $derived.by(() => {
		const d = page.data as PageMetaData;
		if (d.product)
			return {
				type: 'product',
				title: `${d.product.name} — Furniture`,
				description: d.product.blurb,
				image: `${siteUrl}${d.product.photo}`
			};
		if (d.category)
			return {
				type: 'website',
				title: `${d.category.name} — Furniture`,
				description: d.category.blurb,
				image: d.items?.[0]?.photo ? `${siteUrl}${d.items[0].photo}` : `${siteUrl}/images/hero-sofa.webp`
			};
		if (d.room)
			return {
				type: 'website',
				title: `${d.room.name} — Furniture`,
				description: d.room.blurb,
				image: `${siteUrl}${d.room.photo}`
			};
		if (d.article)
			return {
				type: 'article',
				title: `${d.article.title} — Furniture Journal`,
				description: d.article.excerpt,
				image: `${siteUrl}${d.article.cover}`
			};
		return {
			type: 'website',
			title: 'Furniture — Make You Feel Luxury',
			description:
				'Handcrafted sofas, outdoor lounge chairs, modern couches and lighting. 1.3M+ happy customers, 3-day delivery.',
			image: `${siteUrl}/images/hero-sofa.webp`
		};
	});

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
		aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '13200' },
		image: `${siteUrl}/images/hero-sofa.webp`,
		// Site-wide policies (Google accepts one Organization-level block since
		// 2024/2025 instead of repeating shipping/returns on every product).
		// Values are the real ones from /returns-policy and /delivery:
		// 30 days, free home collection, full refund within 5 business days.
		hasMerchantReturnPolicy: {
			'@type': 'MerchantReturnPolicy',
			applicableCountry: 'US',
			returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
			merchantReturnDays: 30,
			returnFees: 'https://schema.org/FreeReturn',
			merchantReturnLink: `${siteUrl}/returns-policy`
		},
		hasShippingService: [
			{
				'@type': 'ShippingService',
				name: 'Standard delivery',
				shippingConditions: [
					{
						'@type': 'ShippingConditions',
						shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
						orderValue: { '@type': 'MonetaryAmount', minValue: 0, maxValue: 499, currency: 'USD' },
						shippingRate: { '@type': 'MonetaryAmount', value: '49', currency: 'USD' },
						transitTime: {
							'@type': 'ServicePeriod',
							duration: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 5, unitCode: 'DAY' }
						}
					},
					{
						'@type': 'ShippingConditions',
						shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
						orderValue: { '@type': 'MonetaryAmount', minValue: 499, currency: 'USD' },
						shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'USD' },
						transitTime: {
							'@type': 'ServicePeriod',
							duration: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 5, unitCode: 'DAY' }
						}
					}
				]
			},
			{
				'@type': 'ShippingService',
				name: 'White-glove delivery',
				shippingConditions: [
					{
						'@type': 'ShippingConditions',
						shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
						shippingRate: { '@type': 'MonetaryAmount', value: '99', currency: 'USD' },
						transitTime: {
							'@type': 'ServicePeriod',
							duration: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 7, unitCode: 'DAY' }
						}
					}
				]
			}
		]
	};
</script>

<svelte:head>
	<title>Furniture — Make You Feel Luxury | Sofas, Chairs &amp; Lighting</title>
	<!-- No meta description here on purpose: every page defines its own, and
	     a second generic description would shadow it in search results. -->
	{#if noindex}<meta name="robots" content="noindex" />{/if}
	<link rel="canonical" href={canonical} />
	<!-- Self-hosted fonts: preload the two above-the-fold weights so the
	     first paint never waits on a font stylesheet. -->
	<link rel="preload" href="/fonts/poppins-600.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" href="/fonts/inter-400.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
	<meta property="og:type" content={og.type} />
	<meta property="og:title" content={og.title} />
	<meta property="og:description" content={og.description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={og.image} />
	<meta property="og:site_name" content="Furniture" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={og.title} />
	<meta name="twitter:description" content={og.description} />
	<meta name="twitter:image" content={og.image} />
	{@html `<script type="application/ld+json">${JSON.stringify(storeJsonLd)}</script>`}
</svelte:head>

<Header />
<main>{@render children()}</main>
<Footer />
<CartDrawer />
<Toast />
