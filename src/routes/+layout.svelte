<script lang="ts">
	import '../app.css';
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';

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
