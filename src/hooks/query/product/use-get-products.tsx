import { clientRequest } from '@/src/utils';
import { queryKey } from '@configs/query-key';
import { routes } from '@configs/routes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Product } from '@type/data';

const useGetProducts = (params: Record<string, string | number>) => {
	return useQuery({
		queryKey: queryKey.products.list(params),
		placeholderData: keepPreviousData,
		queryFn: async () => {
			const response = await clientRequest<Product[]>({
				api: routes.product,
				options: {
					params,
				},
			});

			return response;
		},
	});
};

export { useGetProducts };
