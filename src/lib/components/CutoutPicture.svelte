<!-- Transparent product cutout with a modern-format fallback chain:
	 AVIF (alpha, ~50% smaller than JPEG) -> WebP (alpha, ~3x smaller than PNG)
	 -> PNG master. A failed source falls through to the next one.
	 Each format serves a right-sized 400w variant first (400w files live next
	 to the full-size ones) so phones do not download the 1000px master for a
	 260px card. width/height reserve the aspect ratio and prevent layout shift. -->
<script lang="ts">
	// Intrinsic PNG dimensions (the <img> fallback) per cutout stem.
	const cutoutDims: Record<string, { w: number; h: number }> = {
		'modern-sofa': { w: 921, h: 399 },
		plant: { w: 532, h: 886 },
		'outdoor-chairs': { w: 946, h: 422 },
		'modern-chair': { w: 530, h: 596 },
		'swing-chair': { w: 400, h: 660 },
		'hanging-light': { w: 616, h: 370 },
		'dining-table': { w: 745, h: 460 },
		bed: { w: 861, h: 359 },
		bookshelf: { w: 277, h: 861 },
		'floor-lamp': { w: 408, h: 635 },
		sofa: { w: 666, h: 272 }
	};

	let {
		stem,
		alt,
		cls = '',
		eager = false,
		sizes = '(max-width: 768px) 80vw, 400px'
	}: { stem: string; alt: string; cls?: string; eager?: boolean; sizes?: string } = $props();

	const dims = $derived(cutoutDims[stem]);
	// The 400w variant exists only when the master is wider than 400px.
	const hasSmall = $derived(Boolean(dims && dims.w > 400));
	const srcsetFor = (ext: string) =>
		hasSmall && dims
			? `/images/cutouts/${stem}-400.${ext} 400w, /images/cutouts/${stem}.${ext} ${dims.w}w`
			: `/images/cutouts/${stem}.${ext} ${dims?.w ?? 800}w`;
	const avifSrcset = $derived(srcsetFor('avif'));
	const webpSrcset = $derived(srcsetFor('webp'));
</script>

<picture>
	<source srcset={avifSrcset} {sizes} type="image/avif" />
	<source srcset={webpSrcset} {sizes} type="image/webp" />
	<img
		src={`/images/cutouts/${stem}.png`}
		{alt}
		class={cls}
		width={dims?.w}
		height={dims?.h}
		loading={eager ? 'eager' : 'lazy'}
		fetchpriority={eager ? 'high' : undefined}
		decoding="async"
	/>
</picture>
