export const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'CHF' | 'CNY';

export interface NavigationItem {
	label: string;
	link: string;
}

export const NAVIGATION_DATA = {
	items: {
		weapons: [
			{ label: 'Swords', link: '/weapons/swords' },
			{ label: 'Axes', link: '/weapons/axes' },
			{ label: 'Bows', link: '/weapons/bows' },
			{ label: 'Staffs', link: '/weapons/staffs' },
			{ label: 'Daggers', link: '/weapons/daggers' }
		],
		armor: [
			{ label: 'Helmets', link: '/armor/helmets' },
			{ label: 'Chestplates', link: '/armor/chestplates' },
			{ label: 'Leggings', link: '/armor/leggings' },
			{ label: 'Boots', link: '/armor/boots' },
			{ label: 'Shields', link: '/armor/shields' }
		],
		consumables: [
			{ label: 'Potions', link: '/consumables/potions' },
			{ label: 'Food', link: '/consumables/food' },
			{ label: 'Scrolls', link: '/consumables/scrolls' },
			{ label: 'Gems', link: '/consumables/gems' }
		]
	},
	accounts: [
		{ label: 'Profile', link: '/profile' },
		{ label: 'Settings', link: '/settings' },
		{ label: 'Order History', link: '/orders' },
		{ label: 'Favorites', link: '/favorites' },
		{ label: 'Logout', link: '/logout' }
	],
	services: {
		trading: [
			{ label: 'Buy Items', link: '/trading/buy' },
			{ label: 'Sell Items', link: '/trading/sell' },
			{ label: 'Trade History', link: '/trading/history' },
			{ label: 'Price Guide', link: '/trading/prices' }
		],
		support: [
			{ label: 'Help Center', link: '/support/help' },
			{ label: 'Contact Us', link: '/support/contact' },
			{ label: 'FAQ', link: '/support/faq' },
			{ label: 'Live Chat', link: '/support/chat' }
		],
		premium: [
			{ label: 'Premium Benefits', link: '/premium/benefits' },
			{ label: 'Upgrade Plan', link: '/premium/upgrade' },
			{ label: 'Billing', link: '/premium/billing' }
		]
	},
	swap: [
		{ label: 'Item Exchange', link: '/swap/items' },
		{ label: 'Currency Exchange', link: '/swap/currency' },
		{ label: 'Bulk Swap', link: '/swap/bulk' },
		{ label: 'Swap History', link: '/swap/history' }
	],
	sell: {
		quick: [
			{ label: 'Instant Sell', link: '/sell/instant' },
			{ label: 'Price Check', link: '/sell/price-check' },
			{ label: 'Bulk Sell', link: '/sell/bulk' }
		],
		auction: [
			{ label: 'Create Listing', link: '/sell/auction/create' },
			{ label: 'My Listings', link: '/sell/auction/my-listings' },
			{ label: 'Auction House', link: '/sell/auction/house' }
		],
		direct: [
			{ label: 'Direct Sales', link: '/sell/direct' },
			{ label: 'Negotiate Price', link: '/sell/negotiate' }
		]
	}
};

// Default currency for the application
export const DEFAULT_CURRENCY: Currency = 'USD';
