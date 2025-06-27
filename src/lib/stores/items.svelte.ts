import client from '../clients';
import type { Item } from '../types/items.types';

interface FilterOptions {
	search?: string;
	game?: string;
	priceRange?: string;
	itemType?: string;
	sort?: string;
}

class ItemStore {
	items = $state<{ [id: string]: Item }>({});
	keys = $derived.by(() => Object.keys(this.items));
	filters = $state<FilterOptions>({});
	pagination = $state<{
		currentPage: number;
		itemsPerPage: number;
		totalItems: number;
		totalPages: number;
	}>({
		currentPage: 1,
		itemsPerPage: 20,
		totalItems: 0,
		totalPages: 0
	});
	loading = $state<boolean>(false);
	loaded = $state<boolean>(false);

	private async loadItems() {
		this.loading = true;
		const params = new URLSearchParams({
			_page: this.pagination.currentPage.toString(),
			_limit: this.pagination.itemsPerPage.toString()
		});

		if (this.filters.search) {
			params.append('q', this.filters.search);
		}

		if (this.filters.game && this.filters.game !== 'all') {
			params.append('game', this.filters.game);
		}

		if (this.filters.itemType && this.filters.itemType !== 'all') {
			params.append('type', this.filters.itemType);
		}

		if (this.filters.priceRange && this.filters.priceRange !== 'all') {
			const [min, max] = this.filters.priceRange.split('-');
			if (max === '+') {
				params.append('price_gte', min);
			} else {
				params.append('price_gte', min);
				params.append('price_lte', max);
			}
		}

		if (this.filters.sort && this.filters.sort !== 'featured') {
			switch (this.filters.sort) {
				case 'price-asc':
					params.append('_sort', 'price');
					params.append('_order', 'asc');
					break;
				case 'price-desc':
					params.append('_sort', 'price');
					params.append('_order', 'desc');
					break;
				case 'newest':
					params.append('_sort', 'createdAt');
					params.append('_order', 'desc');
					break;
				case 'oldest':
					params.append('_sort', 'createdAt');
					params.append('_order', 'asc');
					break;
			}
		} else if (this.filters.sort === 'featured') {
			params.append('_sort', 'featured,createdAt');
			params.append('_order', 'desc,desc');
		}

		const { data, error, headers } = await client.get<Item[]>(`/items?${params.toString()}`);

		if (error || !data) {
			throw new Error(error || 'Failed to fetch items');
		}

		const totalCount = parseInt(headers.get('X-Total-Count') || '0');

		this.pagination.totalItems = totalCount;
		this.pagination.totalPages = Math.ceil(totalCount / this.pagination.itemsPerPage);

		this.items = data.reduce((acc: { [id: string]: Item }, item: Item) => {
			acc[item.id] = item;
			return acc;
		}, {});
		this.loading = false;
	}

	load = async () => {
		if (this.loading) return;
		this.loading = true;

		try {
			await this.loadItems();
			this.loaded = true;
		} catch (error) {
			console.error('Error loading items:', error);
			throw new Error('Failed to load items');
		} finally {
			this.loading = false;
		}
	};

	updateFilters = async (newFilters: FilterOptions) => {
		const filtersChanged = Object.keys(newFilters).some(
			(key) => this.filters[key as keyof FilterOptions] !== newFilters[key as keyof FilterOptions]
		);

		if (!filtersChanged) {
			return;
		}

		this.filters = { ...this.filters, ...newFilters };
		this.pagination.currentPage = 1;

		await this.loadItems();
	};

	paginate = async (page: number) => {
		if (page < 1 || page > this.pagination.totalPages) {
			return;
		}

		this.pagination.currentPage = page;
		await this.loadItems();
	};

	getItemById = async (id: number): Promise<Item | null> => {
		if (this.items[id]) {
			return this.items[id];
		}

		const { data, error } = await client.get<Item>(`/items/${id}`);
		if (error || !data) {
			return null;
		}

		return data;
	};
}

export const itemStore = new ItemStore();
export default itemStore;
