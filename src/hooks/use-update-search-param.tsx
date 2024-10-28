import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useUpdateSearchParams = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	return {
		updateSearchParams: (name: string, value: string | number) => {
			const params = new URLSearchParams(searchParams.toString());

			params.set(name, value.toString());

			router.push(pathname + '?' + params.toString());
		},
	};
};

export { useUpdateSearchParams };
