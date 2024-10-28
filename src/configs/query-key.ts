const queryKey = {
	products: {
		list: (filter: Record<string, string | number> = {}) => ['list', 'products', filter],
	},
};

export { queryKey };
