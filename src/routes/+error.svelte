<!-- Branded error page: shows the status + message, and the error stack in a
	 collapsed details block so a real failure can be diagnosed from the page. -->
<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} — Furniture</title>
	<meta name="description" content="Something went wrong — {page.error?.message ?? 'page not found'}." />
</svelte:head>

<section class="bg-cream py-20 lg:py-28">
	<div class="mx-auto max-w-2xl px-4 text-center sm:px-6">
		<p class="font-display text-7xl font-bold text-flame">{page.status}</p>
		<h1 class="mt-4 font-display text-3xl font-semibold text-ink">
			{page.status === 404 ? 'This piece is no longer here' : 'Something went wrong'}
		</h1>
		<p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
			{page.error?.message ?? 'The page could not be loaded.'}
			{#if page.status === 404}
				It may have moved — try the shop or a search instead.
			{:else}
				Please try again, or head back to the shop.
			{/if}
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
			<a
				href="/"
				class="inline-flex min-h-12 items-center rounded-full bg-flame px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-dark"
			>
				Back to home
			</a>
			<a
				href="/shop"
				class="inline-flex min-h-12 items-center rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-bold text-ink transition hover:border-flame hover:text-flame"
			>
				Browse the shop
			</a>
		</div>
		{#if page.error?.stack}
			<details class="mt-10 text-left">
				<summary class="cursor-pointer text-sm font-bold text-ink">Error details</summary>
				<pre
					class="mt-3 overflow-x-auto rounded-2xl bg-ink p-4 text-xs leading-relaxed whitespace-pre-wrap text-white/90">{page.error.stack}</pre>
			</details>
		{/if}
	</div>
</section>
