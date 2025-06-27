<script lang="ts">
	import itemStore from '$lib/stores/items.svelte';

	let {
		onPageChange,
		currentPage,
		totalPages
	}: {
		onPageChange: (page: number) => void;
		currentPage: number;
		totalPages: number;
	} = $props();

	let visiblePages = $derived.by(() => {
		const maxVisible = 5; // Maximum number of visible pages

		if (totalPages <= maxVisible) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const half = Math.floor(maxVisible / 2);
		let start = Math.max(1, currentPage - half);
		let end = Math.min(totalPages, currentPage + half);

		if (start === 1) {
			end = Math.min(maxVisible, totalPages);
		} else if (end === totalPages) {
			start = Math.max(1, totalPages - maxVisible + 1);
		}

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	});
</script>

<div class="pagination">
	<button
		class="pagination-arrow"
		disabled={currentPage === 1}
		aria-label="Previous page"
		onclick={() => onPageChange(currentPage - 1)}
	>
		<iconify-icon icon="mdi:chevron-left" width="20" height="20"></iconify-icon>
	</button>

	{#each visiblePages as page}
		<button
			class="pagination-number"
			class:active={page === itemStore.pagination.currentPage}
			onclick={() => onPageChange(page)}
		>
			{page}
		</button>
	{/each}

	<button
		class="pagination-arrow"
		disabled={currentPage === totalPages}
		onclick={() => onPageChange(currentPage + 1)}
		aria-label="Next page"
	>
		<iconify-icon icon="mdi:chevron-right" width="20" height="20"></iconify-icon>
	</button>
</div>

<style>
	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: var(--spacing-xs);
		margin-top: var(--spacing-xl);
		padding-top: var(--spacing-lg);
		flex-wrap: wrap;
	}

	.pagination-arrow {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		background-color: transparent;
		color: var(--text-color);
		cursor: pointer;
		transition: var(--transition-normal);
	}

	.pagination-arrow:hover:not(:disabled) {
		box-shadow: var(--shadow-md);
		border-color: var(--primary-color);
	}

	.pagination-arrow:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.pagination-number {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border: none;
		border-radius: var(--radius-sm);
		background-color: transparent;
		color: var(--text-color);
		cursor: pointer;
		transition: var(--transition-normal);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
	}

	.pagination-number:hover {
		box-shadow: var(--shadow-md);
	}

	.pagination-number.active {
		background-color: var(--secondary-color);
	}

	.pagination-number.active:hover {
		box-shadow: none;
	}

	.pagination-number,
	.pagination-arrow {
		width: 36px;
		height: 36px;
		font-size: var(--font-size-xs);
	}

	.pagination-number,
	.pagination-arrow {
		width: 32px;
		height: 32px;
	}
</style>
