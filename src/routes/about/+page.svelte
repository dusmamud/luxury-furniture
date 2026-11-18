<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import CutoutPicture from '#lib/components/CutoutPicture.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { countup } from '#lib/actions/countup';

	const stats = [
		{ target: 15, decimals: 0, suffix: '', label: 'Years making furniture' },
		{ target: 120, decimals: 0, suffix: '+', label: 'Artisans & partners' },
		{ target: 98, decimals: 0, suffix: '%', label: 'Customers would recommend us' },
		{ target: 1.3, decimals: 1, suffix: 'M+', label: 'Happy customers' }
	];

	const values = [
		{ icon: 'truck', title: '3-day delivery', body: 'Most orders arrive within three days, tracked from our workshop to your door.' },
		{ icon: 'shield', title: '10-year warranty', body: 'Every frame is guaranteed for ten years. If it fails, we repair or replace it.' },
		{ icon: 'refresh', title: '30-day returns', body: 'Live with it for a month. If it is not right, we collect it and refund you.' },
		{ icon: 'leaf', title: 'Sustainably made', body: 'Responsibly sourced oak, recycled packaging and finishes that are safe at home.' }
	];

	const timeline = [
		{ year: '2011', title: 'Founded in Covington', body: 'A two-person workshop above a garage, building oak tables for neighbours.' },
		{ year: '2015', title: 'The showroom opens', body: '800 Winward Drive becomes our flagship — a place to sit, touch and try everything.' },
		{ year: '2019', title: 'Online store launches', body: 'The same workshop quality, now deliverable to every corner of Louisiana and beyond.' },
		{ year: '2023', title: '1 million customers', body: 'Our millionth order leaves the workshop — a Modern Couch bound for New Orleans.' },
		{ year: '2026', title: 'Our 10th collection', body: 'Ten collections in, and the rule has not changed: build it like it has to last.' }
	];
</script>

<svelte:head>
	<title>About Us — Furniture | Made to be lived in</title>
	<meta
		name="description"
		content="Furniture began in a Covington, LA workshop in 2011. Kiln-dried hardwood, hand-finished pieces, a 10-year frame warranty and 1.3M+ happy customers."
	/>
	<link
		rel="preload"
		as="image"
		href="/images/about-room.webp"
		imagesrcset="/images/about-room-800.webp 800w, /images/about-room.webp 1920w"
		imagesizes="(max-width: 1024px) 100vw, 600px"
		fetchpriority="high"
	/>
</svelte:head>

<!-- Hero -->
<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 pt-12 pb-10 sm:px-6 sm:pt-16 lg:px-8">
		<div class="grid items-center gap-10 lg:grid-cols-2">
			<div>
				<p class="hero-anim text-sm font-bold tracking-[0.2em] text-flame-deep uppercase" style="--d: 0ms">Our story</p>
				<h1
					class="hero-anim mt-3 font-display text-4xl leading-[1.08] font-semibold text-ink sm:text-5xl lg:text-6xl"
					style="--d: 80ms"
				>
					Furniture, made to be lived in.
				</h1>
				<p class="hero-anim mt-5 max-w-xl text-lg leading-relaxed text-muted" style="--d: 160ms">
					We started in a small Covington workshop with one belief: furniture should be beautiful enough
					for the showroom and tough enough for real life — kids, dogs, Sunday dinners and all.
				</p>
				<div class="hero-anim mt-8 flex flex-wrap gap-3" style="--d: 240ms">
					<a
						href="/shop"
						class="inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
					>
						Shop the collection <Icon name="arrow-right" class="size-4" />
					</a>
					<a
						href="/showrooms"
						class="inline-flex min-h-11 items-center gap-2 rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-bold text-ink transition hover:border-flame hover:text-flame-deep"
					>
						Visit a showroom
					</a>
				</div>
			</div>
			<div class="hero-anim relative" style="--d: 200ms">
				<div class="overflow-hidden rounded-[2rem]">
					<img
						src="/images/about-room.webp"
						srcset="/images/about-room-800.webp 800w, /images/about-room.webp 1920w"
						sizes="(max-width: 1024px) 100vw, 600px"
						width="1920"
						height="1280"
						alt="A bright living room furnished with a modern couch, plants and warm wooden furniture"
						class="aspect-[4/3] w-full object-cover"
						loading="eager"
						fetchpriority="high"
					/>
				</div>
				<div
					class="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lg sm:left-8"
				>
					<span class="grid size-11 shrink-0 place-items-center rounded-full bg-peach text-flame-deep">
						<Icon name="sofa" class="size-5" />
					</span>
					<p class="text-sm leading-snug font-semibold text-ink">
						Est. 2011 · Covington, Louisiana<br />
						<span class="font-normal text-muted">Workshop to showroom, under one roof.</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Stats band -->
<section class="bg-flame-dark">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 gap-8 lg:grid-cols-4">
			{#each stats as s, i}
				<div class="reveal text-center" use:reveal style="--rd: {i * 80}ms">
					<p class="font-display text-4xl font-bold text-white sm:text-5xl">
						<span use:countup data-target={s.target} data-decimals={s.decimals} data-suffix={s.suffix}
							>{s.target}{s.suffix}</span
						>
					</p>
					<p class="mt-2 text-sm font-medium text-white/80">{s.label}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Craftsmanship -->
<section class="bg-white">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="grid items-center gap-10 lg:grid-cols-2">
			<div class="reveal" use:reveal>
				<p class="text-sm font-bold tracking-[0.2em] text-flame-deep uppercase">Craftsmanship</p>
				<h2 class="mt-3 font-display text-3xl leading-tight font-semibold text-ink sm:text-4xl">
					Built slowly, on purpose.
				</h2>
				<p class="mt-4 leading-relaxed text-muted">
					Every piece starts as kiln-dried hardwood — dried slowly so it never warps, cracks or loosens
					over time. Joints are glued and screwed, not just stapled. Cushions are feather-wrapped
					high-resilience foam, and every surface is hand-finished and inspected before it leaves the
					workshop.
				</p>
				<ul class="mt-6 space-y-3">
					{#each ['Kiln-dried hardwood frames, dried for stability', 'Hand-finished in small batches — never mass-run', 'Stain-resistant, family-proof fabrics', '10-year frame warranty on every piece'] as item}
						<li class="flex items-start gap-3 text-sm font-medium text-cocoa">
							<span class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-peach text-flame-deep">
								<Icon name="check" class="size-3.5" />
							</span>
							{item}
						</li>
					{/each}
				</ul>
			</div>
			<div class="reveal relative overflow-hidden rounded-[2rem] bg-peach px-8 pt-10 pb-0" use:reveal style="--rd: 120ms">
				<div class="cutout-zoom mx-auto max-w-sm">
					<CutoutPicture stem="modern-sofa" alt="Modern three-seater sofa, hand-finished in solid oak and performance fabric" eager={true} />
				</div>
				<p class="pb-6 text-center text-sm font-semibold text-muted">
					The Modern Couch — our best-loved three-seater since 2019
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Values -->
<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="reveal max-w-2xl" use:reveal>
			<p class="text-sm font-bold tracking-[0.2em] text-flame-deep uppercase">What we stand for</p>
			<h2 class="mt-3 font-display text-3xl leading-tight font-semibold text-ink sm:text-4xl">
				Good furniture, honest promises.
			</h2>
		</div>
		<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each values as v, i}
				<div
					class="reveal lift rounded-3xl border border-orange-100 bg-white p-6"
					use:reveal
					style="--rd: {i * 80}ms"
				>
					<span class="grid size-12 place-items-center rounded-2xl bg-peach text-flame-deep">
						<Icon name={v.icon} class="size-6" />
					</span>
					<h3 class="mt-4 font-display text-lg font-semibold text-ink">{v.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Timeline -->
<section class="bg-white">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="reveal max-w-2xl" use:reveal>
			<p class="text-sm font-bold tracking-[0.2em] text-flame-deep uppercase">The journey</p>
			<h2 class="mt-3 font-display text-3xl leading-tight font-semibold text-ink sm:text-4xl">
				Fifteen years, one workshop.
			</h2>
		</div>
		<ol class="relative mt-10 space-y-8 border-l-2 border-peach-2 pl-8">
			{#each timeline as t, i}
				<li class="reveal relative" use:reveal style="--rd: {i * 80}ms">
					<span
						class="absolute top-1 -left-8 grid size-8 -translate-x-1/2 place-items-center rounded-full bg-flame-dark font-display text-xs font-bold text-white"
						aria-hidden="true">{i + 1}</span
					>
					<p class="font-display text-sm font-bold text-flame-deep">{t.year}</p>
					<h3 class="mt-1 font-display text-xl font-semibold text-ink">{t.title}</h3>
					<p class="mt-1 max-w-2xl text-sm leading-relaxed text-muted">{t.body}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- CTA -->
<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
		<div class="reveal overflow-hidden rounded-[2rem] bg-ink px-6 py-12 text-center sm:px-12" use:reveal>
			<h2 class="font-display text-3xl font-semibold text-white sm:text-4xl">Come see it in person.</h2>
			<p class="mx-auto mt-3 max-w-xl leading-relaxed text-white/70">
				The best way to choose furniture is to sit on it. Visit our Covington flagship or browse the full
				collection online — either way, it is made to be lived in.
			</p>
			<div class="mt-7 flex flex-wrap justify-center gap-3">
				<a
					href="/shop"
					class="inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
				>
					Shop the collection <Icon name="arrow-right" class="size-4" />
				</a>
				<a
					href="/contact"
					class="inline-flex min-h-11 items-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:border-white"
				>
					Talk to us
				</a>
			</div>
		</div>
	</div>
</section>
