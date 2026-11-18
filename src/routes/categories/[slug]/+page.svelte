<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import CutoutPicture from '#lib/components/CutoutPicture.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { reveal } from '#lib/actions/reveal';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.category.name} — Furniture</title>
	<meta
		name="description"
		content="{data.category.name} at Furniture — {data.category.blurb} Free shipping over $499 and 30-day returns."
	/>
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Shop', item: 'https://luxury-furniture.pages.dev/shop' },
			{ '@type': 'ListItem', position: 2, name: 'Categories', item: 'https://luxury-furniture.pages.dev/categories' },
			{ '@type': 'ListItem', position: 3, name: data.category.name, item: `https://luxury-furniture.pages.dev/categories/${data.category.slug}` }
		]
	})}</script>`}
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 lg:px-8">
		<nav aria-label="Breadcrumb" class="reveal text-sm text-muted" use:reveal>
			<a href="/shop" class="font-semibold hover:text-flame-deep">Shop</a>
			<span class="mx-2" aria-hidden="true">/</span>
			<a href="/categories" class="font-semibold hover:text-flame-deep">Categories</a>
			<span class="mx-2" aria-hidden="true">/</span>
			<span class="text-ink" aria-current="page">{data.category.name}</span>
		</nav>

		<div class="mt-8 grid items-center gap-8 lg:grid-cols-[1fr_1.4fr]">
			<div class="reveal" use:reveal>
				<h1 class="font-display text-4xl leading-[1.08] font-semibold text-ink sm:text-5xl">
					{data.category.name}
				</h1>
				<p class="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{data.category.blurb}</p>
				<p class="mt-4 text-sm font-semibold text-cocoa">
					{data.items.length} {data.items.length === 1 ? 'piece' : 'pieces'} in this category
				</p>
				<a
					href="/shop?category={data.category.slug}"
					class="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-flame px-6 py-3 text-sm font-bold text-flame-deep transition hover:bg-flame-dark hover:text-white"
				>
					Shop all {data.category.name} <Icon name="arrow-right" class="size-4" />
				</a>
			</div>
			<div class="reveal relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-peach-2 via-peach to-sand px-6 pt-6 pb-2" use:reveal style="--rd: 80ms">
				<div class="cutout-zoom mx-auto aspect-square max-w-[320px]">
					<CutoutPicture stem={data.category.cutout} alt={data.category.name} eager={true} sizes="(max-width: 1024px) 90vw, 320px" />
				</div>
			</div>
		</div>
	</div>
</section>

<section class="pb-16 lg:pb-24">
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
					We have no pieces in {data.category.name} right now. Browse the full collection instead.
				</p>
				<a
					href="/shop"
					class="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
				>
					Shop all furniture
				</a>
			</div>
		{/if}
	</div>
</section>
