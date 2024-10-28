'use client';

import { appendLocale } from '@/src/utils';
import { Link } from '@components/ui';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Option, Page } from '@type/common';
import clsx from 'clsx';
import { useParams, usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

const SideBarItem = ({ data }: { data: Option }) => {
	const pathname = usePathname();
	const { lng } = useParams<Page['params']>();

	const active = useMemo(
		() => pathname === appendLocale(lng, data.href),
		[data.href, lng, pathname],
	);

	const [collapsed, setCollapsed] = useState(() => {
		if (!data.items) {
			return true;
		}

		const foundActive = data.items.some((item) => {
			return pathname === appendLocale(lng, item.href);
		});

		return !foundActive;
	});

	return (
		<div
			className={clsx('border-b border-transparent', {
				'border-b-white mb-3 pb-2': !collapsed,
			})}
		>
			<Link
				type='redirect'
				className={clsx(
					'flex items-center gap-2 p-2 rounded-lg hover:bg-white hover:text-black',
					{
						'bg-white text-black': active,
						'text-white': !active,
					},
				)}
				href={data.href ? appendLocale(lng, data.href) : '#'}
				onClick={() => {
					if (data.href && !data.items) {
						return;
					}

					setCollapsed((prev) => !prev);
				}}
			>
				{data.icon && <data.icon className='size-6' />}

				<p className='flex-1 '>{data.label}</p>

				{data.items && <ChevronRightIcon className='size-6' />}
			</Link>

			{data.items && (
				<div
					className={clsx('transition-all duration-200 overflow-hidden', {
						'h-0': collapsed,
						'h-auto mt-2': !collapsed,
					})}
				>
					{data.items.map((item) => (
						<SideBarItem
							data={item}
							key={item.code}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export { SideBarItem };
