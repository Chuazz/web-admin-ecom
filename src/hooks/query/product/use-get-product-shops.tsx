import { request } from '@/src/utils';
import { api } from '@configs/api';
import { queryKey } from '@configs/query-key';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Product } from '@type/data';

const useGetProductShops = (params: Record<string, string | number | null>) => {
	return useQuery({
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
	});
};

export { useGetProductShops };
