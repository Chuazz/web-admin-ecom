'use client';

import { appendLocale } from '@/src/utils';
import { Link } from '@components/ui';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Option, Page } from '@type/common';
import clsx from 'clsx';
import { useParams, usePathname } from 'next/navigation';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { useCallback, useMemo, useState } from 'react';

const SideBarItem = ({ data }: { data: Option }) => {
	const pathname = usePathname();
	const { lng } = useParams<Page['params']>();
	const isParent = useMemo(() => !!data.items, [data.items]);
	const isChild = useMemo(() => !data.items, [data.items]);
	const [sidebarCollapse] = useQueryState('sidebarCollapse', parseAsBoolean.withDefault(false));

	const checkActive = useCallback(
		(item: Option) => {
			return (
				item.href &&
				(pathname === appendLocale(lng, item.href) ||
					pathname.startsWith(`${appendLocale(lng, item.href)}/`))
			);
		},
		[lng, pathname],
	);

	const childActive = useMemo(() => {
		if (!data.items) {
			return false;
		}

		const foundActive = data.items.some((item) => {
			return checkActive(item);
		});

		return foundActive;
	}, [checkActive, data.items]);

	const active = useMemo(() => checkActive(data), [checkActive, data]);

	const [collapsed, setCollapsed] = useState(!childActive);

	return (
		<div
			className={clsx('border-b border-transparent', {
				'mb-1 border-b-white pb-2': !collapsed,
			})}
		>
			<Link
				className={clsx('flex flex-nowrap items-center gap-2 rounded-lg p-2', {
					'bg-blue-500 text-white hover:bg-blue-600': isParent && childActive,
					'text-white': (isParent && !childActive) || (isChild && !active),
					'bg-white text-black': isChild && active,
					'hover:bg-white hover:text-black': isChild && !active,
					'hover:bg-blue-500 hover:text-white': isParent && !childActive,
				})}
				href={data.href ? appendLocale(lng, data.href) : pathname}
				onClick={() => {
					if (data.href) {
						return;
					}

					setCollapsed((prev) => !prev);
				}}
			>
				{data.icon && <data.icon className='size-5' />}

				{!sidebarCollapse && <p className={clsx('flex-1 text-nowrap')}>{data.label}</p>}

				{data.items && !sidebarCollapse && <ChevronRightIcon className='size-6' />}
			</Link>

			{data.items && (
				<div
					className={clsx('flex flex-col gap-1 overflow-hidden transition-all duration-200', {
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
