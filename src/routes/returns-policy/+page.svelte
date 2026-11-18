<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';

	const sections = [
		{
			title: '30 days to decide',
			body: 'You have 30 days from delivery to return a piece for any reason. It must be unused and in its original condition, with all parts and packaging included as far as possible. We know furniture is a big decision — that is exactly why the window is a full month, not a week.'
		},
		{
			title: 'How to start a return',
			body: 'Write to hello@furniture.example or call (985) 555-0148 with your order number and the piece you would like to return. We will confirm the collection date within one business day. Trade customers have 60 days to return — see our trade program page.'
		},
		{
			title: 'Collection and cost',
			body: 'We collect returns from your home — you do not need to post anything or repackage the piece beyond reasonable care. Standard returns are collected free of charge. White-glove deliveries that are returned are also collected free. If a piece is returned because it arrived damaged or faulty, collection is always free.'
		},
		{
			title: 'Refunds',
			body: 'Once the returned piece reaches our workshop and is inspected, we refund you in full to your original payment method within 5 business days. If you paid by financing, the finance agreement is cancelled and any payments you made are refunded. Delivery charges are refunded too, except where you chose white-glove delivery — that $99 covers a service already provided.'
		},
		{
			title: 'What cannot be returned',
			body: 'Custom or made-to-order pieces are final sale, and this is always noted on the product page before you order. Pieces that have been used, damaged after delivery, or assembled incorrectly cannot be returned for a refund — though our warranty team will always quote a fair repair.'
		},
		{
			title: 'Damaged or faulty items',
			body: 'If a piece arrives damaged or develops a fault, tell us within 7 days of delivery (or as soon as you notice it, for faults) with a photo. We will repair, replace or refund it at no cost to you, and collect the faulty piece ourselves. This is in addition to your rights under the 10-year frame warranty.'
		},
		{
			title: 'Exchanges',
			body: 'Want a different colour or size instead of a refund? Tell us when you start the return and we will arrange the exchange in one visit where possible — the replacement is delivered and the original collected on the same trip, with any price difference refunded or charged at the time.'
		}
	];
</script>

<svelte:head>
	<title>Returns Policy — Furniture | 30 days, free collection</title>
	<meta
		name="description"
		content="Furniture returns policy — 30 days to change your mind, free home collection, full refunds within 5 business days. Exchanges and exclusions explained."
	/>
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-3xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8">
		<div class="reveal" use:reveal>
			<p class="text-sm font-bold tracking-[0.2em] text-flame-deep uppercase">Legal</p>
			<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-ink sm:text-5xl">Returns policy</h1>
			<p class="mt-4 leading-relaxed text-muted">
				Last updated: November 2026. Live with it for a month — if it is not right, we collect it and
				refund you in full.
			</p>
		</div>
		<div class="mt-10 space-y-8">
			{#each sections as s, i}
				<section class="reveal" use:reveal style="--rd: {i * 40}ms">
					<h2 class="font-display text-xl font-semibold text-ink sm:text-2xl">{s.title}</h2>
					<p class="mt-2 leading-relaxed text-muted">{s.body}</p>
				</section>
			{/each}
		</div>
		<div class="reveal mt-12 rounded-[2rem] bg-ink px-6 py-8 sm:px-10" use:reveal>
			<h2 class="font-display text-xl font-semibold text-white">Start a return</h2>
			<p class="mt-2 leading-relaxed text-white/70">
				Email <a href="mailto:hello@furniture.example" class="font-semibold text-white underline underline-offset-2">hello@furniture.example</a>
				or call <a href="tel:+19855550148" class="font-semibold text-white underline underline-offset-2">(985) 555-0148</a>
				with your order number. We confirm the collection date within one business day.
			</p>
			<a
				href="/contact"
				class="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
			>
				Contact us <Icon name="arrow-right" class="size-4" />
			</a>
		</div>
	</div>
</section>
