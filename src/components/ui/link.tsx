'use client';

import { useSearchParams } from '@/src/hooks';
import { appendLocale } from '@/src/utils/i18n';
import { languages, Languages } from '@configs/i18n';
import clsx from 'clsx';
import NextLink, { LinkProps } from 'next/link';
import { useParams } from 'next/navigation';
import { stringify } from 'querystring';
import { ComponentPropsWithoutRef, PropsWithChildren, useMemo } from 'react';

type Props = LinkProps &
	ComponentPropsWithoutRef<'a'> &
	PropsWithChildren & {
		params?: Record<string, string>;
		keepParam?: boolean;
	};

const Link = ({ params, children, className, keepParam, href, type, ...props }: Props) => {
	const { update, ...allParams } = useSearchParams();

	const pageParams = useParams<{
		lng: Languages;
	}>();

	const newHref = useMemo(() => {
		let newParams = params;

		if (keepParam) {
			newParams = {
				...allParams,
				...params,
			};
		}

		if (languages.some((t) => href.startsWith('/' + t))) {
			return href + (Object.keys(newParams || {}).length ? '?' + stringify(newParams) : '');
		}

		return appendLocale(pageParams.lng, href, newParams);
	}, [allParams, keepParam, pageParams.lng, params, href]);

	return (
		<NextLink
			className={clsx('block', className)}
			href={newHref}
			{...props}
		>
			{children}
		</NextLink>
	);
};

export { Link };
