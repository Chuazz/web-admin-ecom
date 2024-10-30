const queryKey = {
	products: {
		list: (filter: Record<string, string | number> = {}) => ['list', 'products', filter],
	},
	productCategories: {
		list: (filter: Record<string, string | number> = {}) => [
			'list',
			'product-categories',
			filter,
		],
	},
};

export { queryKey };
