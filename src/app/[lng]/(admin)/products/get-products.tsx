import { clientRequest } from '@/src/utils';
import { queryKey } from '@configs/query-key';
import { routes } from '@configs/routes';
import { queryOptions } from '@tanstack/react-query';
import { Product } from '@type/data';

const getProducts = async (params: Record<string, string | number>) => {
	const response = await clientRequest<Product[]>({
		api: routes.products,
		options: {
			params,
		},
	});

	return response;
};

const getProductsOptions = (params: Record<string, string | number>) =>
	queryOptions({
		queryKey: queryKey.products.list(params),
		queryFn: () => {
			return getProducts(params);
		},
	});

export { getProductsOptions };
