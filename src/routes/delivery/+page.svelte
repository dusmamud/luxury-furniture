<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';

	const tiers = [
		{
			icon: 'truck',
			name: 'Standard delivery',
			price: '$49',
			priceNote: 'Free on orders over $499',
			time: '3–5 business days',
			features: [
				'Tracked delivery to your front door',
				'Two-person team for large pieces',
				'Delivery window by text and email',
				'Packaging removed on request'
			],
			cta: 'Shop now',
			href: '/shop',
			highlight: false
		},
		{
			icon: 'sparkle',
			name: 'White-glove delivery',
			price: '+$99',
			priceNote: 'Added at checkout',
			time: 'Scheduled, 3–7 business days',
			features: [
				'Two-hour arrival window, booked around you',
				'Carried into the room of your choice',
				'Full assembly included',
				'All packaging taken away'
			],
			cta: 'Choose at checkout',
			href: '/shop',
			highlight: true
		},
		{
			icon: 'pin',
			name: 'Store pickup',
			price: 'Free',
			priceNote: 'Covington flagship showroom',
			time: 'Ready in 24 hours',
			features: [
				'Collect from 800 Winward Drive, Covington',
				'We load it into your vehicle',
				'Try it in-store before you take it home',
				'Same 30-day returns and warranty'
			],
			cta: 'Visit the showroom',
			href: '/showrooms',
			highlight: false
		}
	];

	const faqs = [
		{
			q: 'Can I choose a delivery day?',
			a: 'Yes — white-glove delivery lets you pick a day and a two-hour window. Standard delivery gives you a date by text and email, and you can reschedule from the tracking link up to the morning of delivery.'
		},
		{
			q: 'Do you deliver outside Louisiana?',
			a: 'We deliver across the contiguous United States. Standard delivery is 3–5 business days in Louisiana and 5–8 days elsewhere. White-glove delivery is available in Louisiana and neighbouring states; everywhere else, standard delivery still includes a two-person team for large pieces.'
		},
		{
			q: 'What happens if something arrives damaged?',
			a: 'Tell us within 7 days — send a photo through the contact page or call (985) 555-0148. We will repair, replace or refund, and we collect the damaged piece at no cost to you. Never refuse a delivery because of cosmetic packaging damage; the piece inside is usually fine.'
		}
	];
</script>

<svelte:head>
	<title>Delivery — Furniture | Standard, white-glove &amp; store pickup</title>
	<meta
		name="description"
		content="Delivery options at Furniture: standard $49 (free over $499, 3–5 days), white-glove +$99 with assembly and packaging removal, and free store pickup in Covington."
	/>
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8">
		<div class="reveal max-w-2xl" use:reveal>
			<p class="text-sm font-bold tracking-[0.2em] text-flame uppercase">Delivery</p>
			<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-ink sm:text-5xl">
				From our workshop to your living room.
			</h1>
			<p class="mt-4 text-lg leading-relaxed text-muted">
				Three ways to get your furniture home — tracked every step, with a two-person team for the big
				pieces. Most in-stock orders arrive in 3–5 business days.
			</p>
		</div>

		<div class="mt-10 grid gap-6 lg:grid-cols-3">
			{#each tiers as t, i}
				<article
					class="reveal lift relative flex flex-col rounded-3xl border p-7 {t.highlight
						? 'border-flame bg-ink text-white shadow-xl'
						: 'border-orange-100 bg-white'}"
					use:reveal
					style="--rd: {i * 100}ms"
				>
					{#if t.highlight}
						<span class="absolute -top-3.5 left-6 rounded-full bg-flame px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
							Most popular
						</span>
					{/if}
					<span class="grid size-12 place-items-center rounded-2xl {t.highlight ? 'bg-flame text-white' : 'bg-peach text-flame'}">
						<Icon name={t.icon} class="size-6" />
					</span>
					<h2 class="mt-4 font-display text-2xl font-semibold {t.highlight ? 'text-white' : 'text-ink'}">{t.name}</h2>
					<p class="mt-2 font-display text-4xl font-bold {t.highlight ? 'text-white' : 'text-ink'}">
						{t.price}
						<span class="text-sm font-medium {t.highlight ? 'text-white/70' : 'text-muted'}">{t.priceNote}</span>
					</p>
					<p class="mt-1 flex items-center gap-2 text-sm font-semibold {t.highlight ? 'text-white/80' : 'text-flame'}">
						<Icon name="clock" class="size-4" /> {t.time}
					</p>
					<ul class="mt-6 space-y-3">
						{#each t.features as f}
							<li class="flex items-start gap-3 text-sm leading-relaxed {t.highlight ? 'text-white/85' : 'text-cocoa'}">
								<span class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full {t.highlight ? 'bg-white/15 text-white' : 'bg-peach text-flame'}">
									<Icon name="check" class="size-3.5" />
								</span>
								{f}
							</li>
						{/each}
					</ul>
					<a
						href={t.href}
						class="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition {t.highlight
							? 'bg-flame text-white hover:bg-flame-dark'
							: 'bg-ink text-white hover:bg-flame'}"
					>
						{t.cta} <Icon name="arrow-right" class="size-4" />
					</a>
				</article>
			{/each}
		</div>

		<!-- Packaging + tracking -->
		<div class="mt-12 grid gap-5 md:grid-cols-2">
			<div class="reveal rounded-3xl border border-orange-100 bg-white p-7" use:reveal>
				<span class="grid size-12 place-items-center rounded-2xl bg-peach text-flame">
					<Icon name="leaf" class="size-6" />
				</span>
				<h2 class="mt-4 font-display text-xl font-semibold text-ink">Packed to protect, made to recycle</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">
					Pieces travel in recycled cardboard with corner guards and furniture blankets — no single-use
					plastic where we can avoid it. White-glove teams take every scrap of packaging away with them.
				</p>
			</div>
			<div class="reveal rounded-3xl border border-orange-100 bg-white p-7" use:reveal style="--rd: 100ms">
				<span class="grid size-12 place-items-center rounded-2xl bg-peach text-flame">
					<Icon name="search" class="size-6" />
				</span>
				<h2 class="mt-4 font-display text-xl font-semibold text-ink">Track it door to door</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">
					Every order gets tracking the moment it leaves our Covington workshop, with text and email
					updates at each step. Lost your link? Your order number is enough.
				</p>
				<a href="/track-order" class="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-flame hover:text-flame-dark">
					Track my order <Icon name="arrow-right" class="size-4" />
				</a>
			</div>
		</div>

		<!-- Delivery FAQ -->
		<div class="mt-16">
			<div class="reveal max-w-2xl" use:reveal>
				<p class="text-sm font-bold tracking-[0.2em] text-flame uppercase">Delivery FAQ</p>
				<h2 class="mt-3 font-display text-3xl leading-tight font-semibold text-ink sm:text-4xl">
					Before delivery day.
				</h2>
			</div>
			<div class="mt-8 grid gap-5 lg:grid-cols-3">
				{#each faqs as f, i}
					<div class="reveal rounded-3xl border border-orange-100 bg-white p-6" use:reveal style="--rd: {i * 80}ms">
						<h3 class="font-display text-lg font-semibold text-ink">{f.q}</h3>
						<p class="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
					</div>
				{/each}
			</div>
			<p class="reveal mt-8 text-sm leading-relaxed text-muted" use:reveal>
				More questions? See the full <a href="/faq" class="font-semibold text-flame underline underline-offset-2">FAQ</a>,
				our <a href="/shipping-policy" class="font-semibold text-flame underline underline-offset-2">shipping policy</a>,
				or call us on <a href="tel:+19855550148" class="font-semibold text-flame underline underline-offset-2">(985) 555-0148</a>.
			</p>
		</div>
	</div>
</section>
