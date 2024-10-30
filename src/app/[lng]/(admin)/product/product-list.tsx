'use client';

import { usePermission } from '@/src/hooks';
import { useGetProducts } from '@/src/hooks/query';
import { InputText } from '@components/form';
import { Button, Card, Loading, Paginate, Table } from '@components/ui';
import { translation } from '@configs/i18n';
import { routes } from '@configs/routes';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ProductList = () => {
	const t = translation();
	const { has } = usePermission();
	const router = useRouter();

	const [queryParams, setQueryParams] = useState({
		keyword: '',
		page: 1,
		limit: 5,
	});

	const productsQuery = useGetProducts(queryParams);

	return (
		<Card className='relative'>
			<Loading show={productsQuery.isFetching || productsQuery.isLoading} />

			<Card.Header className='flex items-center justify-between'>
				<InputText
					label={t('common:search')}
					debounce={true}
					onChange={(value) => {
						setQueryParams((prev) => ({
							...prev,
							page: 1,
							keyword: value,
						}));
					}}
				/>

				<Button
					leftIcon={PlusIcon}
					content='Thêm mới'
				/>
			</Card.Header>

			<Card.Body>
				<Table
					items={productsQuery.data?.data || []}
					module='product'
					canRead={has('product_s.view')}
					canUpdate={has('product_s.update')}
					canDelete={has('product_s.delete')}
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
					onUpdate={(value) => {
						router.push(routes.product + '/' + value.id);
					}}
				/>
			</Card.Body>

			<Card.Footer>
				<Paginate
					limit={queryParams.limit}
					page={queryParams.page}
					totalPage={productsQuery.data?.meta?.total_page}
					onLimitChange={(value) => {
						setQueryParams((prev) => ({
							...prev,
							limit: value,
						}));
					}}
					onPageChange={(value) => {
						setQueryParams((prev) => ({
							...prev,
							page: value,
						}));
					}}
				/>
			</Card.Footer>
		</Card>
	);
};

export { ProductList };
