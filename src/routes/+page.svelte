<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '../lib/actions/reveal';
	import { collections, type Collection } from '../lib/data/collections';

	let query = $state('');
	const filtered = $derived(
		collections.filter((c: Collection) =>
			`${c.name} ${c.blurb}`.toLowerCase().includes(query.trim().toLowerCase())
		)
	);
	const large = $derived(filtered.filter((c: Collection) => c.size === 'large'));
	const wide = $derived(filtered.filter((c: Collection) => c.size === 'wide'));
	const small = $derived(filtered.filter((c: Collection) => c.size === 'small'));

	const features = [
		{ icon: 'truck', title: '3-day delivery', text: 'White-glove delivery, room of your choice.' },
		{ icon: 'shield', title: '10-year warranty', text: 'Frames, springs and joinery — covered.' },
		{ icon: 'refresh', title: '30-day returns', text: 'Changed your mind? We collect it free.' },
		{ icon: 'leaf', title: 'Sustainably made', text: 'FSC timber, recycled fabrics, low-VOC finishes.' }
	];
</script>

<!-- ============ HERO ============ -->
<section id="home" class="relative overflow-hidden">
	<div
		class="absolute -top-32 -left-32 hidden size-[560px] rounded-full bg-flame lg:block"
		aria-hidden="true"
	></div>
	<div
		class="absolute top-0 right-0 hidden size-[300px] rounded-bl-full bg-peach-2/70 lg:block"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto max-w-7xl px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-14 lg:pb-16">
		<div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
			<div class="order-2 lg:order-1" use:reveal>
				<div class="overflow-hidden rounded-[2rem] shadow-2xl shadow-orange-900/20">
					<img
						src="/images/hero-sofa.webp"
						alt="White three-seater sofa with burnt-orange cushions, wooden coffee table and black pendant lamp"
						class="aspect-[4/3] w-full object-cover"
						fetchpriority="high"
					/>
				</div>
				<p class="mt-4 flex items-center gap-2 text-sm font-semibold text-cocoa">
					<span class="flex text-gold" aria-label="Rated 4.8 out of 5">
						{#each Array(5) as _}<Icon name="star" class="size-4" />{/each}
					</span>
					4.8 · Loved by 1.3M+ customers
				</p>
			</div>

			<div class="order-1 lg:order-2" use:reveal>
				<p class="text-xs font-bold tracking-[0.3em] text-flame uppercase">New collection · Autumn 2026</p>
				<h1 class="mt-3 font-serif text-[42px] leading-[1.05] font-bold text-flame sm:text-6xl lg:text-[64px]">
					Make you<br />feel luxury
				</h1>
				<p class="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
					Sofas, chairs and lighting crafted by hand, in small batches — solid timber,
					feather-wrapped cushions and fabrics made to be lived in, not just looked at.
				</p>
				<div class="mt-7 flex flex-wrap items-center gap-3">
					<a
						href="#collections"
						class="inline-flex min-h-11 items-center gap-2 rounded-full bg-flame px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-flame-dark"
					>
						Shop now <Icon name="arrow-right" class="size-4" />
					</a>
					<a
						href="#about"
						class="inline-flex min-h-11 items-center rounded-full border-2 border-flame/30 bg-white px-6 py-3 text-sm font-bold text-flame transition hover:border-flame"
						>Our story</a
					>
				</div>
			</div>
		</div>

		<!-- Search -->
		<div class="mx-auto mt-10 max-w-xl" use:reveal>
			<label class="sr-only" for="site-search">What are you looking for?</label>
			<div class="flex items-center gap-2 rounded-full border border-orange-200 bg-white py-1.5 pr-1.5 pl-5 shadow-sm focus-within:border-flame">
				<Icon name="search" class="size-5 shrink-0 text-muted" />
				<input
					id="site-search"
					type="search"
					bind:value={query}
					placeholder="What are you looking for?"
					class="min-w-0 flex-1 bg-transparent py-2 text-sm text-ink placeholder:text-muted/70 focus:outline-none sm:text-base"
				/>
				{#if query}
					<button
						type="button"
						class="shrink-0 rounded-full bg-peach px-4 py-2 text-xs font-bold text-flame-dark"
						onclick={() => (query = '')}>Clear</button
					>
				{/if}
			</div>
			{#if query}
				<p class="mt-2 text-center text-xs font-semibold text-muted">
					{filtered.length} {filtered.length === 1 ? 'collection' : 'collections'} matching “{query}”
				</p>
			{/if}
		</div>

		<!-- Stats -->
		<div
			class="mx-auto mt-8 grid max-w-3xl grid-cols-3 divide-x divide-orange-200/80 rounded-3xl bg-white/70 py-5 text-center shadow-sm"
			use:reveal
		>
			<div class="px-2">
				<div class="flex justify-center" aria-hidden="true">
					<span class="grid size-7 place-items-center rounded-full bg-flame text-[11px] font-bold text-white ring-2 ring-white">A</span>
					<span class="-ml-2 grid size-7 place-items-center rounded-full bg-cocoa text-[11px] font-bold text-white ring-2 ring-white">J</span>
					<span class="-ml-2 grid size-7 place-items-center rounded-full bg-gold text-[11px] font-bold text-white ring-2 ring-white">M</span>
				</div>
				<p class="mt-1.5 text-lg font-extrabold text-flame sm:text-xl">1.3 M+</p>
				<p class="text-[11px] font-semibold text-muted sm:text-xs">Customer reviews</p>
			</div>
			<div class="px-2">
				<p class="text-lg font-extrabold text-flame sm:text-xl">4.7 M+</p>
				<p class="text-[11px] font-semibold text-muted sm:text-xs">Active members</p>
			</div>
			<div class="px-2">
				<p class="text-lg font-extrabold text-flame sm:text-xl">3 day</p>
				<p class="text-[11px] font-semibold text-muted sm:text-xs">Delivery time</p>
			</div>
		</div>
	</div>
</section>

<!-- ============ COLLECTIONS ============ -->
<section id="collections" class="bg-peach/60 py-14 lg:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center" use:reveal>
			<h2 class="font-serif text-3xl font-bold text-ink sm:text-4xl">
				Our <span class="text-flame underline decoration-flame/50 decoration-2 underline-offset-8">Collections</span>
			</h2>
			<p class="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
				Six collections, one idea — furniture that makes an ordinary room feel considered.
			</p>
		</div>

		{#if filtered.length === 0}
			<div class="mx-auto mt-10 max-w-md rounded-3xl bg-white p-8 text-center shadow-sm" use:reveal>
				<p class="font-serif text-xl font-bold text-ink">Nothing matches “{query}”</p>
				<p class="mt-2 text-sm text-muted">Try “chair”, “couch”, “light” or “plant”.</p>
				<button
					type="button"
					class="mt-5 rounded-full bg-flame px-5 py-2.5 text-sm font-bold text-white"
					onclick={() => (query = '')}>Show all collections</button
				>
			</div>
		{:else}
			<div class="mt-10 grid gap-5 md:grid-cols-2">
				{#each large as c (c.slug)}
					<article class="group flex flex-col overflow-hidden rounded-3xl bg-flame shadow-lg shadow-orange-900/10" use:reveal>
						<div class="flex items-start justify-between gap-3 p-6 pb-4 sm:p-7 sm:pb-5">
							<h3 class="max-w-[240px] font-serif text-2xl leading-tight font-bold text-white sm:text-[28px]">{c.name}</h3>
							<span class="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-flame-dark shadow">
								Explore more <Icon name="arrow-right" class="size-3.5" />
							</span>
						</div>
						<div class="overflow-hidden">
							<img
								src={c.image}
								alt={c.alt}
								loading="lazy"
								class="h-64 w-full object-cover object-center transition duration-500 group-hover:scale-105 sm:h-72"
							/>
						</div>
						<div class="p-6 pt-5 sm:p-7 sm:pt-5">
							<p class="text-sm leading-relaxed text-white/90">{c.blurb}</p>
							<p class="mt-2 text-sm font-bold text-white">{c.priceNote}</p>
						</div>
					</article>
				{/each}
			</div>

			{#each wide as c (c.slug)}
				<article class="group mt-5 grid overflow-hidden rounded-3xl bg-flame shadow-lg shadow-orange-900/10 sm:grid-cols-[1fr_1.5fr]" use:reveal>
					<div class="flex flex-col justify-center p-6 sm:p-8">
						<h3 class="font-serif text-2xl leading-tight font-bold text-white sm:text-3xl">{c.name}</h3>
						<p class="mt-3 text-sm leading-relaxed text-white/90">{c.blurb}</p>
						<p class="mt-3 text-sm font-bold text-white">{c.priceNote}</p>
						<span class="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-flame-dark shadow">
							Explore more <Icon name="arrow-right" class="size-3.5" />
						</span>
					</div>
					<img
						src={c.image}
						alt={c.alt}
						loading="lazy"
						class="h-56 w-full object-cover sm:h-full sm:min-h-[280px]"
					/>
				</article>
			{/each}

			<div class="mt-5 grid gap-5 sm:grid-cols-3">
				{#each small as c (c.slug)}
					<article class="group overflow-hidden rounded-3xl bg-white shadow-md shadow-orange-900/5 transition hover:-translate-y-1 hover:shadow-xl" use:reveal>
						<div class="overflow-hidden">
							<img
								src={c.image}
								alt={c.alt}
								loading="lazy"
								class="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
							/>
						</div>
						<div class="bg-flame p-5 text-center text-white">
							<h3 class="font-serif text-xl font-bold">{c.name}</h3>
							<p class="mt-1 text-xs leading-relaxed text-white/85">{c.blurb}</p>
							<p class="mt-2 text-sm font-bold">{c.priceNote}</p>
							<span class="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-flame-dark shadow">
								Explore more <Icon name="arrow-right" class="size-3.5" />
							</span>
						</div>
					</article>
				{/each}
			</div>
		{/if}

		<!-- Trust features -->
		<div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" use:reveal>
			{#each features as f}
				<div class="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-sm">
					<span class="grid size-11 shrink-0 place-items-center rounded-xl bg-peach text-flame">
						<Icon name={f.icon} class="size-5" />
					</span>
					<div>
						<p class="text-sm font-bold text-ink">{f.title}</p>
						<p class="mt-1 text-xs leading-relaxed text-muted">{f.text}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ============ ABOUT ============ -->
<section id="about" class="py-14 lg:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
			<div use:reveal>
				<h2 class="text-center font-serif text-3xl font-bold text-flame sm:text-4xl lg:text-left">About Us</h2>
				<p class="mt-6 text-base leading-relaxed text-muted">
					We started Furniture in a small Covington workshop with one belief: a home
					should feel like the best version of itself. Fifteen years later we still
					build the same way — solid timber frames, hand-finished upholstery and
					lighting assembled by people who sign their work.
				</p>
				<p class="mt-4 text-base leading-relaxed text-muted">
					No flat-pack shortcuts, no disposable design. Every sofa, chair and pendant
					is made in small batches, checked twice, and delivered by our own team —
					so it arrives the way it left the workshop.
				</p>
				<div class="mt-6 grid grid-cols-3 gap-4 text-center lg:text-left">
					<div>
						<p class="text-2xl font-extrabold text-flame">15 yrs</p>
						<p class="text-xs font-semibold text-muted">Crafting furniture</p>
					</div>
					<div>
						<p class="text-2xl font-extrabold text-flame">120+</p>
						<p class="text-xs font-semibold text-muted">Artisans &amp; makers</p>
					</div>
					<div>
						<p class="text-2xl font-extrabold text-flame">98%</p>
						<p class="text-xs font-semibold text-muted">Would recommend us</p>
					</div>
				</div>
				<a
					href="#collections"
					class="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-flame-dark"
				>
					Explore more <Icon name="arrow-right" class="size-4" />
				</a>
			</div>
			<div class="relative" use:reveal>
				<div class="absolute inset-x-8 top-0 bottom-0 rounded-t-full bg-flame" aria-hidden="true"></div>
				<img
					src="/images/about-room.webp"
					alt="Burnt-orange velvet armchair in a room with an orange arched wall, black pendant lamp and framed artwork"
					loading="lazy"
					class="relative mx-auto aspect-[4/5] w-full max-w-md rounded-t-full object-cover shadow-2xl shadow-orange-900/25"
				/>
			</div>
		</div>

		<!-- CTA -->
		<div
			class="mt-16 overflow-hidden rounded-[2rem] bg-gradient-to-br from-flame-2 via-flame to-flame-deep px-6 py-12 text-center text-white shadow-2xl shadow-orange-900/20 sm:px-12"
			use:reveal
		>
			<h2 class="font-serif text-3xl font-bold sm:text-4xl">Your home deserves to feel luxury.</h2>
			<p class="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/90 sm:text-base">
				Browse the new collection today — 10% off your first order, free delivery over $499.
			</p>
			<a
				href="#collections"
				class="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-flame-dark shadow transition hover:bg-peach"
			>
				Shop the collection <Icon name="arrow-right" class="size-4" />
			</a>
		</div>
	</div>
</section>
