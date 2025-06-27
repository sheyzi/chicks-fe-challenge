import { browser } from '$app/environment';
import type { Item } from '../types/items.types.js';
import itemStore from './items.svelte.js';

class Cart {
	items = $state<{
		[itemId: number]: { item: Item; quantity: number };
	}>({});
	totalItems = $derived.by(() =>
		Object.values(this.items).reduce((sum, cartItem) => sum + cartItem.quantity, 0)
	);
	loaded = $state<boolean>(false);

	private saveToLocalStorage() {
		if (browser) {
			try {
				localStorage.setItem('cart', JSON.stringify(this.items));
			} catch (error) {
				console.error('Failed to save cart to localStorage:', error);
			}
		}
	}

	load() {
		if (browser) {
			try {
				const savedCart = localStorage.getItem('cart');

				if (savedCart) {
					this.items = JSON.parse(savedCart);
				}
			} catch (error) {
				console.error('Failed to load cart from localStorage:', error);
				this.items = {};
			}
			this.loaded = true;
		}
	}

	addItem = async (itemId: number, quantity: number = 1) => {
		const existingItem = this.items[itemId];

		if (existingItem) {
			this.items[itemId].quantity += quantity;
		} else {
			const item = await itemStore.getItemById(itemId);
			if (!item) {
				console.error(`Item with ID ${itemId} not found.`);
				return;
			}

			this.items[itemId] = { item, quantity };
		}

		this.saveToLocalStorage();
	};

	removeItem(itemId: number) {
		delete this.items[itemId];
		this.saveToLocalStorage();
	}

	updateQuantity(itemId: number, quantity: number) {
		if (quantity <= 0) {
			this.removeItem(itemId);
			return;
		}

		if (this.items[itemId]) {
			this.items[itemId].quantity = quantity;
		}
	}

	clear() {
		this.items = {};
		this.saveToLocalStorage();
	}

	getItemQuantity(itemId: number): number {
		const cartItem = this.items[itemId];
		return cartItem ? cartItem.quantity : 0;
	}
}

const cartStore = new Cart();
export default cartStore;
