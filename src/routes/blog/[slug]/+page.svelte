<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { articles, isoDate } from '#lib/data/blog';
	import { products, photoDims, photoSrcset } from '#lib/data/products';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const article = $derived(data.article);
	const relatedProducts = $derived(
		(article?.related ?? [])
			.map((slug) => products.find((p) => p.slug === slug))
			.filter((p) => p !== undefined)
	);
	const others = $derived(articles.filter((a) => a.slug !== data.article?.slug));
	const articleJsonLd = $derived(
		article
			? {
					'@context': 'https://schema.org',
					'@type': 'BlogPosting',
					headline: article.title,
					description: article.excerpt,
					image: `https://luxury-furniture.pages.dev${article.cover}`,
					datePublished: isoDate(article.date),
					author: {
						'@type': 'Organization',
						name: 'Furniture',
						url: 'https://luxury-furniture.pages.dev'
					},
					publisher: {
						'@type': 'Organization',
						name: 'Furniture',
						url: 'https://luxury-furniture.pages.dev'
					}
				}
			: undefined
	);
	const coverSrcset = $derived(article ? photoSrcset(article.cover) : undefined);
	const coverDims = $derived(article ? photoDims(article.cover) : undefined);
</script>

<svelte:head>
	<title>{article ? `${article.title} — Furniture Journal` : 'Article not found — Furniture Journal'}</title>
	<meta name="description" content={article ? article.excerpt : 'This journal article could not be found.'} />
	{#if !article}<meta name="robots" content="noindex" />{/if}
	{#if coverSrcset}
		<link rel="preload" as="image" imagesrcset={coverSrcset} imagesizes="(max-width: 1024px) 100vw, 896px" fetchpriority="high" />
	{/if}
	{#if articleJsonLd}
		{@html `<script type="application/ld+json">${JSON.stringify(articleJsonLd)}</script>`}
	{/if}
</svelte:head>

{#if article}
	<article class="bg-cream">
		<div class="mx-auto max-w-4xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8">
			<a
				href="/blog"
				class="reveal inline-flex min-h-11 items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-2.5 text-sm font-bold text-ink transition hover:border-flame hover:text-flame-deep"
				use:reveal
			>
				<Icon name="arrow-right" class="size-4 rotate-180" /> Back to the journal
			</a>

			<header class="reveal mt-8" use:reveal>
				<p class="text-xs font-bold tracking-[0.2em] text-flame-deep uppercase">
					Journal · {article.date} · {article.readTime}
				</p>
				<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-ink sm:text-5xl">
					{article.title}
				</h1>
				<p class="mt-4 text-lg leading-relaxed text-muted">{article.excerpt}</p>
			</header>

			<div class="reveal mt-8 overflow-hidden rounded-[2rem]" use:reveal>
				<img
					src={article.cover}
					alt={article.coverAlt}
					class="aspect-[16/9] w-full object-cover"
					srcset={coverSrcset}
					sizes="(max-width: 1024px) 100vw, 896px"
					width={coverDims?.width}
					height={coverDims?.height}
					loading="eager"
					fetchpriority="high"
				/>
			</div>

			<div class="mt-10 space-y-10">
				{#each article.sections as section, i}
					<section class="reveal" use:reveal style="--rd: {i * 40}ms">
						<h2 class="font-display text-2xl font-semibold text-ink sm:text-3xl">{section.heading}</h2>
						<p class="mt-3 leading-relaxed text-muted">{section.body}</p>
					</section>
					{#if i === 1}
						<blockquote
							class="reveal rounded-[2rem] border-l-4 border-flame bg-peach px-7 py-7"
							use:reveal
						>
							<Icon name="quote" class="size-7 text-flame-deep" />
							<p class="mt-3 font-display text-xl leading-snug font-semibold text-ink sm:text-2xl">
								“{article.pullQuote}”
							</p>
						</blockquote>
					{/if}
				{/each}
			</div>

			{#if relatedProducts.length > 0}
				<section class="mt-14">
					<h2 class="reveal font-display text-2xl font-semibold text-ink sm:text-3xl" use:reveal>
						Pieces from this article
					</h2>
					<div class="mt-6 grid gap-6 sm:grid-cols-2">
						{#each relatedProducts as p, i}
							<ProductCard product={p} delay={i * 100} />
						{/each}
					</div>
				</section>
			{/if}

			{#if others.length > 0}
				<section class="mt-14">
					<h2 class="reveal font-display text-2xl font-semibold text-ink sm:text-3xl" use:reveal>
						Keep reading
					</h2>
					<div class="mt-6 grid gap-5 sm:grid-cols-2">
						{#each others as o}
							<a
								href="/blog/{o.slug}"
								class="reveal lift group block rounded-3xl border border-orange-100 bg-white p-6"
								use:reveal
							>
								<p class="text-xs font-bold tracking-wide text-flame-deep uppercase">{o.date} · {o.readTime}</p>
								<h3 class="mt-2 font-display text-lg leading-snug font-semibold text-ink group-hover:text-flame-deep">
									{o.title}
								</h3>
								<p class="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{o.excerpt}</p>
								<span class="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-flame-deep">
									Read <Icon name="arrow-right" class="size-4 transition group-hover:translate-x-1" />
								</span>
							</a>
						{/each}
					</div>
				</section>
			{/if}
		</div>
	</article>
{:else}
	<section class="bg-cream">
		<div class="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
			<h1 class="font-display text-4xl font-semibold text-ink">That article is gone.</h1>
			<p class="mt-4 leading-relaxed text-muted">
				It may have been moved or renamed. The journal has plenty more to read.
			</p>
			<a
				href="/blog"
				class="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
			>
				Back to the journal <Icon name="arrow-right" class="size-4" />
			</a>
		</div>
	</section>
{/if}
