<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { categories, rooms } from '#lib/data/products';

	let email = $state('');
	let done = $state(false);
	let error = $state('');

	function subscribe(e: SubmitEvent) {
		e.preventDefault();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Please enter a valid email address.';
			return;
		}
		error = '';
		done = true;
	}
</script>

<footer class="bg-[#fff1e6]">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr]">
			<div>
				<a href="/" class="flex items-center gap-2">
					<span class="grid size-10 place-items-center rounded-xl bg-flame text-white">
						<Icon name="sofa" class="size-6" />
					</span>
					<span class="font-display text-[22px] font-bold text-ink">Furniture</span>
				</a>
				<p class="mt-4 max-w-xs text-sm leading-relaxed text-muted">
					Handcrafted sofas, chairs and lighting for homes that feel considered —
					designed in Louisiana, built to be lived in for decades.
				</p>
				<p class="mt-4 flex items-start gap-2 text-sm text-muted">
					<Icon name="pin" class="mt-0.5 size-4 shrink-0 text-flame" />
					<span>800 Winward Drive, Suite A, Covington, LA 70433</span>
				</p>
				<p class="mt-2 flex items-center gap-2 text-sm text-muted">
					<Icon name="phone" class="size-4 shrink-0 text-flame" /> (985) 555-0148
				</p>
				<p class="mt-2 flex items-center gap-2 text-sm text-muted">
					<Icon name="mail" class="size-4 shrink-0 text-flame" /> hello@furniture.example
				</p>
			</div>

			<nav aria-label="Shop">
				<h3 class="text-sm font-bold tracking-wide text-ink uppercase">Shop</h3>
				<ul class="mt-4 space-y-2.5 text-sm text-muted">
					<li><a class="hover:text-flame" href="/shop">All furniture</a></li>
					{#each categories.slice(0, 5) as c}
						<li><a class="hover:text-flame" href="/categories/{c.slug}">{c.name}</a></li>
					{/each}
					<li><a class="hover:text-flame" href="/deals">Deals</a></li>
				</ul>
			</nav>

			<nav aria-label="Rooms">
				<h3 class="text-sm font-bold tracking-wide text-ink uppercase">Rooms</h3>
				<ul class="mt-4 space-y-2.5 text-sm text-muted">
					{#each rooms as r}
						<li><a class="hover:text-flame" href="/rooms/{r.slug}">{r.name}</a></li>
					{/each}
					<li><a class="hover:text-flame" href="/showrooms">Visit a showroom</a></li>
				</ul>
			</nav>

			<nav aria-label="Help">
				<h3 class="text-sm font-bold tracking-wide text-ink uppercase">Help</h3>
				<ul class="mt-4 space-y-2.5 text-sm text-muted">
					<li><a class="hover:text-flame" href="/about">Our story</a></li>
					<li><a class="hover:text-flame" href="/delivery">Delivery &amp; white glove</a></li>
					<li><a class="hover:text-flame" href="/returns-policy">Returns</a></li>
					<li><a class="hover:text-flame" href="/warranty">Warranty</a></li>
					<li><a class="hover:text-flame" href="/faq">FAQ</a></li>
					<li><a class="hover:text-flame" href="/contact">Contact us</a></li>
					<li><a class="hover:text-flame" href="/trade">Trade program</a></li>
					<li><a class="hover:text-flame" href="/financing">Financing</a></li>
				</ul>
			</nav>

			<div>
				<h3 class="text-sm font-bold tracking-wide text-ink uppercase">Get 10% off your first order</h3>
				<p class="mt-4 text-sm leading-relaxed text-muted">
					New collections, showroom events and private sales — once a month, no spam.
				</p>
				{#if done}
					<p class="mt-4 flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-flame-dark">
						<Icon name="check" class="size-5" /> You are on the list — welcome!
					</p>
				{:else}
					<form class="mt-4 flex gap-2" onsubmit={subscribe} novalidate>
						<label class="sr-only" for="newsletter-email">Email address</label>
						<input
							id="newsletter-email"
							type="email"
							bind:value={email}
							placeholder="you@example.com"
							class="min-w-0 flex-1 rounded-full border border-orange-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-flame focus:outline-none"
						/>
						<button
							type="submit"
							class="shrink-0 rounded-full bg-flame px-5 py-3 text-sm font-bold text-white transition hover:bg-flame-dark"
							>Join</button
						>
					</form>
					{#if error}<p class="mt-2 text-xs font-semibold text-red-600">{error}</p>{/if}
				{/if}
				<p class="mt-4 flex items-center gap-2 text-xs text-muted">
					<Icon name="clock" class="size-4 text-flame" /> Mon–Sat, 10 AM – 7 PM CT
				</p>
			</div>
		</div>

		<div class="mt-10 flex flex-col items-center justify-between gap-3 border-t border-orange-200/70 pt-6 text-xs text-muted sm:flex-row">
			<p>© 2026 Furniture. All rights reserved. Demo site — prices and stock are illustrative.</p>
			<p class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
				<a class="hover:text-flame" href="/privacy-policy">Privacy policy</a>
				<a class="hover:text-flame" href="/terms">Terms of service</a>
				<a class="hover:text-flame" href="/shipping-policy">Shipping policy</a>
				<a class="hover:text-flame" href="/sitemap">Sitemap</a>
			</p>
		</div>
	</div>
</footer>
