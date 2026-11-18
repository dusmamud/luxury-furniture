<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';

	const email = 'hello@furniture.example';

	const benefits = [
		{ icon: 'check', title: '15% trade discount', body: 'On every order, every day — including sale pieces, with no minimum spend.' },
		{ icon: 'user', title: 'A dedicated trade manager', body: 'One person who knows your projects, your taste and your deadlines.' },
		{ icon: 'sparkle', title: 'Early access to collections', body: 'See and order new pieces before they go on general sale.' },
		{ icon: 'truck', title: 'Project delivery, scheduled', body: 'White-glove delivery coordinated around your install dates, not ours.' },
		{ icon: 'eye', title: 'Trade-only previews', body: 'Private showroom hours and samples sent to your studio on request.' },
		{ icon: 'refresh', title: 'Flexible returns', body: '60-day returns on trade orders, because client decisions take time.' }
	];

	const businessTypes = ['Interior design studio', 'Architecture firm', 'Home staging', 'Hospitality / restaurant', 'Property developer', 'Other'];

	let name = $state('');
	let business = $state('');
	let fromEmail = $state('');
	let phone = $state('');
	let businessType = $state(businessTypes[0]);
	let website = $state('');
	let errors = $state<Record<string, string>>({});
	let sent = $state(false);

	function validate() {
		const e: Record<string, string> = {};
		if (name.trim().length < 2) e.name = 'Please tell us your name.';
		if (business.trim().length < 2) e.business = 'Please tell us your business name.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail.trim())) e.email = 'Please enter a valid email address.';
		if (phone.trim().length < 7) e.phone = 'Please enter a phone number we can reach you on.';
		errors = e;
		return Object.keys(e).length === 0;
	}

	function submit(ev: SubmitEvent) {
		ev.preventDefault();
		if (!validate()) return;
		const subject = encodeURIComponent(`[Furniture Trade] Application — ${business.trim()}`);
		const body = encodeURIComponent(
			`Hi Furniture trade team,\n\nI would like to apply for the trade program.\n\nName: ${name.trim()}\nBusiness: ${business.trim()}\nBusiness type: ${businessType}\nEmail: ${fromEmail.trim()}\nPhone: ${phone.trim()}` +
				(website.trim() ? `\nWebsite / portfolio: ${website.trim()}` : '') +
				`\n\nThank you.`
		);
		sent = true;
		window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
	}
</script>

<svelte:head>
	<title>Trade Program — Furniture | 15% off for design professionals</title>
	<meta
		name="description"
		content="Furniture trade program: 15% discount, a dedicated trade manager, early access to collections and 60-day returns for designers and architects."
	/>
	<link
		rel="preload"
		as="image"
		href="/images/dining-table.webp"
		imagesrcset="/images/dining-table-800.webp 800w, /images/dining-table.webp 1920w"
		imagesizes="(max-width: 1024px) 100vw, 600px"
		fetchpriority="high"
	/>
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8">
		<div class="grid items-center gap-10 lg:grid-cols-2">
			<div class="reveal" use:reveal>
				<p class="text-sm font-bold tracking-[0.2em] text-flame-deep uppercase">Trade program</p>
				<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-ink sm:text-5xl">
					Built for the people who build beautiful rooms.
				</h1>
				<p class="mt-4 text-lg leading-relaxed text-muted">
					Interior designers, architects, stagers and hospitality buyers get <strong class="text-ink">15% off</strong>,
					a dedicated trade manager and early access to every new collection.
				</p>
				<div class="mt-8 flex flex-wrap gap-3">
					<a
						href="#apply"
						class="inline-flex min-h-11 items-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
					>
						Apply now <Icon name="arrow-right" class="size-4" />
					</a>
					<a
						href="/showrooms"
						class="inline-flex min-h-11 items-center gap-2 rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-bold text-ink transition hover:border-flame hover:text-flame-deep"
					>
						Visit a showroom
					</a>
				</div>
			</div>
			<div class="reveal overflow-hidden rounded-[2rem]" use:reveal style="--rd: 120ms">
				<img
					src="/images/dining-table.webp"
					srcset="/images/dining-table-800.webp 800w, /images/dining-table.webp 1920w"
					sizes="(max-width: 1024px) 100vw, 600px"
					width="1920"
					height="1280"
					alt="A solid oak dining table styled for a restaurant project"
					class="aspect-[4/3] w-full object-cover"
					loading="eager"
					fetchpriority="high"
				/>
			</div>
		</div>

		<!-- Benefits -->
		<div class="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each benefits as b, i}
				<div class="reveal lift rounded-3xl border border-orange-100 bg-white p-6" use:reveal style="--rd: {(i % 3) * 80}ms">
					<span class="grid size-12 place-items-center rounded-2xl bg-peach text-flame-deep">
						<Icon name={b.icon} class="size-6" />
					</span>
					<h2 class="mt-4 font-display text-lg font-semibold text-ink">{b.title}</h2>
					<p class="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
				</div>
			{/each}
		</div>

		<!-- How it works -->
		<div class="reveal mt-16 rounded-[2rem] bg-ink px-6 py-10 sm:px-12" use:reveal>
			<h2 class="font-display text-2xl font-semibold text-white sm:text-3xl">How it works</h2>
			<ol class="mt-8 grid gap-6 md:grid-cols-3">
				{#each [{ n: '1', t: 'Apply in two minutes', b: 'Tell us about your business and send the form below.' }, { n: '2', t: 'We approve within a day', b: 'Most applications are approved within one business day.' }, { n: '3', t: 'Order with 15% off', b: 'Your trade discount applies at checkout, on every order.' }] as s}
					<li>
						<span class="grid size-11 place-items-center rounded-full bg-flame-dark font-display text-lg font-bold text-white">{s.n}</span>
						<h3 class="mt-4 font-display text-lg font-semibold text-white">{s.t}</h3>
						<p class="mt-1 text-sm leading-relaxed text-white/70">{s.b}</p>
					</li>
				{/each}
			</ol>
		</div>

		<!-- Application form -->
		<div id="apply" class="reveal mt-16 grid gap-10 lg:grid-cols-[1fr_1.4fr]" use:reveal>
			<div>
				<h2 class="font-display text-2xl font-semibold text-ink sm:text-3xl">Apply for trade membership</h2>
				<p class="mt-3 leading-relaxed text-muted">
					The form opens your email app with your application ready to send to our trade team. We approve
					most applications within one business day and email your trade account details.
				</p>
				<p class="mt-4 text-sm font-semibold text-ink">
					Questions first? Call <a href="tel:+19855550148" class="text-flame-deep underline underline-offset-2">(985) 555-0148</a>
					or write to <a href="mailto:{email}" class="text-flame-deep underline underline-offset-2">{email}</a>.
				</p>
			</div>

			{#if sent}
				<div class="rounded-3xl border border-orange-100 bg-white p-8 text-center" role="status">
					<span class="mx-auto grid size-14 place-items-center rounded-full bg-peach text-flame-deep">
						<Icon name="mail" class="size-7" />
					</span>
					<h3 class="mt-4 font-display text-2xl font-semibold text-ink">Your email app should be open</h3>
					<p class="mx-auto mt-2 max-w-md leading-relaxed text-muted">
						We opened a pre-addressed email to {email} with your trade application. Press send in your
						email app and our trade team will review it — or email us directly at
						<a href="mailto:{email}" class="font-semibold text-flame-deep underline underline-offset-2">{email}</a>.
					</p>
					<button
						type="button"
						class="mt-6 inline-flex min-h-11 items-center rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-bold text-ink transition hover:border-flame hover:text-flame-deep"
						onclick={() => (sent = false)}
					>
						Edit and resend
					</button>
				</div>
			{:else}
				<form
					class="rounded-3xl border border-orange-100 bg-white p-6 sm:p-8"
					onsubmit={submit}
					novalidate
				>
					<div class="grid gap-5 sm:grid-cols-2">
						<div>
							<label for="trade-name" class="mb-1.5 block text-sm font-bold text-ink">Your name</label>
							<input
								id="trade-name"
								type="text"
								bind:value={name}
								autocomplete="name"
								placeholder="Alex Morgan"
								aria-invalid={errors.name ? 'true' : undefined}
								class="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-flame focus:outline-none"
							/>
							{#if errors.name}<p class="mt-1.5 text-xs font-semibold text-flame-deep">{errors.name}</p>{/if}
						</div>
						<div>
							<label for="trade-business" class="mb-1.5 block text-sm font-bold text-ink">Business name</label>
							<input
								id="trade-business"
								type="text"
								bind:value={business}
								autocomplete="organization"
								placeholder="Morgan Interiors"
								aria-invalid={errors.business ? 'true' : undefined}
								class="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-flame focus:outline-none"
							/>
							{#if errors.business}<p class="mt-1.5 text-xs font-semibold text-flame-deep">{errors.business}</p>{/if}
						</div>
						<div>
							<label for="trade-email" class="mb-1.5 block text-sm font-bold text-ink">Business email</label>
							<input
								id="trade-email"
								type="email"
								bind:value={fromEmail}
								autocomplete="email"
								placeholder="alex@morganinteriors.com"
								aria-invalid={errors.email ? 'true' : undefined}
								class="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-flame focus:outline-none"
							/>
							{#if errors.email}<p class="mt-1.5 text-xs font-semibold text-flame-deep">{errors.email}</p>{/if}
						</div>
						<div>
							<label for="trade-phone" class="mb-1.5 block text-sm font-bold text-ink">Phone</label>
							<input
								id="trade-phone"
								type="tel"
								bind:value={phone}
								autocomplete="tel"
								placeholder="(985) 555-0100"
								aria-invalid={errors.phone ? 'true' : undefined}
								class="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-flame focus:outline-none"
							/>
							{#if errors.phone}<p class="mt-1.5 text-xs font-semibold text-flame-deep">{errors.phone}</p>{/if}
						</div>
						<div>
							<label for="trade-type" class="mb-1.5 block text-sm font-bold text-ink">Business type</label>
							<select
								id="trade-type"
								bind:value={businessType}
								class="w-full appearance-none rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm text-ink focus:border-flame focus:outline-none"
							>
								{#each businessTypes as t}<option value={t}>{t}</option>{/each}
							</select>
						</div>
						<div>
							<label for="trade-website" class="mb-1.5 block text-sm font-bold text-ink">Portfolio / website <span class="font-normal text-muted">(optional)</span></label>
							<input
								id="trade-website"
								type="url"
								bind:value={website}
								autocomplete="url"
								placeholder="https://morganinteriors.com"
								class="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-flame focus:outline-none"
							/>
						</div>
					</div>
					<button
						type="submit"
						class="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-flame-dark px-8 py-3 text-sm font-bold text-white transition hover:bg-flame-deep active:scale-[0.98]"
					>
						<Icon name="mail" class="size-4" /> Submit application by email
					</button>
					<p class="mt-3 text-xs leading-relaxed text-muted">
						This opens your own email app with the application addressed to us — we never see anything
						until you press send.
					</p>
				</form>
			{/if}
		</div>
	</div>
</section>
