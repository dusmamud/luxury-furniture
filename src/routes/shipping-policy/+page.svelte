<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';

	const sections = [
		{
			title: 'Where we ship',
			body: 'We deliver across the contiguous United States from our Covington, Louisiana workshop. Delivery times are 3–5 business days within Louisiana and 5–8 business days elsewhere. We do not currently ship to Alaska, Hawaii or outside the United States — if you are outside our delivery area, call us and we will happily suggest a local maker.'
		},
		{
			title: 'Shipping costs',
			body: 'Standard delivery costs $49 and is free on orders over $499. White-glove delivery — scheduled arrival, room placement, assembly and packaging removal — is an additional $99 at checkout. Store pickup from our Covington flagship is always free, and orders are usually ready within 24 hours.'
		},
		{
			title: 'Processing times',
			body: 'In-stock pieces leave our workshop within 1–2 business days. Made-to-order pieces show their lead time on the product page — usually 2–4 weeks — and we will confirm the date by email before your order is made. Orders placed after 2 PM CT are processed the next business day.'
		},
		{
			title: 'Tracking',
			body: 'Every order is tracked from dispatch to delivery. You will receive a tracking link by email and text as soon as your order leaves the workshop, and you can follow it any time on our track-order page using your order number. White-glove deliveries include a two-hour arrival window confirmed the day before.'
		},
		{
			title: 'Receiving your delivery',
			body: 'Please inspect your pieces on arrival and note any damage on the delivery receipt. If anything arrives damaged, tell us within 7 days with a photo and we will repair, replace or refund it — and collect the damaged piece at no cost to you. If you cannot be home, standard deliveries can be left in a safe place only with your written instruction.'
		},
		{
			title: 'Failed or refused deliveries',
			body: 'If a delivery fails because nobody is available and no safe-place instruction was given, we will re-attempt delivery once at no charge. Further attempts, and deliveries refused without a valid reason, may incur a re-delivery fee of $49. If you need to change the delivery address after dispatch, contact us as soon as possible — a fee may apply once the order is with the courier.'
		},
		{
			title: 'Large and made-to-order pieces',
			body: 'Sofas, dining tables and beds are delivered by a two-person team as standard. Please measure your doorways, hallways and stairwells against the boxed dimensions on the product page before delivery day — our team will happily measure with you in advance if you call us.'
		}
	];
</script>

<svelte:head>
	<title>Shipping Policy — Furniture</title>
	<meta
		name="description"
		content="Furniture shipping policy — where we ship, costs, processing times, tracking and receiving your delivery."
	/>
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-3xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8">
		<div class="reveal" use:reveal>
			<p class="text-sm font-bold tracking-[0.2em] text-flame-deep uppercase">Legal</p>
			<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-ink sm:text-5xl">Shipping policy</h1>
			<p class="mt-4 leading-relaxed text-muted">
				Last updated: November 2026. How your furniture travels from our Covington workshop to your home.
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
		<div class="reveal mt-12 grid gap-5 sm:grid-cols-2" use:reveal>
			<a href="/delivery" class="lift block rounded-3xl border border-orange-100 bg-white p-6">
				<h2 class="font-display text-lg font-semibold text-ink">Delivery options</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">Standard, white-glove and store pickup — times and prices at a glance.</p>
				<span class="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-flame-deep">View delivery <Icon name="arrow-right" class="size-4" /></span>
			</a>
			<a href="/track-order" class="lift block rounded-3xl border border-orange-100 bg-white p-6">
				<h2 class="font-display text-lg font-semibold text-ink">Track my order</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">Follow your order from the workshop to your front door.</p>
				<span class="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-flame-deep">Track order <Icon name="arrow-right" class="size-4" /></span>
			</a>
		</div>
	</div>
</section>
