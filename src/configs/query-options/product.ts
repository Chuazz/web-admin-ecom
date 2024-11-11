import { request } from '@/src/utils';
import { api } from '@configs/api';
import { queryKey } from '@configs/query-key';
import { keepPreviousData, UseQueryOptions } from '@tanstack/react-query';
import { Product } from '@type/data';
import { Response } from '@type/request';

const productsDefaultParams = {
	keyword: '',
	page: '1',
	limit: '5',
};

const getProductOptions = (
	params: Record<string, string | number | null> = productsDefaultParams,
): UseQueryOptions<Response<Product[]> | null, Response, Response<Product[]> | null> => {
	return {
		queryKey: queryKey.products.list(params),
		placeholderData: keepPreviousData,
		queryFn: async () => {
			const response = await request<Product[]>({
				api: api.productShop,
				options: {
					params,
				},
			});

			return response;
		},
	};
};

export { getProductOptions, productsDefaultParams };
