<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';

	let open = $state(false);
	const links = [
		{ href: '#home', label: 'Home' },
		{ href: '#collections', label: 'Collections' },
		{ href: '#about', label: 'About Us' },
		{ href: '#contact', label: 'Contact' }
	];
</script>

<header class="sticky top-0 z-50 border-b border-orange-100/70 bg-[#fff7f0]/90 backdrop-blur">
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
		<a href="#home" class="flex min-w-0 items-center gap-2" aria-label="Furniture — home">
			<span class="grid size-10 shrink-0 place-items-center rounded-xl bg-flame text-white">
				<Icon name="sofa" class="size-6" />
			</span>
			<span class="leading-none">
				<span class="block font-serif text-[22px] font-bold tracking-tight text-ink">Furniture</span>
				<span class="block text-[10px] font-semibold tracking-[0.28em] text-flame uppercase">Make you feel luxury</span>
			</span>
		</a>

		<nav class="hidden items-center gap-8 md:flex" aria-label="Main">
			{#each links as l}
				<a href={l.href} class="text-sm font-semibold text-cocoa transition hover:text-flame">{l.label}</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2">
			<a
				href="#collections"
				class="hidden items-center gap-2 rounded-full bg-flame px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:bg-flame-dark sm:inline-flex"
			>
				Shop now <Icon name="arrow-right" class="size-4" />
			</a>
			<button
				type="button"
				class="grid size-11 place-items-center rounded-full text-ink transition hover:bg-peach"
				aria-label={open ? 'Close menu' : 'Open menu'}
				aria-expanded={open}
				onclick={() => (open = !open)}
			>
				<Icon name={open ? 'close' : 'menu'} class="size-6" />
			</button>
		</div>
	</div>

	{#if open}
		<nav class="border-t border-orange-100 bg-[#fff7f0] px-4 py-3 md:hidden" aria-label="Mobile">
			{#each links as l}
				<a
					href={l.href}
					class="block rounded-xl px-3 py-3 text-base font-semibold text-cocoa hover:bg-peach hover:text-flame"
					onclick={() => (open = false)}>{l.label}</a
				>
			{/each}
			<a
				href="#collections"
				class="mt-2 flex items-center justify-center gap-2 rounded-full bg-flame px-5 py-3 text-sm font-bold text-white"
				onclick={() => (open = false)}>Shop now <Icon name="arrow-right" class="size-4" /></a
			>
		</nav>
	{/if}
</header>
