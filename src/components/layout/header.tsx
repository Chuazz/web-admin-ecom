'use client';

import { Link } from '@components/ui';
import { ArrowRightStartOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { signOut } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const Header = () => {
	const searchParams = useSearchParams();

	return (
		<div className='sticky left-0 right-0 top-0 z-10 flex h-14 cursor-pointer items-center justify-between bg-primary px-3'>
			<Link
				type='update'
				replace={true}
				params={{
					sidebarCollapse: searchParams.get('sidebarCollapse') === 'true' ? 'false' : 'true',
				}}
			>
				<Bars3Icon className='size-6 text-white' />
			</Link>

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
