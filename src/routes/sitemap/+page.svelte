<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { articles } from '#lib/data/blog';
	import { categories, products, rooms } from '#lib/data/products';

	const groups = [
		{
			title: 'Shop',
			links: [
				{ label: 'All products', href: '/shop' },
				{ label: 'Deals', href: '/deals' },
				...categories.map((c) => ({ label: `${c.name}`, href: `/categories/${c.slug}` })),
				...rooms.map((r) => ({ label: `${r.name} — shop by room`, href: `/rooms/${r.slug}` })),
				...products.map((p) => ({ label: p.name, href: `/product/${p.slug}` }))
			]
		},
		{
			title: 'Help',
			links: [
				{ label: 'Help centre', href: '/help' },
				{ label: 'Frequently asked questions', href: '/faq' },
				{ label: 'Delivery', href: '/delivery' },
				{ label: 'Shipping policy', href: '/shipping-policy' },
				{ label: 'Returns policy', href: '/returns-policy' },
				{ label: 'Warranty', href: '/warranty' },
				{ label: 'Financing — 0% APR', href: '/financing' },
				{ label: 'Contact us', href: '/contact' },
				{ label: 'Showrooms', href: '/showrooms' },
				{ label: 'Trade program', href: '/trade' }
			]
		},
		{
			title: 'Account',
			links: [
				{ label: 'Log in', href: '/login' },
				{ label: 'Create an account', href: '/signup' },
				{ label: 'My account', href: '/account' },
				{ label: 'My bag', href: '/cart' },
				{ label: 'Checkout', href: '/checkout' },
				{ label: 'My orders', href: '/orders' },
				{ label: 'Track my order', href: '/track-order' },
				{ label: 'Wishlist', href: '/wishlist' }
			]
		},
		{
			title: 'Company',
			links: [
				{ label: 'About us', href: '/about' },
				{ label: 'Journal', href: '/blog' },
				...articles.map((a) => ({ label: a.title, href: `/blog/${a.slug}` }))
			]
		},
		{
			title: 'Legal',
			links: [
				{ label: 'Privacy policy', href: '/privacy-policy' },
				{ label: 'Terms of service', href: '/terms' },
				{ label: 'Shipping policy', href: '/shipping-policy' },
				{ label: 'Returns policy', href: '/returns-policy' },
				{ label: 'Warranty', href: '/warranty' },
				{ label: 'Sitemap', href: '/sitemap' }
			]
		}
	];
</script>

<svelte:head>
	<title>Sitemap — Furniture | Every page on the site</title>
	<meta
		name="description"
		content="The Furniture sitemap — every shop, help, account, company and legal page in one place."
	/>
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8">
		<div class="reveal max-w-2xl" use:reveal>
			<p class="text-sm font-bold tracking-[0.2em] text-flame uppercase">Sitemap</p>
			<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-ink sm:text-5xl">
				Every page, in one place.
			</h1>
			<p class="mt-4 text-lg leading-relaxed text-muted">
				Looking for something? Every page on the Furniture site is listed below. You can also use the search
				in the header, or ask our team.
			</p>
		</div>

		<div class="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
			{#each groups as g, gi}
				<div class="reveal" use:reveal style="--rd: {(gi % 3) * 80}ms">
					<h2 class="font-display text-xl font-semibold text-ink">{g.title}</h2>
					<ul class="mt-4 space-y-1">
						{#each g.links as l}
							<li>
								<a
									href={l.href}
									class="group inline-flex min-h-11 items-center gap-2 rounded-lg py-1.5 text-sm font-medium text-muted transition hover:text-flame"
								>
									<Icon name="arrow-right" class="size-3.5 text-flame/60 transition group-hover:translate-x-0.5 group-hover:text-flame" />
									{l.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
			<div class="reveal rounded-[2rem] bg-ink p-7" use:reveal>
				<h2 class="font-display text-xl font-semibold text-white">Can't find it?</h2>
				<p class="mt-2 text-sm leading-relaxed text-white/70">
					Call (985) 555-0148, Mon–Sat 10 AM–7 PM CT, or send us a message and we will point you in the
					right direction.
				</p>
				<a
					href="/contact"
					class="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-flame px-6 py-3 text-sm font-bold text-white transition hover:bg-flame-dark"
				>
					Contact us <Icon name="arrow-right" class="size-4" />
				</a>
			</div>
		</div>
	</div>
</section>
