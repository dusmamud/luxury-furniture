<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { formatPrice, monthlyPrice, products } from '#lib/data/products';

	let deals = $derived(products.filter((p) => p.compareAt && p.compareAt > p.price));
	let biggestSaving = $derived(
		deals.reduce((max, p) => Math.max(max, (p.compareAt ?? 0) - p.price), 0)
	);

	let copied = $state(false);
	let copyTimer: ReturnType<typeof setTimeout> | undefined;

	async function copyCode() {
		try {
			await navigator.clipboard.writeText('WELCOME10');
			copied = true;
			clearTimeout(copyTimer);
			copyTimer = setTimeout(() => (copied = false), 2500);
		} catch {
			copied = false;
		}
	}
</script>

<svelte:head>
	<title>Deals — Furniture | Save up to {formatPrice(biggestSaving)} on sofas, tables &amp; lighting</title>
	<meta
		name="description"
		content="Furniture deals: save on the Modern Couch, Haven Oak Dining Table and more. Extra 10% off your first order with code WELCOME10, plus 0% APR financing."
	/>
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 lg:px-8">
		<div class="reveal max-w-2xl" use:reveal>
			<p class="hero-anim text-sm font-bold tracking-[0.2em] text-flame uppercase">Deals</p>
			<h1 class="mt-3 font-display text-4xl leading-[1.08] font-semibold text-ink sm:text-5xl">
				Deals worth <span class="text-flame">sitting on</span>
			</h1>
			<p class="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
				Real savings on the pieces people love most — up to {formatPrice(biggestSaving)} off, while stock
				lasts. Prices already include the discount.
			</p>
		</div>

		<!-- WELCOME10 promo banner -->
		<div
			class="reveal mt-10 flex flex-col gap-5 overflow-hidden rounded-[2rem] bg-ink p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
			use:reveal
			style="--rd: 80ms"
		>
			<div class="flex items-start gap-4">
				<span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-flame text-white">
					<Icon name="sparkle" class="size-6" />
				</span>
				<div>
					<h2 class="font-display text-2xl font-semibold text-white">Extra 10% off your first order</h2>
					<p class="mt-1 text-sm leading-relaxed text-white/80">
						Use code <strong class="text-white">WELCOME10</strong> at checkout. It stacks on top of the deals
						below — and you can pay in 12 monthly instalments at 0% APR.
					</p>
				</div>
			</div>
			<button
				type="button"
				onclick={copyCode}
				class="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full border-2 border-dashed border-white/40 px-5 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
				aria-live="polite"
			>
				<span class="tracking-[0.15em]">WELCOME10</span>
				{#if copied}
					<span class="inline-flex items-center gap-1.5 text-green-300">
						<Icon name="check" class="size-4" /> Copied
					</span>
				{:else}
					<span class="inline-flex items-center gap-1.5">
						<Icon name="eye" class="size-4" /> Copy code
					</span>
				{/if}
			</button>
		</div>

		<!-- Deal grid -->
		<div class="mt-10 grid gap-5 pb-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each deals as p, i (p.id)}
				<ProductCard product={p} delay={(i % 3) * 80} />
			{/each}
		</div>

		<!-- Financing note -->
		<div class="reveal mb-14 rounded-[2rem] border border-orange-100 bg-white p-6 sm:p-8 lg:mb-20" use:reveal>
			<div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
				<div class="flex items-start gap-4">
					<span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-peach text-flame">
						<Icon name="shield" class="size-6" />
					</span>
					<div>
						<h2 class="font-display text-xl font-semibold text-ink">Pay over time, 0% APR</h2>
						<p class="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
							Every piece can be split into 12 monthly payments at 0% APR — for example, the Modern
							Couch at {monthlyPrice(1299)}/mo instead of {formatPrice(1299)} today. No fees, no
							interest, same 10-year warranty and 30-day returns on every deal.
						</p>
					</div>
				</div>
				<a
					href="/shop"
					class="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-flame px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-dark"
				>
					Shop all furniture <Icon name="arrow-right" class="size-4" />
				</a>
			</div>
		</div>
	</div>
</section>
