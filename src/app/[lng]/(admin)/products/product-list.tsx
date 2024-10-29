'use client';

import { InputText } from '@components/form';
import { Button, Card, Loading, Paginate, Table } from '@components/ui';
import { translation } from '@configs/i18n';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getProductsOptions } from './get-products';
import { PlusIcon } from '@heroicons/react/24/solid';

const ProductList = () => {
	const t = translation();
	const [queryParams, setQueryParams] = useState({
		keyword: '',
		page: 1,
		limit: 5,
	});

	const productsQuery = useQuery(getProductsOptions(queryParams));

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
