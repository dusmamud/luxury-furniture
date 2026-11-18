<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';

	const faqs = [
		{
			q: 'How long does delivery take?',
			a: 'Most in-stock orders arrive within 3–5 business days. Standard delivery is $49 and free on orders over $499. You will get tracking as soon as your order leaves our Covington workshop, and you can follow it any time on our track-order page.'
		},
		{
			q: 'What is white-glove delivery?',
			a: 'White-glove delivery (+$99) is our premium service: we schedule a two-hour arrival window, carry the piece into the room of your choice, assemble it, and take all the packaging away. It is the best option for large sofas, dining tables and beds.'
		},
		{
			q: 'What is your returns policy?',
			a: 'You have 30 days from delivery to change your mind. Pieces must be unused and in their original condition; we collect the return and refund you in full once it arrives back at our workshop. Custom or made-to-order pieces are final sale — this is always noted on the product page.'
		},
		{
			q: 'What does the 10-year warranty cover?',
			a: 'Every frame is covered for 10 years against defects in materials and workmanship — joints, springs and the hardwood frame itself. Fabric and cushions carry a 2-year warranty. The warranty does not cover normal wear, accidental damage or misuse, but our team will always quote a fair repair.'
		},
		{
			q: 'Do I need to assemble my furniture?',
			a: 'Most pieces need almost no assembly. Sofa legs twist on by hand in about 15 minutes, and every tool you need is in the box. Larger pieces like beds and shelving take 30–45 minutes with the illustrated guide. Choose white-glove delivery and we assemble everything for you.'
		},
		{
			q: 'Do you offer financing?',
			a: 'Yes — 0% APR for 12 months on orders over $100, and 0% APR for 18 months on orders over $1,000. There is no deposit and no hidden fees; the monthly figure you see at checkout is exactly what you pay. See our financing page for the calculator and eligibility.'
		},
		{
			q: 'What if my piece is out of stock?',
			a: 'The product page shows live stock and the expected delivery window. If a piece is out of stock, you can join the waitlist and we will email you the moment it returns. Made-to-order pieces show a lead time — usually 2–4 weeks — before you add them to your bag.'
		},
		{
			q: 'Do you have a trade program?',
			a: 'Yes. Interior designers, architects, stagers and hospitality buyers get 15% off, dedicated trade support and early access to new collections. Applications take about two minutes on our trade page, and we approve most within one business day.'
		},
		{
			q: 'How do I care for oak and performance fabric?',
			a: 'Oak: dust weekly with a dry cloth, blot spills straight away and re-oil once a year. Performance fabric: vacuum weekly and blot spills immediately — most cushion covers are machine-washable on cold. Each product page has a care tab with the exact routine for that piece.'
		},
		{
			q: 'Can I visit a showroom before buying?',
			a: 'Please do. Our Covington flagship at 800 Winward Drive is open Mon–Sat 10 AM–7 PM and Sunday 12–5 PM. You can try every piece, talk to our team, and order in-store for home delivery. We also have showrooms in New Orleans and Baton Rouge.'
		}
	];

	let openIndex = $state(0);
</script>

<svelte:head>
	<title>FAQ — Furniture | Delivery, returns, warranty &amp; more</title>
	<meta
		name="description"
		content="Answers about delivery times, white-glove delivery, 30-day returns, the 10-year frame warranty, assembly, 0% APR financing, stock and the trade program."
	/>
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-4xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8">
		<div class="reveal text-center" use:reveal>
			<p class="text-sm font-bold tracking-[0.2em] text-flame-deep uppercase">FAQ</p>
			<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-ink sm:text-5xl">
				Questions, answered.
			</h1>
			<p class="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">
				Delivery, returns, warranty, financing — the things customers ask us most. Still stuck? Our team is
				one message away.
			</p>
		</div>

		<div class="mt-10 space-y-3">
			{#each faqs as f, i}
				<div class="reveal overflow-hidden rounded-3xl border border-orange-100 bg-white" use:reveal style="--rd: {i * 40}ms">
					<h2>
						<button
							type="button"
							class="flex min-h-11 w-full items-center justify-between gap-4 px-6 py-5 text-left"
							aria-expanded={openIndex === i}
							aria-controls="faq-panel-{i}"
							id="faq-button-{i}"
							onclick={() => (openIndex = openIndex === i ? -1 : i)}
						>
							<span class="font-display text-base font-semibold text-ink sm:text-lg">{f.q}</span>
							<span
								class="grid size-9 shrink-0 place-items-center rounded-full bg-peach text-flame-deep transition-transform duration-300 {openIndex === i ? 'rotate-180' : ''}"
							>
								<Icon name="chevron-down" class="size-5" />
							</span>
						</button>
					</h2>
					<div
						id="faq-panel-{i}"
						role="region"
						aria-labelledby="faq-button-{i}"
						hidden={openIndex !== i}
					>
						<p class="px-6 pb-6 text-sm leading-relaxed text-muted sm:text-base">{f.a}</p>
					</div>
				</div>
			{/each}
		</div>

		<div class="reveal mt-10 rounded-[2rem] bg-ink px-6 py-10 text-center sm:px-12" use:reveal>
			<h2 class="font-display text-2xl font-semibold text-white sm:text-3xl">Didn't find your answer?</h2>
			<p class="mx-auto mt-2 max-w-md leading-relaxed text-white/70">
				Call us on (985) 555-0148, Mon–Sat 10 AM–7 PM CT, or send a message and we will reply within one
				business day.
			</p>
			<div class="mt-6 flex flex-wrap justify-center gap-3">
				<a
					href="/contact"
					class="inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
				>
					Contact us <Icon name="arrow-right" class="size-4" />
				</a>
				<a
					href="/help"
					class="inline-flex min-h-11 items-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:border-white"
				>
					Browse the help centre
				</a>
			</div>
		</div>
	</div>
</section>
