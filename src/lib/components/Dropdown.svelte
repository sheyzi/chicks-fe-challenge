<script lang="ts">
	import { onMount } from 'svelte';

	interface DropdownOption {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Theme {
		backgroundColor?: string;
		backgroundColorHover?: string;
		textColor?: string;
		textColorHover?: string;

		itemBackgroundColor?: string;
		itemTextColor?: string;
		activeItemBackgroundColor?: string;
		activeItemTextColor?: string;

		iconColor?: string;

		width?: string;
	}

	const defaultTheme: Theme = {
		backgroundColor: 'var(--background-color)',
		backgroundColorHover: 'var(--background-color)',
		textColor: 'var(--text-color)',
		textColorHover: 'var(--text-color)',

		// Item Colors
		itemBackgroundColor: 'var(--background-color)',
		itemTextColor: 'var(--text-color)',
		activeItemBackgroundColor: 'var(--primary-color)',
		activeItemTextColor: 'var(--background-color)',

		iconColor: 'var(--text-color)',

		width: '250px'
	};

	let {
		value = $bindable(null),
		options = [],
		placeholder = 'Select an option',
		searchable = false,
		searchPlaceholder = 'Search...',
		icon = '',
		iconType = 'iconify',
		iconSize = 16,
		disabled = false,
		showLabelOnSelection = false,
		theme = defaultTheme,
		onChange = (selected: DropdownOption): void => {}
	}: {
		value?: string | null;
		options?: DropdownOption[];
		placeholder?: string;
		searchable?: boolean;
		searchPlaceholder?: string;
		icon?: string;
		iconType?: 'iconify' | 'svg';
		iconSize?: number;
		disabled?: boolean;
		showLabelOnSelection?: boolean;
		theme?: Theme;
		onChange?: (selected: DropdownOption) => void;
	} = $props();

	let mergedTheme = {
		...defaultTheme,
		...theme
	};

	let isOpen = $state(false);
	let dropdownElement: HTMLElement;
	let searchInput: HTMLInputElement | undefined = $state();
	let searchTerm = $state('');
	let selectedOption = $derived(options.find((opt) => opt.value === value) || null);
	let filteredOptions = $derived(
		searchable && searchTerm
			? options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
			: options
	);

	function toggleDropdown() {
		if (disabled) return;
		isOpen = !isOpen;
		if (isOpen && searchable) {
			setTimeout(() => searchInput?.focus(), 0);
		}
		if (!isOpen) {
			searchTerm = '';
		}
	}

	function selectOption(option: DropdownOption) {
		if (option.disabled) return;
		value = option.value;
		isOpen = false;
		searchTerm = '';
		onChange(option);
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (disabled) return;
		switch (event.key) {
			case 'Enter':
			case ' ':
				if (!isOpen) {
					event.preventDefault();
					toggleDropdown();
				}
				break;
			case 'Escape':
				isOpen = false;
				searchTerm = '';
				break;
		}
	}

	function handleSearchKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'Escape':
				isOpen = false;
				searchTerm = '';
				break;
			case 'ArrowDown':
				event.preventDefault();
				break;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div
	class="dropdown"
	class:disabled
	class:open={isOpen}
	bind:this={dropdownElement}
	style="--bg-color: {mergedTheme.backgroundColor}; --text-color: {mergedTheme.textColor}; --bg-color-hover: {mergedTheme.backgroundColorHover}; --text-color-hover: {mergedTheme.textColorHover}; --item-bg-color: {mergedTheme.itemBackgroundColor}; --item-text-color: {mergedTheme.itemTextColor}; --active-item-bg-color: {mergedTheme.activeItemBackgroundColor}; --active-item-text-color: {mergedTheme.activeItemTextColor}; max-width: {mergedTheme.width};"
>
	<button
		type="button"
		class="dropdown-trigger"
		aria-expanded={isOpen}
		aria-haspopup="listbox"
		{disabled}
		onclick={toggleDropdown}
		onkeydown={handleKeydown}
	>
		<div class="trigger-content">
			{#if icon}
				{#if iconType === 'iconify'}
					<iconify-icon
						{icon}
						width={iconSize}
						height={iconSize}
						class="custom-icon"
						aria-hidden="true"
						style="color: {mergedTheme.iconColor};"
					></iconify-icon>
				{:else if iconType === 'svg'}
					<img src={icon} alt="" class="custom-icon" height={iconSize} />
				{/if}
			{/if}

			<div class="text-content">
				{#if selectedOption && showLabelOnSelection}
					<span class="placeholder-label">{placeholder}</span>
					<span class="selected-text">{selectedOption.label}</span>
				{:else}
					<span class="selected-text" class:placeholder={!selectedOption}>
						{selectedOption ? selectedOption.label : placeholder}
					</span>
				{/if}
			</div>
		</div>

		<iconify-icon
			icon="iconamoon:arrow-down-2-fill"
			width="16"
			height="16"
			class="arrow-icon"
			class:rotated={isOpen}
			aria-hidden="true"
		></iconify-icon>
	</button>

	{#if isOpen}
		<div class="dropdown-menu" role="listbox">
			{#if searchable}
				<div class="search-container">
					<input
						type="text"
						class="search-input"
						placeholder={searchPlaceholder}
						bind:value={searchTerm}
						bind:this={searchInput}
						onkeydown={handleSearchKeydown}
					/>
				</div>
			{/if}
			{#each filteredOptions as option}
				<button
					type="button"
					class="dropdown-option"
					class:selected={option.value === value}
					class:disabled={option.disabled}
					role="option"
					aria-selected={option.value === value}
					disabled={option.disabled}
					onclick={() => selectOption(option)}
				>
					{option.label}
				</button>
			{:else}
				{#if searchable && searchTerm}
					<div class="no-results">No results found</div>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	.dropdown {
		position: relative;
		display: inline-block;
		width: 100%;
		font-family: inherit;
		border-radius: 4px;
	}

	.dropdown-trigger {
		width: 100%;
		background: var(--bg-color);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		padding: 10px 16px;
		color: var(--text-color);
		font-size: var(--font-size-sm);
		font-family: inherit;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-sm);
		transition: all var(--transition-slow);
		text-align: left;
		min-height: 44px;
		box-sizing: border-box;
	}

	.dropdown-trigger:hover:not(:disabled) {
		border-color: var(--primary-color);
		background-color: var(--bg-color-hover);
		color: var(--text-color-hover);
	}

	.dropdown-trigger:focus {
		outline: none;
		border-color: var(--primary-color);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-color) 20%, transparent);
	}

	.dropdown-trigger:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.trigger-content {
		display: flex;
		align-items: center;
		gap: 8px;
		flex: 1;
		min-width: 0;
	}

	.text-content {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
		justify-content: center;
		min-height: 24px;
	}

	.placeholder-label {
		font-size: 11px;
		color: var(--text-color);
		opacity: 0.6;
		font-weight: 500;
		line-height: 1;
		margin-bottom: 2px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		height: 11px;
	}

	.selected-text {
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1.2;
		display: flex;
		align-items: center;
	}

	.selected-text.placeholder {
		color: var(--text-color);
		opacity: 0.7;
	}

	.arrow-icon {
		flex-shrink: 0;
		transition: transform 0.3s ease;
		color: var(--text-color);
	}

	.arrow-icon.rotated {
		transform: rotate(180deg);
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: var(--item-bg-color);
		border: 1px solid var(--border-color);
		border-radius: 4px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		z-index: 1000;
		margin-top: 2px;
		max-height: 200px;
		overflow-y: auto;
		backdrop-filter: blur(8px);
	}

	/* Custom scrollbar */
	.dropdown-menu::-webkit-scrollbar {
		width: 8px;
	}

	.dropdown-menu::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 4px;
		margin: 4px 0;
	}

	.dropdown-menu::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.2);
		border-radius: 4px;
		transition: background 0.2s ease;
	}

	.dropdown-menu::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	.dropdown-menu {
		scrollbar-width: thin;
		scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
	}

	.search-container {
		padding: 8px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		position: sticky;
		top: 0;
		background: var(--item-bg-color);
		z-index: 1;
	}

	.search-input {
		width: 100%;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 4px;
		padding: 6px 10px;
		color: var(--item-text-color);
		font-size: 14px;
		font-family: inherit;
		outline: none;
		transition: all 0.2s ease;
	}

	.search-input:focus {
		border-color: var(--active-item-bg-color);
		box-shadow: 0 0 0 1px var(--active-item-bg-color);
	}

	.search-input::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	.no-results {
		padding: 10px 16px;
		color: rgba(255, 255, 255, 0.6);
		font-size: 14px;
		text-align: center;
		font-style: italic;
	}

	.dropdown-option {
		width: 100%;
		background: none;
		border: none;
		padding: 10px 16px;
		color: var(--item-text-color);
		font-size: 14px;
		font-family: inherit;
		cursor: pointer;
		display: block;
		text-align: left;
		transition: all 0.2s ease;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}

	.dropdown-option:last-child {
		border-bottom: none;
	}

	.dropdown-option:hover:not(:disabled),
	.dropdown-option.selected {
		background: var(--active-item-bg-color);
		color: var(--active-item-text-color);
	}

	.dropdown-option.selected {
		font-weight: 500;
	}

	.dropdown-option:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.dropdown.disabled {
		pointer-events: none;
	}

	.dropdown.open .dropdown-trigger {
		border-color: var(--primary-color);
	}

	@media (max-width: 768px) {
		.dropdown {
			max-width: none;
		}
		.dropdown-trigger,
		.dropdown-option {
			padding: 12px 16px;
			font-size: 16px;
		}
	}
</style>
