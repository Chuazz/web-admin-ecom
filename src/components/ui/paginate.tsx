'use client';

import { useSearchParams } from '@/src/hooks';
import { Link } from './link';
import { translation } from '@configs/i18n';

type Paginate = {
	totalPage: number;
};

const Paginate = ({ totalPage }: Paginate) => {
	const t = translation();

	const { update, page, limit } = useSearchParams({
		page: '1',
		limit: '5',
	});

	return (
		<div className='flex items-center justify-end gap-4'>
			<Link
				type='update'
				className='rounded border bg-white px-2 py-1'
				params={{
					page: Number(page) - 1,
				}}
			>
				{'<'}
			</Link>

			<Link
				type='update'
				className='rounded border bg-white px-2 py-1'
				params={{
					page: Number(page) + 1,
				}}
			>
				{'>'}
			</Link>

			<span className='flex items-center gap-1'>
				<p>{t('common:page')}</p>

				<strong>
					{page} {t('common:on').toLowerCase()} {totalPage}
				</strong>
			</span>

			<div>|</div>

			<span className='flex items-center gap-1'>
				<p>{t('common:go_to_page')}:</p>

				<input
					type='number'
					min='1'
					max={totalPage}
					defaultValue={page}
					onBlur={(e) => {
						const page = e.target.value ? Number(e.target.value) : 1;

						update({
							name: 'page',
							value: page,
						});
					}}
					className='w-16 rounded border bg-white p-1'
				/>
			</span>

			<select
				value={limit}
				className='cursor-pointer rounded border bg-white p-1'
				onChange={(e) => {
					update({
						name: 'limit',
						value: e.target.value,
					});
				}}
			>
				{[5, 10, 20, 30, 40, 50].map((pageSize) => (
					<option
						key={pageSize}
						value={pageSize}
					>
						{t('common:show')} {pageSize}
					</option>
				))}
			</select>
		</div>
	);
};

export { Paginate };
