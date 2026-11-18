<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import CutoutPicture from '#lib/components/CutoutPicture.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { categories, productsInCategory } from '#lib/data/products';
</script>

<svelte:head>
	<title>Categories — Furniture | Sofas, Chairs &amp; Tables</title>
	<meta
		name="description"
		content="Browse furniture by category: sofas and couches, chairs, tables, lighting, storage, bedroom, outdoor and decor. Free shipping over $499."
	/>
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 lg:px-8">
		<div class="reveal max-w-2xl" use:reveal>
			<p class="hero-anim text-sm font-bold tracking-[0.2em] text-flame-deep uppercase">Categories</p>
			<h1 class="mt-3 font-display text-4xl leading-[1.08] font-semibold text-ink sm:text-5xl">
				Find your piece
			</h1>
			<p class="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
				Every collection, one place — from deep-seat sofas to warm pendant light. Pick a category and start
				exploring.
			</p>
		</div>

		<div class="mt-10 grid gap-5 pb-14 sm:grid-cols-2 lg:grid-cols-4 lg:pb-20">
			{#each categories as c, i (c.slug)}
				{@const count = productsInCategory(c.slug).length}
				<a
					href="/categories/{c.slug}"
					class="reveal lift group relative flex flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white"
					use:reveal
					style="--rd: {(i % 4) * 80}ms"
				>
					<span class="relative block bg-cream px-6 pt-6 pb-2">
						<span class="cutout-zoom mx-auto block aspect-square max-w-[220px]">
							<CutoutPicture stem={c.cutout} alt={c.name} sizes="220px" />
						</span>
					</span>
					<span class="flex flex-1 flex-col px-5 pt-3 pb-5">
						<span class="font-display text-xl leading-snug font-semibold text-ink group-hover:text-flame-deep">
							{c.name}
						</span>
						<span class="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{c.blurb}</span>
						<span class="mt-auto flex items-center justify-between pt-4 text-sm font-bold text-flame-deep">
							{count} {count === 1 ? 'piece' : 'pieces'}
							<span class="inline-flex items-center gap-1">
								Shop now
								<Icon name="arrow-right" class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
							</span>
						</span>
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>
