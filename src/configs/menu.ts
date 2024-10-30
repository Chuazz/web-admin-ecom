import { ArchiveBoxIcon, StopIcon } from '@heroicons/react/24/solid';
import { Option } from '@type/index';
import { translation } from './i18n';
import { routes } from './routes';

const t = translation();

const menu: Option[] = [
	{
		code: 'master_data',
		label: t('menu:master_data'),
		icon: ArchiveBoxIcon,
		items: [
			{
				code: 'product',
				label: t('module:product'),
				icon: StopIcon,
				href: routes.product,
			},
			{
				code: 'product-category',
				label: t('module:product_category'),
				icon: StopIcon,
				href: routes.productCategory,
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
				label: t('module:customer'),
				icon: StopIcon,
				href: routes.customer,
			},
		],
	},
];

export { menu };
