'use client';

import { useSearchParams } from '@/src/hooks';
import { Card, Loading, Paginate, Table } from '@components/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getProductsOptions } from './get-products';
import { InputText } from '@components/form';
import { translation } from '@configs/i18n';

const ProductList = () => {
	const t = translation();

	const { page, limit, keyword, update } = useSearchParams({
		page: '1',
		limit: '5',
		keyword: '',
	});

	const productsQuery = useSuspenseQuery(
		getProductsOptions({
			keyword,
			page,
			limit,
		}),
	);

	return (
		<Card className='relative'>
			<Loading show={productsQuery.isFetching} />

			<Card.Header>
				<InputText
					label={t('common:search')}
					debounce={true}
					onChange={(value) => {
						update({
							name: 'keyword',
							value,
							action: 'replace',
						});
					}}
				/>
			</Card.Header>

			<Card.Body>
				<Table
					items={productsQuery.data?.data || []}
					module='product'
					fields={[
						{
							key: 'name',
						},
						{
							key: 'price',
							cellClassName: 'text-right',
						},
						{
							key: 'extra.sold_qty',
							cellClassName: 'text-right',
						},
					]}
				/>
			</Card.Body>

			<Card.Footer>
				<Paginate totalPage={productsQuery.data?.meta?.total_page || 1} />
			</Card.Footer>
		</Card>
	);
};

export { ProductList };
