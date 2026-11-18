<script lang="ts">
	import { page } from '$app/state';
	import Icon from '#lib/components/Icon.svelte';
	import CutoutPicture from '#lib/components/CutoutPicture.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { formatPrice, getProduct } from '#lib/data/products';
	import { GIFT_WRAP_FEE, shop } from '#lib/data/store.svelte';

	let id = $derived(page.url.searchParams.get('id') ?? '');
	let order = $derived(id ? shop.findOrder(id) : undefined);
</script>

<svelte:head>
	<title>{order ? `Order ${order.id} confirmed` : 'Order confirmation'} — Furniture</title>
	<meta
		name="description"
		content="Your furniture order is confirmed. Track delivery, review your items and delivery details."
	/>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
	{#if !order}
		<div use:reveal class="reveal rounded-3xl border border-orange-100 bg-white px-6 py-14 text-center">
			<span class="mx-auto grid size-16 place-items-center rounded-full bg-peach text-flame-deep">
				<Icon name="search" class="size-7" />
			</span>
			<h1 class="mt-5 font-display text-2xl font-semibold text-ink sm:text-3xl">Order not found</h1>
			<p class="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
				We could not find an order with that number. Check the number on your confirmation and try again —
				demo order numbers look like FU-XXXXXX.
			</p>
			<div class="mt-6 flex flex-wrap items-center justify-center gap-3">
				<a
					href="/track-order"
					class="inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
				>
					Track an order
				</a>
				<a
					href="/shop"
					class="inline-flex min-h-11 items-center rounded-full border border-orange-200 px-6 py-3 text-sm font-bold text-ink transition hover:border-flame hover:text-flame-deep"
				>
					Continue shopping
				</a>
			</div>
		</div>
	{:else}
		<div use:reveal class="reveal rounded-3xl border border-orange-100 bg-white px-6 py-10 text-center sm:px-10">
			<span class="mx-auto grid size-16 place-items-center rounded-full bg-flame-dark text-white">
				<Icon name="check" class="size-8" />
			</span>
			<h1 class="mt-5 font-display text-3xl font-bold text-ink sm:text-4xl">Thank you, {order.address.name.split(' ')[0]}!</h1>
			<p class="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted sm:text-base">
				Your order is confirmed. A confirmation has been sent to {order.email} — your furniture is being
				prepared with care.
			</p>
			<p class="mt-4 inline-flex items-center gap-2 rounded-full bg-peach px-4 py-2 text-sm font-bold text-ink">
				Order <span class="text-flame-deep">{order.id}</span>
			</p>
			<p class="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-ink">
				<Icon name="truck" class="size-5 text-flame-deep" />
				Estimated delivery: {shop.estimatedDelivery(order)}
			</p>
			<div class="mt-6 flex flex-wrap items-center justify-center gap-3">
				<a
					href="/track-order?id={order.id}"
					class="inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
				>
					Track your order <Icon name="arrow-right" class="size-4" />
				</a>
				<a
					href="/shop"
					class="inline-flex min-h-11 items-center rounded-full border border-orange-200 px-6 py-3 text-sm font-bold text-ink transition hover:border-flame hover:text-flame-deep"
				>
					Continue shopping
				</a>
			</div>
		</div>

		<!-- Items -->
		<section use:reveal class="reveal mt-6 rounded-3xl border border-orange-100 bg-white p-6">
			<h2 class="font-display text-xl font-semibold text-ink">Your items</h2>
			<ul class="mt-5 space-y-4">
				{#each order.items as item (item.id + '|' + (item.variant ?? ''))}
					{@const p = getProduct(item.id)}
					<li class="flex items-center gap-4">
						<span class="grid size-20 shrink-0 place-items-center rounded-2xl bg-cream">
							{#if p}
								<CutoutPicture stem={p.cutout} alt={item.name} cls="max-h-16 w-auto" sizes="80px" />
							{:else}
								<img src={item.src} alt={item.name} class="max-h-16 w-auto" loading="lazy" decoding="async" />
							{/if}
						</span>
						<span class="min-w-0 flex-1">
							<span class="block truncate text-sm font-semibold text-ink">{item.name}</span>
							<span class="block text-xs text-muted">
								Qty {item.qty}{item.variant ? ` · ${item.variant}` : ''}
							</span>
						</span>
						<span class="shrink-0 text-sm font-bold text-ink">{formatPrice(item.price * item.qty)}</span>
					</li>
				{/each}
			</ul>
		</section>

		<!-- Delivery + payment -->
		<div class="mt-6 grid gap-6 sm:grid-cols-2">
			<section use:reveal class="reveal rounded-3xl border border-orange-100 bg-white p-6">
				<h2 class="flex items-center gap-2 font-display text-lg font-semibold text-ink">
					<Icon name="pin" class="size-5 text-flame-deep" /> Deliver to
				</h2>
				<address class="mt-3 text-sm leading-relaxed text-muted not-italic">
					<span class="font-semibold text-ink">{order.address.name}</span><br />
					{order.address.address}<br />
					{order.address.city}, {order.address.state} {order.address.zip}<br />
					{order.address.phone}
				</address>
				<p class="mt-3 flex items-center gap-2 text-sm font-semibold text-ink">
					<Icon name="truck" class="size-5 text-flame-deep" /> {order.delivery}
				</p>
				{#if order.notes}
					<p class="mt-2 text-sm text-muted">
						<span class="font-semibold text-ink">Note:</span>
						{order.notes}
					</p>
				{/if}
			</section>
			<section use:reveal class="reveal rounded-3xl border border-orange-100 bg-white p-6">
				<h2 class="flex items-center gap-2 font-display text-lg font-semibold text-ink">
					<Icon name="shield" class="size-5 text-flame-deep" /> Payment
				</h2>
				<p class="mt-3 text-sm leading-relaxed text-muted">
					<span class="font-semibold text-ink">{order.payment}</span>
				</p>
				{#if order.giftWrap}
					<p class="mt-2 text-sm text-muted">Gift wrap included</p>
				{/if}
				<dl class="mt-4 space-y-2 border-t border-orange-100 pt-4 text-sm">
					<div class="flex justify-between">
						<dt class="text-muted">Subtotal</dt>
						<dd class="font-semibold text-ink">{formatPrice(order.subtotal)}</dd>
					</div>
					{#if order.discount > 0}
						<div class="flex justify-between">
							<dt class="text-muted">Discount</dt>
							<dd class="font-semibold text-flame-deep">−{formatPrice(order.discount)}</dd>
						</div>
					{/if}
					<div class="flex justify-between">
						<dt class="text-muted">Shipping</dt>
						<dd class="font-semibold text-ink">{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</dd>
					</div>
					{#if order.giftWrap}
						<div class="flex justify-between">
							<dt class="text-muted">Gift wrap</dt>
							<dd class="font-semibold text-ink">{formatPrice(GIFT_WRAP_FEE)}</dd>
						</div>
					{/if}
					<div class="flex justify-between border-t border-orange-100 pt-2 text-base">
						<dt class="font-display font-bold text-ink">Total</dt>
						<dd class="font-display font-bold text-ink">{formatPrice(order.total)}</dd>
					</div>
				</dl>
			</section>
		</div>
	{/if}
</div>
