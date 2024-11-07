import { stringify } from 'querystring';

const stringifyParams = (params?: Record<string, string | number | boolean>) => {
	return Object.keys(params || {}).length ? '?' + stringify(params) : '';
};

export { stringifyParams };
