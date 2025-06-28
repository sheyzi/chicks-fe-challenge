<script lang="ts">
	import Filters from '$lib/components/Filters.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import itemStore from '$lib/stores/items.svelte';
	import { browser } from '$app/environment';
	import { debounce } from '$lib/utils/debounce';
	import Pagination from '$lib/components/Pagination.svelte';
	import ItemsGrid from '$lib/components/ItemsGrid.svelte';

	const filterOptions = {
		gameOptions: [
			{ value: 'all', label: 'All Games' },
			{ value: 'runescape', label: 'RuneScape' },
			{ value: 'osrs', label: 'Old School RuneScape' },
			{ value: 'minecraft', label: 'Minecraft' },
			{ value: 'fortnite', label: 'Fortnite' },
			{ value: 'apex', label: 'Apex Legends' },
			{ value: 'valorant', label: 'Valorant' },
			{ value: 'csgo', label: 'Counter-Strike: Global Offensive' },
			{ value: 'lol', label: 'League of Legends' },
			{ value: 'dota2', label: 'Dota 2' },
			{ value: 'wow', label: 'World of Warcraft' },
			{ value: 'ff14', label: 'Final Fantasy XIV' },
			{ value: 'genshin', label: 'Genshin Impact' },
			{ value: 'pubg', label: "PlayerUnknown's Battlegrounds" },
			{ value: 'rocket-league', label: 'Rocket League' }
		],
		priceOptions: [
			{ value: 'all', label: 'All' },
			{ value: '0-10', label: '$0 - $10' },
			{ value: '10-50', label: '$10 - $50' },
			{ value: '50-100', label: '$50 - $100' },
			{ value: '100-500', label: '$100 - $500' },
			{ value: '500+', label: '$500+' }
		],
		itemTypes: [
			{ value: 'all', label: 'All Items' },
			{ value: 'weapons', label: 'Weapons' },
			{ value: 'armor', label: 'Armor' },
			{ value: 'potions', label: 'Potions' },
			{ value: 'food', label: 'Food' },
			{ value: 'misc', label: 'Miscellaneous' }
		]
	};

	const sortOptions = [
		{ value: 'featured', label: 'Featured' },
		{ value: 'price-asc', label: 'Price: Low to High' },
		{ value: 'price-desc', label: 'Price: High to Low' },
		{ value: 'newest', label: 'Newest' },
		{ value: 'oldest', label: 'Oldest' }
	];

	let filterValues = $state({
		selectedGame: null,
		selectedPrice: null,
		selectedItemType: null,
		searchTerm: ''
	});

	let sortValue = $state('featured');

	$effect(() => {
		if (browser && !itemStore.loaded) {
			itemStore.load().catch((error) => {
				console.error('Failed to load items:', error);
			});
		}
	});

	const debouncedSearchUpdate = debounce(() => {
		if (itemStore.loaded) {
			itemStore.updateFilters({
				search: filterValues.searchTerm || undefined,
				game: filterValues.selectedGame || undefined,
				priceRange: filterValues.selectedPrice || undefined,
				itemType: filterValues.selectedItemType || undefined,
				sort: sortValue || 'featured'
			});
		}
	}, 300);

	function handleFilterChange() {
		if (itemStore.loaded) {
			itemStore.updateFilters({
				search: filterValues.searchTerm || undefined,
				game: filterValues.selectedGame || undefined,
				priceRange: filterValues.selectedPrice || undefined,
				itemType: filterValues.selectedItemType || undefined,
				sort: sortValue || 'featured'
			});
		}
	}

	function handleSearchChange() {
		debouncedSearchUpdate();
	}

	function handleSortChange(_option: any) {
		if (itemStore.loaded) {
			itemStore.updateFilters({
				search: filterValues.searchTerm || undefined,
				game: filterValues.selectedGame || undefined,
				priceRange: filterValues.selectedPrice || undefined,
				itemType: filterValues.selectedItemType || undefined,
				sort: sortValue || 'featured'
			});
		}
	}
</script>

<svelte:head>
	<title>Chicks Frontend Challenge</title>
</svelte:head>

<main class="main-content">
	<div class="overlay"></div>
	<div class="bg_container"></div>
	<section class="container content-wrapper">
		<header class="header">
			<h1>Condimentum consectetur</h1>

			<Filters
				options={filterOptions}
				bind:values={filterValues}
				onFilterChange={handleFilterChange}
				onSearchChange={handleSearchChange}
			/>
		</header>

		<section class="items-container">
			<div class="item-container-header">
				<div>
					<p>
						Showing {itemStore.keys.length} - from {itemStore.pagination.totalItems}
						{#if itemStore.loading}
							<span class="loading-indicator">(Loading...)</span>
						{/if}
					</p>
				</div>
				<div>
					<Dropdown
						bind:value={sortValue}
						options={sortOptions}
						placeholder="Sort by"
						icon="mage:filter-fill"
						iconSize={20}
						showLabelOnSelection={true}
						onChange={handleSortChange}
						theme={{
							iconColor: 'var(--primary-color)',
							backgroundColor: 'var(--surface-color)',
							backgroundColorHover: 'var(--surface-hover-color)'
						}}
					/>
				</div>
			</div>

			<ItemsGrid />

			{#if itemStore.keys.length > 0 && itemStore.pagination.totalPages > 1}
				<Pagination
					currentPage={itemStore.pagination.currentPage}
					totalPages={itemStore.pagination.totalPages}
					onPageChange={(page) => itemStore.paginate(page)}
				/>
			{/if}
		</section>
	</section>
</main>

<div style="background-color: hsl(236, 16%, 20%);">
	<section class="container company-logos">
		<div class="payment-methods">
			<img src="/icons/visa.png" alt="Visa" class="payment-logo" />
			<img src="/icons/mastercard.png" alt="Mastercard" class="payment-logo" />
			<img src="/icons/amex.png" alt="American Express" class="payment-logo" />
			<img src="/icons/skrill.svg" alt="Skrill" class="payment-logo" />
			<div class="crypto-icons">
				<iconify-icon icon="simple-icons:bitcoin" class="crypto-icon" width="32" height="32"
				></iconify-icon>
				<iconify-icon icon="simple-icons:ethereum" class="crypto-icon" width="32" height="32"
				></iconify-icon>
				<iconify-icon icon="simple-icons:litecoin" class="crypto-icon" width="32" height="32"
				></iconify-icon>
			</div>
			<span class="more-text">and 50+ more</span>
		</div>
	</section>
</div>

<style>
	.main-content {
		color: var(--text-color);
		position: relative;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: hsla(237, 16%, 25%, 0.5);
		backdrop-filter: blur(4px);
		z-index: 0;
		pointer-events: none;
	}

	.bg_container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		background-image: url('/background.jpg');
		background-size: cover;
		background-position: center;
	}

	.content-wrapper {
		position: relative;
		z-index: 1;
		padding: calc(var(--spacing-xl) * 2.5) var(--spacing-xl);
	}

	.items-container {
		background-color: var(--background-color);
		border-radius: var(--radius-sm);
		padding: var(--spacing-xl);
		border: 1px solid var(--border-color);
		box-shadow: var(--shadow-lg);
		container-type: inline-size;
	}

	@container (max-width: 600px) {
		.item-container-header {
			flex-direction: column;
			text-align: center;
		}
	}

	.item-container-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-lg);
		flex-wrap: wrap;
		gap: var(--spacing-md);
	}

	.item-container-header > div {
		flex: 1;
		min-width: 200px;
	}

	.item-container-header > div:last-child {
		display: flex;
		justify-content: flex-end;
	}

	.loading-indicator {
		color: var(--text-color-muted);
		font-style: italic;
		font-size: var(--font-size-sm);
	}

	.company-logos {
		padding: var(--spacing-xl) 0;
	}

	.payment-methods {
		display: flex;
		align-items: center;
		justify-content: start;
		gap: var(--spacing-xl);
		flex-wrap: wrap;
	}

	.payment-logo {
		height: 32px;
		width: auto;
		opacity: 0.8;
	}

	.crypto-icons {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.crypto-icon {
		color: var(--text-color-muted);
	}

	.more-text {
		color: var(--text-color);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		margin-left: var(--spacing-sm);
	}

	@media (max-width: 768px) {
		.content-wrapper {
			padding: calc(var(--spacing-xl) * 2) var(--spacing-xl);
		}

		.items-container {
			padding: var(--spacing-lg);
		}

		.payment-logo {
			height: 28px;
		}

		.more-text {
			margin-left: var(--spacing-sm);
			font-size: var(--font-size-xs);
		}
	}

	@media (max-width: 480px) {
		.content-wrapper {
			padding: calc(var(--spacing-xl) * 1.5) var(--spacing-lg);
		}

		.items-container {
			padding: var(--spacing-md);
		}

		.item-container-header {
			text-align: center;
		}

		.payment-methods {
			gap: var(--spacing-sm);
		}

		.payment-logo {
			height: 24px;
		}

		.crypto-icon {
			width: 24px;
			height: 24px;
		}
	}
</style>
