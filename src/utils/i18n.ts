import { stringify } from 'querystring';

const appendLocale = (lng: string, url?: string, params?: Record<string, string | number>) => {
	const result =
		'/' + lng + (url || '') + (Object.keys(params || {}).length ? '?' + stringify(params) : '');

	return result;
};

export { appendLocale };
