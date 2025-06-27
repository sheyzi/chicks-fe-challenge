export interface Item {
	id: number;
	name: string;
	price: number;
	oldPrice?: number;
	description: string;
	imageUrl: string;
	inStock: boolean;
	game: string;
	type: string;
	createdAt: string;
	featured: boolean;
}
