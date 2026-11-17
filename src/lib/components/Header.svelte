<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { categories, rooms } from '#lib/data/products';
	import { shop } from '#lib/data/store.svelte';

	let open = $state(false);
</script>

<header class="sticky top-0 z-50 border-b border-orange-100/70 bg-[#fff7f0]/90 backdrop-blur">
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
		<a href="/" class="flex min-w-0 items-center gap-2" aria-label="Furniture — home">
			<span class="grid size-10 shrink-0 place-items-center rounded-xl bg-flame text-white">
				<Icon name="sofa" class="size-6" />
			</span>
			<span class="leading-none">
				<span class="block font-display text-[22px] font-bold tracking-tight text-ink">Furniture</span>
				<span class="block text-[10px] font-semibold tracking-[0.28em] text-flame uppercase">Make you feel luxury</span>
			</span>
		</a>

		<nav class="hidden items-center gap-7 lg:flex" aria-label="Main">
			<a href="/shop" class="text-sm font-semibold text-cocoa transition hover:text-flame">Shop</a>
			<div class="group relative">
				<button type="button" class="flex items-center gap-1 py-2 text-sm font-semibold text-cocoa transition hover:text-flame" aria-haspopup="true">
					Categories <Icon name="chevron-down" class="size-4 transition group-hover:rotate-180" />
				</button>
				<div class="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
					<div class="overflow-hidden rounded-2xl border border-orange-100 bg-white p-2 shadow-xl shadow-orange-900/10">
						<a href="/categories" class="block rounded-xl px-3 py-2 text-sm font-bold text-ink hover:bg-peach">All categories</a>
						{#each categories as c}
							<a href="/categories/{c.slug}" class="block rounded-xl px-3 py-2 text-sm font-medium text-cocoa hover:bg-peach hover:text-flame">{c.name}</a>
						{/each}
					</div>
				</div>
			</div>
			<div class="group relative">
				<button type="button" class="flex items-center gap-1 py-2 text-sm font-semibold text-cocoa transition hover:text-flame" aria-haspopup="true">
					Rooms <Icon name="chevron-down" class="size-4 transition group-hover:rotate-180" />
				</button>
				<div class="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
					<div class="overflow-hidden rounded-2xl border border-orange-100 bg-white p-2 shadow-xl shadow-orange-900/10">
						<a href="/rooms" class="block rounded-xl px-3 py-2 text-sm font-bold text-ink hover:bg-peach">Shop by room</a>
						{#each rooms as r}
							<a href="/rooms/{r.slug}" class="block rounded-xl px-3 py-2 text-sm font-medium text-cocoa hover:bg-peach hover:text-flame">{r.name}</a>
						{/each}
					</div>
				</div>
			</div>
			<a href="/deals" class="text-sm font-semibold text-cocoa transition hover:text-flame">Deals</a>
			<a href="/blog" class="text-sm font-semibold text-cocoa transition hover:text-flame">Journal</a>
			<a href="/about" class="text-sm font-semibold text-cocoa transition hover:text-flame">About</a>
		</nav>

		<div class="flex items-center gap-1">
			<a
				href="/shop"
				class="grid size-11 place-items-center rounded-full text-ink transition hover:bg-peach"
				aria-label="Search products"
			>
				<Icon name="search" class="size-5" />
			</a>
			<a
				href="/wishlist"
				class="relative grid size-11 place-items-center rounded-full text-ink transition hover:bg-peach"
				aria-label="Wishlist"
			>
				<Icon name="heart" class="size-5" />
				{#if shop.wishlistCount > 0}
					<span class="absolute top-0.5 right-0.5 grid size-5 place-items-center rounded-full bg-flame text-[10px] font-bold text-white">{shop.wishlistCount}</span>
				{/if}
			</a>
			<a
				href="/account"
				class="hidden size-11 place-items-center rounded-full text-ink transition hover:bg-peach sm:grid"
				aria-label="Account"
			>
				<Icon name="user" class="size-5" />
			</a>
			<button
				type="button"
				class="relative grid size-11 place-items-center rounded-full text-ink transition hover:bg-peach"
				aria-label="Open shopping bag"
				onclick={() => shop.openCart()}
			>
				<Icon name="bag" class="size-5" />
				{#if shop.cartCount > 0}
					<span class="absolute top-0.5 right-0.5 grid size-5 place-items-center rounded-full bg-flame text-[10px] font-bold text-white">{shop.cartCount}</span>
				{/if}
			</button>
			<button
				type="button"
				class="grid size-11 place-items-center rounded-full text-ink transition hover:bg-peach lg:hidden"
				aria-label={open ? 'Close menu' : 'Open menu'}
				aria-expanded={open}
				onclick={() => (open = !open)}
			>
				<Icon name={open ? 'close' : 'menu'} class="size-6" />
			</button>
		</div>
	</div>

	{#if open}
		<nav class="max-h-[70vh] overflow-y-auto border-t border-orange-100 bg-[#fff7f0] px-4 py-3 lg:hidden" aria-label="Mobile">
			<a href="/shop" class="block rounded-xl px-3 py-3 text-base font-semibold text-cocoa hover:bg-peach hover:text-flame" onclick={() => (open = false)}>Shop all</a>
			<p class="px-3 pt-3 pb-1 text-xs font-bold tracking-widest text-muted uppercase">Categories</p>
			{#each categories as c}
				<a href="/categories/{c.slug}" class="block rounded-xl px-3 py-2.5 text-base font-medium text-cocoa hover:bg-peach hover:text-flame" onclick={() => (open = false)}>{c.name}</a>
			{/each}
			<p class="px-3 pt-3 pb-1 text-xs font-bold tracking-widest text-muted uppercase">Rooms</p>
			{#each rooms as r}
				<a href="/rooms/{r.slug}" class="block rounded-xl px-3 py-2.5 text-base font-medium text-cocoa hover:bg-peach hover:text-flame" onclick={() => (open = false)}>{r.name}</a>
			{/each}
			<div class="mt-2 border-t border-orange-100 pt-2">
				<a href="/deals" class="block rounded-xl px-3 py-3 text-base font-semibold text-cocoa hover:bg-peach hover:text-flame" onclick={() => (open = false)}>Deals</a>
				<a href="/blog" class="block rounded-xl px-3 py-3 text-base font-semibold text-cocoa hover:bg-peach hover:text-flame" onclick={() => (open = false)}>Journal</a>
				<a href="/about" class="block rounded-xl px-3 py-3 text-base font-semibold text-cocoa hover:bg-peach hover:text-flame" onclick={() => (open = false)}>About us</a>
				<a href="/contact" class="block rounded-xl px-3 py-3 text-base font-semibold text-cocoa hover:bg-peach hover:text-flame" onclick={() => (open = false)}>Contact</a>
				<a href="/account" class="block rounded-xl px-3 py-3 text-base font-semibold text-cocoa hover:bg-peach hover:text-flame" onclick={() => (open = false)}>My account</a>
			</div>
		</nav>
	{/if}
</header>
