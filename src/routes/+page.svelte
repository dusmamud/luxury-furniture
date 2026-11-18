<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import CutoutPicture from '#lib/components/CutoutPicture.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { reveal } from '../lib/actions/reveal';
	import { countup } from '../lib/actions/countup';
	import { collections, type Collection } from '../lib/data/collections';
	import { products, rooms, photoSrcset, photoDims } from '#lib/data/products';
	import { goto } from '$app/navigation';

	let query = $state('');
	const filtered = $derived(
		collections.filter((c: Collection) =>
			`${c.name} ${c.blurb}`.toLowerCase().includes(query.trim().toLowerCase())
		)
	);
	const large = $derived(filtered.filter((c: Collection) => c.size === 'large'));
	const wide = $derived(filtered.filter((c: Collection) => c.size === 'wide'));
	const small = $derived(filtered.filter((c: Collection) => c.size === 'small'));

	const bestsellers = products
		.filter((p) => ['modern-couches', 'hanging-light', 'outdoor-lounge-chair', 'modern-chair'].includes(p.id))
		.sort((a, b) => b.reviewCount - a.reviewCount);

	const journal = [
		{
			slug: 'how-to-choose-sofa-size',
			title: 'How to choose the right sofa size',
			excerpt: 'Measure the room, not the sofa — the two-thirds rule, seat depth, and the doorway test.',
			date: 'Nov 10, 2026',
			readTime: '6 min read',
			cover: '/images/modern-couch.webp'
		},
		{
			slug: 'style-small-living-room',
			title: '5 ways to style a small living room',
			excerpt: 'Scale, legs, mirrors, vertical storage — and one statement piece that does the talking.',
			date: 'Oct 28, 2026',
			readTime: '5 min read',
			cover: '/images/about-room.webp'
		},
		{
			slug: 'caring-for-solid-oak',
			title: 'Caring for solid oak: a simple guide',
			excerpt: 'Dusting, spills, yearly re-oiling and sun — keep your oak rich for decades.',
			date: 'Oct 14, 2026',
			readTime: '4 min read',
			cover: '/images/dining-table.webp'
		}
	];

	const testimonials = [
		{
			name: 'Maya Richardson',
			detail: 'Verified buyer — Modern Couch',
			quote: 'We have owned it for eight months and it still looks new. The cushions have not sagged at all, and the fabric really does wipe clean.'
		},
		{
			name: 'Daniel Kim',
			detail: 'Verified buyer — Haven Oak Dining Table',
			quote: 'The grain is beautiful and the finish feels like furniture, not plastic. Six chairs fit with room to spare — it is the table our house needed.'
		},
		{
			name: 'Sofia Martinez',
			detail: 'Verified buyer — Bamboo Swing Chair',
			quote: 'The sway is gentle and the cushions are deep. My kids fight over it every evening. I should have bought two.'
		}
	];

	function goSearch(e: SubmitEvent) {
		e.preventDefault();
		const q = query.trim();
		goto(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
	}

	const features = [
		{ icon: 'truck', title: '3-day delivery', text: 'White-glove delivery, room of your choice.' },
		{ icon: 'shield', title: '10-year warranty', text: 'Frames, springs and joinery — covered.' },
		{ icon: 'refresh', title: '30-day returns', text: 'Changed your mind? We collect it free.' },
		{ icon: 'leaf', title: 'Sustainably made', text: 'FSC timber, recycled fabrics, low-VOC finishes.' }
	];
</script>

<!-- ============ HERO — same-to-same as the reference ============ -->
<svelte:head>
	<link
		rel="preload"
		as="image"
		imagesrcset="/images/cutouts/sofa-400.avif 400w, /images/cutouts/sofa.avif 666w"
		imagesizes="(max-width: 768px) 90vw, 600px"
		fetchpriority="high"
	/>
</svelte:head>
<section id="home" class="relative overflow-hidden">
	<!-- Diagonal orange shape (top-left only, so the headline sits on cream)
	     over a wider peach band, like the reference -->
	<div
		class="absolute top-0 left-0 h-[340px] w-[68%] bg-peach-2 sm:h-[430px] sm:w-[62%] lg:h-[560px] lg:w-[56%] [clip-path:polygon(0_0,100%_0,90%_100%,0_90%)]"
		aria-hidden="true"
	></div>
	<div
		class="absolute top-0 left-0 h-[300px] w-[52%] bg-flame sm:h-[380px] sm:w-[48%] lg:h-[500px] lg:w-[44%] [clip-path:polygon(0_0,100%_0,84%_100%,0_82%)]"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto max-w-7xl px-4 pt-6 pb-10 sm:px-6 lg:px-8 lg:pt-10 lg:pb-16">
		<!-- Hanging lamp, swinging gently above the sofa -->
		<svg
			class="lamp-swing absolute top-0 left-[16%] h-16 w-8 sm:left-[20%] sm:h-24 sm:w-12 lg:left-[22%]"
			viewBox="0 0 48 96"
			fill="none"
			aria-hidden="true"
		>
			<line x1="24" y1="0" x2="24" y2="62" stroke="#2b1a12" stroke-width="2" />
			<path d="M6 96c0-10 8-18 18-18s18 8 18 18H6Z" fill="#2b1a12" />
			<ellipse cx="24" cy="96" rx="14" ry="3" fill="#f4531a" opacity="0.5" />
		</svg>

		<div class="grid grid-cols-[1.25fr_1fr] items-center gap-3 sm:grid-cols-[1.1fr_1fr] sm:gap-8 lg:grid-cols-2 lg:gap-12">
			<!-- Transparent sofa cutout floating on the orange shape -->
			<div class="hero-anim pt-10 sm:pt-14 lg:pt-16" style="--d: 80ms">
				<CutoutPicture
					stem="sofa"
					alt="White three-seater sofa with burnt-orange cushions and a wooden coffee table"
					cls="w-full animate-float drop-shadow-[0_24px_28px_rgba(43,26,18,0.35)]"
					eager
					sizes="(max-width: 768px) 90vw, 600px"
				/>
			</div>

			<div>
				<h1
					class="hero-anim font-display text-[26px] leading-[1.1] font-semibold text-flame sm:text-5xl lg:text-[64px] lg:leading-[1.05]"
					style="--d: 160ms"
				>
					Make you<br />feel luxury
				</h1>
				<p
					class="hero-anim mt-3 max-w-sm text-[11px] leading-relaxed text-muted sm:mt-5 sm:text-base lg:text-lg"
					style="--d: 260ms"
				>
					Sofas, chairs and lighting crafted by hand, in small batches — solid timber,
					feather-wrapped cushions and fabrics made to be lived in, not just looked at.
				</p>
				<div class="hero-anim mt-4 sm:mt-7" style="--d: 360ms">
					<a
						href="/shop"
						class="group inline-flex min-h-10 items-center gap-2 rounded-full bg-flame-dark px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-flame-deep sm:min-h-11 sm:px-6 sm:py-3 sm:text-sm"
					>
						Shop now
						<Icon
							name="arrow-right"
							class="size-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:size-4"
						/>
					</a>
				</div>
			</div>
		</div>

		<!-- Search -->
		<form class="mx-auto mt-10 max-w-xl" use:reveal onsubmit={goSearch}>
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
						class="shrink-0 rounded-full bg-peach px-4 py-2 text-xs font-bold text-flame-deep"
						onclick={() => (query = '')}>Clear</button
					>
				{/if}
				<button type="submit" class="shrink-0 rounded-full bg-flame-dark px-5 py-2.5 text-xs font-bold text-white transition hover:bg-flame-deep sm:text-sm">Search</button>
			</div>
			{#if query}
				<p class="mt-2 text-center text-xs font-semibold text-muted">
					{filtered.length} {filtered.length === 1 ? 'collection' : 'collections'} matching “{query}” — press Search to see all products
				</p>
			{/if}
		</form>

		<!-- Stats -->
		<div
			class="mx-auto mt-8 grid max-w-3xl grid-cols-3 divide-x divide-orange-200/80 rounded-3xl bg-white/70 py-5 text-center shadow-sm"
			use:reveal
		>
			<div class="px-2">
				<div class="flex justify-center" aria-hidden="true">
					<span class="grid size-7 place-items-center rounded-full bg-flame-dark text-[11px] font-bold text-white ring-2 ring-white">A</span>
					<span class="-ml-2 grid size-7 place-items-center rounded-full bg-cocoa text-[11px] font-bold text-white ring-2 ring-white">J</span>
					<span class="-ml-2 grid size-7 place-items-center rounded-full bg-gold text-[11px] font-bold text-white ring-2 ring-white">M</span>
				</div>
				<p class="mt-1.5 text-lg font-extrabold text-flame-deep sm:text-xl">
					<span use:countup data-target="1.3" data-decimals="1" data-suffix=" M+">1.3 M+</span>
				</p>
				<p class="text-[11px] font-semibold text-muted sm:text-xs">Customer reviews</p>
			</div>
			<div class="px-2">
				<p class="text-lg font-extrabold text-flame-deep sm:text-xl">
					<span use:countup data-target="4.7" data-decimals="1" data-suffix=" M+">4.7 M+</span>
				</p>
				<p class="text-[11px] font-semibold text-muted sm:text-xs">Active members</p>
			</div>
			<div class="px-2">
				<p class="text-lg font-extrabold text-flame-deep sm:text-xl">
					<span use:countup data-target="3" data-decimals="0" data-suffix=" day">3 day</span>
				</p>
				<p class="text-[11px] font-semibold text-muted sm:text-xs">Delivery time</p>
			</div>
		</div>
	</div>
</section>

<!-- ============ BESTSELLERS ============ -->
<section class="py-14 lg:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-wrap items-end justify-between gap-4" use:reveal>
			<div>
				<h2 class="font-display text-3xl font-semibold text-ink sm:text-4xl">
					Bestsellers <span class="text-flame-deep">loved at home</span>
				</h2>
				<p class="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
					The pieces our customers buy, keep and recommend — rated 4.7 and above.
				</p>
			</div>
			<a href="/shop" class="group inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-flame px-6 py-3 text-sm font-bold text-flame-deep transition hover:bg-flame-dark hover:text-white">
				Shop all furniture <Icon name="arrow-right" class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
			</a>
		</div>
		<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each bestsellers as p, i (p.id)}
				<ProductCard product={p} delay={i * 80} />
			{/each}
		</div>
	</div>
</section>

<!-- ============ COLLECTIONS ============ -->
<section id="collections" class="bg-peach/60 py-14 lg:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center" use:reveal>
			<h2 class="font-display text-3xl font-semibold text-ink sm:text-4xl">
				Our <span class="text-flame-deep underline decoration-flame/50 decoration-2 underline-offset-8">Collections</span>
			</h2>
			<p class="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
				Six collections, one idea — furniture that makes an ordinary room feel considered.
			</p>
		</div>

		{#if filtered.length === 0}
			<div class="mx-auto mt-10 max-w-md rounded-3xl bg-white p-8 text-center shadow-sm" use:reveal>
				<p class="font-display text-xl font-semibold text-ink">Nothing matches “{query}”</p>
				<p class="mt-2 text-sm text-muted">Try “chair”, “couch”, “light” or “plant”.</p>
				<button
					type="button"
					class="mt-5 rounded-full bg-flame-dark px-5 py-2.5 text-sm font-bold text-white"
					onclick={() => (query = '')}>Show all collections</button
				>
			</div>
		{:else}
			<div class="mt-10 grid gap-5 md:grid-cols-2">
				{#each large as c, i (c.slug)}
					<article
						class="lift group flex flex-col overflow-hidden rounded-3xl bg-flame-dark shadow-lg shadow-orange-900/10"
						use:reveal
						style="--rd: {i * 80}ms"
					>
						<div class="flex items-start justify-between gap-3 p-6 pb-2 sm:p-7 sm:pb-3">
							<h3 class="max-w-[240px] font-display text-2xl leading-tight font-semibold text-white sm:text-[28px]">{c.name}</h3>
							<a href="/product/{c.slug}" aria-label="Explore {c.name}" class="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-flame-deep shadow">
								Explore more <Icon name="arrow-right" class="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
							</a>
						</div>
						<div class="px-6 pb-2 sm:px-8">
							<CutoutPicture
								stem={c.cutout}
								alt={c.alt}
								cls="cutout-zoom mx-auto h-60 w-full object-contain drop-shadow-[0_18px_22px_rgba(43,26,18,0.35)] sm:h-72"
							/>
						</div>
						<div class="p-6 pt-4 sm:p-7 sm:pt-4">
							<p class="text-sm leading-relaxed text-white">{c.blurb}</p>
							<p class="mt-2 text-sm font-bold text-white">{c.priceNote}</p>
						</div>
					</article>
				{/each}
			</div>

			{#each wide as c (c.slug)}
				<article class="lift group mt-5 grid overflow-hidden rounded-3xl bg-flame-dark shadow-lg shadow-orange-900/10 sm:grid-cols-[1fr_1.5fr]" use:reveal>
					<div class="flex flex-col justify-center p-6 sm:p-8">
						<h3 class="font-display text-2xl leading-tight font-semibold text-white sm:text-3xl">{c.name}</h3>
						<p class="mt-3 text-sm leading-relaxed text-white">{c.blurb}</p>
						<p class="mt-3 text-sm font-bold text-white">{c.priceNote}</p>
						<a href="/product/{c.slug}" aria-label="Explore {c.name}" class="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-flame-deep shadow">
							Explore more <Icon name="arrow-right" class="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
						</a>
					</div>
					<div class="relative flex items-end justify-center p-4 pb-0 sm:p-6 sm:pb-0">
						<CutoutPicture
							stem={c.cutout}
							alt={c.alt}
							cls="cutout-zoom max-h-64 w-full object-contain drop-shadow-[0_18px_22px_rgba(43,26,18,0.35)] sm:max-h-[320px]"
						/>
						<CutoutPicture
							stem="plant"
							alt=""
							cls="pointer-events-none absolute -right-1 bottom-0 hidden h-40 w-auto object-contain drop-shadow-[0_12px_16px_rgba(43,26,18,0.3)] sm:block lg:h-52"
						/>
					</div>
				</article>
			{/each}

			<div class="mt-5 grid gap-5 sm:grid-cols-3">
				{#each small as c, i (c.slug)}
					<article
						class="lift group overflow-hidden rounded-3xl bg-peach shadow-md shadow-orange-900/5 hover:shadow-xl"
						use:reveal
						style="--rd: {i * 80}ms"
					>
						<div class="bg-cream px-4 pt-6">
							<CutoutPicture
								stem={c.cutout}
								alt={c.alt}
								cls="cutout-zoom mx-auto h-44 w-full object-contain drop-shadow-[0_16px_18px_rgba(43,26,18,0.25)]"
							/>
						</div>
						<div class="bg-flame-dark p-5 text-center text-white">
							<h3 class="font-display text-xl font-semibold">{c.name}</h3>
							<p class="mt-1 text-xs leading-relaxed text-white">{c.blurb}</p>
							<p class="mt-2 text-sm font-bold">{c.priceNote}</p>
							<a href="/product/{c.slug}" aria-label="Explore {c.name}" class="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-flame-deep shadow">
								Explore more <Icon name="arrow-right" class="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
							</a>
						</div>
					</article>
				{/each}
			</div>
		{/if}

		<!-- Trust features -->
		<div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" use:reveal>
			{#each features as f}
				<div class="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-sm">
					<span class="grid size-11 shrink-0 place-items-center rounded-xl bg-peach text-flame-deep">
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

<!-- ============ SHOP BY ROOM ============ -->
<section class="py-14 lg:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center" use:reveal>
			<h2 class="font-display text-3xl font-semibold text-ink sm:text-4xl">
				Shop by <span class="text-flame-deep">room</span>
			</h2>
			<p class="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
				Start with the room, and the right pieces follow.
			</p>
		</div>
		<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
			{#each rooms as r, i (r.slug)}
				<a href="/rooms/{r.slug}" class="lift group overflow-hidden rounded-3xl bg-white shadow-md shadow-orange-900/5" use:reveal style="--rd: {i * 80}ms">
					<div class="relative aspect-[4/3] overflow-hidden">
						<img
							src={r.photo}
							alt={r.name}
							loading="lazy"
							srcset={photoSrcset(r.photo)}
							sizes="(max-width: 640px) 50vw, 256px"
							width={photoDims(r.photo)?.width}
							height={photoDims(r.photo)?.height}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<span class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/60 to-transparent" aria-hidden="true"></span>
						<span class="absolute bottom-3 left-4 font-display text-lg font-semibold text-white">{r.name}</span>
					</div>
					<p class="px-4 py-3 text-xs leading-relaxed text-muted">{r.blurb}</p>
				</a>
			{/each}
		</div>
		<div class="mt-8 text-center" use:reveal>
			<a href="/rooms" class="group inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-flame px-6 py-3 text-sm font-bold text-flame-deep transition hover:bg-flame-dark hover:text-white">
				All rooms <Icon name="arrow-right" class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
			</a>
		</div>
	</div>
</section>

<!-- ============ ABOUT ============ -->
<section id="about" class="py-14 lg:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
			<div use:reveal>
				<h2 class="text-center font-display text-3xl font-semibold text-flame sm:text-4xl lg:text-left">About Us</h2>
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
						<p class="text-2xl font-extrabold text-flame">
							<span use:countup data-target="15" data-decimals="0" data-suffix=" yrs">15 yrs</span>
						</p>
						<p class="text-xs font-semibold text-muted">Crafting furniture</p>
					</div>
					<div>
						<p class="text-2xl font-extrabold text-flame">
							<span use:countup data-target="120" data-decimals="0" data-suffix="+">120+</span>
						</p>
						<p class="text-xs font-semibold text-muted">Artisans &amp; makers</p>
					</div>
					<div>
						<p class="text-2xl font-extrabold text-flame">
							<span use:countup data-target="98" data-decimals="0" data-suffix="%">98%</span>
						</p>
						<p class="text-xs font-semibold text-muted">Would recommend us</p>
					</div>
				</div>
				<a
					href="/about"
					class="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-flame-deep"
				>
					Our story <Icon name="arrow-right" class="size-4" />
				</a>
			</div>
			<div class="relative" use:reveal>
				<div class="absolute inset-x-8 top-0 bottom-0 rounded-t-full bg-flame" aria-hidden="true"></div>
				<img
					src="/images/about-room.webp"
					alt="Burnt-orange velvet armchair in a room with an orange arched wall, black pendant lamp and framed artwork"
					loading="lazy"
					srcset={photoSrcset('/images/about-room.webp')}
					sizes="(max-width: 1024px) 100vw, 448px"
					width={photoDims('/images/about-room.webp')?.width}
					height={photoDims('/images/about-room.webp')?.height}
					class="relative mx-auto aspect-[4/5] w-full max-w-md rounded-t-full object-cover shadow-2xl shadow-orange-900/25"
				/>
			</div>
		</div>

		<!-- CTA -->
		<div
			class="mt-16 overflow-hidden rounded-[2rem] bg-gradient-to-br from-flame-2 via-flame to-flame-deep px-6 py-12 text-center text-white shadow-2xl shadow-orange-900/20 sm:px-12"
			use:reveal
		>
			<h2 class="font-display text-3xl font-semibold sm:text-4xl">Your home deserves to feel luxury.</h2>
			<p class="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/90 sm:text-base">
				Browse the new collection today — 10% off your first order, free delivery over $499.
			</p>
			<a
				href="/shop"
				class="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-flame-deep shadow transition hover:bg-peach"
			>
				Shop the collection <Icon name="arrow-right" class="size-4" />
			</a>
		</div>
	</div>
</section>

<!-- ============ TESTIMONIALS ============ -->
<section class="bg-peach/60 py-14 lg:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center" use:reveal>
			<h2 class="font-display text-3xl font-semibold text-ink sm:text-4xl">
				What our <span class="text-flame-deep">homes say</span>
			</h2>
			<p class="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
				1.3M+ reviews, 4.8 out of 5 on average — from real living rooms.
			</p>
		</div>
		<div class="mt-10 grid gap-5 md:grid-cols-3">
			{#each testimonials as t, i (t.name)}
				<figure class="lift rounded-3xl bg-white p-6 shadow-sm" use:reveal style="--rd: {i * 80}ms">
					<div class="flex items-center gap-1 text-gold" role="img" aria-label="5 out of 5 stars">
						<Icon name="star" class="size-4" /><Icon name="star" class="size-4" /><Icon name="star" class="size-4" /><Icon name="star" class="size-4" /><Icon name="star" class="size-4" />
					</div>
					<blockquote class="mt-4 text-sm leading-relaxed text-cocoa">“{t.quote}”</blockquote>
					<figcaption class="mt-5 border-t border-orange-100 pt-4">
						<p class="text-sm font-bold text-ink">{t.name}</p>
						<p class="mt-0.5 text-xs text-muted">{t.detail}</p>
					</figcaption>
				</figure>
			{/each}
		</div>
	</div>
</section>

<!-- ============ JOURNAL ============ -->
<section class="py-14 lg:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-wrap items-end justify-between gap-4" use:reveal>
			<div>
				<h2 class="font-display text-3xl font-semibold text-ink sm:text-4xl">
					From the <span class="text-flame-deep">journal</span>
				</h2>
				<p class="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
					Guides for choosing, styling and caring for furniture that lasts.
				</p>
			</div>
			<a href="/blog" class="group inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-flame px-6 py-3 text-sm font-bold text-flame-deep transition hover:bg-flame-dark hover:text-white">
				Read the journal <Icon name="arrow-right" class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
			</a>
		</div>
		<div class="mt-10 grid gap-5 md:grid-cols-3">
			{#each journal as j, i (j.slug)}
				<a href="/blog/{j.slug}" class="lift group overflow-hidden rounded-3xl bg-white shadow-md shadow-orange-900/5" use:reveal style="--rd: {i * 80}ms">
					<div class="aspect-[16/10] overflow-hidden">
						<img
							src={j.cover}
							alt={j.title}
							loading="lazy"
							srcset={photoSrcset(j.cover)}
							sizes="(max-width: 768px) 100vw, 400px"
							width={photoDims(j.cover)?.width}
							height={photoDims(j.cover)?.height}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
					</div>
					<div class="p-5">
						<p class="text-xs font-semibold text-muted">{j.date} · {j.readTime}</p>
						<h3 class="mt-2 font-display text-lg leading-snug font-semibold text-ink group-hover:text-flame-deep">{j.title}</h3>
						<p class="mt-2 text-sm leading-relaxed text-muted">{j.excerpt}</p>
						<span class="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-flame-deep">
							Read more <Icon name="arrow-right" class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
						</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
