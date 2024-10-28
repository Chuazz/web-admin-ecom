'use client';

import { Link } from '@components/ui';
import { routes } from '@configs/routes';
import { Button } from '@headlessui/react';
import clsx from 'clsx';
import { signOut, useSession } from 'next-auth/react';

const RootPage = () => {
	const { data } = useSession();

	return (
		<div className='h-screen flex items-center justify-center gap-4'>
			<Button
				className={clsx('bg-blue-500 rounded-md py-2 px-3 text-white cursor-pointer')}
				onClick={() => {
					signOut();
				}}
			>
				Log out
			</Button>

			<Button
				className={clsx('bg-blue-500 rounded-md py-2 px-3 text-white cursor-pointer')}
				onClick={() => {
					console.log(data);
				}}
			>
				See session
			</Button>

			<Link
				href={routes.products}
				type='redirect'
			>
				<Button className={clsx('bg-blue-500 rounded-md py-2 px-3 text-white cursor-pointer')}>
					Go to products
				</Button>
			</Link>
		</div>
	);
};

export default RootPage;
