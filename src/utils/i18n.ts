import { stringifyParams } from './navigate';

const appendLocale = (lng: string, url?: string, params?: Record<string, string | number>) => {
	const result = '/' + lng + (url || '') + stringifyParams(params);

	return result;
};

export { appendLocale };
