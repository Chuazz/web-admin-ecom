'use client';

import { Link } from '@components/ui';
import { routes } from '@configs/routes';
import { Button } from '@headlessui/react';
import clsx from 'clsx';
import { signOut, useSession } from 'next-auth/react';

const RootPage = () => {
	const { data } = useSession();

	return (
		<div className='flex h-screen items-center justify-center gap-4'>
			<Button
				className={clsx('cursor-pointer rounded-md bg-blue-500 px-3 py-2 text-white')}
				onClick={() => {
					signOut();
				}}
			>
				Log out
			</Button>

			<Button
				className={clsx('cursor-pointer rounded-md bg-blue-500 px-3 py-2 text-white')}
				onClick={() => {
					console.log(data);
				}}
			>
				See session
			</Button>

			<Link href={routes.product}>
				<Button className={clsx('cursor-pointer rounded-md bg-blue-500 px-3 py-2 text-white')}>
					Go to products
				</Button>
			</Link>
		</div>
	);
};

export default RootPage;
