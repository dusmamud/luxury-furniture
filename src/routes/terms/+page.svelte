<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';

	const sections = [
		{
			title: 'About these terms',
			body: 'These terms apply to every order placed with Furniture (“we”, “us”), a furniture store based at 800 Winward Drive, Suite A, Covington, LA 70433. By placing an order on this website or in one of our showrooms, you agree to these terms. If you do not agree, please do not order — but do come and visit, the coffee is free.'
		},
		{
			title: 'Products and prices',
			body: 'We work hard to describe and photograph every piece accurately, but wood is a natural material: grain, tone and texture vary from piece to piece, and screen colours vary too. Prices are shown in US dollars and include sales tax where applicable. We may change prices at any time, but the price shown when you order is the price you pay. Obvious pricing errors may be corrected before dispatch, and you will always be offered a full refund if you prefer not to proceed.'
		},
		{
			title: 'Orders and acceptance',
			body: 'Your order is an offer to buy. We accept it when we send your order confirmation, at which point a contract is formed. If a piece is out of stock or a delivery date changes, we will contact you before charging you and offer an alternative or a full refund.'
		},
		{
			title: 'Delivery',
			body: 'Delivery times on product pages are estimates, not guarantees. Risk passes to you when the piece is delivered to the address you gave us. Please inspect deliveries on arrival and tell us about any damage within 7 days — see our delivery page and shipping policy for the full detail.'
		},
		{
			title: 'Returns and refunds',
			body: 'You have 30 days from delivery to return an unused piece in its original condition for a full refund — see our returns policy. Custom or made-to-order pieces are final sale, and this is always noted on the product page before you order.'
		},
		{
			title: 'Warranty',
			body: 'Every frame carries a 10-year warranty against defects in materials and workmanship, and fabric and cushions carry a 2-year warranty — see our warranty page. Your statutory rights are not affected by anything in these terms.'
		},
		{
			title: 'Fair use of the site',
			body: 'Please do not use this site for anything unlawful, do not try to interfere with its operation, and do not copy our photographs, text or designs without permission. Reviews and questions you post must be honest and must not infringe anyone else\u2019s rights.'
		},
		{
			title: 'Liability',
			body: 'We are responsible for losses that are a foreseeable result of our breach of these terms. We are not responsible for losses that are unforeseeable, for business losses, or for damage caused by misuse, normal wear, or failure to follow care instructions.'
		},
		{
			title: 'Governing law',
			body: 'These terms are governed by the laws of the State of Louisiana, and any disputes will be handled in the courts of St. Tammany Parish, Louisiana. If any part of these terms is found unenforceable, the rest remains in force.'
		}
	];
</script>

<svelte:head>
	<title>Terms of Service — Furniture</title>
	<meta
		name="description"
		content="The terms of service for Furniture — orders, prices, delivery, returns, warranty and liability, in plain language."
	/>
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-3xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8">
		<div class="reveal" use:reveal>
			<p class="text-sm font-bold tracking-[0.2em] text-flame uppercase">Legal</p>
			<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-ink sm:text-5xl">Terms of service</h1>
			<p class="mt-4 leading-relaxed text-muted">
				Last updated: November 2026. The rules for buying from Furniture — written to be read, not filed
				away.
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
			<h2 class="font-display text-xl font-semibold text-white">Questions about these terms?</h2>
			<p class="mt-2 leading-relaxed text-white/70">
				Write to <a href="mailto:hello@furniture.example" class="font-semibold text-white underline underline-offset-2">hello@furniture.example</a>
				or call <a href="tel:+19855550148" class="font-semibold text-white underline underline-offset-2">(985) 555-0148</a>.
			</p>
			<a
				href="/contact"
				class="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-dark"
			>
				Contact us <Icon name="arrow-right" class="size-4" />
			</a>
		</div>
	</div>
</section>
