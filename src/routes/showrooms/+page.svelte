<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';

	const showrooms = [
		{
			name: 'Covington Flagship',
			address: '800 Winward Drive, Suite A, Covington, LA 70433',
			phone: '(985) 555-0148',
			tel: 'tel:+19855550148',
			blurb: 'Our original showroom and workshop — every collection on the floor, plus the makers at work next door.',
			tag: 'Flagship · Workshop on site'
		},
		{
			name: 'New Orleans',
			address: '1200 Magazine St, New Orleans, LA 70130',
			phone: '(504) 555-0119',
			tel: 'tel:+15045550119',
			blurb: 'A Garden District favourite on Magazine Street — sofas, dining and lighting styled for city living.',
			tag: 'Garden District'
		},
		{
			name: 'Baton Rouge',
			address: '4500 Perkins Rd, Baton Rouge, LA 70808',
			phone: '(225) 555-0162',
			tel: 'tel:+12255550162',
			blurb: 'Our newest space, built for big family rooms — the full outdoor collection lives here year-round.',
			tag: 'Newest showroom'
		}
	];

	const mapsUrl = (address: string) =>
		`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
</script>

<svelte:head>
	<title>Showrooms — Furniture | Covington, New Orleans &amp; Baton Rouge</title>
	<meta
		name="description"
		content="Visit Furniture in Covington, New Orleans or Baton Rouge. Try every piece in-store, talk to our team and order for home delivery. Open Mon–Sat 10 AM–7 PM."
	/>
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8">
		<div class="reveal max-w-2xl" use:reveal>
			<p class="text-sm font-bold tracking-[0.2em] text-flame-deep uppercase">Showrooms</p>
			<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-ink sm:text-5xl">
				Come sit on it first.
			</h1>
			<p class="mt-4 text-lg leading-relaxed text-muted">
				Furniture is best chosen in person. Every showroom carries the full collection — sit, stretch, open
				the drawers — then order for home delivery.
			</p>
		</div>

		<div class="mt-10 grid gap-6 lg:grid-cols-3">
			{#each showrooms as s, i}
				<article
					class="reveal lift flex flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white"
					use:reveal
					style="--rd: {i * 100}ms"
				>
					<div class="bg-peach px-6 pt-6 pb-5">
						<span class="inline-block rounded-full bg-flame-dark px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
							{s.tag}
						</span>
						<h2 class="mt-3 font-display text-2xl font-semibold text-ink">{s.name}</h2>
						<p class="mt-1 text-sm leading-relaxed text-muted">{s.blurb}</p>
					</div>
					<div class="flex flex-1 flex-col gap-4 px-6 py-6">
						<div class="flex items-start gap-3">
							<span class="grid size-10 shrink-0 place-items-center rounded-full bg-peach text-flame-deep">
								<Icon name="pin" class="size-5" />
							</span>
							<p class="text-sm leading-relaxed text-cocoa">{s.address}</p>
						</div>
						<div class="flex items-start gap-3">
							<span class="grid size-10 shrink-0 place-items-center rounded-full bg-peach text-flame-deep">
								<Icon name="clock" class="size-5" />
							</span>
							<p class="text-sm leading-relaxed text-cocoa">
								Mon–Sat: 10 AM–7 PM<br />Sunday: 12–5 PM
							</p>
						</div>
						<div class="flex items-start gap-3">
							<span class="grid size-10 shrink-0 place-items-center rounded-full bg-peach text-flame-deep">
								<Icon name="phone" class="size-5" />
							</span>
							<a href={s.tel} class="text-sm leading-relaxed font-semibold text-cocoa hover:text-flame-deep">{s.phone}</a>
						</div>
						<a
							href={mapsUrl(s.address)}
							target="_blank"
							rel="noopener noreferrer"
							class="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
						>
							<Icon name="pin" class="size-4" /> Get directions
						</a>
					</div>
				</article>
			{/each}
		</div>

		<div class="reveal mt-10 rounded-[2rem] bg-ink px-6 py-10 sm:px-12" use:reveal>
			<div class="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
				<div>
					<h2 class="font-display text-2xl font-semibold text-white sm:text-3xl">Try it here, enjoy it at home.</h2>
					<p class="mt-3 leading-relaxed text-white/70">
						Found the one? Order in-store and we will deliver it to your home — standard delivery is free
						over $499, and white-glove delivery includes room placement and assembly. Anything you order
						in-store carries the same 30-day returns and 10-year frame warranty as an online order.
					</p>
				</div>
				<div class="flex flex-wrap gap-3 lg:justify-end">
					<a
						href="/shop"
						class="inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
					>
						Browse online <Icon name="arrow-right" class="size-4" />
					</a>
					<a
						href="/contact"
						class="inline-flex min-h-11 items-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:border-white"
					>
						Book a visit
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
