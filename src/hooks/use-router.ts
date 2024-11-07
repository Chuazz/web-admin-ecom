import {
	useRouter as useNextRouter,
	useSearchParams as useNextSearchParams,
	usePathname,
} from 'next/navigation';
import { useMemo } from 'react';
import { stringifyParams } from '../utils';

type UpdateSearchParams<T> = {
	href: string;
	params?: Record<string, string | number | boolean>;
	update?: Record<keyof T, string>;
	action?: 'replace' | 'push';
	keepParams?: boolean;
};

const useRouter = <T>(defaultValue: T = {} as T) => {
	const router = useNextRouter();
	const pathname = usePathname();
	const searchParams = useNextSearchParams();

	const allParams = useMemo(() => {
		const result: Record<string, string> = {};

		searchParams.forEach((value, key) => {
			result[key] = value;
		});

		return { ...defaultValue, ...result };
	}, [defaultValue, searchParams]);

	return {
		...allParams,
		router: {
			refresh: router.refresh,
			back: router.back,
			forward: router.forward,
			prefetch: router.prefetch,
			redirect: ({
				update,
				params,
				action = 'push',
				keepParams,
				href,
			}: UpdateSearchParams<T>) => {
				const urlSearchParams = new URLSearchParams(searchParams.toString());
				const previousParams: Record<string, string> = {};
				let finalParams = params;

				urlSearchParams.forEach((value, key) => {
					previousParams[key] = value;
				});

				if (update) {
					Object.keys(update).forEach((key) => {
						const value = update[key as keyof T];

						if (value) {
							previousParams[key] = value;
						} else {
							delete previousParams[key];
						}
					});
				}

				if (keepParams) {
					finalParams = {
						...previousParams,
						...params,
					};
				}

				if (update) {
					router?.[action]?.(pathname + stringifyParams(finalParams));

					return;
				}

				router?.[action]?.(href + stringifyParams(finalParams));
			},
		},
	};
};

export { useRouter };
