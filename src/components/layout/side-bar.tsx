'use client';

import { image, tempImage } from '@configs/image';
import { menu } from '@configs/menu';
import { SideBarItem } from './side-bar-item';
import { translation } from '@configs/i18n';
import { useSession } from 'next-auth/react';
import { Image } from '@components/ui';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { useMemo } from 'react';

const SideBar = () => {
	const t = translation();
	const { data } = useSession();
	const searchParams = useSearchParams();

	const sidebarCollapse = useMemo(
		() => searchParams.get('sidebarCollapse') === 'true',
		[searchParams],
	);

	return (
		<div
			className={clsx(
				'p-3 transition-all duration-300 sm:pt-16 lg:px-3 lg:pt-3',
				'z-10 flex h-screen flex-col gap-5 overflow-auto bg-primary sm:absolute lg:relative',
				{
					'sm:w-80 lg:w-80': !sidebarCollapse,
					'sm:w-0 sm:px-0 lg:w-16': sidebarCollapse,
				},
			)}
		>
			<div className='flex flex-nowrap items-center gap-2'>
				<Image
					src={image.NextJsImage}
					className='size-9'
				/>

				{!sidebarCollapse && (
					<p className='text-nowrap text-lg font-bold text-white'>{t('info:name')}</p>
				)}
			</div>

			<div className='border-b border-b-white' />

			<div className='flex flex-nowrap items-center gap-2'>
				<Image
					src={data?.user.profile.avatar || tempImage}
					className='size-9 rounded-full'
				/>

				{!sidebarCollapse && (
					<p className='text-nowrap font-bold text-white'>{data?.user.profile.name}</p>
				)}
			</div>

			<div className='border-b border-b-white' />

			{menu.map((item) => (
				<SideBarItem
					key={item.code}
					data={item}
				/>
			))}
		</div>
	);
};

export { SideBar };
