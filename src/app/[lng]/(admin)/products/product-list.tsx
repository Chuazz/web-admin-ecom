'use client';

import { Paginate } from '@components/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { Product } from '@type/data';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { getProductsOptions } from './get-products';

const columnHelper = createColumnHelper<Product>();

const columns = [
	columnHelper.accessor((row) => row.name, {
		id: 'name',
		cell: (info) => <i>{info.getValue()}</i>,
		header: () => <span>Tên sản phẩm</span>,
	}),
	columnHelper.accessor((row) => row.price, {
		id: 'price',
		cell: (info) => <i>{info.getValue()}</i>,
		header: () => <span>Đơn giá</span>,
	}),
];

const ProductList = () => {
	const searchParams = useSearchParams();
	const page = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams]);
	const limit = useMemo(() => Number(searchParams.get('limit')) || 5, [searchParams]);

	const productsQuery = useSuspenseQuery(
		getProductsOptions({
			limit,
			page,
		}),
	);

	const table = useReactTable({
		data: productsQuery.data?.data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div>
			<table
				className='border border-collapse w-full'
				cellPadding={12}
			>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className='border'
								>
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>

				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td
									key={cell.id}
									className='border'
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>

			<Paginate totalPage={productsQuery.data?.meta?.total_page || 1} />

			{productsQuery.isFetching ? 'Loading...' : null}
		</div>
	);
};

export { ProductList };
