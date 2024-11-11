const queryKey = {
	products: {
		list: (filter: Record<string, string | number | null> = {}) => ['list', 'products', filter],
	},
	productCategories: {
		list: (filter: Record<string, string | number | null> = {}) => [
			'list',
			'product-categories',
			filter,
		],
	},
};

export { queryKey };
