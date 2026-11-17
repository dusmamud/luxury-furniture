<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';

	const sections = [
		{
			title: 'What we collect',
			body: 'When you browse, order or write to us, we collect the information you give us directly: your name, email address, phone number, delivery address and order details. We also collect basic technical information automatically — the pages you visit, your approximate location from your IP address, and the device and browser you use — so the site works properly and we can see which pages are useful.'
		},
		{
			title: 'How we use it',
			body: 'We use your information to process and deliver orders, arrange returns and warranty repairs, answer your messages, and — only if you ask us to — send you news about new collections. We never sell your personal information to anyone, and we never share it for advertising without your clear consent.'
		},
		{
			title: 'Payments',
			body: 'Card payments are processed by our payment provider; your full card number never touches our servers and is never stored by us. Financing applications are handled by our financing partner, who will explain their own use of your data when you apply.'
		},
		{
			title: 'Cookies',
			body: 'We use a small number of cookies: ones that keep your bag and wishlist working, ones that remember your preferences, and anonymous analytics cookies that tell us how many people visit and which pages they read. You can block cookies in your browser settings; the shop will still work, though your bag may not be remembered between visits.'
		},
		{
			title: 'How long we keep it',
			body: 'Order records are kept for as long as tax and warranty rules require — currently seven years for invoices. Marketing consents are kept until you withdraw them. Messages sent through our contact form are kept for up to two years so we can follow up properly.'
		},
		{
			title: 'Your rights',
			body: 'You can ask us at any time for a copy of the personal information we hold about you, ask us to correct it, or ask us to delete it. You can also object to marketing at any time by replying to any email or writing to us. To make a request, email hello@furniture.example or call (985) 555-0148 — we will respond within 30 days.'
		},
		{
			title: 'Children',
			body: 'Our site is not aimed at children under 16, and we do not knowingly collect information from them. If you believe a child has shared information with us, please contact us and we will delete it.'
		},
		{
			title: 'Changes to this policy',
			body: 'If we change how we handle personal information, we will update this page and note the new date below. Significant changes will also be flagged in our newsletter before they take effect.'
		}
	];
</script>

<svelte:head>
	<title>Privacy Policy — Furniture</title>
	<meta
		name="description"
		content="How Furniture collects, uses and protects your personal information — orders, payments, cookies and your rights."
	/>
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-3xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8">
		<div class="reveal" use:reveal>
			<p class="text-sm font-bold tracking-[0.2em] text-flame uppercase">Legal</p>
			<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-ink sm:text-5xl">Privacy policy</h1>
			<p class="mt-4 leading-relaxed text-muted">
				Last updated: November 2026. This page explains, in plain language, what personal information
				Furniture collects, why we need it, and what you can do about it.
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
			<h2 class="font-display text-xl font-semibold text-white">Questions about your data?</h2>
			<p class="mt-2 leading-relaxed text-white/70">
				Write to <a href="mailto:hello@furniture.example" class="font-semibold text-white underline underline-offset-2">hello@furniture.example</a>
				or call <a href="tel:+19855550148" class="font-semibold text-white underline underline-offset-2">(985) 555-0148</a>.
				Our Covington team handles privacy requests directly.
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
