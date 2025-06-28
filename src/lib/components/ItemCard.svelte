<script lang="ts">
	import cartStore from '../stores/cart.svelte';
	import type { Item } from '../types/items.types';

	let { item }: { item: Item } = $props();

	let quantity = $state(1);

	function incrementQuantity() {
		if (quantity < 99) {
			quantity++;
		}
	}

	function decrementQuantity() {
		if (quantity > 1) {
			quantity--;
		}
	}

	function handleInputChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const value = parseInt(target.value) || 1;
		quantity = Math.max(1, Math.min(99, value));
	}
</script>

<div class="card">
	<div class="card-header">
		<div>
			<div class="discount-badge">ON SALE</div>

			<div
				class="stock-badge"
				style:--stock-badge-color={item.inStock ? 'var(--primary-color)' : 'var(--error-color)'}
			>
				{item.inStock ? 'In Stock' : 'Out of Stock'}
			</div>
		</div>
		<div class="quantity-container">
			<input
				type="number"
				min="1"
				max="99"
				bind:value={quantity}
				oninput={handleInputChange}
				class="quantity-input"
			/>
			<div class="quantity-arrows">
				<button
					class="arrow-btn arrow-up"
					onclick={incrementQuantity}
					disabled={quantity >= 99}
					aria-label="Increase quantity"
				>
					<iconify-icon icon="mdi:chevron-up" width="12" height="12"></iconify-icon>
				</button>
				<button
					class="arrow-btn arrow-down"
					onclick={decrementQuantity}
					disabled={quantity <= 1}
					aria-label="Decrease quantity"
				>
					<iconify-icon icon="mdi:chevron-down" width="12" height="12"></iconify-icon>
				</button>
			</div>
		</div>
	</div>
	<div class="card-image-container">
		<img src={item.imageUrl} class="card-image" alt={item.name} loading="lazy" />
	</div>
	<div class="item-details">
		<h2 class="item-name">{item.name}</h2>
		<p class="item-game">{item.game}</p>
	</div>
	<p class="price">
		${item.price.toFixed(2)} <span class="old-price">${item.oldPrice?.toFixed(2)}</span>
	</p>
	<p class="description">{item.description}</p>
	<div class="actions">
		<button class="action-details">Details</button>
		<button
			class="action-add"
			disabled={!item.inStock}
			onclick={() => cartStore.addItem(item.id, quantity)}
		>
			Add
			<iconify-icon icon="mdi:cart" class="icon" width="18" height="18"></iconify-icon>
		</button>
	</div>
</div>

<style>
	.card {
		background-color: var(--surface-hover-color);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-md);
		padding: var(--spacing-md);
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-md);
	}

	.discount-badge {
		color: var(--text-color);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
	}

	.discount-badge::before {
		content: '';
		display: inline-block;
		width: 6px;
		height: 6px;
		background-color: var(--primary-color);
		border-radius: 50%;
		margin-right: var(--spacing-xs);
	}

	.stock-badge {
		color: var(--stock-badge-color);
		font-size: var(--font-size-xs);
		padding: var(--spacing-xs) var(--spacing-sm);
		margin-top: var(--spacing-xs);
		border: 1px solid var(--stock-badge-color);
		border-radius: var(--radius-sm);
		display: inline-block;
	}
	.quantity-container {
		position: relative;
		display: flex;
		align-items: center;
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-sm);
		background-color: var(--surface-color);
	}

	.quantity-input {
		padding: var(--spacing-xs) 24px var(--spacing-xs) var(--spacing-sm);
		border: none;
		width: 50px;
		height: 50px;
		color: var(--text-color);
		font-size: var(--font-size-sm);
		background-color: var(--surface-color);
		text-align: center;
		border-radius: var(--radius-sm);
		-webkit-appearance: none;
		-moz-appearance: textfield;
	}

	.quantity-input:focus {
		outline: none;
		background-color: var(--surface-hover-color);
	}

	.quantity-arrows {
		position: absolute;
		right: var(--spacing-xs);
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.arrow-btn {
		background-color: transparent;
		border: none;
		padding: 0;
		width: var(--spacing-md);
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: var(--text-color);
		transition: var(--transition-normal);
		user-select: none;
		opacity: 0.7;
	}

	.arrow-btn:hover:not(:disabled) {
		opacity: 1;
		color: var(--primary-color);
	}

	.arrow-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.arrow-btn:active:not(:disabled) {
		transform: scale(0.9);
	}

	.quantity-input::-webkit-outer-spin-button,
	.quantity-input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.quantity-input[type='number'] {
		-moz-appearance: textfield;
	}

	.card-image-container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: var(--spacing-md);
		background: url('/assets/frame.png') no-repeat center center / cover;
		padding: var(--spacing-sm);
		border-radius: var(--radius-sm);
		overflow: hidden;
		box-shadow: var(--shadow-sm);
		width: fit-content;
		height: 80px;
		transition:
			transform var(--transition-normal),
			box-shadow var(--transition-normal);
	}

	.card-image {
		max-height: 100%;
		max-width: 100%;
		object-fit: contain;
	}

	.card-image-container:hover {
		box-shadow: var(--shadow-md);
		transform: scale(1.05);
	}

	.actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-sm);
		margin-top: auto;
	}

	.action-details,
	.action-add {
		width: 100%;
		padding: var(--spacing-md) var(--spacing-sm);
		margin-top: var(--spacing-sm);
		text-transform: uppercase;
		font-size: var(--font-size-sm);
	}

	.action-details {
		background-color: var(--surface-color);
		color: var(--text-color-muted);
		border-radius: var(--radius-sm);
		transition:
			background-color var(--transition-normal),
			color var(--transition-normal);
	}

	.action-details:hover {
		background-color: var(--primary-color);
		color: var(--surface-color);
	}

	.action-add {
		background-color: var(--secondary-color);
		color: var(--text-color);
		border-radius: var(--radius-sm);
		transition:
			background-color var(--transition-normal),
			color var(--transition-normal);
		padding: var(--spacing-sm) var(--spacing-md);
	}

	.action-add:disabled {
		background-color: var(--surface-color);
		color: var(--text-color-muted);
		cursor: not-allowed;
	}

	.action-add:disabled:hover {
		background-color: var(--surface-color);
		color: var(--text-color-muted);
	}

	.action-add:hover {
		background-color: var(--primary-color);
		color: var(--surface-color);
	}

	.action-add .icon {
		margin-left: var(--spacing-sm);
		vertical-align: middle;
		display: inline-block;
		background-color: hsla(0, 0%, 0%, 0.2);
		padding: var(--spacing-sm);
		border-radius: var(--radius-sm);
	}

	.price {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		color: var(--text-color);
		margin: var(--spacing-sm) 0;
	}

	.price .old-price {
		font-weight: var(--font-weight-normal);
		color: var(--text-color-muted);
		text-decoration: line-through;
		text-decoration-color: var(--error-color);
		text-decoration-thickness: 3px;
	}

	.item-details {
		flex-grow: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.item-name {
		font-size: 1.125rem;
		font-weight: var(--font-weight-medium);
		color: var(--text-color);
		margin: var(--spacing-sm) 0;
	}

	.item-game {
		font-size: 0.5rem;
		color: var(--primary-color);
		margin: 0;
		text-transform: uppercase;
		border: 1px solid var(--primary-color);
		padding: var(--spacing-xs) var(--spacing-sm);
		border-radius: var(--radius-lg);
		font-weight: var(--font-weight-semibold);
		word-break: break-word;
		text-align: center;
		width: 50px;
	}

	.description {
		font-size: var(--font-size-sm);
		color: var(--text-color-muted);
		margin: var(--spacing-sm) 0;
		line-height: 1.5;
		flex-grow: 1;
	}
</style>
