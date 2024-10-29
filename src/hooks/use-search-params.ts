import { useSearchParams as useNextSearchParams, usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

type UpdateSearchParams<T> = {
	name: keyof T;
	value: string;
	action?: 'replace' | 'push';
};

const useSearchParams = <T>(defaultValue: T = {} as T) => {
	const router = useRouter();
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
		update: ({ name, value, action = 'push' }: UpdateSearchParams<T>) => {
			const params = new URLSearchParams(searchParams.toString());

			if (value.toString()) {
				params.set(name.toString(), value.toString());
			} else {
				params.delete(name.toString());
			}

			router?.[action]?.(pathname + '?' + params.toString());
		},
	};
};

export { useSearchParams };
