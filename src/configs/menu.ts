import {
	ArchiveBoxIcon,
	ChartBarIcon,
	RectangleGroupIcon,
	StopIcon,
} from '@heroicons/react/24/solid';
import { Option } from '@type/index';
import { translation } from './i18n';
import { routes } from './routes';

const t = translation();

const menu: Option[] = [
	{
		code: 'dashboard',
		label: t('menu:dashboard'),
		icon: ChartBarIcon,
		href: routes.dashboard,
	},
	{
		code: 'master_data',
		label: t('menu:master_data'),
		icon: ArchiveBoxIcon,
		items: [
			{
				code: 'product-category',
				label: t('menu:product_category'),
				icon: StopIcon,
				href: routes.productCategory,
			},
		],
	},
	{
		code: 'product',
		label: t('menu:commodity_industry'),
		icon: RectangleGroupIcon,
		items: [
			{
				code: 'product_shop',
				label: t('menu:product_shop'),
				icon: StopIcon,
				href: routes.productShop,
			},
			{
				code: 'product_academy',
				label: t('menu:product_academy'),
				icon: StopIcon,
				href: routes.productAcademy,
			},
		],
	},
	{
		code: 'business',
		label: t('menu:business'),
		icon: ArchiveBoxIcon,
		items: [
			{
				code: 'customer',
				label: t('menu:customer'),
				icon: StopIcon,
				href: routes.customer,
			},
		],
	},
];

export { menu };
