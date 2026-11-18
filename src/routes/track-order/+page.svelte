<script lang="ts">
	import { page } from '$app/state';
	import Icon from '#lib/components/Icon.svelte';
	import CutoutPicture from '#lib/components/CutoutPicture.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { formatPrice, getProduct } from '#lib/data/products';
	import { formatDate, ORDER_STEPS, shop } from '#lib/data/store.svelte';

	let query = $state('');
	let lookupId = $state('');
	let order = $derived(lookupId ? shop.findOrder(lookupId) : undefined);
	let step = $derived(order ? shop.orderStep(order) : 0);

	// searchParams is unavailable during prerender — read it only in the browser.
	$effect(() => {
		const id = page.url.searchParams.get('id') ?? '';
		query = id;
		lookupId = id;
	});

	function track() {
		lookupId = query.trim();
	}
</script>

<svelte:head>
	<title>Track Your Order — Furniture</title>
	<meta
		name="description"
		content="Track your furniture delivery by order number. See each step from placed to delivered."
	/>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
	<div use:reveal class="reveal">
		<p class="text-xs font-bold tracking-[0.2em] text-flame-deep uppercase">Furniture</p>
		<h1 class="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">Track your order</h1>
		<p class="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
			Enter your order number to see where your furniture is on its way to you.
		</p>
	</div>

	<form
		use:reveal
		class="reveal mt-8 rounded-3xl border border-orange-100 bg-white p-6"
		onsubmit={(e) => {
			e.preventDefault();
			track();
		}}
	>
		<label for="track-id" class="mb-1.5 block text-sm font-semibold text-ink">Order number</label>
		<div class="flex flex-col gap-2 sm:flex-row">
			<input
				id="track-id"
				type="text"
				bind:value={query}
				placeholder="FU-XXXXXX"
				autocomplete="off"
				aria-invalid={lookupId && !order ? 'true' : undefined}
				class="min-w-0 flex-1 rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-flame focus:outline-none"
			/>
			<button
				type="submit"
				class="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
			>
				<Icon name="search" class="size-4" /> Track
			</button>
		</div>
		<p class="mt-2 text-xs text-muted">
			Demo order numbers look like FU-XXXXXX. You will find yours on the confirmation page after checkout, or
			in <a href="/orders" class="font-semibold text-flame-deep hover:underline">Your orders</a>.
		</p>
		{#if lookupId && !order}
			<p class="mt-3 flex items-center gap-2 rounded-2xl bg-peach px-4 py-3 text-sm font-semibold text-flame-deep" role="alert">
				<Icon name="close" class="size-4 shrink-0" />
				No order with that number. Please check the number and try again.
			</p>
		{/if}
	</form>

	{#if order}
		<section use:reveal class="reveal mt-6 rounded-3xl border border-orange-100 bg-white p-6">
			<div class="flex flex-wrap items-start justify-between gap-3">
				<div>
					<h2 class="font-display text-xl font-semibold text-ink">
						Order <span class="text-flame-deep">{order.id}</span>
					</h2>
					<p class="mt-0.5 text-sm text-muted">Placed {formatDate(order.placedAt)} · {order.delivery}</p>
				</div>
				<p class="font-display text-xl font-bold text-ink">{formatPrice(order.total)}</p>
			</div>

			{#if order.status === 'cancelled'}
				<p
					class="mt-5 flex items-center gap-2 rounded-2xl bg-peach px-4 py-3 text-sm font-bold text-flame-deep"
					role="status"
				>
					<Icon name="close" class="size-5 shrink-0" /> This order was cancelled.
				</p>
			{:else}
				<p class="mt-5 flex items-center gap-2 text-sm font-semibold text-ink">
					<Icon name="truck" class="size-5 text-flame-deep" />
					Estimated delivery: {shop.estimatedDelivery(order)}
				</p>

				<!-- Timeline -->
				<ol class="mt-6 space-y-0">
					{#each ORDER_STEPS as label, i}
						{@const state = i < step ? 'done' : i === step ? 'current' : 'todo'}
						<li class="relative flex gap-4 pb-6 last:pb-0">
							{#if i < ORDER_STEPS.length - 1}
								<span
									class="absolute top-8 left-[15px] h-[calc(100%-24px)] w-0.5 {state === 'todo' ? 'bg-orange-100' : 'bg-flame-dark'}"
									aria-hidden="true"
								></span>
							{/if}
							<span
								class="relative z-10 grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold {state === 'done'
									? 'bg-flame-dark text-white'
									: state === 'current'
										? 'bg-flame-dark text-white ring-4 ring-peach'
										: 'bg-peach text-muted'}"
								aria-current={state === 'current' ? 'step' : undefined}
							>
								{#if state === 'done'}
									<Icon name="check" class="size-4" />
								{:else}
									{i + 1}
								{/if}
							</span>
							<span class="pt-1">
								<span class="block text-sm font-bold {state === 'todo' ? 'text-muted' : 'text-ink'}">{label}</span>
								{#if state === 'current'}
									<span class="mt-0.5 block text-xs text-flame-deep">In progress</span>
								{:else if state === 'done'}
									<span class="mt-0.5 block text-xs text-muted">Completed</span>
								{/if}
							</span>
						</li>
					{/each}
				</ol>
			{/if}

			<!-- Items -->
			<h3 class="mt-6 border-t border-orange-100 pt-5 font-display text-lg font-semibold text-ink">Items</h3>
			<ul class="mt-4 space-y-3">
				{#each order.items as item (item.id + '|' + (item.variant ?? ''))}
					{@const p = getProduct(item.id)}
					<li class="flex items-center gap-3">
						<span class="grid size-14 shrink-0 place-items-center rounded-xl bg-cream">
							{#if p}
								<CutoutPicture stem={p.cutout} alt={item.name} cls="max-h-12 w-auto" sizes="56px" />
							{:else}
								<img src={item.src} alt={item.name} class="max-h-12 w-auto" loading="lazy" decoding="async" />
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

			<!-- Delivery address -->
			<h3 class="mt-6 border-t border-orange-100 pt-5 font-display text-lg font-semibold text-ink">Delivering to</h3>
			<address class="mt-2 text-sm leading-relaxed text-muted not-italic">
				<span class="font-semibold text-ink">{order.address.name}</span><br />
				{order.address.address}, {order.address.city}, {order.address.state} {order.address.zip}
			</address>
		</section>
	{/if}
</div>
