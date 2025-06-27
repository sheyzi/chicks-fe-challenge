<script lang="ts">
	import { onMount } from 'svelte';
	import type { NavigationItem } from '../constants/navigation.js';

	interface DropdownItemClickEvent {
		item: NavigationItem;
		category?: string;
	}

	let {
		label,
		items,
		type,
		iconSize = 14,
		onItemclick = (event: DropdownItemClickEvent) => {
			console.log('Item clicked:', event);
		}
	}: {
		label: string;
		items: string[] | NavigationItem[] | Record<string, NavigationItem[]>;
		type?: 'single' | 'multi';
		iconSize?: number;
		preventNavigation?: boolean;
		onItemclick?: (event: DropdownItemClickEvent) => void;
	} = $props();

	let isOpen = $state(false);
	let isClicked = $state(false);
	let closeTimeout: number | null = $state(null);
	let dropdownElement: HTMLElement | null = $state(null);
	let isMobile = $state(false);

	function handleClick() {
		if (closeTimeout) {
			clearTimeout(closeTimeout);
		}

		if (isOpen) {
			isOpen = false;
			isClicked = false;
		} else {
			isOpen = true;
			isClicked = true;
		}
	}

	function handleItemClick(item: string | NavigationItem, category?: string) {
		onItemclick({ item: typeof item === 'string' ? { label: item, link: '#' } : item, category });
		isOpen = false;
		isClicked = false;
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as Element;
		if (dropdownElement && !dropdownElement.contains(target)) {
			isOpen = false;
			isClicked = false;
		}
	}

	function checkIfMobile() {
		isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
	}

	function isRecord(obj: any): obj is Record<string, NavigationItem[]> {
		return obj && typeof obj === 'object' && !Array.isArray(obj);
	}

	onMount(() => {
		checkIfMobile();
		document.addEventListener('click', handleClickOutside);
		window.addEventListener('resize', checkIfMobile);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			window.removeEventListener('resize', checkIfMobile);
			if (closeTimeout) {
				clearTimeout(closeTimeout);
			}
		};
	});
</script>

<li class="menu-item dropdown" bind:this={dropdownElement}>
	<button class="dropdown-button" aria-expanded={isOpen} aria-haspopup="menu" onclick={handleClick}>
		<span>{label}</span>
		<iconify-icon
			icon="mdi:chevron-down"
			height={iconSize}
			width={iconSize}
			class="arrow-icon"
			class:rotated={isOpen}
			aria-hidden="true"
		></iconify-icon>
	</button>

	{#if isOpen}
		<div
			role="menu"
			tabindex="-1"
			class="dropdown-menu"
			class:single-column={type === 'single' || Array.isArray(items)}
			class:multi-column={type === 'multi' && isRecord(items)}
		>
			{#if Array.isArray(items)}
				{#each items as item}
					{#if typeof item === 'string'}
						<button
							role="menuitem"
							type="button"
							class="dropdown-menu-item"
							onclick={() => handleItemClick(item)}
						>
							{item}
						</button>
					{:else}
						<a role="menuitem" href={item.link} onclick={() => handleItemClick(item)}>
							{item.label}
						</a>
					{/if}
				{/each}
			{:else if isRecord(items)}
				{#each Object.entries(items) as [category, categoryItems]}
					<div class="dropdown-column">
						<h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
						{#each categoryItems as item}
							<a role="menuitem" href={item.link} onclick={() => handleItemClick(item, category)}>
								{item.label}
							</a>
						{/each}
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</li>

<style>
	.menu-item {
		margin: 0 var(--spacing-sm);
		list-style: none;
	}

	.dropdown {
		position: relative;
	}

	.dropdown-button {
		background: none;
		border: none;
		color: var(--text-color);
		font-weight: var(--font-weight-medium);
		font-size: var(--font-size-xs);
		text-transform: uppercase;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		transition: color var(--transition-normal);
		padding: 0;
	}

	.dropdown-button:hover {
		color: var(--primary-color);
	}

	.dropdown-button:focus {
		outline: 2px solid var(--primary-color);
		outline-offset: var(--spacing-xs);
	}

	.arrow-icon {
		transition: transform var(--transition-normal);
		margin-left: var(--spacing-xs);
	}

	.arrow-icon.rotated {
		transform: rotate(180deg);
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		background: var(--background-color);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-lg);
		z-index: var(--z-dropdown);
		margin-top: var(--spacing-xs);
		max-height: 400px;
		overflow-y: auto;
	}

	.dropdown-menu.single-column {
		min-width: var(--spacing-xl);
	}

	.dropdown-menu.multi-column {
		display: flex;
		min-width: calc(var(--spacing-xl) * 2);
		gap: var(--spacing-md);
		padding: var(--spacing-md);
	}

	.dropdown-column {
		flex: 1;
		min-width: var(--spacing-xl);
	}

	.dropdown-column h4 {
		color: var(--primary-color);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		text-transform: uppercase;
		margin: 0 0 var(--spacing-sm) 0;
		padding: 0 var(--spacing-md);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		padding-bottom: var(--spacing-sm);
	}

	.dropdown-menu a {
		display: block;
		padding: var(--spacing-sm) var(--spacing-md);
		color: var(--text-color);
		text-decoration: none;
		font-weight: var(--font-weight-medium);
		font-size: var(--font-size-xs);
		text-transform: uppercase;
		transition: background-color var(--transition-fast);
	}

	.dropdown-menu-item {
		display: block;
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		color: var(--text-color);
		background: none;
		border: none;
		font-weight: var(--font-weight-medium);
		font-size: var(--font-size-sm);
		text-transform: uppercase;
		transition: background-color var(--transition-fast);
		cursor: pointer;
		text-align: left;
	}

	.dropdown-menu a:hover,
	.dropdown-menu-item:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.dropdown-menu a:focus,
	.dropdown-menu-item:focus {
		background-color: rgba(255, 255, 255, 0.1);
		outline: 2px solid var(--primary-color);
		outline-offset: calc(-1 * var(--spacing-xs));
	}

	.dropdown-column a {
		font-size: var(--font-size-xs);
		padding: 0.3rem var(--spacing-md);
	}

	@media (max-width: 768px) {
		.dropdown-menu {
			position: static;
			box-shadow: none;
			border: none;
			margin-top: 0;
			background: rgba(255, 255, 255, 0.05);
			border-radius: 0;
		}

		.dropdown-menu.multi-column {
			flex-direction: column;
			min-width: auto;
			padding: var(--spacing-sm) 0;
			gap: var(--spacing-sm);
		}

		.dropdown-button {
			padding: var(--spacing-md) var(--spacing-xl);
			width: 100%;
			justify-content: space-between;
		}

		.menu-item {
			margin: 0;
		}

		.dropdown-column {
			min-width: auto;
		}

		.dropdown-column h4 {
			padding: var(--spacing-sm) var(--spacing-xl);
			margin-bottom: var(--spacing-xs);
		}

		.dropdown-column a {
			padding: var(--spacing-sm) var(--spacing-xl);
		}

		.dropdown-menu a {
			padding: var(--spacing-sm) var(--spacing-xl);
		}
	}

	@media (max-width: 480px) {
		.dropdown-menu.multi-column {
			min-width: auto;
			padding: var(--spacing-xs) 0;
		}
	}

	@media (max-width: 1100px) and (min-width: 769px) {
		.dropdown-button {
			font-size: var(--font-size-xs);
		}
	}

	@media (hover: none) and (pointer: coarse) {
		.dropdown-button:hover {
			color: var(--text-color);
		}

		.dropdown-menu a:hover,
		.dropdown-menu-item:hover {
			background-color: transparent;
		}
	}
</style>
