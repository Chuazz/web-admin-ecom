'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { Link } from './link';
import { useUpdateSearchParams } from '@/src/hooks';

type Paginate = {
	totalPage: number;
};

const Paginate = ({ totalPage }: Paginate) => {
	const searchParams = useSearchParams();
	const page = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams]);
	const limit = useMemo(() => Number(searchParams.get('limit')) || 5, [searchParams]);
	const { updateSearchParams } = useUpdateSearchParams();

	return (
		<div className='flex items-center justify-end mt-3 gap-4'>
			<Link
				type='update'
				className='border rounded py-1 px-2'
				params={{
					page: page - 1,
				}}
			>
				{'<'}
			</Link>

			<Link
				type='update'
				className='border rounded py-1 px-2'
				params={{
					page: page + 1,
				}}
			>
				{'>'}
			</Link>

			<span className='flex items-center gap-1'>
				<div>Page</div>

				<strong>
					{page} of {totalPage}
				</strong>
			</span>

			<div>|</div>

			<span className='flex items-center gap-1'>
				Go to page:
				<input
					type='number'
					min='1'
					max={totalPage}
					defaultValue={page}
					onBlur={(e) => {
						const page = e.target.value ? Number(e.target.value) : 1;

						updateSearchParams('page', page);
					}}
					className='border p-1 rounded w-16'
				/>
			</span>
			<select
				value={limit}
				onChange={(e) => {
					updateSearchParams('limit', e.target.value);
				}}
			>
				{[5, 10, 20, 30, 40, 50].map((pageSize) => (
					<option
						key={pageSize}
						value={pageSize}
					>
						Show {pageSize}
					</option>
				))}
			</select>
		</div>
	);
};

export { Paginate };
