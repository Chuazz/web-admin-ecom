'use client';

import { useRouter } from '@/src/hooks/use-router';
import { Link } from '@components/ui';
import { translation } from '@configs/i18n';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

const BreadCrumb = () => {
	const t = translation();
	const paths = usePathname()
		.split('/')
		.filter((t) => !!t);

	const { menu } = useRouter({
		menu: '',
	});

	return (
		<div className='flex items-center justify-between pb-6'>
			<p className='text-2xl font-semibold text-gray-700'>{t(`menu:${menu}`)}</p>

			<div className='flex items-center gap-2'>
				{paths.map((path, index) => (
					<Fragment key={path}>
						{!!index && <p>/</p>}

						<Link
							keepParam={true}
							href={'/' + path}
						>
							{t(`menu:${path.replaceAll('-', '_')}`)}
						</Link>
					</Fragment>
				))}
			</div>
		</div>
	);
};

export { BreadCrumb };
