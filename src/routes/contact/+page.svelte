<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';

	const email = 'hello@furniture.example';
	const phone = '(985) 555-0148';

	const cards = [
		{ icon: 'pin', title: 'Visit the showroom', lines: ['800 Winward Drive, Suite A', 'Covington, LA 70433'], href: '/showrooms', linkLabel: 'See all showrooms' },
		{ icon: 'phone', title: 'Call us', lines: [phone, 'Mon–Sat, 10 AM–7 PM CT'], href: 'tel:+19855550148', linkLabel: 'Call now' },
		{ icon: 'mail', title: 'Email us', lines: [email, 'We reply within one business day'], href: `mailto:${email}`, linkLabel: 'Write an email' },
		{ icon: 'clock', title: 'Opening hours', lines: ['Mon–Sat: 10 AM–7 PM', 'Sunday: 12–5 PM'], href: '/showrooms', linkLabel: 'Plan a visit' }
	];

	const subjects = ['Order question', 'Delivery', 'Returns', 'Trade', 'Something else'];

	let name = $state('');
	let fromEmail = $state('');
	let subject = $state(subjects[0]);
	let message = $state('');
	let errors = $state<Record<string, string>>({});
	let sent = $state(false);

	function validate() {
		const e: Record<string, string> = {};
		if (name.trim().length < 2) e.name = 'Please tell us your name.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail.trim())) e.email = 'Please enter a valid email address.';
		if (message.trim().length < 10) e.message = 'Please write a little more so we can help — at least 10 characters.';
		errors = e;
		return Object.keys(e).length === 0;
	}

	function submit(ev: SubmitEvent) {
		ev.preventDefault();
		if (!validate()) return;
		const mailSubject = encodeURIComponent(`[Furniture] ${subject} — ${name.trim()}`);
		const mailBody = encodeURIComponent(
			`Hi Furniture team,\n\n${message.trim()}\n\n— ${name.trim()} (${fromEmail.trim()})`
		);
		sent = true;
		window.location.href = `mailto:${email}?subject=${mailSubject}&body=${mailBody}`;
	}
</script>

<svelte:head>
	<title>Contact Us — Furniture | Visit, call or write</title>
	<meta
		name="description"
		content="Contact Furniture in Covington, LA — visit the showroom at 800 Winward Drive, call (985) 555-0148 or send us an email. Mon–Sat 10 AM–7 PM CT."
	/>
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8">
		<div class="reveal max-w-2xl" use:reveal>
			<p class="text-sm font-bold tracking-[0.2em] text-flame-deep uppercase">Contact</p>
			<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-ink sm:text-5xl">
				We would love to hear from you.
			</h1>
			<p class="mt-4 text-lg leading-relaxed text-muted">
				Questions about an order, a delivery, or the right sofa for your room? Our team in Covington answers
				every message within one business day.
			</p>
		</div>

		<!-- Info cards -->
		<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each cards as c, i}
				<div class="reveal lift rounded-3xl border border-orange-100 bg-white p-6" use:reveal style="--rd: {i * 80}ms">
					<span class="grid size-12 place-items-center rounded-2xl bg-peach text-flame-deep">
						<Icon name={c.icon} class="size-6" />
					</span>
					<h2 class="mt-4 font-display text-lg font-semibold text-ink">{c.title}</h2>
					{#each c.lines as line}
						<p class="mt-1 text-sm leading-relaxed text-muted">{line}</p>
					{/each}
					<a href={c.href} class="mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-flame-deep hover:text-flame-deep">
						{c.linkLabel} <Icon name="arrow-right" class="size-4" />
					</a>
				</div>
			{/each}
		</div>

		<!-- Form -->
		<div class="reveal mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr]" use:reveal>
			<div>
				<h2 class="font-display text-2xl font-semibold text-ink sm:text-3xl">Send us a message</h2>
				<p class="mt-3 leading-relaxed text-muted">
					Fill in the form and your email app will open with your message ready to send — that is how your
					message reaches us. Prefer to talk? Call us on <a href="tel:+19855550148" class="font-semibold text-flame-deep underline underline-offset-2">{phone}</a>.
				</p>
				<ul class="mt-6 space-y-3">
					{#each ['Order questions — tracking, changes and delivery dates', 'Trade enquiries — discounts and project support', 'Showroom visits — appointments and in-store orders'] as item}
						<li class="flex items-start gap-3 text-sm font-medium text-cocoa">
							<span class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-peach text-flame-deep">
								<Icon name="check" class="size-3.5" />
							</span>
							{item}
						</li>
					{/each}
				</ul>
			</div>

			{#if sent}
				<div class="rounded-3xl border border-orange-100 bg-white p-8 text-center" role="status">
					<span class="mx-auto grid size-14 place-items-center rounded-full bg-peach text-flame-deep">
						<Icon name="mail" class="size-7" />
					</span>
					<h3 class="mt-4 font-display text-2xl font-semibold text-ink">Your email app should be open</h3>
					<p class="mx-auto mt-2 max-w-md leading-relaxed text-muted">
						We opened a pre-addressed email to {email} with your message. Press send in your email app
						and it will reach our team — or if nothing opened, you can email us directly at
						<a href="mailto:{email}" class="font-semibold text-flame-deep underline underline-offset-2">{email}</a>.
					</p>
					<p class="mt-4 text-sm font-semibold text-ink">
						In a hurry? Call us on <a href="tel:+19855550148" class="text-flame-deep underline underline-offset-2">{phone}</a>.
					</p>
					<button
						type="button"
						class="mt-6 inline-flex min-h-11 items-center rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-bold text-ink transition hover:border-flame hover:text-flame-deep"
						onclick={() => (sent = false)}
					>
						Write another message
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
							<label for="contact-name" class="mb-1.5 block text-sm font-bold text-ink">Your name</label>
							<input
								id="contact-name"
								type="text"
								bind:value={name}
								autocomplete="name"
								placeholder="Jane Cooper"
								aria-invalid={errors.name ? 'true' : undefined}
								aria-describedby={errors.name ? 'contact-name-error' : undefined}
								class="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-flame focus:outline-none"
							/>
							{#if errors.name}<p id="contact-name-error" class="mt-1.5 text-xs font-semibold text-flame-deep">{errors.name}</p>{/if}
						</div>
						<div>
							<label for="contact-email" class="mb-1.5 block text-sm font-bold text-ink">Email address</label>
							<input
								id="contact-email"
								type="email"
								bind:value={fromEmail}
								autocomplete="email"
								placeholder="jane@example.com"
								aria-invalid={errors.email ? 'true' : undefined}
								aria-describedby={errors.email ? 'contact-email-error' : undefined}
								class="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-flame focus:outline-none"
							/>
							{#if errors.email}<p id="contact-email-error" class="mt-1.5 text-xs font-semibold text-flame-deep">{errors.email}</p>{/if}
						</div>
					</div>
					<div class="mt-5">
						<label for="contact-subject" class="mb-1.5 block text-sm font-bold text-ink">Subject</label>
						<select
							id="contact-subject"
							bind:value={subject}
							class="w-full appearance-none rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm text-ink focus:border-flame focus:outline-none"
						>
							{#each subjects as s}<option value={s}>{s}</option>{/each}
						</select>
					</div>
					<div class="mt-5">
						<label for="contact-message" class="mb-1.5 block text-sm font-bold text-ink">Message</label>
						<textarea
							id="contact-message"
							rows="5"
							bind:value={message}
							placeholder="Tell us how we can help…"
							aria-invalid={errors.message ? 'true' : undefined}
							aria-describedby={errors.message ? 'contact-message-error' : undefined}
							class="w-full resize-y rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-flame focus:outline-none"
						></textarea>
						{#if errors.message}<p id="contact-message-error" class="mt-1.5 text-xs font-semibold text-flame-deep">{errors.message}</p>{/if}
					</div>
					<button
						type="submit"
						class="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-flame-dark px-8 py-3 text-sm font-bold text-white transition hover:bg-flame-deep active:scale-[0.98]"
					>
						<Icon name="mail" class="size-4" /> Open email to send
					</button>
					<p class="mt-3 text-xs leading-relaxed text-muted">
						This opens your own email app with the message addressed to us — we never see anything until
						you press send.
					</p>
				</form>
			{/if}
		</div>
	</div>
</section>
