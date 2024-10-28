'use client';

import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';
import { signOut } from 'next-auth/react';

const Header = () => {
	return (
		<div className='px-3 h-14 bg-primary sticky top-0 left-0 right-0 flex items-center justify-end cursor-pointer'>
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
