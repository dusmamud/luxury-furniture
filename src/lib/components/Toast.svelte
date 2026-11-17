<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { shop } from '#lib/data/store.svelte';
</script>

{#if shop.toastMsg}
	<div
		class="fixed bottom-5 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-2xl"
		role="status"
	>
		<Icon name="check" class="size-4 text-flame-2" />
		{shop.toastMsg}
	</div>
{/if}
