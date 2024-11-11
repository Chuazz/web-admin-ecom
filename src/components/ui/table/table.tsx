'use client';

import { translation } from '@configs/i18n';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { HTMLAttributes, ReactNode, useMemo } from 'react';
import { Button } from '../button';
import { Loading } from '../loading';

type Table<T = unknown> = {
	items: T[];
	isLoading?: boolean;
	module: string;
	canUpdate?: boolean;
	canDelete?: boolean;
	canRead?: boolean;
	onUpdate?: (data: T) => void;
	onRead?: (data: T) => void;
	onDelete?: (data: T) => void;
	fields: {
		key: keyof T | ({} & string);
		header?: () => ReactNode;
		cell?: (data: T) => ReactNode;
		cellClassName?: HTMLAttributes<HTMLParagraphElement>['className'];
		headerClassName?: HTMLAttributes<HTMLParagraphElement>['className'];
	}[];
};

const Table = <T,>({
	items,
	module,
	fields = [],
	isLoading = false,
	canDelete,
	canUpdate,
	canRead,
	onDelete,
	onRead,
	onUpdate,
}: Table<T>) => {
	const columnHelper = useMemo(() => createColumnHelper<T>(), []);
	const t = translation();

	const columns = useMemo(
		() =>
			fields.map((field) =>
				columnHelper.accessor((row: T) => row, {
					id: field.key.toString(),
					header: () => {
						return (
							field.header?.() || (
								<p className={field.headerClassName}>
									{t(`module:fields.${module}.${field.key.toString()}`)}
								</p>
							)
						);
					},
					cell: (info) => {
						const data = info.getValue() as T;
						const splitKey = field.key.toString().split('.') as any[];

						const value = splitKey.reduce(
							(prev, _value) => (prev ? prev[_value] : undefined),
							data,
						);

						return (
							field.cell?.(data) || (
								<p className={field.cellClassName}>{value?.toString()}</p>
							)
						);
					},
				}),
			),
		[columnHelper, fields, module, t],
	);

	const table = useReactTable({
		data: items,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className='overflow-auto'>
			<Loading show={isLoading} />

			<table
				className='w-full border-collapse'
				cellPadding={8}
			>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{(canUpdate || canDelete || canRead) && (
								<th className='w-9 border bg-primary'></th>
							)}

							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className='border bg-primary text-white'
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
							<td className='border'>
								<div className='flex w-fit items-center'>
									{canUpdate && (
										<Button
											leftIcon={PencilIcon}
											filled={false}
											onClick={() => {
												onUpdate?.(row.original);
											}}
										/>
									)}

									{canRead && (
										<Button
											schema='blue'
											leftIcon={EyeIcon}
											filled={false}
											onClick={() => {
												onRead?.(row.original);
											}}
										/>
									)}

									{canDelete && (
										<Button
											schema='red'
											leftIcon={TrashIcon}
											filled={false}
											onClick={() => {
												onDelete?.(row.original);
											}}
										/>
									)}
								</div>
							</td>

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
		</div>
	);
};

export { Table };
