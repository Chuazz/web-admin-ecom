'use client';

import { useRouter } from '@/src/hooks';
import { Link } from '@components/ui';
import { ArrowRightStartOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const Header = () => {
	const pathName = usePathname();

	const { sidebarCollapse } = useRouter({
		sidebarCollapse: 'false',
	});

	return (
		<div className='sticky left-0 right-0 top-0 z-10 flex h-14 cursor-pointer items-center justify-between bg-primary px-3'>
			<Link
				keepParam={true}
				href={pathName}
				params={{
					sidebarCollapse: sidebarCollapse === 'true' ? 'false' : 'true',
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
