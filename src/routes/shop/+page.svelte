<script lang="ts">
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Icon from '#lib/components/Icon.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { categories, products, rooms } from '#lib/data/products';

	type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating';

	const sorts: { key: SortKey; label: string }[] = [
		{ key: 'featured', label: 'Featured' },
		{ key: 'price-asc', label: 'Price: low to high' },
		{ key: 'price-desc', label: 'Price: high to low' },
		{ key: 'rating', label: 'Top rated' }
	];

	// searchParams is unavailable during prerender — read it only in the browser.
	let q = $derived(browser ? (page.url.searchParams.get('q') ?? '') : '');
	let category = $derived(browser ? (page.url.searchParams.get('category') ?? '') : '');
	let room = $derived(browser ? (page.url.searchParams.get('room') ?? '') : '');
	let sort = $derived(browser ? ((page.url.searchParams.get('sort') as SortKey | null) ?? 'featured') : 'featured');

	let searchInput = $state('');

	// Keep the search box in sync with ?q= when arriving from the home page search.
	$effect(() => {
		searchInput = q;
	});

	function linkWith(patch: Record<string, string | undefined>): string {
		const params = new URLSearchParams(browser ? page.url.searchParams.toString() : '');
		for (const [key, value] of Object.entries(patch)) {
			if (value) params.set(key, value);
			else params.delete(key);
		}
		const qs = params.toString();
		return qs ? `/shop?${qs}` : '/shop';
	}

	function submitSearch(e: SubmitEvent) {
		e.preventDefault();
		goto(linkWith({ q: searchInput.trim() || undefined }), { replaceState: true });
	}

	function changeSort(e: Event) {
		const value = (e.currentTarget as HTMLSelectElement).value;
		goto(linkWith({ sort: value === 'featured' ? undefined : value }), { replaceState: true });
	}

	let filtered = $derived.by(() => {
		const needle = q.trim().toLowerCase();
		let list = products.filter((p) => {
			if (category && p.category !== category) return false;
			if (room && p.room !== room) return false;
			if (needle && !`${p.name} ${p.blurb}`.toLowerCase().includes(needle)) return false;
			return true;
		});
		if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
		else if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
		else if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
		return list;
	});

	let activeCategory = $derived(categories.find((c) => c.slug === category));
	let activeRoom = $derived(rooms.find((r) => r.slug === room));
</script>

<svelte:head>
	<title>Shop all furniture — Furniture | Sofas, Chairs, Tables &amp; Lighting</title>
	<meta
		name="description"
		content="Shop all furniture: sofas, chairs, tables, lighting, storage, bedroom and outdoor pieces. Free shipping over $499, 3-day delivery, 10-year warranty."
	/>
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 lg:px-8">
		<div class="reveal max-w-2xl" use:reveal>
			<p class="hero-anim text-sm font-bold tracking-[0.2em] text-flame uppercase">Shop</p>
			<h1 class="mt-3 font-display text-4xl leading-[1.08] font-semibold text-ink sm:text-5xl">
				Shop all furniture
			</h1>
			<p class="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
				{#if activeCategory}
					{activeCategory.blurb}
				{:else if activeRoom}
					{activeRoom.blurb}
				{:else}
					Every piece in the collection — sofas, chairs, tables, lighting and more, made to be lived in.
				{/if}
			</p>
		</div>

		<!-- Search -->
		<form class="reveal mt-8 max-w-xl" use:reveal style="--rd: 80ms" onsubmit={submitSearch} role="search">
			<label class="sr-only" for="shop-search">Search furniture</label>
			<div class="relative">
				<Icon name="search" class="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" />
				<input
					id="shop-search"
					type="search"
					bind:value={searchInput}
					placeholder="Search sofas, chairs, lamps…"
					class="min-h-12 w-full rounded-full border border-orange-200 bg-white py-3 pr-28 pl-12 text-sm text-ink shadow-sm placeholder:text-muted focus:border-flame focus:outline-none"
				/>
				<button
					type="submit"
					class="absolute top-1/2 right-1.5 min-h-9 -translate-y-1/2 rounded-full bg-flame px-5 text-sm font-bold text-white transition hover:bg-flame-dark"
				>
					Search
				</button>
			</div>
		</form>

		<!-- Category chips -->
		<div class="reveal mt-8" use:reveal style="--rd: 120ms">
			<p class="text-xs font-bold tracking-[0.15em] text-muted uppercase">Category</p>
			<div class="mt-3 flex flex-wrap gap-2">
				<a
					href={linkWith({ category: undefined })}
					aria-current={category === '' ? 'true' : undefined}
					class="inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-semibold transition {category === ''
						? 'border-flame bg-flame text-white'
						: 'border-orange-200 bg-white text-ink hover:border-flame hover:text-flame'}"
				>
					All
				</a>
				{#each categories as c (c.slug)}
					<a
						href={linkWith({ category: c.slug })}
						aria-current={category === c.slug ? 'true' : undefined}
						class="inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-semibold transition {category === c.slug
							? 'border-flame bg-flame text-white'
							: 'border-orange-200 bg-white text-ink hover:border-flame hover:text-flame'}"
					>
						{c.name}
					</a>
				{/each}
			</div>
		</div>

		<!-- Room chips -->
		<div class="reveal mt-5" use:reveal style="--rd: 160ms">
			<p class="text-xs font-bold tracking-[0.15em] text-muted uppercase">Room</p>
			<div class="mt-3 flex flex-wrap gap-2">
				<a
					href={linkWith({ room: undefined })}
					aria-current={room === '' ? 'true' : undefined}
					class="inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-semibold transition {room === ''
						? 'border-flame bg-flame text-white'
						: 'border-orange-200 bg-white text-ink hover:border-flame hover:text-flame'}"
				>
					All rooms
				</a>
				{#each rooms as r (r.slug)}
					<a
						href={linkWith({ room: r.slug })}
						aria-current={room === r.slug ? 'true' : undefined}
						class="inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-semibold transition {room === r.slug
							? 'border-flame bg-flame text-white'
							: 'border-orange-200 bg-white text-ink hover:border-flame hover:text-flame'}"
					>
						{r.name}
					</a>
				{/each}
			</div>
		</div>

		<!-- Count + sort -->
		<div class="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-orange-200/70 pt-6">
			<p class="text-sm font-semibold text-cocoa" aria-live="polite">
				{#if filtered.length === products.length && !q && !category && !room}
					Showing all {products.length} pieces
				{:else if filtered.length === 0}
					No pieces match your filters
				{:else}
					Showing {filtered.length} of {products.length} pieces
				{/if}
			</p>
			<label class="flex items-center gap-2 text-sm font-semibold text-cocoa">
				Sort by
				<span class="relative">
					<select
						value={sort}
						onchange={changeSort}
						class="min-h-11 appearance-none rounded-full border border-orange-200 bg-white py-2 pr-9 pl-4 text-sm font-semibold text-ink focus:border-flame focus:outline-none"
					>
						{#each sorts as s (s.key)}
							<option value={s.key}>{s.label}</option>
						{/each}
					</select>
					<Icon name="chevron-down" class="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" />
				</span>
			</label>
		</div>
	</div>
</section>

<section class="pb-16 lg:pb-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		{#if filtered.length > 0}
			<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each filtered as p, i (p.id)}
					<ProductCard product={p} delay={(i % 4) * 80} />
				{/each}
			</div>
		{:else}
			<div class="reveal mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-sm" use:reveal>
				<div class="mx-auto grid size-14 place-items-center rounded-full bg-peach text-flame">
					<Icon name="search" class="size-6" />
				</div>
				<h2 class="mt-4 font-display text-2xl font-semibold text-ink">Nothing found</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">
					{#if q}
						We could not find anything for “{q}”.
					{:else}
						No pieces match the filters you picked.
					{/if}
					Try a different search or clear the filters to see the full collection.
				</p>
				<a
					href="/shop"
					class="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-dark"
				>
					Clear filters
				</a>
			</div>
		{/if}
	</div>
</section>
