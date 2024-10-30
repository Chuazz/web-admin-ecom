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

type Table<T = unknown> = {
	items: T[];
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
		<table
			className='w-full border-collapse border'
			cellPadding={12}
		>
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{(canUpdate || canDelete || canRead) && <td className='size-6 border'></td>}

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
						<td className='size-6 border'>
							<div className='flex items-center gap-3'>
								{canUpdate && (
									<PencilIcon
										className='size-5 cursor-pointer text-primary'
										onClick={() => {
											onUpdate?.(row.original);
										}}
									/>
								)}

								{canRead && (
									<EyeIcon
										className='size-5 cursor-pointer text-blue-500'
										onClick={() => {
											onRead?.(row.original);
										}}
									/>
								)}

								{canDelete && (
									<TrashIcon
										className='size-5 cursor-pointer text-red-500'
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
	);
};

export { Table };
