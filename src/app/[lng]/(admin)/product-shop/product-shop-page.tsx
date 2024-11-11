'use client';

import { useGetProductShops } from '@/src/hooks/query';
import { usePermission } from '@/src/hooks/use-permission';
import { useRouter } from '@/src/hooks/use-router';
import { InputText, Select } from '@components/form';
import { Button, Card, Paginate, Table } from '@components/ui';
import { translation } from '@configs/i18n';
import { routes } from '@configs/routes';
import { PlusIcon } from '@heroicons/react/24/solid';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

const ProductShopPage = () => {
	const t = translation();
	const { has } = usePermission();
	const { router } = useRouter();

	const [queryParams, setQueryParams] = useQueryStates(
		{
			limit: parseAsInteger.withDefault(5),
			page: parseAsInteger.withDefault(1),
			keyword: parseAsString.withDefault(''),
		},
		{
			history: 'push',
			urlKeys: {
				limit: 's',
				page: 'p',
				keyword: 'q',
			},
		},
	);

	const productsQuery = useGetProductShops(queryParams);

	return (
		<Card className='relative'>
			<Card.Header className='flex items-center justify-between'>
				<p className='font-semibold'>
					{t('list_obj', {
						obj: t('module:product'),
					})}
				</p>

				<Button
					leftIcon={PlusIcon}
					content='Thêm mới'
					onClick={() => {}}
				/>
			</Card.Header>

			<Card.Body>
				<div className='grid grid-cols-4 gap-4'>
					<InputText
						label={t('common:search')}
						placeholder={t('common:search')}
						debounce={true}
						onChange={(value) => {
							setQueryParams((prev) => ({
								...prev,
								keyword: value,
							}));
						}}
					/>

					<Select
						label={t('module:product_industry')}
						placeholder={t('module:product_industry')}
						valueId='id'
						data={[
							{
								id: 1,
								name: 'tmdt',
							},
							{
								id: 2,
								name: 'tmdt',
							},
							{
								id: 3,
								name: 'tmdt',
							},
						]}
					/>

					<Select
						label={t('module:product_category')}
						placeholder={t('module:product_category')}
						valueId='id'
						data={[
							{
								id: 1,
								name: 'tmdt',
							},
							{
								id: 2,
								name: 'tmdt',
							},
							{
								id: 3,
								name: 'tmdt',
							},
						]}
					/>

					<Select
						label={t('common:status')}
						placeholder={t('common:status')}
						valueId='id'
						data={[
							{
								id: 1,
								name: 'tmdt',
							},
							{
								id: 2,
								name: 'tmdt',
							},
							{
								id: 3,
								name: 'tmdt',
							},
						]}
					/>
				</div>

				<Table
					isLoading={productsQuery.isFetching}
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
						router.redirect({
							keepParams: true,
							href: routes.productShop + '/' + value.id,
						});
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

export { ProductShopPage };
