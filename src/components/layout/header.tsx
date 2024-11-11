'use client';

import { Button } from '@components/ui';
import { ArrowRightStartOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { signOut } from 'next-auth/react';
import { parseAsBoolean, useQueryState } from 'nuqs';

const Header = () => {
	const [_sidebarCollapse, setSidebarCollapse] = useQueryState(
		'sidebarCollapse',
		parseAsBoolean.withDefault(false),
	);

	return (
		<div className='sticky left-0 right-0 top-0 z-10 flex h-14 cursor-pointer items-center justify-between bg-primary pl-1 pr-3'>
			<Button
				leftIcon={Bars3Icon}
				className='text-white'
				schema='blue'
				filled={false}
				rounded={true}
				onClick={() => {
					setSidebarCollapse((prev) => !prev);
				}}
			/>

			<ArrowRightStartOnRectangleIcon
				className='size-6 text-white'
				onClick={() => {
					signOut();
				}}
			/>
		</div>
	);
};

export { Header };
