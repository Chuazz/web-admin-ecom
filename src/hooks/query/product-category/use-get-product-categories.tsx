import { request } from '@/src/utils';
import { queryKey } from '@configs/query-key';
import { routes } from '@configs/routes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ProductCategory } from '@type/data';

const useGetProductCategories = (params: Record<string, string | number>) => {
	return useQuery({
		queryKey: queryKey.productCategories.list(params),
		placeholderData: keepPreviousData,
		queryFn: async () => {
			const response = await request<ProductCategory[]>({
				api: routes.productCategory,
				options: {
					params,
				},
			});

			return response;
		},
	});
};

export { useGetProductCategories };
