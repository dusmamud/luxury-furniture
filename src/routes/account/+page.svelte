<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { formatPrice } from '#lib/data/products';
	import { formatDate, ORDER_STEPS, shop } from '#lib/data/store.svelte';

	let profileName = $state(shop.user?.name ?? '');
	let profileMsg = $state('');
	let profileErr = $state('');

	let currentPw = $state('');
	let newPw = $state('');
	let confirmPw = $state('');
	let pwMsg = $state('');
	let pwErr = $state('');

	let showAddressForm = $state(false);
	let label = $state('');
	let aName = $state('');
	let aEmail = $state('');
	let aPhone = $state('');
	let aAddress = $state('');
	let aCity = $state('');
	let aState = $state('');
	let aZip = $state('');
	let addrErrors = $state<Record<string, string>>({});

	let recentOrders = $derived(shop.myOrders().slice(0, 3));

	const inputCls =
		'w-full rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-flame focus:outline-none';

	function saveProfile() {
		profileMsg = '';
		profileErr = '';
		if (shop.updateProfile(profileName)) {
			profileMsg = 'Your name has been updated.';
		} else {
			profileErr = 'Please enter a name with at least 2 characters.';
		}
	}

	function changePassword() {
		pwMsg = '';
		pwErr = '';
		if (newPw !== confirmPw) {
			pwErr = 'New passwords do not match.';
			return;
		}
		const res = shop.changePassword(currentPw, newPw);
		if (res.ok) {
			pwMsg = 'Your password has been changed.';
			currentPw = '';
			newPw = '';
			confirmPw = '';
		} else {
			pwErr = res.error ?? 'Could not change your password.';
		}
	}

	function addAddress() {
		const next: Record<string, string> = {};
		if (label.trim().length < 2) next.label = 'Give this address a label, e.g. Home.';
		if (aName.trim().length < 2) next.name = 'Please enter the recipient name.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(aEmail.trim())) next.email = 'Please enter a valid email address.';
		if (aPhone.replace(/\D/g, '').length < 7) next.phone = 'Please enter a valid phone number.';
		if (aAddress.trim().length < 4) next.address = 'Please enter your street address.';
		if (aCity.trim().length < 2) next.city = 'Please enter your city.';
		if (aState.trim().length < 2) next.state = 'Please enter your state.';
		if (!/^\d{5}$/.test(aZip.trim())) next.zip = 'Please enter a 5-digit ZIP code.';
		addrErrors = next;
		if (Object.keys(next).length > 0) return;
		shop.addAddress({
			label: label.trim(),
			name: aName.trim(),
			email: aEmail.trim(),
			phone: aPhone.trim(),
			address: aAddress.trim(),
			city: aCity.trim(),
			state: aState.trim(),
			zip: aZip.trim()
		});
		label = '';
		aName = '';
		aEmail = '';
		aPhone = '';
		aAddress = '';
		aCity = '';
		aState = '';
		aZip = '';
		showAddressForm = false;
	}
</script>

<svelte:head>
	<title>Your Account — Furniture</title>
	<meta
		name="description"
		content="Manage your Furniture account: profile, password, saved addresses and recent orders."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
	{#if !shop.user}
		<div use:reveal class="reveal mx-auto mt-6 max-w-xl rounded-3xl border border-orange-100 bg-white px-6 py-14 text-center">
			<span class="mx-auto grid size-16 place-items-center rounded-full bg-peach text-flame">
				<Icon name="user" class="size-7" />
			</span>
			<h1 class="mt-5 font-display text-2xl font-semibold text-ink sm:text-3xl">Log in to your account</h1>
			<p class="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
				Manage your profile, saved addresses and orders — all in one place.
			</p>
			<div class="mt-6 flex flex-wrap items-center justify-center gap-3">
				<a
					href="/login"
					class="inline-flex min-h-11 items-center gap-2 rounded-full bg-flame px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-dark"
				>
					Log in
				</a>
				<a
					href="/signup"
					class="inline-flex min-h-11 items-center rounded-full border border-orange-200 px-6 py-3 text-sm font-bold text-ink transition hover:border-flame hover:text-flame"
				>
					Create an account
				</a>
			</div>
		</div>
	{:else}
		<div use:reveal class="reveal flex flex-wrap items-start justify-between gap-4">
			<div>
				<p class="text-xs font-bold tracking-[0.2em] text-flame uppercase">Furniture</p>
				<h1 class="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">Hello, {shop.user.name.split(' ')[0]}</h1>
				<p class="mt-2 text-sm text-muted">{shop.user.email}</p>
			</div>
			<button
				type="button"
				class="inline-flex min-h-11 items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-3 text-sm font-bold text-ink transition hover:border-flame hover:text-flame"
				onclick={() => shop.logout()}
			>
				<Icon name="close" class="size-4" /> Log out
			</button>
		</div>

		<div class="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
			<!-- Profile -->
			<section use:reveal class="reveal rounded-3xl border border-orange-100 bg-white p-6">
				<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-ink">
					<Icon name="user" class="size-5 text-flame" /> Profile
				</h2>
				<form
					class="mt-5"
					onsubmit={(e) => {
						e.preventDefault();
						saveProfile();
					}}
				>
					<label for="acc-name" class="mb-1.5 block text-sm font-semibold text-ink">Full name</label>
					<input id="acc-name" type="text" bind:value={profileName} autocomplete="name" class={inputCls} />
					{#if profileMsg}
						<p class="mt-2 text-sm font-medium text-flame" role="status">{profileMsg}</p>
					{/if}
					{#if profileErr}
						<p class="mt-2 text-sm font-medium text-flame" role="alert">{profileErr}</p>
					{/if}
					<button
						type="submit"
						class="mt-4 inline-flex min-h-11 items-center rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-cocoa"
					>
						Save name
					</button>
				</form>

				<h3 class="mt-8 border-t border-orange-100 pt-6 font-display text-lg font-semibold text-ink">
					Change password
				</h3>
				<form
					class="mt-4 space-y-4"
					onsubmit={(e) => {
						e.preventDefault();
						changePassword();
					}}
				>
					<div>
						<label for="acc-current-pw" class="mb-1.5 block text-sm font-semibold text-ink">Current password</label>
						<input
							id="acc-current-pw"
							type="password"
							bind:value={currentPw}
							autocomplete="current-password"
							class={inputCls}
						/>
					</div>
					<div>
						<label for="acc-new-pw" class="mb-1.5 block text-sm font-semibold text-ink">New password</label>
						<input
							id="acc-new-pw"
							type="password"
							bind:value={newPw}
							placeholder="At least 6 characters"
							autocomplete="new-password"
							class={inputCls}
						/>
					</div>
					<div>
						<label for="acc-confirm-pw" class="mb-1.5 block text-sm font-semibold text-ink">Confirm new password</label>
						<input
							id="acc-confirm-pw"
							type="password"
							bind:value={confirmPw}
							autocomplete="new-password"
							class={inputCls}
						/>
					</div>
					{#if pwMsg}
						<p class="text-sm font-medium text-flame" role="status">{pwMsg}</p>
					{/if}
					{#if pwErr}
						<p class="text-sm font-medium text-flame" role="alert">{pwErr}</p>
					{/if}
					<button
						type="submit"
						class="inline-flex min-h-11 items-center rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-cocoa"
					>
						Change password
					</button>
				</form>
			</section>

			<!-- Saved addresses -->
			<section use:reveal class="reveal rounded-3xl border border-orange-100 bg-white p-6">
				<div class="flex items-center justify-between gap-3">
					<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-ink">
						<Icon name="pin" class="size-5 text-flame" /> Saved addresses
					</h2>
					<button
						type="button"
						class="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-flame px-4 py-2.5 text-sm font-bold text-white transition hover:bg-flame-dark"
						aria-expanded={showAddressForm}
						onclick={() => (showAddressForm = !showAddressForm)}
					>
						<Icon name="plus" class="size-4" /> Add address
					</button>
				</div>

				{#if showAddressForm}
					<form
						class="mt-5 space-y-4 rounded-2xl bg-cream p-5"
						onsubmit={(e) => {
							e.preventDefault();
							addAddress();
						}}
						novalidate
					>
						<div class="grid gap-4 sm:grid-cols-2">
							<div>
								<label for="addr-label" class="mb-1.5 block text-sm font-semibold text-ink">Label</label>
								<input id="addr-label" type="text" bind:value={label} placeholder="Home" class={inputCls} />
								{#if addrErrors.label}<p class="mt-1 text-sm font-medium text-flame" role="alert">{addrErrors.label}</p>{/if}
							</div>
							<div>
								<label for="addr-name" class="mb-1.5 block text-sm font-semibold text-ink">Recipient name</label>
								<input id="addr-name" type="text" bind:value={aName} placeholder="Alexandra Morgan" class={inputCls} />
								{#if addrErrors.name}<p class="mt-1 text-sm font-medium text-flame" role="alert">{addrErrors.name}</p>{/if}
							</div>
							<div>
								<label for="addr-email" class="mb-1.5 block text-sm font-semibold text-ink">Email</label>
								<input id="addr-email" type="email" bind:value={aEmail} placeholder="you@example.com" class={inputCls} />
								{#if addrErrors.email}<p class="mt-1 text-sm font-medium text-flame" role="alert">{addrErrors.email}</p>{/if}
							</div>
							<div>
								<label for="addr-phone" class="mb-1.5 block text-sm font-semibold text-ink">Phone</label>
								<input id="addr-phone" type="tel" bind:value={aPhone} placeholder="(985) 555-0148" class={inputCls} />
								{#if addrErrors.phone}<p class="mt-1 text-sm font-medium text-flame" role="alert">{addrErrors.phone}</p>{/if}
							</div>
							<div class="sm:col-span-2">
								<label for="addr-street" class="mb-1.5 block text-sm font-semibold text-ink">Street address</label>
								<input id="addr-street" type="text" bind:value={aAddress} placeholder="800 Winward Drive, Suite A" class={inputCls} />
								{#if addrErrors.address}<p class="mt-1 text-sm font-medium text-flame" role="alert">{addrErrors.address}</p>{/if}
							</div>
							<div>
								<label for="addr-city" class="mb-1.5 block text-sm font-semibold text-ink">City</label>
								<input id="addr-city" type="text" bind:value={aCity} placeholder="Covington" class={inputCls} />
								{#if addrErrors.city}<p class="mt-1 text-sm font-medium text-flame" role="alert">{addrErrors.city}</p>{/if}
							</div>
							<div class="grid grid-cols-2 gap-4">
								<div>
									<label for="addr-state" class="mb-1.5 block text-sm font-semibold text-ink">State</label>
									<input id="addr-state" type="text" bind:value={aState} placeholder="LA" class={inputCls} />
									{#if addrErrors.state}<p class="mt-1 text-sm font-medium text-flame" role="alert">{addrErrors.state}</p>{/if}
								</div>
								<div>
									<label for="addr-zip" class="mb-1.5 block text-sm font-semibold text-ink">ZIP</label>
									<input id="addr-zip" type="text" inputmode="numeric" bind:value={aZip} placeholder="70433" class={inputCls} />
									{#if addrErrors.zip}<p class="mt-1 text-sm font-medium text-flame" role="alert">{addrErrors.zip}</p>{/if}
								</div>
							</div>
						</div>
						<div class="flex gap-2">
							<button
								type="submit"
								class="inline-flex min-h-11 items-center rounded-full bg-flame px-5 py-3 text-sm font-bold text-white transition hover:bg-flame-dark"
							>
								Save address
							</button>
							<button
								type="button"
								class="inline-flex min-h-11 items-center rounded-full border border-orange-200 bg-white px-5 py-3 text-sm font-bold text-ink transition hover:border-flame hover:text-flame"
								onclick={() => (showAddressForm = false)}
							>
								Cancel
							</button>
						</div>
					</form>
				{/if}

				{#if shop.addresses.length === 0}
					<p class="mt-5 text-sm leading-relaxed text-muted">
						No saved addresses yet. Add one to speed up checkout next time.
					</p>
				{:else}
					<ul class="mt-5 space-y-4">
						{#each shop.addresses as addr (addr.id)}
							<li class="rounded-2xl border border-orange-100 p-4">
								<div class="flex items-start justify-between gap-3">
									<div>
										<p class="flex flex-wrap items-center gap-2 text-sm font-bold text-ink">
											{addr.label}
											{#if addr.isDefault}
												<span class="rounded-full bg-flame px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-white uppercase">
													Default
												</span>
											{/if}
										</p>
										<address class="mt-1.5 text-sm leading-relaxed text-muted not-italic">
											{addr.name}<br />
											{addr.address}, {addr.city}, {addr.state} {addr.zip}<br />
											{addr.phone} · {addr.email}
										</address>
									</div>
									<button
										type="button"
										class="grid size-10 shrink-0 place-items-center rounded-full text-muted transition hover:bg-peach hover:text-flame"
										aria-label="Remove address {addr.label}"
										onclick={() => shop.removeAddress(addr.id)}
									>
										<Icon name="trash" class="size-5" />
									</button>
								</div>
								{#if !addr.isDefault}
									<button
										type="button"
										class="mt-3 inline-flex min-h-11 items-center rounded-full border border-orange-200 px-4 py-2.5 text-sm font-bold text-ink transition hover:border-flame hover:text-flame"
										onclick={() => shop.setDefaultAddress(addr.id)}
									>
										Set as default
									</button>
								{/if}
							</li>
						{/each}
					</ul>
				{/if}
			</section>
		</div>

		<!-- Recent orders -->
		<section use:reveal class="reveal mt-6 rounded-3xl border border-orange-100 bg-white p-6">
			<div class="flex items-center justify-between gap-3">
				<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-ink">
					<Icon name="bag" class="size-5 text-flame" /> Recent orders
				</h2>
				<a href="/orders" class="inline-flex min-h-11 items-center gap-1 rounded-full px-3 py-2.5 text-sm font-bold text-flame hover:underline">
					View all <Icon name="arrow-right" class="size-4" />
				</a>
			</div>
			{#if recentOrders.length === 0}
				<p class="mt-4 text-sm leading-relaxed text-muted">
					No orders yet. Your recent orders will show up here once you place one.
				</p>
				<a
					href="/shop"
					class="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame px-5 py-3 text-sm font-bold text-white transition hover:bg-flame-dark"
				>
					Browse the collection <Icon name="arrow-right" class="size-4" />
				</a>
			{:else}
				<ul class="mt-5 divide-y divide-orange-100">
					{#each recentOrders as order (order.id)}
						<li class="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
							<div>
								<p class="text-sm font-bold text-ink">
									<a href="/track-order?id={order.id}" class="hover:text-flame">{order.id}</a>
									{#if order.status === 'cancelled'}
										<span class="ml-2 rounded-full bg-peach px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-flame uppercase">
											Cancelled
										</span>
									{:else}
										<span class="ml-2 text-xs font-semibold text-muted">{ORDER_STEPS[shop.orderStep(order)]}</span>
									{/if}
								</p>
								<p class="mt-0.5 text-sm text-muted">
									{formatDate(order.placedAt)} · {order.items.map((i) => i.name).join(', ')}
								</p>
							</div>
							<p class="font-display text-base font-bold text-ink">{formatPrice(order.total)}</p>
						</li>
					{/each}
				</ul>
			{/if}
		</section>
	{/if}
</div>
