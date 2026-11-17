<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { productsInRoom, rooms } from '#lib/data/products';
</script>

<svelte:head>
	<title>Shop by room — Furniture | Living Room, Bedroom, Dining, Outdoor &amp; Office</title>
	<meta
		name="description"
		content="Shop furniture by room: living room, bedroom, dining room, outdoor and home office. Pieces chosen to fit the way each room is lived in."
	/>
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 lg:px-8">
		<div class="reveal max-w-2xl" use:reveal>
			<p class="hero-anim text-sm font-bold tracking-[0.2em] text-flame uppercase">Shop by room</p>
			<h1 class="mt-3 font-display text-4xl leading-[1.08] font-semibold text-ink sm:text-5xl">
				Furniture for every room
			</h1>
			<p class="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
				Start with the room, not the product. Each space has pieces chosen to fit how it is actually lived
				in.
			</p>
		</div>

		<div class="mt-10 grid gap-5 pb-14 sm:grid-cols-2 lg:grid-cols-3 lg:pb-20">
			{#each rooms as r, i (r.slug)}
				{@const count = productsInRoom(r.slug).length}
				<a
					href="/rooms/{r.slug}"
					class="reveal lift group relative block overflow-hidden rounded-3xl shadow-md shadow-orange-900/10"
					use:reveal
					style="--rd: {(i % 3) * 80}ms"
				>
					<img
						src={r.photo}
						alt={r.name}
						class="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
						loading={i < 2 ? 'eager' : 'lazy'}
						decoding="async"
					/>
					<span class="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" aria-hidden="true"></span>
					<span class="absolute inset-x-0 bottom-0 p-5">
						<span class="block font-display text-2xl font-semibold text-white">{r.name}</span>
						<span class="mt-1 block text-sm leading-relaxed text-white/85">{r.blurb}</span>
						<span class="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-ink transition group-hover:bg-flame group-hover:text-white">
							{count} {count === 1 ? 'piece' : 'pieces'}
							<Icon name="arrow-right" class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
						</span>
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>
