'use client';

import { appendLocale } from '@/src/utils/i18n';
import { fallbackLng, Languages } from '@configs/i18n';
import clsx from 'clsx';
import NextLink, { LinkProps } from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { stringify } from 'querystring';
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

type Props =
	| (LinkProps &
			ComponentPropsWithoutRef<'a'> &
			PropsWithChildren & {
				params?: Record<string, string>;
				type: 'redirect';
			})
	| (Omit<LinkProps, 'href'> &
			Omit<ComponentPropsWithoutRef<'a'>, 'href'> &
			PropsWithChildren & {
				params?: Record<string, string | number>;
				type: 'update';
			});

const Link = ({ params, children, className, ...props }: Props) => {
	const pathname = usePathname();

	const pageParams = useParams<{
		lng: Languages;
	}>();

	return (
		<NextLink
			className={clsx('block', className)}
			href={
				props.type === 'update'
					? pathname + '?' + stringify(params)
					: appendLocale(pageParams.lng || fallbackLng, props.href, params)
			}
			{...props}
		>
			{children}
		</NextLink>
	);
};

export { Link };
