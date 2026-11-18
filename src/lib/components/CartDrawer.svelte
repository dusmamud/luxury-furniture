<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import CutoutPicture from '#lib/components/CutoutPicture.svelte';
	import { formatPrice, getProduct } from '#lib/data/products';
	import { shop, lineUnitPrice } from '#lib/data/store.svelte';
	import { goto } from '$app/navigation';

	function closeOnBackdrop(e: MouseEvent) {
		if (e.target === e.currentTarget) shop.closeCart();
	}

	function checkout() {
		shop.closeCart();
		goto('/checkout');
	}
</script>

{#if shop.drawerOpen}
	<div class="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-[2px]" onclick={closeOnBackdrop} role="presentation" aria-hidden="true"></div>
	<div
		class="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-white shadow-2xl"
		role="dialog"
		aria-label="Shopping bag"
	>
		<div class="flex items-center justify-between border-b border-orange-100 px-5 py-4">
			<h2 class="font-display text-lg font-bold text-ink">Your bag ({shop.cartCount})</h2>
			<button type="button" class="grid size-10 place-items-center rounded-full text-ink transition hover:bg-peach" aria-label="Close bag" onclick={() => shop.closeCart()}>
				<Icon name="close" class="size-5" />
			</button>
		</div>

		{#if shop.cart.length === 0}
			<div class="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
				<span class="grid size-16 place-items-center rounded-full bg-peach text-flame-deep"><Icon name="bag" class="size-8" /></span>
				<p class="font-display text-lg font-semibold text-ink">Your bag is empty</p>
				<p class="text-sm text-muted">Beautiful pieces are waiting — start with our bestsellers.</p>
				<a href="/shop" class="mt-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep" onclick={() => shop.closeCart()}>Shop furniture</a>
			</div>
		{:else}
			<ul class="flex-1 space-y-4 overflow-y-auto px-5 py-4">
				{#each shop.cart as item (item.id + (item.variant ?? ''))}
					{@const p = getProduct(item.id)}
					{#if p}
						<li class="flex gap-3">
							<a href="/product/{p.slug}" class="grid size-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-cream" onclick={() => shop.closeCart()}>
								<CutoutPicture stem={p.cutout} alt={p.alt} cls="max-h-20 w-auto object-contain" sizes="80px" />
							</a>
							<div class="min-w-0 flex-1">
								<div class="flex items-start justify-between gap-2">
									<a href="/product/{p.slug}" class="text-sm leading-snug font-semibold text-ink hover:text-flame-deep" onclick={() => shop.closeCart()}>{p.name}</a>
									<button type="button" class="text-muted transition hover:text-flame-deep" aria-label="Remove {p.name}" onclick={() => shop.removeFromCart(item.id, item.variant)}>
										<Icon name="trash" class="size-4" />
									</button>
								</div>
								<p class="mt-0.5 text-xs text-muted">{item.variant ?? p.option.choices[0]}</p>
								<div class="mt-2 flex items-center justify-between">
									<div class="flex items-center rounded-full border border-orange-200">
										<button type="button" class="grid size-8 place-items-center text-ink" aria-label="Decrease quantity" onclick={() => shop.updateQty(item.id, item.qty - 1, item.variant)}><Icon name="minus" class="size-4" /></button>
										<span class="w-6 text-center text-sm font-bold">{item.qty}</span>
										<button type="button" class="grid size-8 place-items-center text-ink" aria-label="Increase quantity" onclick={() => shop.updateQty(item.id, item.qty + 1, item.variant)}><Icon name="plus" class="size-4" /></button>
									</div>
									<span class="text-sm font-bold text-ink">{formatPrice(lineUnitPrice(item) * item.qty)}</span>
								</div>
							</div>
						</li>
					{/if}
				{/each}
			</ul>
			<div class="border-t border-orange-100 px-5 py-4">
				{#if shop.cartDiscount > 0}
					<p class="flex justify-between text-sm text-muted"><span>Discount ({shop.promoCode})</span><span class="font-semibold text-flame-deep">−{formatPrice(shop.cartDiscount)}</span></p>
				{/if}
				<p class="flex justify-between text-sm text-muted"><span>Shipping</span><span class="font-semibold text-ink">{shop.cartShipping === 0 ? 'Free' : formatPrice(shop.cartShipping)}</span></p>
				<p class="mt-1 flex justify-between text-base font-bold text-ink"><span>Subtotal</span><span>{formatPrice(shop.cartTotal)}</span></p>
				<p class="mt-1 text-xs text-muted">Free shipping over $499 · 30-day returns · 10-year frame warranty on sofas.</p>
				<button type="button" class="mt-4 w-full rounded-full bg-flame-dark px-6 py-3.5 text-sm font-bold text-white transition hover:bg-flame-deep" onclick={checkout}>Checkout</button>
				<a href="/cart" class="mt-2 block text-center text-sm font-semibold text-flame-deep hover:underline" onclick={() => shop.closeCart()}>View full bag</a>
			</div>
		{/if}
	</div>
{/if}
