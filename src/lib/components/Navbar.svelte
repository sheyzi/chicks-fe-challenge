<script lang="ts">
	import NavbarDropdownMenu from './NavbarDropdownMenu.svelte';
	import {
		CURRENCIES,
		NAVIGATION_DATA,
		DEFAULT_CURRENCY,
		type Currency,
		type NavigationItem
	} from '../constants/navigation.js';
	import cartStore from '../stores/cart.svelte';

	interface ItemClickEvent {
		item: NavigationItem;
		category?: string;
	}

	let selectedCurrency: Currency = $state(DEFAULT_CURRENCY);
	let mobileMenuOpen = $state(false);

	const currencies = $state(CURRENCIES);
	const itemsData = $state(NAVIGATION_DATA.items);
	const accountsData = $state(NAVIGATION_DATA.accounts);
	const servicesData = $state(NAVIGATION_DATA.services);
	const swapData = $state(NAVIGATION_DATA.swap);
	const sellData = $state(NAVIGATION_DATA.sell);

	function handleItemClick(event: ItemClickEvent, dropdownName: string): void {
		const { item, category } = event;

		if (dropdownName === 'currency' || dropdownName === 'currency-selector') {
			const currencyValue = typeof item === 'string' ? item : item.label;
			selectedCurrency = currencyValue as Currency;
		} else {
			console.log(
				`Navigation: ${item.label} selected from ${dropdownName}${category ? ` > ${category}` : ''} -> ${item.link}`
			);
		}
	}

	function toggleMobileMenu(): void {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu(): void {
		mobileMenuOpen = false;
	}
</script>

<div class="navbar">
	<div class="navbar-left">
		<div class="logo-container">
			<a href="/">
				<img src="/logo.svg" alt="Logo" class="logo" />
			</a>
		</div>

		<nav class="main-menu desktop-menu">
			<ul class="menu-list">
				<NavbarDropdownMenu
					label="Currency"
					items={currencies}
					onItemclick={(e) => handleItemClick(e, 'currency')}
				/>

				<NavbarDropdownMenu
					label="Items"
					items={itemsData}
					type="multi"
					onItemclick={(e) => handleItemClick(e, 'items')}
				/>

				<NavbarDropdownMenu
					label="Accounts"
					items={accountsData}
					onItemclick={(e) => handleItemClick(e, 'accounts')}
				/>

				<NavbarDropdownMenu
					label="Services"
					items={servicesData}
					type="multi"
					onItemclick={(e) => handleItemClick(e, 'services')}
				/>

				<NavbarDropdownMenu
					label="Swap"
					items={swapData}
					onItemclick={(e) => handleItemClick(e, 'swap')}
				/>

				<NavbarDropdownMenu
					label="Sell"
					items={sellData}
					type="multi"
					onItemclick={(e) => handleItemClick(e, 'sell')}
				/>
			</ul>
		</nav>
	</div>

	<div class="navbar-right">
		<div class="desktop-right">
			<div class="currency-selector">
				<NavbarDropdownMenu
					label={selectedCurrency}
					items={currencies}
					iconSize={18}
					onItemclick={(e) => handleItemClick(e, 'currency-selector')}
				/>
			</div>
			<div class="cart-item">
				<a href="/contact">
					<iconify-icon icon="mdi:cart" height="16" width="16"></iconify-icon>
					<span>CART ({cartStore.totalItems})</span>
				</a>
			</div>
			<button class="signin-button">
				<span>Sign In</span>
				<iconify-icon icon="mdi:account" height="16" width="16"></iconify-icon>
			</button>
		</div>

		<button class="mobile-menu-toggle" onclick={toggleMobileMenu} aria-label="Toggle menu">
			<iconify-icon icon={mobileMenuOpen ? 'mdi:close' : 'mdi:menu'} height="24" width="24"
			></iconify-icon>
		</button>
	</div>
</div>

{#if mobileMenuOpen}
	<div
		class="mobile-menu-overlay"
		role="button"
		tabindex="0"
		onclick={closeMobileMenu}
		onkeydown={(e) => e.key === 'Escape' && closeMobileMenu()}
		aria-label="Close menu overlay"
	>
		<div
			class="mobile-menu"
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<div class="mobile-menu-header">
				<h3>Menu</h3>
				<button class="close-mobile-menu" onclick={closeMobileMenu} aria-label="Close menu">
					<iconify-icon icon="mdi:close" height="20" width="20"></iconify-icon>
				</button>
			</div>

			<ul class="mobile-menu-list">
				<li class="mobile-menu-item">
					<div class="currency-selector mobile">
						<span class="mobile-label">Currency:</span>
						<NavbarDropdownMenu
							label={selectedCurrency}
							items={currencies}
							iconSize={16}
							onItemclick={(e) => {
								handleItemClick(e, 'currency-selector');
								closeMobileMenu();
							}}
						/>
					</div>
				</li>

				<li class="mobile-menu-item">
					<NavbarDropdownMenu
						label="Currency"
						items={currencies}
						onItemclick={(e) => {
							handleItemClick(e, 'currency');
							closeMobileMenu();
						}}
					/>
				</li>

				<li class="mobile-menu-item">
					<NavbarDropdownMenu
						label="Items"
						items={itemsData}
						type="multi"
						onItemclick={(e) => {
							handleItemClick(e, 'items');
							closeMobileMenu();
						}}
					/>
				</li>

				<li class="mobile-menu-item">
					<NavbarDropdownMenu
						label="Accounts"
						items={accountsData}
						onItemclick={(e) => {
							handleItemClick(e, 'accounts');
							closeMobileMenu();
						}}
					/>
				</li>

				<li class="mobile-menu-item">
					<NavbarDropdownMenu
						label="Services"
						items={servicesData}
						type="multi"
						onItemclick={(e) => {
							handleItemClick(e, 'services');
							closeMobileMenu();
						}}
					/>
				</li>

				<li class="mobile-menu-item">
					<NavbarDropdownMenu
						label="Swap"
						items={swapData}
						onItemclick={(e) => {
							handleItemClick(e, 'swap');
							closeMobileMenu();
						}}
					/>
				</li>

				<li class="mobile-menu-item">
					<NavbarDropdownMenu
						label="Sell"
						items={sellData}
						type="multi"
						onItemclick={(e) => {
							handleItemClick(e, 'sell');
							closeMobileMenu();
						}}
					/>
				</li>

				<li class="mobile-menu-item">
					<a href="/contact" class="mobile-link" onclick={closeMobileMenu}>
						<iconify-icon icon="mdi:cart" height="16" width="16"></iconify-icon>
						<span>CART ({cartStore.totalItems})</span>
					</a>
				</li>

				<li class="mobile-menu-item">
					<button class="signin-button mobile" onclick={closeMobileMenu}>
						<span>Sign In</span>
						<iconify-icon icon="mdi:account" height="16" width="16"></iconify-icon>
					</button>
				</li>
			</ul>
		</div>
	</div>
{/if}

<style>
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-md) var(--spacing-xl);
		background-color: var(--background-color);
		box-shadow: var(--shadow-sm);
		position: relative;
		border-bottom: 1px solid var(--border-color);
	}

	.navbar-left {
		display: flex;
		align-items: center;
	}

	.navbar-right {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		margin-left: auto;
	}

	.desktop-right {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}

	.logo-container {
		display: flex;
		align-items: center;
		border-right: 1px solid hsla(0, 0%, 100%, 0.5);
		padding-right: var(--spacing-xl);
	}

	.logo {
		width: 152px;
		height: auto;
	}

	.menu-list {
		display: flex;
		align-items: center;
	}

	.cart-item {
		display: flex;
		align-items: center;
	}

	.cart-item a {
		font-weight: var(--font-weight-medium);
		font-size: var(--font-size-xs);
		text-transform: uppercase;
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.signin-button {
		background-color: var(--primary-color);
		color: #000;
		font-weight: var(--font-weight-medium);
		padding: var(--spacing-sm) var(--spacing-md);
		border-radius: var(--radius-sm);
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		font-size: var(--font-size-sm);
		transition: background-color var(--transition-fast);
	}

	.currency-selector {
		position: relative;
	}

	.mobile-menu-toggle {
		display: none;
		padding: var(--spacing-sm);
		border-radius: var(--radius-sm);
	}

	.mobile-menu-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: var(--z-modal);
		display: flex;
		justify-content: flex-end;
	}

	.mobile-menu {
		background-color: var(--background-color);
		width: 100%;
		max-width: 400px;
		height: 100vh;
		overflow-y: auto;
		box-shadow: var(--shadow-lg);
		transform: translateX(0);
		transition: transform var(--transition-normal);
	}

	.mobile-menu-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-lg) var(--spacing-xl);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.mobile-menu-header h3 {
		color: var(--text-color);
		margin: 0;
		font-size: var(--font-size-md, 1.2rem);
		text-transform: uppercase;
	}

	.close-mobile-menu {
		padding: var(--spacing-sm);
		border-radius: var(--radius-sm);
	}

	.mobile-menu-list {
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.mobile-menu-item {
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.mobile-menu-item:last-child {
		border-bottom: none;
	}

	.mobile-link {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md) var(--spacing-xl);
		font-weight: var(--font-weight-medium);
		font-size: var(--font-size-sm);
		text-transform: uppercase;
		transition: background-color var(--transition-normal);
	}

	.mobile-link:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	@media (hover: none) and (pointer: coarse) {
		.mobile-link:hover {
			background-color: transparent;
		}
	}

	.signin-button.mobile {
		width: calc(100% - 4rem);
		margin: var(--spacing-md) var(--spacing-xl);
		justify-content: center;
	}

	.currency-selector.mobile {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-md) var(--spacing-xl);
	}

	.mobile-label {
		font-weight: var(--font-weight-medium);
		font-size: var(--font-size-sm);
		text-transform: uppercase;
	}

	@media (max-width: 768px) {
		.navbar {
			padding: var(--spacing-md);
		}

		.logo-container {
			border-right: none;
			padding-right: var(--spacing-md);
		}

		.logo {
			width: 120px;
		}

		.desktop-menu,
		.desktop-right {
			display: none;
		}

		.mobile-menu-toggle {
			display: block;
		}
	}

	@media (max-width: 1024px) {
		.logo {
			width: 130px;
		}

		.logo-container {
			padding-right: var(--spacing-lg);
		}

		.navbar {
			padding: var(--spacing-md) var(--spacing-lg);
		}
	}

	@media (max-width: 1100px) and (min-width: 769px) {
		/* .navbar {
			padding: var(--spacing-xs) var(--spacing-sm);
		} */

		.logo {
			width: 100px;
		}

		.logo-container {
			padding-right: 0.8rem;
		}

		.menu-list {
			gap: 0.2rem;
		}

		.desktop-right {
			gap: 0.3rem;
		}

		.cart-item a {
			font-size: var(--font-size-xs);
		}

		.signin-button {
			padding: 0.3rem 0.6rem;
			font-size: var(--font-size-xs);
		}
	}

	@media (max-width: 1024px) and (min-width: 769px) {
		.cart-item span,
		.signin-button span {
			display: none;
		}
	}

	@media (max-width: 768px) {
		:global(.mobile-menu .dropdown-menu) {
			position: relative !important;
			box-shadow: none !important;
			border: none !important;
			margin-top: 0 !important;
			background: rgba(255, 255, 255, 0.05) !important;
		}

		:global(.mobile-menu .dropdown-button) {
			padding: var(--spacing-md) var(--spacing-xl) !important;
			width: 100% !important;
			justify-content: space-between !important;
		}
	}
</style>
