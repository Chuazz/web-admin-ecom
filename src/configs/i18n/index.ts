import { cookies } from '@configs/cookies';
import { getCookie } from 'cookies-next';
import { createInstance, type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

// import enAuth from './en/auth.json';
// import enCommon from './en/common.json';
// import enInfo from './en/info.json';
// import enMenu from './en/menu.json';

import viAuth from './vi/auth.json';
import viCommon from './vi/common.json';
import viInfo from './vi/info.json';
import viMenu from './vi/menu.json';
import viModule from './vi/module.json';

const fallbackLng = 'vi';
const languages = [fallbackLng];
const fallbackNs = 'common';

type Languages = 'vi';
type LanguageResource = 'common' | 'info' | 'auth' | 'menu' | 'module';

const resources: Record<Languages, Record<LanguageResource, unknown>> = {
	// en: {
	// 	common: enCommon,
	// 	info: enInfo,
	// 	auth: enAuth,
	// 	menu: enMenu,
	// },
	vi: {
		common: viCommon,
		info: viInfo,
		auth: viAuth,
		menu: viMenu,
		module: viModule,
	},
};

const translation = () => {
	const i18nInstance = createInstance();
	const lng = getCookie(cookies.i18n);

	i18nInstance.use(initReactI18next).init({
		resources: resources as Resource,
		fallbackLng,
		lng: fallbackLng,
		interpolation: {
			escapeValue: false,
		},
	});

	return i18nInstance.getFixedT(lng as string, fallbackNs);
};

export { fallbackLng, fallbackNs, languages, translation };
export type { LanguageResource, Languages };
