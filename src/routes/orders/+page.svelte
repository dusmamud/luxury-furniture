<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import CutoutPicture from '#lib/components/CutoutPicture.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { formatPrice, getProduct } from '#lib/data/products';
	import { formatDate, ORDER_STEPS, shop, type Order } from '#lib/data/store.svelte';

	let orders = $derived(shop.myOrders());

	function cancel(order: Order) {
		if (confirm(`Cancel order ${order.id}? This cannot be undone.`)) shop.cancelOrder(order.id);
	}
</script>

<svelte:head>
	<title>Your Orders — Furniture</title>
	<meta
		name="description"
		content="View your furniture orders, track delivery progress and manage cancellations."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
	<div use:reveal class="reveal">
		<p class="text-xs font-bold tracking-[0.2em] text-flame-deep uppercase">Furniture</p>
		<h1 class="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">Your orders</h1>
		<p class="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
			Track deliveries, review past pieces and manage your orders in one place.
		</p>
	</div>

	{#if !shop.user}
		<div use:reveal class="reveal mt-10 rounded-3xl border border-orange-100 bg-white px-6 py-14 text-center">
			<span class="mx-auto grid size-16 place-items-center rounded-full bg-peach text-flame-deep">
				<Icon name="user" class="size-7" />
			</span>
			<h2 class="mt-5 font-display text-2xl font-semibold text-ink">Log in to see your orders</h2>
			<p class="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
				Orders are linked to your account. Log in — or create a free account — to view them.
			</p>
			<div class="mt-6 flex flex-wrap items-center justify-center gap-3">
				<a
					href="/login"
					class="inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
				>
					Log in
				</a>
				<a
					href="/track-order"
					class="inline-flex min-h-11 items-center rounded-full border border-orange-200 px-6 py-3 text-sm font-bold text-ink transition hover:border-flame hover:text-flame-deep"
				>
					Track without logging in
				</a>
			</div>
		</div>
	{:else if orders.length === 0}
		<div use:reveal class="reveal mt-10 rounded-3xl border border-orange-100 bg-white px-6 py-14 text-center">
			<span class="mx-auto grid size-16 place-items-center rounded-full bg-peach text-flame-deep">
				<Icon name="bag" class="size-7" />
			</span>
			<h2 class="mt-5 font-display text-2xl font-semibold text-ink">No orders yet</h2>
			<p class="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
				When you place your first order it will appear here, with live delivery tracking.
			</p>
			<a
				href="/shop"
				class="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
			>
				Browse the collection <Icon name="arrow-right" class="size-4" />
			</a>
		</div>
	{:else}
		<div class="mt-8 space-y-5">
			{#each orders as order (order.id)}
				<article use:reveal class="reveal rounded-3xl border border-orange-100 bg-white p-6">
					<div class="flex flex-wrap items-start justify-between gap-3">
						<div>
							<h2 class="font-display text-lg font-semibold text-ink">
								Order <span class="text-flame-deep">{order.id}</span>
							</h2>
							<p class="mt-0.5 text-sm text-muted">
								Placed {formatDate(order.placedAt)} · {order.items.reduce((n, i) => n + i.qty, 0)}
								{order.items.reduce((n, i) => n + i.qty, 0) === 1 ? 'item' : 'items'} · {order.delivery}
							</p>
						</div>
						<p class="font-display text-xl font-bold text-ink">{formatPrice(order.total)}</p>
					</div>

					<!-- Status -->
					{#if order.status === 'cancelled'}
						<p
							class="mt-4 inline-flex items-center gap-2 rounded-full bg-peach px-4 py-2 text-sm font-bold text-flame-deep"
						>
							<Icon name="close" class="size-4" /> Cancelled
						</p>
					{:else}
						<div class="mt-4">
							<p class="flex items-center justify-between text-sm">
								<span class="font-semibold text-ink">{ORDER_STEPS[shop.orderStep(order)]}</span>
								<span class="text-muted">Estimated delivery {shop.estimatedDelivery(order)}</span>
							</p>
							<div
								class="mt-2 h-2 overflow-hidden rounded-full bg-peach"
								role="progressbar"
								aria-valuenow={shop.orderStep(order) + 1}
								aria-valuemin={1}
								aria-valuemax={ORDER_STEPS.length}
								aria-label="Delivery progress for order {order.id}"
							>
								<div
									class="h-full rounded-full bg-flame-dark transition-all duration-500"
									style="width: {((shop.orderStep(order) + 1) / ORDER_STEPS.length) * 100}%"
								></div>
							</div>
						</div>
					{/if}

					<!-- Items -->
					<ul class="mt-5 flex flex-wrap gap-3">
						{#each order.items as item (item.id + '|' + (item.variant ?? ''))}
							{@const p = getProduct(item.id)}
							<li class="flex items-center gap-3 rounded-2xl bg-cream px-3 py-2">
							{#if p}
								<CutoutPicture stem={p.cutout} alt={item.name} cls="h-12 w-12 object-contain" sizes="48px" />
							{:else}
								<img src={item.src} alt={item.name} class="h-12 w-12 object-contain" loading="lazy" decoding="async" />
							{/if}
								<span class="text-sm">
									<span class="block font-semibold text-ink">{item.name}</span>
									<span class="text-xs text-muted">Qty {item.qty}</span>
								</span>
							</li>
						{/each}
					</ul>

					<div class="mt-5 flex flex-wrap items-center gap-3">
						<a
							href="/track-order?id={order.id}"
							class="inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-5 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
						>
							<Icon name="truck" class="size-4" /> Track order
						</a>
						{#if shop.isCancellable(order)}
							<button
								type="button"
								class="inline-flex min-h-11 items-center gap-2 rounded-full border border-orange-200 px-5 py-3 text-sm font-bold text-ink transition hover:border-flame hover:text-flame-deep"
								onclick={() => cancel(order)}
							>
								<Icon name="close" class="size-4" /> Cancel order
							</button>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	{/if}
</div>
