<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';

	const topics = [
		{ icon: 'truck', title: 'Delivery options', blurb: 'Standard, white-glove and store pickup — times, prices and what to expect.', href: '/delivery' },
		{ icon: 'refresh', title: 'Returns & refunds', blurb: '30 days to change your mind, free collection and full refunds.', href: '/returns-policy' },
		{ icon: 'shield', title: 'Warranty', blurb: '10-year frame warranty and 2-year fabric warranty, explained.', href: '/warranty' },
		{ icon: 'truck', title: 'Shipping policy', blurb: 'Where we ship, how long it takes and what shipping costs.', href: '/shipping-policy' },
		{ icon: 'search', title: 'Track my order', blurb: 'Follow your order from our workshop to your front door.', href: '/track-order' },
		{ icon: 'sparkle', title: 'Financing — 0% APR', blurb: 'Spread the cost over 6, 12 or 18 months with no interest.', href: '/financing' },
		{ icon: 'sofa', title: 'Trade program', blurb: '15% off and dedicated support for designers and hospitality buyers.', href: '/trade' },
		{ icon: 'pin', title: 'Showrooms', blurb: 'Covington, New Orleans and Baton Rouge — hours, directions and what to try.', href: '/showrooms' },
		{ icon: 'mail', title: 'Contact us', blurb: 'Call, email or visit — we reply within one business day.', href: '/contact' },
		{ icon: 'check', title: 'Frequently asked questions', blurb: 'The ten questions we hear most, answered in one place.', href: '/faq' }
	];

	let query = $state('');
	let filtered = $derived(
		topics.filter(
			(t) =>
				t.title.toLowerCase().includes(query.trim().toLowerCase()) ||
				t.blurb.toLowerCase().includes(query.trim().toLowerCase())
		)
	);
</script>

<svelte:head>
	<title>Help Centre — Furniture | Delivery, returns &amp; warranty</title>
	<meta
		name="description"
		content="The Furniture help centre — find answers on delivery, returns, warranty, shipping, financing, trade and tracking your order."
	/>
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8">
		<div class="reveal mx-auto max-w-2xl text-center" use:reveal>
			<p class="text-sm font-bold tracking-[0.2em] text-flame-deep uppercase">Help centre</p>
			<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-ink sm:text-5xl">
				How can we help?
			</h1>
			<p class="mt-4 text-lg leading-relaxed text-muted">
				Search for an answer, or browse the topics below. Most questions are covered in under a minute.
			</p>
			<div class="relative mt-8">
				<span class="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-muted">
					<Icon name="search" class="size-5" />
				</span>
				<label for="help-search" class="sr-only">Search the help centre</label>
				<input
					id="help-search"
					type="search"
					bind:value={query}
					placeholder="Try “returns”, “delivery” or “financing”…"
					autocomplete="off"
					class="w-full rounded-full border border-orange-200 bg-white py-3.5 pr-5 pl-13 text-sm text-ink placeholder:text-muted/60 focus:border-flame focus:outline-none"
				/>
			</div>
		</div>

		{#if filtered.length === 0}
			<div class="reveal mx-auto mt-12 max-w-xl rounded-3xl border border-orange-100 bg-white p-8 text-center" use:reveal>
				<span class="mx-auto grid size-12 place-items-center rounded-full bg-peach text-flame-deep">
					<Icon name="search" class="size-6" />
				</span>
				<h2 class="mt-4 font-display text-xl font-semibold text-ink">Nothing matches “{query}”</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">
					Try a different word, or ask our team directly — we reply within one business day.
				</p>
				<a
					href="/contact"
					class="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
				>
					Contact us <Icon name="arrow-right" class="size-4" />
				</a>
			</div>
		{:else}
			<div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each filtered as t, i}
					<a
						href={t.href}
						class="reveal lift group block rounded-3xl border border-orange-100 bg-white p-6"
						use:reveal
						style="--rd: {(i % 3) * 80}ms"
					>
						<span class="grid size-12 place-items-center rounded-2xl bg-peach text-flame-deep transition group-hover:bg-flame-dark group-hover:text-white">
							<Icon name={t.icon} class="size-6" />
						</span>
						<h2 class="mt-4 font-display text-lg font-semibold text-ink group-hover:text-flame-deep">{t.title}</h2>
						<p class="mt-2 text-sm leading-relaxed text-muted">{t.blurb}</p>
						<span class="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-flame-deep">
							Learn more <Icon name="arrow-right" class="size-4 transition group-hover:translate-x-1" />
						</span>
					</a>
				{/each}
			</div>
		{/if}

		<div class="reveal mt-12 grid gap-5 md:grid-cols-2" use:reveal>
			<div class="rounded-[2rem] bg-ink px-8 py-10">
				<h2 class="font-display text-2xl font-semibold text-white">Still need a hand?</h2>
				<p class="mt-2 leading-relaxed text-white/70">
					Our Covington team is here Mon–Sat, 10 AM–7 PM CT. Call (985) 555-0148 or send us a message.
				</p>
				<a
					href="/contact"
					class="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
				>
					Contact us <Icon name="arrow-right" class="size-4" />
				</a>
			</div>
			<div class="rounded-[2rem] bg-peach px-8 py-10">
				<h2 class="font-display text-2xl font-semibold text-ink">Most asked question</h2>
				<p class="mt-2 leading-relaxed text-muted">
					“How long does delivery take?” — Most in-stock orders arrive in 3–5 business days, and standard
					delivery is free over $499.
				</p>
				<a
					href="/faq"
					class="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-ink transition hover:text-flame-deep"
				>
					Read all FAQs <Icon name="arrow-right" class="size-4" />
				</a>
			</div>
		</div>
	</div>
</section>
