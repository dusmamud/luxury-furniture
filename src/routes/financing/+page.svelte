<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { formatPrice } from '#lib/data/products';

	let price = $state(1299);
	let months = $state(12);

	const monthOptions = [6, 12, 18];
	let monthly = $derived(Math.round(price / months));

	const steps = [
		{ n: '1', title: 'Choose your piece', body: 'Add anything over $100 to your bag — sofas, dining sets, the whole room if you like.' },
		{ n: '2', title: 'Pick financing at checkout', body: 'Choose 6, 12 or 18 months. Approval takes about a minute, with a soft credit check.' },
		{ n: '3', title: 'Pay monthly, 0% APR', body: 'The same amount every month, no interest, no deposit and no hidden fees.' }
	];

	const eligibility = [
		'Orders over $100 qualify for 6 or 12 months at 0% APR; orders over $1,000 also qualify for 18 months.',
		'You must be 18 or over and a US resident with a valid debit or credit card.',
		'Approval is subject to a soft credit check — it does not affect your credit score.',
		'Financing is available online and in all three showrooms.'
	];
</script>

<svelte:head>
	<title>Financing — Furniture | 0% APR for 12 months</title>
	<meta
		name="description"
		content="Spread the cost with 0% APR for 12 months on orders over $100 — 18 months over $1,000. No deposit, no hidden fees. Try the monthly payment calculator."
	/>
	<link
		rel="preload"
		as="image"
		href="/images/modern-couch.webp"
		imagesrcset="/images/modern-couch-800.webp 800w, /images/modern-couch.webp 1920w"
		imagesizes="(max-width: 1024px) 100vw, 600px"
		fetchpriority="high"
	/>
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8">
		<div class="grid items-center gap-10 lg:grid-cols-2">
			<div class="reveal" use:reveal>
				<p class="text-sm font-bold tracking-[0.2em] text-flame-deep uppercase">Financing</p>
				<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-ink sm:text-5xl">
					0% APR for 12 months. The sofa now, the payments spread out.
				</h1>
				<p class="mt-4 text-lg leading-relaxed text-muted">
					Split any order over $100 across 6 or 12 months — or 18 months on orders over $1,000 — with
					zero interest. The monthly figure you see is exactly what you pay.
				</p>
				<div class="mt-8 flex flex-wrap gap-3">
					<a
						href="/shop"
						class="inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
					>
						Shop with financing <Icon name="arrow-right" class="size-4" />
					</a>
					<a
						href="#calculator"
						class="inline-flex min-h-11 items-center gap-2 rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-bold text-ink transition hover:border-flame hover:text-flame-deep"
					>
						Try the calculator
					</a>
				</div>
			</div>
			<div class="reveal overflow-hidden rounded-[2rem]" use:reveal style="--rd: 120ms">
				<img
					src="/images/modern-couch.webp"
					srcset="/images/modern-couch-800.webp 800w, /images/modern-couch.webp 1920w"
					sizes="(max-width: 1024px) 100vw, 600px"
					width="1920"
					height="1280"
					alt="Modern grey three-seater couch — available on 0% APR financing"
					class="aspect-[4/3] w-full object-cover"
					loading="eager"
					fetchpriority="high"
				/>
			</div>
		</div>

		<!-- Calculator -->
		<div id="calculator" class="reveal mt-16 scroll-mt-24 rounded-[2rem] bg-ink px-6 py-10 sm:px-12" use:reveal>
			<div class="grid gap-10 lg:grid-cols-2">
				<div>
					<h2 class="font-display text-2xl font-semibold text-white sm:text-3xl">Monthly payment calculator</h2>
					<p class="mt-2 leading-relaxed text-white/70">
						Drag the slider to your order total and pick a term. With 0% APR, the maths is simple:
						price divided by months.
					</p>
					<div class="mt-8">
						<div class="flex items-baseline justify-between">
							<label for="fin-price" class="text-sm font-bold text-white">Order total</label>
							<span class="font-display text-2xl font-bold text-white">{formatPrice(price)}</span>
						</div>
						<input
							id="fin-price"
							type="range"
							min="100"
							max="3000"
							step="50"
							bind:value={price}
							class="mt-3 w-full accent-[#f4531a]"
							aria-valuetext={formatPrice(price)}
						/>
						<div class="mt-1 flex justify-between text-xs font-medium text-white/50">
							<span>$100</span><span>$3,000</span>
						</div>
					</div>
					<div class="mt-8">
						<fieldset>
							<legend class="text-sm font-bold text-white">Pay over</legend>
							<div class="mt-3 flex flex-wrap gap-2" role="group" aria-label="Financing term">
								{#each monthOptions as m}
									<button
										type="button"
										aria-pressed={months === m}
										onclick={() => (months = m)}
										class="min-h-11 rounded-full px-5 py-2.5 text-sm font-bold transition {months === m
											? 'bg-flame-dark text-white'
											: 'bg-white/10 text-white hover:bg-white/20'}"
									>
										{m} months
									</button>
								{/each}
							</div>
						</fieldset>
					</div>
				</div>
				<div class="flex flex-col items-start justify-center rounded-3xl bg-white/10 px-8 py-10">
					<p class="text-sm font-bold tracking-wide text-white/60 uppercase">Your monthly payment</p>
					<p class="mt-2 font-display text-5xl font-bold text-white sm:text-6xl">
						{formatPrice(monthly)}<span class="text-2xl font-semibold text-white/60">/mo</span>
					</p>
					<p class="mt-3 text-sm leading-relaxed text-white/70">
						{formatPrice(price)} over {months} months at 0% APR — no deposit, no interest, no fees.
						{#if months === 18 && price < 1000}
							<br /><span class="font-semibold text-white">Note:</span> 18-month terms need an order over $1,000.
						{/if}
					</p>
					<a
						href="/shop"
						class="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
					>
						Shop the collection <Icon name="arrow-right" class="size-4" />
					</a>
				</div>
			</div>
		</div>

		<!-- How it works -->
		<div class="mt-16">
			<div class="reveal max-w-2xl" use:reveal>
				<p class="text-sm font-bold tracking-[0.2em] text-flame-deep uppercase">How it works</p>
				<h2 class="mt-3 font-display text-3xl leading-tight font-semibold text-ink sm:text-4xl">
					Three steps, one minute at checkout.
				</h2>
			</div>
			<ol class="mt-10 grid gap-5 md:grid-cols-3">
				{#each steps as s, i}
					<li class="reveal lift rounded-3xl border border-orange-100 bg-white p-6" use:reveal style="--rd: {i * 80}ms">
						<span class="grid size-11 place-items-center rounded-full bg-flame-dark font-display text-lg font-bold text-white">{s.n}</span>
						<h3 class="mt-4 font-display text-lg font-semibold text-ink">{s.title}</h3>
						<p class="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
					</li>
				{/each}
			</ol>
		</div>

		<!-- Eligibility + FAQ -->
		<div class="mt-16 grid gap-10 lg:grid-cols-2">
			<div class="reveal" use:reveal>
				<h2 class="font-display text-2xl font-semibold text-ink sm:text-3xl">Who can use it?</h2>
				<ul class="mt-6 space-y-3">
					{#each eligibility as item}
						<li class="flex items-start gap-3 text-sm leading-relaxed font-medium text-cocoa">
							<span class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-peach text-flame-deep">
								<Icon name="check" class="size-3.5" />
							</span>
							{item}
						</li>
					{/each}
				</ul>
				<p class="mt-6 text-xs leading-relaxed text-muted">
					Financing is a demo offer for this preview store. Representative example: $1,299 over 12 months
					at 0% APR costs $108.25 per month, total payable $1,299.
				</p>
			</div>
			<div class="reveal space-y-3" use:reveal style="--rd: 120ms">
				<h2 class="font-display text-2xl font-semibold text-ink sm:text-3xl">Financing, quick answers</h2>
				<div class="rounded-3xl border border-orange-100 bg-white p-6">
					<h3 class="font-display text-base font-semibold text-ink">Does financing cost extra?</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted">
						No. At 0% APR the total you pay is exactly the price of the furniture — $1,299 over 12
						months is $108.25 a month and $1,299 in total.
					</p>
				</div>
				<div class="rounded-3xl border border-orange-100 bg-white p-6">
					<h3 class="font-display text-base font-semibold text-ink">Can I pay it off early?</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted">
						Yes, any time, with no early-repayment fee. Pay extra in any month or settle the balance in
						full whenever you like.
					</p>
				</div>
				<div class="rounded-3xl border border-orange-100 bg-white p-6">
					<h3 class="font-display text-base font-semibold text-ink">What if I return a financed piece?</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted">
						Returns work the same way within 30 days. Once the return is processed, the finance
						agreement is cancelled and any payments you made are refunded.
					</p>
					<a href="/faq" class="mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-flame-deep">
						More in the FAQ <Icon name="arrow-right" class="size-4" />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
