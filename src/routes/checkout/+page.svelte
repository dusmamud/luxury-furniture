<script lang="ts">
	import { goto } from '$app/navigation';
	import CutoutPicture from '#lib/components/CutoutPicture.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { formatPrice, getProduct } from '#lib/data/products';
	import {
		FREE_SHIPPING_OVER,
		GIFT_WRAP_FEE,
		SHIPPING_FEE,
		WHITE_GLOVE_FEE,
		lineUnitPrice,
		shop,
		type Address
	} from '#lib/data/store.svelte';

	type Delivery = 'Standard' | 'White glove' | 'Store pickup';
	type Payment = 'Card' | 'Pay on delivery' | 'Financing';

	const saved = shop.defaultAddress;
	const me = shop.user;

	let name = $state(saved?.name ?? me?.name ?? '');
	let email = $state(saved?.email ?? me?.email ?? '');
	let phone = $state(saved?.phone ?? '');
	let address = $state(saved?.address ?? '');
	let city = $state(saved?.city ?? '');
	let region = $state(saved?.state ?? '');
	let zip = $state(saved?.zip ?? '');
	let delivery = $state<Delivery>('Standard');
	let payment = $state<Payment>('Card');
	let giftWrap = $state(false);
	let notes = $state('');
	let errors = $state<Record<string, string>>({});

	let deliveryFee = $derived(
		delivery === 'White glove' ? WHITE_GLOVE_FEE : delivery === 'Store pickup' ? 0 : shop.cartShipping
	);
	let orderTotal = $derived(
		Math.max(0, shop.cartSubtotal - shop.cartDiscount + deliveryFee + (giftWrap ? GIFT_WRAP_FEE : 0))
	);
	let monthly = $derived(orderTotal / 12);

	const inputCls =
		'w-full rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-flame focus:outline-none';

	function validate(): boolean {
		const next: Record<string, string> = {};
		if (name.trim().length < 2) next.name = 'Please enter your full name.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
			next.email = 'Please enter a valid email address.';
		if (phone.replace(/\D/g, '').length < 7) next.phone = 'Please enter a valid phone number.';
		if (address.trim().length < 4) next.address = 'Please enter your street address.';
		if (city.trim().length < 2) next.city = 'Please enter your city.';
		if (region.trim().length < 2) next.state = 'Please enter your state.';
		if (!/^\d{5}$/.test(zip.trim())) next.zip = 'Please enter a 5-digit ZIP code.';
		errors = next;
		return Object.keys(next).length === 0;
	}

	function placeOrder() {
		if (!validate()) return;
		const addr: Address = {
			name: name.trim(),
			email: email.trim(),
			phone: phone.trim(),
			address: address.trim(),
			city: city.trim(),
			state: region.trim(),
			zip: zip.trim()
		};
		const paymentLabel =
			payment === 'Financing' ? 'Financing (0% APR, 12 months)' : payment === 'Card' ? 'Card' : 'Pay on delivery';
		const order = shop.placeOrder(addr, paymentLabel, delivery, {
			notes: notes.trim() || undefined,
			giftWrap
		});
		if (order) goto(`/confirmation?id=${order.id}`);
	}
</script>

<svelte:head>
	<title>Checkout — Furniture</title>
	<meta
		name="description"
		content="Check out securely with card, pay on delivery or 0% APR financing. White-glove delivery, room placement and assembly available."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
	<div use:reveal class="reveal">
		<p class="text-xs font-bold tracking-[0.2em] text-flame-deep uppercase">Furniture</p>
		<h1 class="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">Checkout</h1>
		<p class="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
			Almost there — tell us where your furniture is going and how you would like to pay.
		</p>
	</div>

	{#if shop.cart.length === 0}
		<div use:reveal class="reveal mt-10 rounded-3xl border border-orange-100 bg-white px-6 py-14 text-center">
			<span class="mx-auto grid size-16 place-items-center rounded-full bg-peach text-flame-deep">
				<Icon name="bag" class="size-7" />
			</span>
			<h2 class="mt-5 font-display text-2xl font-semibold text-ink">Your bag is empty</h2>
			<p class="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
				There is nothing to check out yet. Add a piece you love and come back here.
			</p>
			<a
				href="/shop"
				class="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
			>
				Browse the collection <Icon name="arrow-right" class="size-4" />
			</a>
		</div>
	{:else}
		<form
			class="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start"
			onsubmit={(e) => {
				e.preventDefault();
				placeOrder();
			}}
			novalidate
		>
			<div class="space-y-6">
				<!-- Contact -->
				<section use:reveal class="reveal rounded-3xl border border-orange-100 bg-white p-6">
					<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-ink">
						<span class="grid size-8 place-items-center rounded-full bg-peach text-sm font-bold text-flame-deep">1</span>
						Contact
					</h2>
					<div class="mt-5 grid gap-4 sm:grid-cols-2">
						<div>
							<label for="co-name" class="mb-1.5 block text-sm font-semibold text-ink">Full name</label>
							<input
								id="co-name"
								type="text"
								bind:value={name}
								placeholder="Alexandra Morgan"
								autocomplete="name"
								aria-invalid={errors.name ? 'true' : undefined}
								class="{inputCls} {errors.name ? 'border-flame' : ''}"
							/>
							{#if errors.name}<p class="mt-1 text-sm font-medium text-flame-deep" role="alert">{errors.name}</p>{/if}
						</div>
						<div>
							<label for="co-email" class="mb-1.5 block text-sm font-semibold text-ink">Email</label>
							<input
								id="co-email"
								type="email"
								bind:value={email}
								placeholder="you@example.com"
								autocomplete="email"
								aria-invalid={errors.email ? 'true' : undefined}
								class="{inputCls} {errors.email ? 'border-flame' : ''}"
							/>
							{#if errors.email}<p class="mt-1 text-sm font-medium text-flame-deep" role="alert">{errors.email}</p>{/if}
						</div>
						<div class="sm:col-span-2">
							<label for="co-phone" class="mb-1.5 block text-sm font-semibold text-ink">Phone</label>
							<input
								id="co-phone"
								type="tel"
								bind:value={phone}
								placeholder="(985) 555-0148"
								autocomplete="tel"
								aria-invalid={errors.phone ? 'true' : undefined}
								class="{inputCls} {errors.phone ? 'border-flame' : ''}"
							/>
							{#if errors.phone}<p class="mt-1 text-sm font-medium text-flame-deep" role="alert">{errors.phone}</p>{/if}
						</div>
					</div>
				</section>

				<!-- Shipping address -->
				<section use:reveal class="reveal rounded-3xl border border-orange-100 bg-white p-6">
					<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-ink">
						<span class="grid size-8 place-items-center rounded-full bg-peach text-sm font-bold text-flame-deep">2</span>
						Shipping address
					</h2>
					<div class="mt-5 grid gap-4 sm:grid-cols-2">
						<div class="sm:col-span-2">
							<label for="co-address" class="mb-1.5 block text-sm font-semibold text-ink">Street address</label>
							<input
								id="co-address"
								type="text"
								bind:value={address}
								placeholder="800 Winward Drive, Suite A"
								autocomplete="street-address"
								aria-invalid={errors.address ? 'true' : undefined}
								class="{inputCls} {errors.address ? 'border-flame' : ''}"
							/>
							{#if errors.address}<p class="mt-1 text-sm font-medium text-flame-deep" role="alert">{errors.address}</p>{/if}
						</div>
						<div>
							<label for="co-city" class="mb-1.5 block text-sm font-semibold text-ink">City</label>
							<input
								id="co-city"
								type="text"
								bind:value={city}
								placeholder="Covington"
								autocomplete="address-level2"
								aria-invalid={errors.city ? 'true' : undefined}
								class="{inputCls} {errors.city ? 'border-flame' : ''}"
							/>
							{#if errors.city}<p class="mt-1 text-sm font-medium text-flame-deep" role="alert">{errors.city}</p>{/if}
						</div>
						<div class="grid grid-cols-2 gap-4">
							<div>
								<label for="co-state" class="mb-1.5 block text-sm font-semibold text-ink">State</label>
								<input
									id="co-state"
									type="text"
									bind:value={region}
									placeholder="LA"
									autocomplete="address-level1"
									aria-invalid={errors.state ? 'true' : undefined}
									class="{inputCls} {errors.state ? 'border-flame' : ''}"
								/>
								{#if errors.state}<p class="mt-1 text-sm font-medium text-flame-deep" role="alert">{errors.state}</p>{/if}
							</div>
							<div>
								<label for="co-zip" class="mb-1.5 block text-sm font-semibold text-ink">ZIP</label>
								<input
									id="co-zip"
									type="text"
									inputmode="numeric"
									bind:value={zip}
									placeholder="70433"
									autocomplete="postal-code"
									aria-invalid={errors.zip ? 'true' : undefined}
									class="{inputCls} {errors.zip ? 'border-flame' : ''}"
								/>
								{#if errors.zip}<p class="mt-1 text-sm font-medium text-flame-deep" role="alert">{errors.zip}</p>{/if}
							</div>
						</div>
					</div>
				</section>

				<!-- Delivery -->
				<fieldset use:reveal class="reveal rounded-3xl border border-orange-100 bg-white p-6">
					<legend class="flex items-center gap-2 px-1 font-display text-xl font-semibold text-ink">
						<span class="grid size-8 place-items-center rounded-full bg-peach text-sm font-bold text-flame-deep">3</span>
						Delivery
					</legend>
					<div class="mt-5 space-y-3">
						<label
							class="flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition {delivery === 'Standard'
								? 'border-flame bg-peach/50'
								: 'border-orange-200 hover:border-flame/50'}"
						>
							<input type="radio" name="delivery" value="Standard" bind:group={delivery} class="mt-1 size-4 accent-[#f4531a]" />
							<span class="flex-1">
								<span class="flex items-center justify-between gap-2 text-sm font-bold text-ink">
									Standard delivery
									<span>{shop.cartShipping === 0 ? 'Free' : formatPrice(SHIPPING_FEE)}</span>
								</span>
								<span class="mt-0.5 block text-xs leading-relaxed text-muted">
									3–5 days · Free on orders over {formatPrice(FREE_SHIPPING_OVER)}, otherwise {formatPrice(SHIPPING_FEE)}.
								</span>
							</span>
						</label>
						<label
							class="flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition {delivery === 'White glove'
								? 'border-flame bg-peach/50'
								: 'border-orange-200 hover:border-flame/50'}"
						>
							<input type="radio" name="delivery" value="White glove" bind:group={delivery} class="mt-1 size-4 accent-[#f4531a]" />
							<span class="flex-1">
								<span class="flex items-center justify-between gap-2 text-sm font-bold text-ink">
									White glove
									<span>+{formatPrice(WHITE_GLOVE_FEE)}</span>
								</span>
								<span class="mt-0.5 block text-xs leading-relaxed text-muted">
									Room placement, assembly and packaging removal — we take care of everything.
								</span>
							</span>
						</label>
						<label
							class="flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition {delivery === 'Store pickup'
								? 'border-flame bg-peach/50'
								: 'border-orange-200 hover:border-flame/50'}"
						>
							<input type="radio" name="delivery" value="Store pickup" bind:group={delivery} class="mt-1 size-4 accent-[#f4531a]" />
							<span class="flex-1">
								<span class="flex items-center justify-between gap-2 text-sm font-bold text-ink">
									Store pickup
									<span>Free</span>
								</span>
								<span class="mt-0.5 block text-xs leading-relaxed text-muted">
									Covington showroom — 800 Winward Drive, Suite A. We will email you when it is ready.
								</span>
							</span>
						</label>
					</div>
				</fieldset>

				<!-- Payment -->
				<fieldset use:reveal class="reveal rounded-3xl border border-orange-100 bg-white p-6">
					<legend class="flex items-center gap-2 px-1 font-display text-xl font-semibold text-ink">
						<span class="grid size-8 place-items-center rounded-full bg-peach text-sm font-bold text-flame-deep">4</span>
						Payment
					</legend>
					<div class="mt-5 space-y-3">
						<label
							class="flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition {payment === 'Card'
								? 'border-flame bg-peach/50'
								: 'border-orange-200 hover:border-flame/50'}"
						>
							<input type="radio" name="payment" value="Card" bind:group={payment} class="mt-1 size-4 accent-[#f4531a]" />
							<span class="flex-1">
								<span class="block text-sm font-bold text-ink">Card</span>
								<span class="mt-0.5 block text-xs leading-relaxed text-muted">
									Pay with a card at delivery confirmation. Demo checkout — no real payment is taken.
								</span>
							</span>
						</label>
						<label
							class="flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition {payment === 'Pay on delivery'
								? 'border-flame bg-peach/50'
								: 'border-orange-200 hover:border-flame/50'}"
						>
							<input
								type="radio"
								name="payment"
								value="Pay on delivery"
								bind:group={payment}
								class="mt-1 size-4 accent-[#f4531a]"
							/>
							<span class="flex-1">
								<span class="block text-sm font-bold text-ink">Pay on delivery</span>
								<span class="mt-0.5 block text-xs leading-relaxed text-muted">
									Pay in cash or by card when your furniture arrives.
								</span>
							</span>
						</label>
						<label
							class="flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition {payment === 'Financing'
								? 'border-flame bg-peach/50'
								: 'border-orange-200 hover:border-flame/50'}"
						>
							<input type="radio" name="payment" value="Financing" bind:group={payment} class="mt-1 size-4 accent-[#f4531a]" />
							<span class="flex-1">
								<span class="flex items-center justify-between gap-2 text-sm font-bold text-ink">
									Financing — 0% APR, 12 months
									<span>{formatPrice(monthly)}/mo</span>
								</span>
								<span class="mt-0.5 block text-xs leading-relaxed text-muted">
									Split your total into 12 equal monthly payments with no interest.
								</span>
							</span>
						</label>
					</div>

					<label class="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-orange-200 p-4">
						<input type="checkbox" bind:checked={giftWrap} class="mt-1 size-4 accent-[#f4531a]" />
						<span class="flex-1">
							<span class="flex items-center justify-between gap-2 text-sm font-bold text-ink">
								Gift wrap
								<span>+{formatPrice(GIFT_WRAP_FEE)}</span>
							</span>
							<span class="mt-0.5 block text-xs leading-relaxed text-muted">
								Premium kraft wrap with a hand-tied ribbon and a gift note.
							</span>
						</span>
					</label>

					<div class="mt-4">
						<label for="co-notes" class="mb-1.5 block text-sm font-semibold text-ink">
							Order notes <span class="font-normal text-muted">(optional)</span>
						</label>
						<textarea
							id="co-notes"
							bind:value={notes}
							rows="3"
							placeholder="Delivery instructions, gate codes, preferred time window…"
							class="{inputCls} resize-none"
						></textarea>
					</div>
				</fieldset>
			</div>

			<!-- Order summary -->
			<aside use:reveal class="reveal rounded-3xl border border-orange-100 bg-white p-6 lg:sticky lg:top-24">
				<h2 class="font-display text-xl font-semibold text-ink">Order summary</h2>
				<ul class="mt-5 space-y-3">
					{#each shop.cart as item (item.id + '|' + (item.variant ?? ''))}
						{@const product = getProduct(item.id)}
						{#if product}
							<li class="flex items-center gap-3">
								<span class="grid size-14 shrink-0 place-items-center rounded-xl bg-cream">
									<CutoutPicture stem={product.cutout} alt="" cls="max-h-12 w-auto" />
								</span>
								<span class="min-w-0 flex-1">
									<span class="block truncate text-sm font-semibold text-ink">{product.name}</span>
									<span class="block text-xs text-muted">
										Qty {item.qty}{item.variant ? ` · ${item.variant}` : ''}
									</span>
								</span>
								<span class="shrink-0 text-sm font-bold text-ink">{formatPrice(lineUnitPrice(item) * item.qty)}</span>
							</li>
						{/if}
					{/each}
				</ul>
				<dl class="mt-6 space-y-3 border-t border-orange-100 pt-5 text-sm">
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
						<dt class="text-muted">Delivery ({delivery})</dt>
						<dd class="font-semibold text-ink">{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</dd>
					</div>
					{#if giftWrap}
						<div class="flex justify-between">
							<dt class="text-muted">Gift wrap</dt>
							<dd class="font-semibold text-ink">{formatPrice(GIFT_WRAP_FEE)}</dd>
						</div>
					{/if}
					<div class="flex justify-between border-t border-orange-100 pt-3 text-base">
						<dt class="font-display font-bold text-ink">Total</dt>
						<dd class="font-display font-bold text-ink">{formatPrice(orderTotal)}</dd>
					</div>
					{#if payment === 'Financing'}
						<p class="text-right text-xs text-muted">
							or {formatPrice(monthly)}/mo for 12 months at 0% APR
						</p>
					{/if}
				</dl>
				<button
					type="submit"
					class="mt-6 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
				>
					Place order · {formatPrice(orderTotal)}
				</button>
				<p class="mt-3 flex items-start justify-center gap-1.5 text-center text-xs leading-relaxed text-muted">
					<Icon name="shield" class="mt-0.5 size-4 shrink-0" />
					Demo checkout — no real payment is taken. 30-day returns, 10-year warranty.
				</p>
				<a
					href="/cart"
					class="mt-2 flex min-h-11 items-center justify-center gap-2 rounded-full border border-orange-200 px-5 py-3 text-sm font-bold text-ink transition hover:border-flame hover:text-flame-deep"
				>
					<Icon name="arrow-right" class="size-4 rotate-180" /> Back to bag
				</a>
			</aside>
		</form>
	{/if}
</div>
