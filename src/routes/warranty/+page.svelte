<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';

	const sections = [
		{
			title: '10-year frame warranty',
			body: 'Every Furniture frame — the kiln-dried hardwood structure, joints and springs underneath the piece — is warranted for 10 years from the date of delivery against defects in materials and workmanship. If a frame fails under normal use, we will repair it or, if it cannot be repaired, replace the piece.'
		},
		{
			title: '2-year fabric and cushion warranty',
			body: 'Fabric, leather, cushion fillings and zips are warranted for 2 years against defects in materials and workmanship, including seam failure and abnormal sagging. Fading from direct sunlight and marks from use are normal wear, not defects — but our care guides help you keep both to a minimum.'
		},
		{
			title: 'What is covered',
			body: 'Frame breakage and joint failure; spring and suspension failure; seam and stitching failure; cushion cores that lose their shape abnormally; mechanisms on recliners and sofa-beds that stop working; and finish defects on solid wood reported within 30 days of delivery.'
		},
		{
			title: 'What is not covered',
			body: 'Normal wear and tear; fading, including from sunlight; damage from accidents, spills, pets or misuse; damage from moving the piece incorrectly or assembling it against the instructions; commercial use beyond the trade program terms; and pieces bought second-hand or from unauthorised sellers.'
		},
		{
			title: 'How to make a claim',
			body: 'Email hello@furniture.example or call (985) 555-0148 with your order number, a description of the problem and a photo if you can. We will respond within two business days with the next step — usually a repair visit, a replacement part sent to you, or a collection for workshop repair. Most repairs are completed within 14 days.'
		},
		{
			title: 'Repairs and replacements',
			body: 'Where a repair is possible, we will carry it out free of charge — in your home for small jobs, or in our workshop for larger ones, with collection and redelivery included. If the piece cannot be repaired, we will replace it with the same piece, or with one of equal value if it has been discontinued. The warranty restarts on any replacement piece.'
		},
		{
			title: 'Your statutory rights',
			body: 'This warranty is in addition to your statutory rights, which are not affected by anything on this page. If you are unsure whether a problem is covered, ask us — we would rather look at it and tell you honestly than have you live with a fault.'
		}
	];
</script>

<svelte:head>
	<title>Warranty — Furniture | 10-year frame, 2-year fabric</title>
	<meta
		name="description"
		content="Furniture warranty — 10 years on every frame, 2 years on fabric and cushions. What is covered, what is not, and how to make a claim."
	/>
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-3xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8">
		<div class="reveal" use:reveal>
			<p class="text-sm font-bold tracking-[0.2em] text-flame-deep uppercase">Legal</p>
			<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-ink sm:text-5xl">Warranty</h1>
			<p class="mt-4 leading-relaxed text-muted">
				Last updated: November 2026. Ten years on the frame, two years on fabric and cushions — because
				furniture should be built to last, and guaranteed like it.
			</p>
		</div>

		<div class="mt-10 grid gap-5 sm:grid-cols-2">
			<div class="reveal rounded-3xl border border-orange-100 bg-white p-6" use:reveal>
				<span class="grid size-12 place-items-center rounded-2xl bg-peach text-flame-deep">
					<Icon name="shield" class="size-6" />
				</span>
				<p class="mt-4 font-display text-4xl font-bold text-ink">10 years</p>
				<p class="mt-1 text-sm font-semibold text-flame-deep">Frame warranty</p>
				<p class="mt-2 text-sm leading-relaxed text-muted">Hardwood frames, joints and springs — defects in materials and workmanship.</p>
			</div>
			<div class="reveal rounded-3xl border border-orange-100 bg-white p-6" use:reveal style="--rd: 100ms">
				<span class="grid size-12 place-items-center rounded-2xl bg-peach text-flame-deep">
					<Icon name="sofa" class="size-6" />
				</span>
				<p class="mt-4 font-display text-4xl font-bold text-ink">2 years</p>
				<p class="mt-1 text-sm font-semibold text-flame-deep">Fabric &amp; cushion warranty</p>
				<p class="mt-2 text-sm leading-relaxed text-muted">Fabric, leather, cushion fillings, zips and mechanisms.</p>
			</div>
		</div>

		<div class="mt-10 space-y-8">
			{#each sections as s, i}
				<section class="reveal" use:reveal style="--rd: {i * 40}ms">
					<h2 class="font-display text-xl font-semibold text-ink sm:text-2xl">{s.title}</h2>
					<p class="mt-2 leading-relaxed text-muted">{s.body}</p>
				</section>
			{/each}
		</div>
		<div class="reveal mt-12 rounded-[2rem] bg-ink px-6 py-8 sm:px-10" use:reveal>
			<h2 class="font-display text-xl font-semibold text-white">Make a warranty claim</h2>
			<p class="mt-2 leading-relaxed text-white/70">
				Email <a href="mailto:hello@furniture.example" class="font-semibold text-white underline underline-offset-2">hello@furniture.example</a>
				or call <a href="tel:+19855550148" class="font-semibold text-white underline underline-offset-2">(985) 555-0148</a>
				with your order number and a photo of the problem. We reply within two business days.
			</p>
			<a
				href="/contact"
				class="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
			>
				Contact us <Icon name="arrow-right" class="size-4" />
			</a>
		</div>
	</div>
</section>
