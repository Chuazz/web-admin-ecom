'use client';

import { useSearchParams } from '@/src/hooks';
import { appendLocale } from '@/src/utils/i18n';
import { Languages } from '@configs/i18n';
import clsx from 'clsx';
import NextLink, { LinkProps } from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { stringify } from 'querystring';
import { ComponentPropsWithoutRef, PropsWithChildren, useMemo } from 'react';

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
	const { update, ...allParams } = useSearchParams();

	const pageParams = useParams<{
		lng: Languages;
	}>();

	const href = useMemo(() => {
		if (props.type === 'update') {
			return pathname + '?' + stringify({ ...allParams, ...params });
		}

		return appendLocale(pageParams.lng, props.href, params);
	}, [allParams, pageParams.lng, params, pathname, props.href, props.type]);

	return (
		<NextLink
			className={clsx('block', className)}
			href={href}
			{...props}
		>
			{children}
		</NextLink>
	);
};

export { Link };
