<script lang="ts">
	let { name, class: cls = '' }: { name: string; class?: string } = $props();

	const paths: Record<string, string> = {
		search:
			'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/>',
		bag: '<path d="M6 7h12l1 13H5L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
		menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
		close: '<path d="M6 6l12 12M18 6 6 18"/>',
		'arrow-right': '<path d="M4 12h15m-6-6 6 6-6 6"/>',
		check: '<path d="m4.5 12.5 5 5 10-11"/>',
		star: '<path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8L12 3Z"/>',
		truck: '<path d="M2 6h12v10H2zM14 10h4l3 3v3h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
		shield: '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z"/><path d="m9 11.5 2.2 2.2L15.5 9"/>',
		refresh: '<path d="M20 12a8 8 0 1 1-2.3-5.6M20 3v4h-4"/>',
		phone: '<path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
		mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
		pin: '<path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
		clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/>',
		sofa: '<path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><path d="M3 13a2 2 0 0 1 4 0v1h10v-1a2 2 0 0 1 4 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3Z"/><path d="M5 20v-2M19 20v-2"/>',
		leaf: '<path d="M5 19c0-9 5-14 14-14-1 9-6 14-14 14Z"/><path d="M5 19c3-5 7-9 11-11"/>',
		heart: '<path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9Z"/>',
		user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-5.5 8-5.5s6.5 1.5 8 5.5"/>',
		'chevron-down': '<path d="m6 9 6 6 6-6"/>',
		minus: '<path d="M5 12h14"/>',
		plus: '<path d="M12 5v14M5 12h14"/>',
		trash: '<path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6.5 7l1 13h9l1-13"/>',
		eye: '<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
		sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/>',
		quote: '<path d="M10 8H6a3 3 0 0 0-3 3v5h6v-6H6.5A1.5 1.5 0 0 1 8 8.5V8h2Zm10 0h-4a3 3 0 0 0-3 3v5h6v-6h-2.5a1.5 1.5 0 0 1 1.5-1.5V8h2Z"/>'
	};
</script>

<svg
	class={cls}
	viewBox="0 0 24 24"
	fill={name === 'star' ? 'currentColor' : 'none'}
	stroke="currentColor"
	stroke-width="1.8"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	{@html paths[name] ?? ''}
</svg>
