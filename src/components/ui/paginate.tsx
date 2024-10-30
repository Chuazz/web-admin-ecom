'use client';

import { translation } from '@configs/i18n';

type Props = {
	page: number;
	limit: number;
	totalPage?: number;
	onPageChange?: (value: number) => void;
	onLimitChange?: (value: number) => void;
};

const Paginate = ({ page = 1, totalPage = 1, limit = 5, onPageChange, onLimitChange }: Props) => {
	const t = translation();

	return (
		<div className='flex flex-wrap items-center justify-end gap-4'>
			<div
				className='cursor-pointer rounded border bg-white px-2 py-1'
				onClick={() => {
					onPageChange?.(page - 1);
				}}
			>
				{'<'}
			</div>

			<div
				className='cursor-pointer rounded border bg-white px-2 py-1'
				onClick={() => {
					onPageChange?.(page + 1);
				}}
			>
				{'>'}
			</div>

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
					onBlur={(e) => {
						const page = e.target.value ? Number(e.target.value) : 1;

						onPageChange?.(page);
					}}
					className='w-16 rounded border bg-white p-1'
				/>
			</span>

			<select
				value={limit}
				className='cursor-pointer rounded border bg-white p-1'
				onChange={(e) => {
					onLimitChange?.(Number(e.target.value));
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
