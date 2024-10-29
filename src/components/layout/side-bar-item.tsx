'use client';

import { appendLocale } from '@/src/utils';
import { Link } from '@components/ui';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Option, Page } from '@type/common';
import clsx from 'clsx';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

const SideBarItem = ({ data }: { data: Option }) => {
	const pathname = usePathname();
	const { lng } = useParams<Page['params']>();
	const isParent = useMemo(() => !!data.items, [data.items]);
	const searchParams = useSearchParams();

	const sidebarCollapse = useMemo(
		() => searchParams.get('sidebarCollapse') === 'true',
		[searchParams],
	);

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
				'mb-3 border-b-white pb-2': !collapsed,
			})}
		>
			<Link
				type='redirect'
				className={clsx(
					'flex flex-nowrap items-center gap-2 rounded-lg p-2 hover:bg-white hover:text-black',
					{
						'bg-white text-black': active,
						'text-white': !active,
					},
				)}
				href={data.href ? appendLocale(lng, data.href) : '#'}
				onClick={() => {
					if (data.href) {
						return;
					}

					setCollapsed((prev) => !prev);
				}}
			>
				{data.icon && <data.icon className='size-6' />}

				{!sidebarCollapse && (
					<p
						className={clsx('flex-1 text-nowrap', {
							'font-bold': isParent,
						})}
					>
						{data.label}
					</p>
				)}

				{data.items && !sidebarCollapse && <ChevronRightIcon className='size-6' />}
			</Link>

			{data.items && (
				<div
					className={clsx('overflow-hidden transition-all duration-200', {
						'h-0': collapsed,
						'mt-2 h-auto': !collapsed,
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
