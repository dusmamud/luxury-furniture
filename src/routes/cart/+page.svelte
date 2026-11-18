<script lang="ts">
	import CutoutPicture from '#lib/components/CutoutPicture.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { formatPrice, getProduct } from '#lib/data/products';
	import { FREE_SHIPPING_OVER, lineUnitPrice, shop } from '#lib/data/store.svelte';

	let promoInput = $state('');
	let promoError = $state('');

	let goodsTotal = $derived(shop.cartSubtotal - shop.cartDiscount);
	let remaining = $derived(Math.max(0, FREE_SHIPPING_OVER - goodsTotal));
	let progress = $derived(Math.min(100, Math.round((goodsTotal / FREE_SHIPPING_OVER) * 100)));

	function applyPromo() {
		if (!promoInput.trim()) return;
		if (shop.applyPromo(promoInput)) {
			promoInput = '';
			promoError = '';
		} else {
			promoError = 'That promo code is not valid. Try WELCOME10 or FREESHIP.';
		}
	}
</script>

<svelte:head>
	<title>Your Bag — Furniture</title>
	<meta
		name="description"
		content="Review the furniture in your bag, apply a promo code and check out. Free standard shipping on orders over $499."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
	<div use:reveal class="reveal">
		<p class="text-xs font-bold tracking-[0.2em] text-flame-deep uppercase">Furniture</p>
		<h1 class="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">Your bag</h1>
		<p class="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
			{#if shop.cartCount > 0}
				{shop.cartCount}
				{shop.cartCount === 1 ? 'piece' : 'pieces'} ready for their new home.
			{:else}
				Nothing here yet — beautiful rooms start with a first piece.
			{/if}
		</p>
	</div>

	{#if shop.cart.length === 0}
		<div use:reveal class="reveal mt-10 rounded-3xl border border-orange-100 bg-white px-6 py-14 text-center">
			<span class="mx-auto grid size-16 place-items-center rounded-full bg-peach text-flame-deep">
				<Icon name="bag" class="size-7" />
			</span>
			<h2 class="mt-5 font-display text-2xl font-semibold text-ink">Your bag is empty</h2>
			<p class="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
				Browse sofas, chairs, lighting and more — every piece ships with a 10-year warranty and 30-day
				returns.
			</p>
			<a
				href="/shop"
				class="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
			>
				Browse the collection <Icon name="arrow-right" class="size-4" />
			</a>
		</div>
	{:else}
		<div class="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
			<!-- Line items -->
			<section aria-label="Items in your bag" class="space-y-4">
				<!-- Free shipping progress -->
				<div use:reveal class="reveal rounded-3xl border border-orange-100 bg-white p-5">
					{#if remaining > 0}
						<p class="flex items-center gap-2 text-sm font-semibold text-ink">
							<Icon name="truck" class="size-5 shrink-0 text-flame-deep" />
							Add {formatPrice(remaining)} more for free standard shipping
						</p>
					{:else}
						<p class="flex items-center gap-2 text-sm font-semibold text-ink">
							<Icon name="check" class="size-5 shrink-0 text-flame-deep" />
							You have unlocked free standard shipping
						</p>
					{/if}
					<div
						class="mt-3 h-2 overflow-hidden rounded-full bg-peach"
						role="progressbar"
						aria-valuenow={progress}
						aria-valuemin={0}
						aria-valuemax={100}
						aria-label="Progress toward free shipping"
					>
						<div class="h-full rounded-full bg-flame-dark transition-all duration-500" style="width: {progress}%"></div>
					</div>
					<p class="mt-2 text-xs text-muted">
						Free standard shipping on orders over {formatPrice(FREE_SHIPPING_OVER)}.
					</p>
				</div>

				{#each shop.cart as item (item.id + '|' + (item.variant ?? ''))}
					{@const product = getProduct(item.id)}
					{#if product}
						<article
							use:reveal
							class="reveal flex gap-4 rounded-3xl border border-orange-100 bg-white p-4 sm:gap-5 sm:p-5"
						>
							<a
								href="/product/{product.slug}"
								class="grid size-24 shrink-0 place-items-center rounded-2xl bg-cream sm:size-28"
								aria-label={product.name}
							>
								<CutoutPicture stem={product.cutout} alt={product.alt} cls="max-h-24 w-auto sm:max-h-28" />
							</a>
							<div class="min-w-0 flex-1">
								<div class="flex items-start justify-between gap-3">
									<div class="min-w-0">
										<h2 class="font-display text-base leading-snug font-semibold text-ink sm:text-lg">
											<a href="/product/{product.slug}" class="hover:text-flame-deep">{product.name}</a>
										</h2>
										{#if item.variant}
											<p class="mt-0.5 text-xs text-muted">{product.optionLabel}: {item.variant}</p>
										{/if}
										<p class="mt-1 text-sm font-semibold text-ink">{formatPrice(lineUnitPrice(item))} each</p>
									</div>
									<button
										type="button"
										class="grid size-10 shrink-0 place-items-center rounded-full text-muted transition hover:bg-peach hover:text-flame-deep"
										aria-label="Remove {product.name} from bag"
										onclick={() => shop.removeFromCart(item.id, item.variant)}
									>
										<Icon name="trash" class="size-5" />
									</button>
								</div>
								<div class="mt-3 flex items-center justify-between gap-3">
									<div class="flex items-center rounded-full border border-orange-200">
										<button
											type="button"
											class="grid size-11 place-items-center rounded-full text-ink transition hover:text-flame-deep disabled:opacity-40"
											aria-label="Decrease quantity of {product.name}"
											disabled={item.qty <= 1}
											onclick={() => shop.updateQty(item.id, item.qty - 1, item.variant)}
										>
											<Icon name="minus" class="size-4" />
										</button>
										<span
											class="w-8 text-center text-sm font-bold text-ink"
											aria-label="Quantity of {product.name}">{item.qty}</span
										>
										<button
											type="button"
											class="grid size-11 place-items-center rounded-full text-ink transition hover:text-flame-deep disabled:opacity-40"
											aria-label="Increase quantity of {product.name}"
											disabled={item.qty >= product.stock}
											onclick={() => shop.updateQty(item.id, item.qty + 1, item.variant)}
										>
											<Icon name="plus" class="size-4" />
										</button>
									</div>
									<p class="font-display text-lg font-bold text-ink">
										{formatPrice(lineUnitPrice(item) * item.qty)}
									</p>
								</div>
							</div>
						</article>
					{/if}
				{/each}

				<a
					href="/shop"
					class="inline-flex min-h-11 items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-3 text-sm font-bold text-ink transition hover:border-flame hover:text-flame-deep"
				>
					<Icon name="arrow-right" class="size-4 rotate-180" /> Continue shopping
				</a>
			</section>

			<!-- Order summary -->
			<aside use:reveal class="reveal rounded-3xl border border-orange-100 bg-white p-6 lg:sticky lg:top-24">
				<h2 class="font-display text-xl font-semibold text-ink">Order summary</h2>

				<!-- Promo code -->
				{#if shop.promoCode}
					<div class="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-peach px-4 py-3">
						<p class="flex items-center gap-2 text-sm font-bold text-ink">
							<Icon name="check" class="size-4 shrink-0 text-flame-deep" />
							{shop.promoCode} applied
						</p>
						<button
							type="button"
							class="flex min-h-11 items-center gap-1 rounded-full px-2 text-sm font-semibold text-flame-deep hover:underline"
							onclick={() => shop.clearPromo()}
						>
							Remove
						</button>
					</div>
				{:else}
					<form
						class="mt-5"
						onsubmit={(e) => {
							e.preventDefault();
							applyPromo();
						}}
					>
						<label for="promo" class="mb-1.5 block text-sm font-semibold text-ink">Promo code</label>
						<div class="flex gap-2">
							<input
								id="promo"
								type="text"
								bind:value={promoInput}
								placeholder="WELCOME10"
								autocomplete="off"
								aria-invalid={promoError ? 'true' : undefined}
								aria-describedby={promoError ? 'promo-error' : undefined}
								class="min-w-0 flex-1 rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-flame focus:outline-none"
							/>
							<button
								type="submit"
								class="shrink-0 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-cocoa"
							>
								Apply
							</button>
						</div>
						{#if promoError}
							<p id="promo-error" class="mt-1.5 text-sm font-medium text-flame-deep" role="alert">{promoError}</p>
						{:else}
							<p class="mt-1.5 text-xs text-muted">Try WELCOME10 for 10% off or FREESHIP for free shipping.</p>
						{/if}
					</form>
				{/if}

				<dl class="mt-6 space-y-3 text-sm">
					<div class="flex justify-between">
						<dt class="text-muted">Subtotal</dt>
						<dd class="font-semibold text-ink">{formatPrice(shop.cartSubtotal)}</dd>
					</div>
					{#if shop.cartDiscount > 0}
						<div class="flex justify-between">
							<dt class="text-muted">Discount ({shop.promoCode})</dt>
							<dd class="font-semibold text-flame-deep">−{formatPrice(shop.cartDiscount)}</dd>
						</div>
					{/if}
					<div class="flex justify-between">
						<dt class="text-muted">Shipping</dt>
						<dd class="font-semibold text-ink">
							{shop.cartShipping === 0 ? 'Free' : formatPrice(shop.cartShipping)}
						</dd>
					</div>
					<div class="flex justify-between border-t border-orange-100 pt-3 text-base">
						<dt class="font-display font-bold text-ink">Total</dt>
						<dd class="font-display font-bold text-ink">{formatPrice(shop.cartTotal)}</dd>
					</div>
				</dl>

				<a
					href="/checkout"
					class="mt-6 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
				>
					Checkout <Icon name="arrow-right" class="size-4" />
				</a>
				<p class="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
					<Icon name="shield" class="size-4 shrink-0" /> Secure demo checkout · 30-day returns
				</p>
			</aside>
		</div>
	{/if}
</div>
