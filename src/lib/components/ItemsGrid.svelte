<script lang="ts">
	import ItemCard from '$lib/components/ItemCard.svelte';
	import itemStore from '$lib/stores/items.svelte';
</script>

<div class="items-grid">
	{#if itemStore.loading}
		<div class="loading-message">
			<p>Loading items...</p>
		</div>
	{:else if itemStore.keys.length === 0}
		<div class="no-items-message">
			<p>No items found matching your filters.</p>
			<p class="no-items-subtext">Try adjusting your search criteria.</p>
		</div>
	{:else}
		{#each itemStore.keys as key}
			<ItemCard item={itemStore.items[key]} />
		{/each}
	{/if}
</div>

<style>
	.items-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: var(--spacing-lg);
		align-items: stretch;
		max-width: 100%;
	}

	.loading-message,
	.no-items-message {
		grid-column: 1 / -1;
		text-align: center;
		padding: calc(var(--spacing-xl) + var(--spacing-lg)) var(--spacing-md);
		color: var(--text-color-muted);
	}

	.loading-message p {
		font-size: 1.125rem;
		margin: 0;
	}

	.no-items-message p {
		font-size: 1.125rem;
		margin: 0 0 var(--spacing-xs) 0;
	}

	.no-items-subtext {
		font-size: var(--font-size-sm);
		opacity: 0.8;
	}
</style>
