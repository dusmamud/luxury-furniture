<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { shop } from '#lib/data/store.svelte';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let error = $state('');
	let fieldErrors = $state<Record<string, string>>({});

	const inputCls =
		'w-full rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-flame focus:outline-none';

	function submit() {
		const next: Record<string, string> = {};
		if (name.trim().length < 2) next.name = 'Please enter your full name.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Please enter a valid email address.';
		if (password.length < 6) next.password = 'Password must be at least 6 characters.';
		if (confirmPassword !== password) next.confirm = 'Passwords do not match.';
		fieldErrors = next;
		error = '';
		if (Object.keys(next).length > 0) return;
		const res = shop.signup(name, email, password);
		if (res.ok) goto('/account');
		else error = res.error ?? 'Could not create your account. Please try again.';
	}
</script>

<svelte:head>
	<title>Create an Account — Furniture</title>
	<meta
		name="description"
		content="Create a free Furniture account to track orders, save addresses and keep your wishlist."
	/>
</svelte:head>

<div class="mx-auto max-w-md px-4 pt-10 pb-16 sm:px-6">
	<div use:reveal class="reveal rounded-3xl border border-orange-100 bg-white p-6 sm:p-8">
		<p class="text-xs font-bold tracking-[0.2em] text-flame-deep uppercase">Join Furniture</p>
		<h1 class="mt-2 font-display text-3xl font-bold text-ink">Create an account</h1>
		<p class="mt-2 text-sm leading-relaxed text-muted">
			Track orders, save delivery addresses and keep your wishlist in one place.
		</p>

		<form
			class="mt-6 space-y-4"
			onsubmit={(e) => {
				e.preventDefault();
				submit();
			}}
			novalidate
		>
			<div>
				<label for="signup-name" class="mb-1.5 block text-sm font-semibold text-ink">Full name</label>
				<input
					id="signup-name"
					type="text"
					bind:value={name}
					placeholder="Alexandra Morgan"
					autocomplete="name"
					aria-invalid={fieldErrors.name ? 'true' : undefined}
					class="{inputCls} {fieldErrors.name ? 'border-flame' : ''}"
				/>
				{#if fieldErrors.name}<p class="mt-1 text-sm font-medium text-flame-deep" role="alert">{fieldErrors.name}</p>{/if}
			</div>
			<div>
				<label for="signup-email" class="mb-1.5 block text-sm font-semibold text-ink">Email</label>
				<input
					id="signup-email"
					type="email"
					bind:value={email}
					placeholder="you@example.com"
					autocomplete="email"
					aria-invalid={fieldErrors.email ? 'true' : undefined}
					class="{inputCls} {fieldErrors.email ? 'border-flame' : ''}"
				/>
				{#if fieldErrors.email}<p class="mt-1 text-sm font-medium text-flame-deep" role="alert">{fieldErrors.email}</p>{/if}
			</div>
			<div>
				<label for="signup-password" class="mb-1.5 block text-sm font-semibold text-ink">Password</label>
				<input
					id="signup-password"
					type="password"
					bind:value={password}
					placeholder="At least 6 characters"
					autocomplete="new-password"
					aria-invalid={fieldErrors.password ? 'true' : undefined}
					class="{inputCls} {fieldErrors.password ? 'border-flame' : ''}"
				/>
				{#if fieldErrors.password}<p class="mt-1 text-sm font-medium text-flame-deep" role="alert">{fieldErrors.password}</p>{/if}
			</div>
			<div>
				<label for="signup-confirm" class="mb-1.5 block text-sm font-semibold text-ink">Confirm password</label>
				<input
					id="signup-confirm"
					type="password"
					bind:value={confirmPassword}
					placeholder="Repeat your password"
					autocomplete="new-password"
					aria-invalid={fieldErrors.confirm ? 'true' : undefined}
					class="{inputCls} {fieldErrors.confirm ? 'border-flame' : ''}"
				/>
				{#if fieldErrors.confirm}<p class="mt-1 text-sm font-medium text-flame-deep" role="alert">{fieldErrors.confirm}</p>{/if}
			</div>
			{#if error}
				<p class="flex items-center gap-2 rounded-2xl bg-peach px-4 py-3 text-sm font-semibold text-flame-deep" role="alert">
					<Icon name="close" class="size-4 shrink-0" /> {error}
				</p>
			{/if}
			<button
				type="submit"
				class="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-flame-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-deep"
			>
				Create account <Icon name="arrow-right" class="size-4" />
			</button>
		</form>

		<p class="mt-6 text-center text-sm text-muted">
			Already have an account?
			<a href="/login" class="font-bold text-flame-deep hover:underline">Log in</a>
		</p>
	</div>
</div>
