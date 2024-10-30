import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';
import { useCallback, useEffect, useState } from 'react';

const useCookies = () => {
	const [client, setClient] = useState(false);

	useEffect(() => {
		setClient(true);
	}, []);

	const get = useCallback(
		<T = unknown>(key: string) => {
			if (!client) {
				return null;
			}

			try {
				const result = getCookie(key)?.toString();

				if (!result) {
					return null;
				}

				return JSON.parse(result) as T;
			} catch (_error) {
				return null;
			}
		},
		[client],
	);

	const set = useCallback(
		(key: string, value: string | boolean | number | object | null, options?: OptionsType) => {
			setCookie(key, JSON.stringify(value), options);
		},
		[],
	);

	const has = useCallback((key: string) => {
		return hasCookie(key);
	}, []);

	const remove = useCallback((key: string) => {
		deleteCookie(key);
	}, []);

	return {
		get,
		set,
		has,
		remove,
	};
};

export { useCookies };
