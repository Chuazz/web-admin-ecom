import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Page } from '@type/common';
import { getProductsOptions } from './get-products';
import { ProductList } from './product-list';
import { getQueryClient } from '@/src/utils';

const ProductPage = ({ searchParams }: Page<{ page: number; limit: number }>) => {
	const queryClient = getQueryClient();

	queryClient.prefetchQuery(
		getProductsOptions({
			page: searchParams.page,
			limit: searchParams.limit,
		}),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ProductList />
		</HydrationBoundary>
	);
};

export default ProductPage;
