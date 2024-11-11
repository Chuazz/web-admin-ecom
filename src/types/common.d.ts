import { Languages } from '@configs/i18n';
import { ForwardRefExoticComponent, ReactNode, RefAttributes, SVGProps } from 'react';

export type Option = {
	code: string;
	label?: string;
	href?: string;
	icon?: ForwardRefExoticComponent<
		Omit<SVGProps<SVGSVGElement>, 'ref'> & {
			title?: string;
			titleId?: string;
		} & RefAttributes<SVGSVGElement>
	>;
	items?: Option[];
	action?: () => void;
};

export type Page<TParam = Record<string, string>, TSParams = Record<string, string>> = {
	params: Record<string, string> &
		TParam & {
			lng: Languages;
		};
	searchParams: TSParams;
};

export type Layout = Page & {
	children: ReactNode;
};
