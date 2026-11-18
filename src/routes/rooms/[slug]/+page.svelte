<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { photoDims, photoSrcset } from '#lib/data/products';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let heroSrcset = $derived(photoSrcset(data.room.photo));
	let heroDims = $derived(photoDims(data.room.photo));
</script>

<svelte:head>
	<title>{data.room.name} furniture — Furniture</title>
	<meta
		name="description"
		content="{data.room.name} furniture at Furniture — {data.room.blurb} Free shipping over $499, 30-day returns."
	/>
	{#if heroSrcset}
		<link rel="preload" as="image" imagesrcset={heroSrcset} imagesizes="100vw" fetchpriority="high" />
	{/if}
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Shop', item: 'https://luxury-furniture.pages.dev/shop' },
			{ '@type': 'ListItem', position: 2, name: 'Rooms', item: 'https://luxury-furniture.pages.dev/rooms' },
			{ '@type': 'ListItem', position: 3, name: data.room.name, item: `https://luxury-furniture.pages.dev/rooms/${data.room.slug}` }
		]
	})}</script>`}
</svelte:head>

<!-- Room hero -->
<section class="relative overflow-hidden">
	<img
		src={data.room.photo}
		alt={data.room.name}
		class="absolute inset-0 h-full w-full object-cover"
		srcset={heroSrcset}
		sizes="100vw"
		width={heroDims?.width}
		height={heroDims?.height}
		loading="eager"
		fetchpriority="high"
		decoding="async"
	/>
	<div class="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/50 to-ink/10" aria-hidden="true"></div>
	<div class="relative mx-auto max-w-7xl px-4 pt-16 pb-16 sm:px-6 lg:px-8 lg:pt-24 lg:pb-24">
		<nav aria-label="Breadcrumb" class="reveal text-sm text-white/80" use:reveal>
			<a href="/shop" class="font-semibold hover:text-white">Shop</a>
			<span class="mx-2" aria-hidden="true">/</span>
			<a href="/rooms" class="font-semibold hover:text-white">Rooms</a>
			<span class="mx-2" aria-hidden="true">/</span>
			<span class="text-white" aria-current="page">{data.room.name}</span>
		</nav>
		<h1 class="hero-anim mt-4 max-w-xl font-display text-4xl leading-[1.08] font-semibold text-white sm:text-5xl lg:text-6xl" style="--d: 80ms">
			{data.room.name}
		</h1>
		<p class="hero-anim mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg" style="--d: 160ms">
			{data.room.blurb}
		</p>
		<p class="hero-anim mt-5 inline-flex min-h-11 items-center rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white backdrop-blur" style="--d: 240ms">
			{data.items.length} {data.items.length === 1 ? 'piece' : 'pieces'} for this room
		</p>
	</div>
</section>

<section class="bg-cream py-14 lg:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		{#if data.items.length > 0}
			<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each data.items as p, i (p.id)}
					<ProductCard product={p} delay={(i % 4) * 80} />
				{/each}
			</div>
		{:else}
			<div class="reveal mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-sm" use:reveal>
				<div class="mx-auto grid size-14 place-items-center rounded-full bg-peach text-flame-deep">
					<Icon name="sofa" class="size-6" />
				</div>
				<h2 class="mt-4 font-display text-2xl font-semibold text-ink">Nothing here yet</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">
					We have no pieces for the {data.room.name} right now. Browse the full collection instead.
				</p>
				<a
					href="/shop"
					class="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
				>
					Shop all furniture
				</a>
			</div>
		{/if}
		<div class="reveal mt-12 text-center" use:reveal>
			<a
				href="/rooms"
				class="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-flame px-6 py-3 text-sm font-bold text-flame-deep transition hover:bg-flame-dark hover:text-white"
			>
				Browse all rooms <Icon name="arrow-right" class="size-4" />
			</a>
		</div>
	</div>
</section>
