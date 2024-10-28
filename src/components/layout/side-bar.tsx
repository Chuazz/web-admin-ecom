'use client';

import { image, tempImage } from '@configs/image';
import { menu } from '@configs/menu';
import { SideBarItem } from './side-bar-item';
import { translation } from '@configs/i18n';
import { useSession } from 'next-auth/react';
import { Image } from '@components/ui';

const SideBar = () => {
	const t = translation();
	const { data } = useSession();

	return (
		<div className='md:w-0 lg:w-80 lg:p-3 transition-all duration-300 bg-primary h-screen overflow-auto flex flex-col gap-5'>
			<div className='flex items-center gap-2'>
				<Image
					src={image.NextJsImage}
					className='size-9'
				/>

				<p className='text-white font-bold text-lg'>{t('info:name')}</p>
			</div>

			<div className='flex items-center gap-2'>
				<Image
					src={data?.user.profile.avatar || tempImage}
					className='rounded-full size-9'
				/>

				<p className='text-white font-bold'>{data?.user.profile.name}</p>
			</div>

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
