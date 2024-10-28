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
				href: routes.products,
			},
		],
	},
];

export { menu };
