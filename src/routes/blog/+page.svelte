<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { articles } from '#lib/data/blog';
	import { photoDims, photoSrcset } from '#lib/data/products';
</script>

<svelte:head>
	<title>Journal — Furniture | Sofa guides, styling &amp; oak care</title>
	<meta
		name="description"
		content="The Furniture journal — how to choose the right sofa size, five ways to style a small living room, and a simple guide to caring for solid oak."
	/>
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8">
		<div class="reveal max-w-2xl" use:reveal>
			<p class="text-sm font-bold tracking-[0.2em] text-flame-deep uppercase">Journal</p>
			<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-ink sm:text-5xl">
				Notes from the workshop.
			</h1>
			<p class="mt-4 text-lg leading-relaxed text-muted">
				Practical guides from the people who make the furniture — sizing, styling and keeping oak beautiful
				for decades.
			</p>
		</div>

		<div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each articles as a, i}
				<article
					class="reveal lift group flex flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white"
					use:reveal
					style="--rd: {i * 100}ms"
				>
					<a href="/blog/{a.slug}" class="block overflow-hidden" aria-label={a.title}>
						<img
							src={a.cover}
							alt={a.coverAlt}
							class="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
							srcset={photoSrcset(a.cover)}
							sizes="(max-width: 768px) 100vw, 400px"
							width={photoDims(a.cover)?.width}
							height={photoDims(a.cover)?.height}
							loading={i === 0 ? 'eager' : 'lazy'}
						/>
					</a>
					<div class="flex flex-1 flex-col p-6">
						<p class="text-xs font-bold tracking-wide text-flame-deep uppercase">
							{a.date} · {a.readTime}
						</p>
						<h2 class="mt-2 font-display text-xl leading-snug font-semibold text-ink">
							<a href="/blog/{a.slug}" class="hover:text-flame-deep">{a.title}</a>
						</h2>
						<p class="mt-2 flex-1 text-sm leading-relaxed text-muted">{a.excerpt}</p>
						<a
							href="/blog/{a.slug}"
							class="mt-5 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-flame-deep hover:text-flame-deep"
						>
							Read the article <Icon name="arrow-right" class="size-4 transition group-hover:translate-x-1" />
						</a>
					</div>
				</article>
			{/each}
		</div>

		<div class="reveal mt-12 rounded-[2rem] bg-ink px-6 py-10 text-center sm:px-12" use:reveal>
			<h2 class="font-display text-2xl font-semibold text-white sm:text-3xl">Read it, then try it in person.</h2>
			<p class="mx-auto mt-2 max-w-md leading-relaxed text-white/70">
				Every piece in these guides is on the floor at our Covington showroom — bring the tape measure, we
				will bring the coffee.
			</p>
			<a
				href="/showrooms"
				class="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
			>
				Plan a visit <Icon name="arrow-right" class="size-4" />
			</a>
		</div>
	</div>
</section>
