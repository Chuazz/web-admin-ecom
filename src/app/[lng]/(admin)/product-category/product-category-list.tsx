'use client';

import { useGetProductCategories } from '@/src/hooks/query/product-category';
import { usePermission } from '@/src/hooks/use-permission';
import { InputText } from '@components/form';
import { Button, Card, Paginate, Table } from '@components/ui';
import { translation } from '@configs/i18n';
import { PlusIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const ProductCategoryList = () => {
	const t = translation();
	const { has } = usePermission();
	const pathname = usePathname();
	const router = useRouter();

	const [queryParams, setQueryParams] = useState({
		keyword: '',
		page: 1,
		limit: 5,
	});

	const productCategoriesQuery = useGetProductCategories(queryParams);

	return (
		<Card className='relative'>
			{/* <Loading show={productCategoriesQuery.isFetching || productCategoriesQuery.isLoading} /> */}

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
					items={productCategoriesQuery.data?.data || []}
					module='product_category'
					canRead={has('product_category.view')}
					canUpdate={has('product_category.update')}
					canDelete={has('product_category.delete')}
					fields={[
						{
							key: 'internal_code',
						},
						{
							key: 'name',
						},
					]}
					onUpdate={(data) => {
						router.push(pathname + '/' + data.id);
					}}
				/>
			</Card.Body>

			<Card.Footer>
				<Paginate
					limit={queryParams.limit}
					page={queryParams.page}
					totalPage={productCategoriesQuery.data?.meta?.total_page}
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

export { ProductCategoryList };
