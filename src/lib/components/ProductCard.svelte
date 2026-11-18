<script lang="ts">
	import CutoutPicture from '#lib/components/CutoutPicture.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { formatPrice, monthlyPrice, type Product } from '#lib/data/products';
	import { shop } from '#lib/data/store.svelte';

	let { product, delay = 0 }: { product: Product; delay?: number } = $props();

	let wished = $derived(shop.isWished(product.id));
</script>

<article class="group reveal lift relative flex flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white" style="--rd: {delay}ms" use:reveal>
	<a href="/product/{product.slug}" class="relative block bg-cream px-6 pt-6 pb-2" aria-label={product.name}>
		{#if product.badge}
			<span class="absolute top-3 left-3 z-10 rounded-full bg-flame-dark px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase">{product.badge}</span>
		{/if}
		{#if product.compareAt}
			<span class="absolute top-3 right-3 z-10 rounded-full bg-ink px-3 py-1 text-[11px] font-bold text-white">Save {formatPrice(product.compareAt - product.price)}</span>
		{/if}
		<div class="cutout-zoom mx-auto aspect-square max-w-[260px]">
			<CutoutPicture stem={product.cutout} alt={product.alt} eager={false} />
		</div>
	</a>
	<button
		type="button"
		class="absolute top-3 right-3 z-10 grid size-10 place-items-center rounded-full bg-white shadow-md transition hover:scale-110 {wished ? 'text-flame-deep' : 'text-muted'} {product.compareAt ? 'top-14' : ''}"
		aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
		aria-pressed={wished}
		onclick={() => shop.toggleWishlist(product.id)}
	>
		<Icon name="heart" class="size-5" />
	</button>

	<div class="flex flex-1 flex-col px-5 pt-3 pb-5">
		<div class="flex items-center gap-1 text-xs font-semibold text-gold-deep">
			<Icon name="star" class="size-3.5 text-gold" />
			<span>{product.rating.toFixed(1)}</span>
			<span class="font-normal text-muted">({product.reviewCount})</span>
			<span class="ml-auto font-normal text-muted">{product.deliveryDays}</span>
		</div>
		<h3 class="mt-2 font-display text-lg leading-snug font-semibold text-ink">
			<a href="/product/{product.slug}" class="hover:text-flame-deep">{product.name}</a>
		</h3>
		<p class="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{product.blurb}</p>
		<div class="mt-auto pt-4">
			<div class="flex items-baseline gap-2">
				<span class="font-display text-xl font-bold text-ink">{formatPrice(product.price)}</span>
				{#if product.compareAt}<span class="text-sm text-muted line-through">{formatPrice(product.compareAt)}</span>{/if}
				<span class="ml-auto text-xs text-muted">or {monthlyPrice(product.price)}/mo</span>
			</div>
			<button
				type="button"
				class="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-flame-dark px-4 py-3 text-sm font-bold text-white transition hover:bg-flame-deep active:scale-[0.98]"
				onclick={() => shop.addToCart(product.id, 1, { openDrawer: true })}
			>
				<Icon name="bag" class="size-4" /> Add to bag
			</button>
		</div>
	</div>
</article>
