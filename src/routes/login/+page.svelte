<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { shop } from '#lib/data/store.svelte';

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let fieldErrors = $state<Record<string, string>>({});

	const inputCls =
		'w-full rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-flame focus:outline-none';

	function submit() {
		const next: Record<string, string> = {};
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Please enter a valid email address.';
		if (password.length < 1) next.password = 'Please enter your password.';
		fieldErrors = next;
		error = '';
		if (Object.keys(next).length > 0) return;
		const res = shop.login(email, password);
		if (res.ok) goto('/account');
		else error = res.error ?? 'Login failed. Please try again.';
	}

	function useDemo() {
		// Create the demo account first if it does not exist yet, then log in.
		shop.signup('Demo User', 'demo@furniture.example', 'demo1234');
		const res = shop.login('demo@furniture.example', 'demo1234');
		if (res.ok) goto('/account');
		else error = res.error ?? 'Demo login failed. Please try again.';
	}
</script>

<svelte:head>
	<title>Log In — Furniture</title>
	<meta name="description" content="Log in to your Furniture account to view orders, addresses and your wishlist." />
</svelte:head>

<div class="mx-auto max-w-md px-4 pt-10 pb-16 sm:px-6">
	<div use:reveal class="reveal rounded-3xl border border-orange-100 bg-white p-6 sm:p-8">
		<p class="text-xs font-bold tracking-[0.2em] text-flame-deep uppercase">Welcome back</p>
		<h1 class="mt-2 font-display text-3xl font-bold text-ink">Log in</h1>
		<p class="mt-2 text-sm leading-relaxed text-muted">
			Access your orders, saved addresses and wishlist.
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
				<label for="login-email" class="mb-1.5 block text-sm font-semibold text-ink">Email</label>
				<input
					id="login-email"
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
				<label for="login-password" class="mb-1.5 block text-sm font-semibold text-ink">Password</label>
				<input
					id="login-password"
					type="password"
					bind:value={password}
					placeholder="Your password"
					autocomplete="current-password"
					aria-invalid={fieldErrors.password ? 'true' : undefined}
					class="{inputCls} {fieldErrors.password ? 'border-flame' : ''}"
				/>
				{#if fieldErrors.password}<p class="mt-1 text-sm font-medium text-flame-deep" role="alert">{fieldErrors.password}</p>{/if}
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
				Log in <Icon name="arrow-right" class="size-4" />
			</button>
		</form>

		<div class="mt-6 rounded-2xl bg-cream p-4">
			<p class="text-sm font-bold text-ink">Trying the demo?</p>
			<p class="mt-1 text-xs leading-relaxed text-muted">
				Use the demo account — <span class="font-semibold text-ink">demo@furniture.example</span> /
				<span class="font-semibold text-ink">demo1234</span>
			</p>
			<button
				type="button"
				class="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-2.5 text-sm font-bold text-ink transition hover:border-flame hover:text-flame-deep"
				onclick={useDemo}
			>
				<Icon name="user" class="size-4" /> Use demo account
			</button>
		</div>

		<p class="mt-6 text-center text-sm text-muted">
			No account yet?
			<a href="/signup" class="font-bold text-flame-deep hover:underline">Create one</a>
		</p>
	</div>
</div>
