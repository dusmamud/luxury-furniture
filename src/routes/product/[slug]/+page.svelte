<script lang="ts">
	import { untrack } from 'svelte';
	import Icon from '#lib/components/Icon.svelte';
	import CutoutPicture from '#lib/components/CutoutPicture.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { formatPrice, getCategory, getProduct, monthlyPrice, photoDims, photoSrcset, productsInCategory, productSku } from '#lib/data/products';
	import { shop } from '#lib/data/store.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let product = $derived(data.product);
	let category = $derived(getCategory(product.category));

	let optionIdx = $state(0);
	let qty = $state(1);
	// Pieces the user unchecked from "frequently bought together" — derived
	// selection below defaults to all of them, and resets when the product changes.
	let deselectedFbt = $state<Set<string>>(new Set());

	// Reset the per-product state whenever the product changes (route reuse).
	// trackView runs untracked: it reads shop.recentIds and writes it back,
	// so tracking that read would make this effect re-trigger itself forever.
	$effect(() => {
		const id = product.id;
		untrack(() => shop.trackView(id));
		optionIdx = 0;
		qty = 1;
		deselectedFbt = new Set();
	});

	let choice = $derived(product.option.choices[optionIdx]);
	let unitPrice = $derived(product.price + (product.option.priceDeltas?.[optionIdx] ?? 0));
	let productJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.name,
		description: product.description,
		image: `https://luxury-furniture.pages.dev${product.photo}`,
		brand: { '@type': 'Brand', name: 'Furniture' },
		sku: productSku(product),
		offers: {
			'@type': 'Offer',
			url: `https://luxury-furniture.pages.dev/product/${product.slug}`,
			priceCurrency: 'USD',
			price: unitPrice,
			availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: product.rating,
			reviewCount: product.reviewCount
		},
		// Shipping and returns live once at Organization level in the layout
		// (Google accepts that since 2024/2025) instead of on every product.
		...(product.seedReviews[0]
			? {
					review: {
						'@type': 'Review',
						author: { '@type': 'Person', name: product.seedReviews[0].author },
						reviewRating: {
							'@type': 'Rating',
							ratingValue: product.seedReviews[0].rating,
							bestRating: 5
						},
						reviewBody: product.seedReviews[0].body
					}
				}
			: {})
	});
	let breadcrumbJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Shop', item: 'https://luxury-furniture.pages.dev/shop' },
			...(category
				? [
						{
							'@type': 'ListItem',
							position: 2,
							name: category.name,
							item: `https://luxury-furniture.pages.dev/categories/${category.slug}`
						}
					]
				: []),
			{
				'@type': 'ListItem',
				position: category ? 3 : 2,
				name: product.name,
				item: `https://luxury-furniture.pages.dev/product/${product.slug}`
			}
		]
	});
	// Right-sized LCP photo: srcset + intrinsic dimensions for the gallery image.
	let gallerySrcset = $derived(photoSrcset(product.photo));
	let galleryDims = $derived(photoDims(product.photo));
	let wished = $derived(shop.isWished(product.id));
	let reviews = $derived(shop.getReviews(product.id));

	let fbt = $derived(
		product.frequentlyBoughtTogether
			.map((id) => getProduct(id))
			.filter((p): p is NonNullable<typeof p> => Boolean(p))
	);
	let selectedFbt = $derived(new Set(fbt.filter((p) => !deselectedFbt.has(p.id)).map((p) => p.id)));
	let fbtTotal = $derived(fbt.filter((p) => selectedFbt.has(p.id)).reduce((sum, p) => sum + p.price, 0));
	let related = $derived(productsInCategory(product.category).filter((p) => p.id !== product.id));

	let lowStock = $derived(product.stock <= 8);

	// Review form
	let reviewer = $state('');
	let reviewRating = $state(5);
	let reviewTitle = $state('');
	let reviewBody = $state('');
	let reviewError = $state('');
	let reviewDone = $state(false);

	function submitReview(e: SubmitEvent) {
		e.preventDefault();
		if (!reviewer.trim() || !reviewTitle.trim() || !reviewBody.trim()) {
			reviewError = 'Please fill in your name, a title and your review.';
			return;
		}
		shop.addReview(product.id, {
			author: reviewer.trim(),
			rating: reviewRating,
			title: reviewTitle.trim(),
			body: reviewBody.trim()
		});
		reviewer = '';
		reviewTitle = '';
		reviewBody = '';
		reviewRating = 5;
		reviewError = '';
		reviewDone = true;
	}

	function addSelectedToBag() {
		let added = 0;
		for (const id of selectedFbt) {
			const p = getProduct(id);
			if (p) {
				shop.addToCart(id, 1, { silent: true });
				added += 1;
			}
		}
		if (added > 0) shop.showToast(`${added} ${added === 1 ? 'piece' : 'pieces'} added to bag`);
	}

	function toggleFbt(id: string) {
		const next = new Set(deselectedFbt);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		deselectedFbt = next;
	}
</script>

{#snippet stars(rating: number, size = 'size-4')}
	<span class="inline-flex items-center gap-0.5" role="img" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
		{#each Array(5) as _, i}
			<Icon name="star" class="{size} {i < Math.round(rating) ? 'text-gold' : 'text-orange-200'}" />
		{/each}
	</span>
{/snippet}

<svelte:head>
	<title>{product.name} — Furniture | {formatPrice(unitPrice)}</title>
	<meta
		name="description"
		content="{product.name}: {product.blurb} Rated {product.rating.toFixed(1)} by {product.reviewCount} customers. {product.deliveryDays} delivery."
	/>
	{#if gallerySrcset}
		<link rel="preload" as="image" imagesrcset={gallerySrcset} imagesizes="(max-width: 1024px) 100vw, 600px" fetchpriority="high" />
	{/if}
	{@html `<script type="application/ld+json">${JSON.stringify(productJsonLd)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbJsonLd)}</script>`}
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 pt-6 pb-14 sm:px-6 lg:px-8 lg:pt-10">
		<!-- Breadcrumb -->
		<nav aria-label="Breadcrumb" class="reveal text-sm text-muted" use:reveal>
			<a href="/shop" class="font-semibold hover:text-flame-deep">Shop</a>
			<span class="mx-2" aria-hidden="true">/</span>
			{#if category}
				<a href="/categories/{category.slug}" class="font-semibold hover:text-flame-deep">{category.name}</a>
				<span class="mx-2" aria-hidden="true">/</span>
			{/if}
			<span class="text-ink" aria-current="page">{product.name}</span>
		</nav>

		<div class="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
			<!-- Gallery -->
			<div class="reveal" use:reveal>
				<div class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-peach-2 via-peach to-sand px-6 pt-8 pb-4">
					{#if product.badge}
						<span class="absolute top-4 left-4 z-10 rounded-full bg-flame-dark px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
							{product.badge}
						</span>
					{/if}
					{#if product.compareAt}
						<span class="absolute top-4 right-4 z-10 rounded-full bg-ink px-3 py-1 text-[11px] font-bold text-white">
							Save {formatPrice(product.compareAt - product.price)}
						</span>
					{/if}
					<div class="cutout-zoom mx-auto aspect-square max-w-[480px]">
						<CutoutPicture stem={product.cutout} alt={product.alt} eager={true} sizes="(max-width: 1024px) 90vw, 480px" />
					</div>
				</div>
				<figure class="mt-4 overflow-hidden rounded-[2rem] border border-orange-100 bg-white">
					<img
						src={product.photo}
						alt={product.alt}
						class="aspect-[16/10] w-full object-cover"
						srcset={gallerySrcset}
						sizes="(max-width: 1024px) 100vw, 600px"
						width={galleryDims?.width}
						height={galleryDims?.height}
						loading="eager"
						fetchpriority="high"
						decoding="async"
					/>
					<figcaption class="flex items-center gap-2 px-5 py-3 text-xs font-semibold text-muted">
						<Icon name="eye" class="size-4 text-flame-deep" /> In situ — styled in a real room
					</figcaption>
				</figure>
			</div>

			<!-- Buy box -->
			<div class="reveal" use:reveal style="--rd: 80ms">
				{#if category}
					<a
						href="/categories/{category.slug}"
						class="text-xs font-bold tracking-[0.2em] text-flame-deep uppercase hover:text-flame-deep"
					>
						{category.name}
					</a>
				{/if}
				<h1 class="mt-2 font-display text-3xl leading-tight font-semibold text-ink sm:text-4xl lg:text-[2.75rem]">
					{product.name}
				</h1>
				<a href="#reviews" class="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cocoa hover:text-flame-deep">
					{@render stars(product.rating)}
					<span>{product.rating.toFixed(1)}</span>
					<span class="font-normal text-muted">({product.reviewCount} reviews)</span>
				</a>

				<div class="mt-5 flex flex-wrap items-baseline gap-3">
					<span class="font-display text-3xl font-bold text-ink">{formatPrice(unitPrice)}</span>
					{#if product.compareAt}
						<span class="text-lg text-muted line-through">{formatPrice(product.compareAt)}</span>
						<span class="rounded-full bg-flame/10 px-3 py-1 text-xs font-bold text-flame-deep">
							Save {formatPrice(product.compareAt - product.price)}
						</span>
					{/if}
				</div>
				<p class="mt-2 text-sm text-muted">
					or {monthlyPrice(unitPrice)}/mo for 12 months, 0% APR
				</p>

				<p class="mt-5 text-base leading-relaxed text-cocoa">{product.blurb}</p>

				<!-- Finish selector -->
				<fieldset class="mt-7">
					<legend class="text-sm font-bold text-ink">
						{product.optionLabel}: <span class="font-semibold text-cocoa">{choice}</span>
					</legend>
					<div class="mt-3 flex flex-wrap gap-2">
						{#each product.option.choices as c, i (c)}
							<button
								type="button"
								aria-pressed={optionIdx === i}
								onclick={() => (optionIdx = i)}
								class="min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition {optionIdx === i
									? 'border-ink bg-ink text-white'
									: 'border-orange-200 bg-white text-ink hover:border-flame hover:text-flame-deep'}"
							>
								{c}
								{#if product.option.priceDeltas?.[i]}
									<span class="font-normal opacity-80">+{formatPrice(product.option.priceDeltas[i])}</span>
								{/if}
							</button>
						{/each}
					</div>
				</fieldset>

				<!-- Stock -->
				<p class="mt-6 flex items-center gap-2 text-sm font-semibold {lowStock ? 'text-flame-deep' : 'text-green-700'}">
					<Icon name={lowStock ? 'clock' : 'check'} class="size-4" />
					{#if lowStock}
						Only {product.stock} left — order soon
					{:else}
						In stock — ships in {product.deliveryDays}
					{/if}
				</p>

				<!-- Qty + add to bag -->
				<div class="mt-4 flex flex-wrap items-stretch gap-3">
					<div class="flex items-center rounded-full border border-orange-200 bg-white">
						<button
							type="button"
							aria-label="Decrease quantity"
							disabled={qty <= 1}
							onclick={() => (qty = Math.max(1, qty - 1))}
							class="grid size-12 place-items-center rounded-full text-ink transition hover:text-flame-deep disabled:opacity-30"
						>
							<Icon name="minus" class="size-4" />
						</button>
						<span class="w-8 text-center text-base font-bold text-ink" aria-live="polite">{qty}</span>
						<button
							type="button"
							aria-label="Increase quantity"
							disabled={qty >= product.stock}
							onclick={() => (qty = Math.min(product.stock, qty + 1))}
							class="grid size-12 place-items-center rounded-full text-ink transition hover:text-flame-deep disabled:opacity-30"
						>
							<Icon name="plus" class="size-4" />
						</button>
					</div>
					<button
						type="button"
						onclick={() => shop.addToCart(product.id, qty, { variant: choice })}
						class="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-base font-bold text-white transition hover:bg-flame-deep active:scale-[0.98]"
					>
						<Icon name="bag" class="size-5" /> Add to bag — {formatPrice(unitPrice * qty)}
					</button>
					<button
						type="button"
						aria-pressed={wished}
						aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
						onclick={() => shop.toggleWishlist(product.id)}
						class="grid size-12 place-items-center rounded-full border transition {wished
							? 'border-flame bg-flame/10 text-flame-deep'
							: 'border-orange-200 bg-white text-muted hover:border-flame hover:text-flame-deep'}"
					>
						<Icon name="heart" class="size-5" />
					</button>
				</div>

				<!-- Trust row -->
				<ul class="mt-7 grid gap-3 rounded-3xl border border-orange-100 bg-white p-5 sm:grid-cols-3">
					<li class="flex items-start gap-3">
						<Icon name="truck" class="mt-0.5 size-5 shrink-0 text-flame-deep" />
						<span class="text-xs leading-relaxed text-cocoa">
							<strong class="block text-sm text-ink">Free shipping over $499</strong>
							Delivered in {product.deliveryDays}
						</span>
					</li>
					<li class="flex items-start gap-3">
						<Icon name="shield" class="mt-0.5 size-5 shrink-0 text-flame-deep" />
						<span class="text-xs leading-relaxed text-cocoa">
							<strong class="block text-sm text-ink">Warranty included</strong>
							{product.warranty}
						</span>
					</li>
					<li class="flex items-start gap-3">
						<Icon name="refresh" class="mt-0.5 size-5 shrink-0 text-flame-deep" />
						<span class="text-xs leading-relaxed text-cocoa">
							<strong class="block text-sm text-ink">30-day returns</strong>
							Free collection if it is not right
						</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Details -->
<section class="bg-peach/60 py-14 lg:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-10 lg:grid-cols-2">
			<div class="reveal" use:reveal>
				<h2 class="font-display text-2xl font-semibold text-ink sm:text-3xl">Description</h2>
				<p class="mt-4 leading-relaxed text-cocoa">{product.description}</p>
				<ul class="mt-6 space-y-3">
					{#each product.features as f (f)}
						<li class="flex items-start gap-3 text-sm leading-relaxed text-cocoa">
							<span class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-flame/10 text-flame-deep">
								<Icon name="check" class="size-3.5" />
							</span>
							{f}
						</li>
					{/each}
				</ul>
			</div>
			<div class="reveal" use:reveal style="--rd: 80ms">
				<h2 class="font-display text-2xl font-semibold text-ink sm:text-3xl">Dimensions</h2>
				<table class="mt-4 w-full overflow-hidden rounded-3xl border border-orange-100 bg-white text-sm">
					<tbody>
						{#each product.dimensions as d, i (d.label)}
							<tr class={i % 2 === 0 ? 'bg-white' : 'bg-cream'}>
								<th scope="row" class="px-5 py-3 text-left font-semibold text-ink">{d.label}</th>
								<td class="px-5 py-3 text-right text-cocoa">{d.value}</td>
							</tr>
						{/each}
					</tbody>
				</table>
				<h3 class="mt-8 font-display text-xl font-semibold text-ink">Materials &amp; care</h3>
				<dl class="mt-3 space-y-3 rounded-3xl border border-orange-100 bg-white p-5 text-sm">
					<div>
						<dt class="font-bold text-ink">Materials</dt>
						<dd class="mt-0.5 leading-relaxed text-cocoa">{product.materials}</dd>
					</div>
					<div>
						<dt class="font-bold text-ink">Weight</dt>
						<dd class="mt-0.5 text-cocoa">{product.weight}</dd>
					</div>
					<div>
						<dt class="font-bold text-ink">Assembly</dt>
						<dd class="mt-0.5 leading-relaxed text-cocoa">{product.assembly}</dd>
					</div>
					<div>
						<dt class="font-bold text-ink">Care</dt>
						<dd class="mt-0.5 leading-relaxed text-cocoa">{product.care}</dd>
					</div>
				</dl>
				<p class="mt-5 text-sm leading-relaxed text-muted">
					Delivery in {product.deliveryDays} with tracking. Free 30-day returns — we collect it from your
					door. <a href="/delivery" class="font-semibold text-flame-deep hover:underline">Delivery info</a> ·
					<a href="/returns-policy" class="font-semibold text-flame-deep hover:underline">Returns policy</a>
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Frequently bought together -->
{#if fbt.length > 0}
	<section class="py-14 lg:py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="reveal flex flex-wrap items-end justify-between gap-4" use:reveal>
				<div>
					<h2 class="font-display text-2xl font-semibold text-ink sm:text-3xl">Frequently bought together</h2>
					<p class="mt-2 text-sm leading-relaxed text-muted">Pairs beautifully with {product.name} — tick what you want.</p>
				</div>
				<p class="text-sm font-semibold text-cocoa">
					Total for selected: <span class="font-display text-xl font-bold text-flame-deep">{formatPrice(fbtTotal)}</span>
				</p>
			</div>
			<div class="mt-8 grid gap-4 sm:grid-cols-3">
				{#each fbt as p, i (p.id)}
					<label
						class="reveal lift relative flex cursor-pointer items-center gap-4 rounded-3xl border bg-white p-4 transition {selectedFbt.has(p.id)
							? 'border-flame shadow-md shadow-orange-900/5'
							: 'border-orange-100'}"
						use:reveal
						style="--rd: {i * 80}ms"
					>
						<input
							type="checkbox"
							checked={selectedFbt.has(p.id)}
							onchange={() => toggleFbt(p.id)}
							class="size-5 shrink-0 accent-[#f4531a]"
							aria-label={`Add ${p.name} to the bundle`}
						/>
						<span class="block size-20 shrink-0 overflow-hidden rounded-2xl bg-cream">
							<CutoutPicture stem={p.cutout} alt={p.alt} />
						</span>
						<span class="min-w-0">
							<span class="block truncate font-display text-base font-semibold text-ink">{p.name}</span>
							<span class="mt-1 block text-sm font-bold text-flame-deep">{formatPrice(p.price)}</span>
							<span class="mt-0.5 block text-xs text-muted">{@render stars(p.rating, 'size-3')} {p.rating.toFixed(1)}</span>
						</span>
					</label>
				{/each}
			</div>
			<button
				type="button"
				disabled={selectedFbt.size === 0}
				onclick={addSelectedToBag}
				class="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-dark disabled:opacity-40"
			>
				<Icon name="bag" class="size-4" /> Add selected to bag — {formatPrice(fbtTotal)}
			</button>
		</div>
	</section>
{/if}

<!-- Reviews -->
<section id="reviews" class="scroll-mt-24 bg-peach/60 py-14 lg:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
			<div class="reveal" use:reveal>
				<h2 class="font-display text-2xl font-semibold text-ink sm:text-3xl">Reviews</h2>
				<div class="mt-5 flex items-end gap-3">
					<span class="font-display text-5xl font-bold text-ink">{product.rating.toFixed(1)}</span>
					<span class="pb-1">
						{@render stars(product.rating)}
						<span class="mt-1 block text-sm text-muted">{product.reviewCount} verified reviews</span>
					</span>
				</div>

				<form
					class="mt-8 rounded-3xl border border-orange-100 bg-white p-6"
					onsubmit={submitReview}
					novalidate
				>
					<h3 class="font-display text-xl font-semibold text-ink">Write a review</h3>
					{#if reviewError}
						<p class="mt-3 rounded-2xl bg-flame/10 px-4 py-3 text-sm font-semibold text-flame-deep" role="alert">
							{reviewError}
						</p>
					{/if}
					{#if reviewDone}
						<p class="mt-3 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700" role="status">
							Thank you — your review is now showing below.
						</p>
					{/if}
					<label class="mt-5 block text-sm font-bold text-ink" for="review-name">Your name</label>
					<input
						id="review-name"
						type="text"
						bind:value={reviewer}
						placeholder="Alex M."
						class="mt-1.5 min-h-12 w-full rounded-2xl border border-orange-200 bg-cream px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-flame focus:outline-none"
					/>
					<label class="mt-4 block text-sm font-bold text-ink" for="review-rating">Rating</label>
					<select
						id="review-rating"
						bind:value={reviewRating}
						class="mt-1.5 min-h-12 w-full rounded-2xl border border-orange-200 bg-cream px-4 py-3 text-sm text-ink focus:border-flame focus:outline-none"
					>
						{#each [5, 4, 3, 2, 1] as r (r)}
							<option value={r}>{r} star{r === 1 ? '' : 's'}</option>
						{/each}
					</select>
					<label class="mt-4 block text-sm font-bold text-ink" for="review-title">Title</label>
					<input
						id="review-title"
						type="text"
						bind:value={reviewTitle}
						placeholder="Short headline"
						class="mt-1.5 min-h-12 w-full rounded-2xl border border-orange-200 bg-cream px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-flame focus:outline-none"
					/>
					<label class="mt-4 block text-sm font-bold text-ink" for="review-body">Your review</label>
					<textarea
						id="review-body"
						bind:value={reviewBody}
						rows="4"
						placeholder="How is the quality, comfort and delivery?"
						class="mt-1.5 w-full resize-y rounded-2xl border border-orange-200 bg-cream px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-flame focus:outline-none"
					></textarea>
					<button
						type="submit"
						class="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
					>
						Submit review
					</button>
				</form>
			</div>

			<ul class="space-y-4">
				{#each reviews as r, i (r.author + r.title + r.date)}
					<li class="reveal rounded-3xl border border-orange-100 bg-white p-6" use:reveal style="--rd: {(i % 3) * 80}ms">
						<div class="flex flex-wrap items-center justify-between gap-2">
							{@render stars(r.rating)}
							<span class="text-xs font-semibold text-muted">{r.date}</span>
						</div>
						<h3 class="mt-3 font-display text-lg font-semibold text-ink">{r.title}</h3>
						<p class="mt-1.5 text-sm leading-relaxed text-cocoa">{r.body}</p>
						<p class="mt-3 text-xs font-bold tracking-wide text-muted uppercase">— {r.author}</p>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<!-- You may also like -->
{#if related.length > 0}
	<section class="py-14 lg:py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="reveal flex flex-wrap items-end justify-between gap-4" use:reveal>
				<h2 class="font-display text-2xl font-semibold text-ink sm:text-3xl">You may also like</h2>
				<a href="/shop?category={product.category}" class="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-flame-deep hover:text-flame-deep">
					More in {category?.name ?? 'this category'}
					<Icon name="arrow-right" class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
				</a>
			</div>
			<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{#each related.slice(0, 4) as p, i (p.id)}
					<ProductCard product={p} delay={i * 80} />
				{/each}
			</div>
		</div>
	</section>
{/if}
