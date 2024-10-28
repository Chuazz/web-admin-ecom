import { clientRequest } from '@/src/utils';
import { queryKey } from '@configs/query-key';
import { routes } from '@configs/routes';
import { queryOptions } from '@tanstack/react-query';
import { Product } from '@type/data';

const getProducts = async ({ page = 1, limit = 20 }) => {
	const response = await clientRequest<Product[]>({
		api: routes.products,
		options: {
			params: {
				page,
				limit,
			},
		},
	});

	return response;
};

const getProductsOptions = ({ page = 1, limit = 20 }) =>
	queryOptions({
		queryKey: queryKey.products.list({
			page,
			limit,
		}),
		queryFn: () => {
			return getProducts({ page, limit });
		},
	});

export { getProductsOptions };
