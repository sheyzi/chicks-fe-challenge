<script lang="ts">
	import CustomDropdown from './Dropdown.svelte';

	interface FilterOptions {
		gameOptions: Array<{ value: string; label: string }>;
		priceOptions: Array<{ value: string; label: string }>;
		itemTypes: Array<{ value: string; label: string }>;
	}

	interface FilterValues {
		selectedGame: string | null;
		selectedPrice: string | null;
		selectedItemType: string | null;
		searchTerm: string;
	}

	let {
		options,
		values = $bindable({
			selectedGame: null,
			selectedPrice: null,
			selectedItemType: null,
			searchTerm: ''
		}),
		onFilterChange,
		onSearchChange
	}: {
		options: FilterOptions;
		values?: FilterValues;
		onFilterChange?: () => void;
		onSearchChange?: () => void;
	} = $props();

	function handleSearchInput(event: Event) {
		const target = event.target as HTMLInputElement;
		values.searchTerm = target.value;
		onSearchChange?.();
	}
</script>

<div class="filters">
	<CustomDropdown
		bind:value={values.selectedGame}
		options={options.gameOptions}
		placeholder="Select a game"
		searchable={true}
		searchPlaceholder="Search games..."
		icon="/icons/sword-icon.svg"
		iconType="svg"
		iconSize={20}
		onChange={onFilterChange}
		theme={{
			backgroundColor: 'hsla(236, 15%, 22.2%, 0.5)',
			backgroundColorHover: 'hsla(236, 15%, 22.2%, 0.7)'
		}}
	/>

	<div
		class="search-bar"
		role="button"
		tabindex="0"
		onclick={() => document.getElementById('search-input')?.focus()}
		onkeydown={(e) => e.key === 'Enter' && document.getElementById('search-input')?.focus()}
	>
		<iconify-icon icon="mdi:search" class="search-icon" height="18" width="18" aria-hidden="true"
		></iconify-icon>
		<input
			id="search-input"
			type="text"
			placeholder="Search"
			value={values.searchTerm}
			oninput={handleSearchInput}
		/>
	</div>

	<div class="filters-group">
		<CustomDropdown
			bind:value={values.selectedPrice}
			options={options.priceOptions}
			placeholder="Price"
			icon="healthicons:money-bag"
			iconType="iconify"
			iconSize={20}
			onChange={onFilterChange}
			theme={{
				backgroundColor: 'hsla(236, 15%, 22.2%, 0.2)',
				backgroundColorHover: 'hsla(236, 15%, 22.2%, 0.7)',
				width: '150px',
				iconColor: 'var(--primary-color)'
			}}
		/>

		<CustomDropdown
			bind:value={values.selectedItemType}
			options={options.itemTypes}
			placeholder="Item Type"
			icon="garden:leaf-fill-16"
			iconType="iconify"
			iconSize={20}
			onChange={onFilterChange}
			theme={{
				backgroundColor: 'hsla(236, 15%, 22.2%, 0.2)',
				backgroundColorHover: 'hsla(236, 15%, 22.2%, 0.7)',
				width: '150px',
				iconColor: 'var(--primary-color)'
			}}
		/>
	</div>
</div>

<style>
	.filters {
		display: flex;
		gap: var(--spacing-sm);
		margin: var(--spacing-md) 0;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.filters-group {
		display: flex;
		border-radius: var(--radius-sm);
	}

	.filters-group :global(.dropdown) {
		border-radius: 0;
	}

	.filters-group :global(.dropdown:first-child) {
		border-top-left-radius: var(--radius-sm);
		border-bottom-left-radius: var(--radius-sm);
	}

	.filters-group :global(.dropdown:last-child) {
		border-top-right-radius: var(--radius-sm);
		border-bottom-right-radius: var(--radius-sm);
	}

	.filters-group :global(.dropdown-trigger) {
		border-radius: 0;
		border-right: none;
	}

	.filters-group :global(.dropdown:first-child .dropdown-trigger) {
		border-top-left-radius: var(--radius-sm);
		border-bottom-left-radius: var(--radius-sm);
	}

	.filters-group :global(.dropdown:last-child .dropdown-trigger) {
		border-top-right-radius: var(--radius-sm);
		border-bottom-right-radius: var(--radius-sm);
		border-right: 1px solid var(--border-color);
	}

	.filters-group :global(.dropdown-trigger:hover:not(:disabled)) {
		border-color: var(--primary-color);
		border-right: none;
	}

	.filters-group :global(.dropdown:last-child .dropdown-trigger:hover:not(:disabled)) {
		border-color: var(--primary-color);
		border-right: 1px solid var(--primary-color);
	}

	.filters-group :global(.dropdown-trigger:focus) {
		border-color: var(--primary-color);
		border-right: none;
	}

	.filters-group :global(.dropdown:last-child .dropdown-trigger:focus) {
		border-color: var(--primary-color);
		border-right: 1px solid var(--primary-color);
	}

	.filters-group :global(.dropdown.open .dropdown-trigger) {
		border-color: var(--primary-color);
		border-right: none;
	}

	.filters-group :global(.dropdown:last-child.open .dropdown-trigger) {
		border-color: var(--primary-color);
		border-right: 1px solid var(--primary-color);
	}

	.search-bar {
		position: relative;
		display: flex;
		flex: 1;
		width: 100%;
		align-items: center;
		background-color: var(--blur-background, hsla(236, 15%, 22.2%, 0.7));
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		cursor: text;
	}

	.search-icon {
		position: absolute;
		left: 12px;
		z-index: 1;
		color: var(--text-color);
		opacity: 0.7;
		cursor: pointer;
		transition: opacity var(--transition-normal);
	}

	.search-icon:hover {
		opacity: 1;
	}

	.search-bar input {
		flex: 1;
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-sm) 42px;
		border: none;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--text-color);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		outline: none;
	}

	.search-bar input:focus {
		outline: none;
	}

	.search-bar:focus-within {
		border-color: var(--primary-color);
		box-shadow: 0 0 0 1px var(--primary-color);
	}

	.search-bar:focus {
		outline: none;
		border-color: var(--primary-color);
		box-shadow: 0 0 0 1px var(--primary-color);
	}

	.search-bar input::placeholder {
		color: var(--text-color);
		font-size: var(--font-size-sm);
		opacity: 0.7;
	}

	@media (max-width: 768px) {
		.filters {
			flex-direction: column;
			gap: var(--spacing-xs);
			align-items: stretch;
		}
	}

	@media (max-width: 480px) {
		.filters {
			gap: var(--spacing-xs);
		}

		.search-bar input {
			font-size: var(--font-size-base);
		}
	}
</style>
