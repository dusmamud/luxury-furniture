<!-- Transparent product cutout with a modern-format fallback chain:
	 AVIF (alpha, ~50% smaller than JPEG) -> WebP (alpha, ~3x smaller than PNG)
	 -> PNG master. A failed source falls through to the next one. -->
<script lang="ts">
	let {
		stem,
		alt,
		cls = '',
		eager = false
	}: { stem: string; alt: string; cls?: string; eager?: boolean } = $props();
</script>

<picture>
	<source srcset={`/images/cutouts/${stem}.avif`} type="image/avif" />
	<source srcset={`/images/cutouts/${stem}.webp`} type="image/webp" />
	<img
		src={`/images/cutouts/${stem}.png`}
		{alt}
		class={cls}
		loading={eager ? 'eager' : 'lazy'}
		fetchpriority={eager ? 'high' : undefined}
		decoding="async"
	/>
</picture>
