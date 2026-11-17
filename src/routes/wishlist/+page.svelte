<script lang="ts">
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { getProduct } from '#lib/data/products';
	import { shop } from '#lib/data/store.svelte';

	let wished = $derived(
		[...shop.wishlist].map((id) => getProduct(id)).filter((p): p is NonNullable<typeof p> => Boolean(p))
	);

	function addAll() {
		for (const p of wished) shop.addToCart(p.id, 1, { silent: true });
		shop.showToast('All wishlist items added to bag');
		shop.openCart();
	}
</script>

<svelte:head>
	<title>Your Wishlist — Furniture</title>
	<meta
		name="description"
		content="The furniture pieces you saved for later. Add them all to your bag in one tap."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
	<div use:reveal class="reveal flex flex-wrap items-end justify-between gap-4">
		<div>
			<p class="text-xs font-bold tracking-[0.2em] text-flame uppercase">Furniture</p>
			<h1 class="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">Your wishlist</h1>
			<p class="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
				{#if wished.length > 0}
					{wished.length}
					{wished.length === 1 ? 'piece' : 'pieces'} saved for later.
				{:else}
					Pieces you love, kept safe until you are ready.
				{/if}
			</p>
		</div>
		{#if wished.length > 0}
			<button
				type="button"
				class="inline-flex min-h-11 items-center gap-2 rounded-full bg-flame px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-dark"
				onclick={addAll}
			>
				<Icon name="bag" class="size-4" /> Add all to bag
			</button>
		{/if}
	</div>

	{#if wished.length === 0}
		<div use:reveal class="reveal mt-10 rounded-3xl border border-orange-100 bg-white px-6 py-14 text-center">
			<span class="mx-auto grid size-16 place-items-center rounded-full bg-peach text-flame">
				<Icon name="heart" class="size-7" />
			</span>
			<h2 class="mt-5 font-display text-2xl font-semibold text-ink">Nothing saved yet</h2>
			<p class="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
				Tap the heart on any piece to keep it here — perfect for pieces you are still deciding on.
			</p>
			<a
				href="/shop"
				class="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-dark"
			>
				Browse the collection <Icon name="arrow-right" class="size-4" />
			</a>
		</div>
	{:else}
		<div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each wished as product, i (product.id)}
				<ProductCard {product} delay={i * 80} />
			{/each}
		</div>
	{/if}
</div>
