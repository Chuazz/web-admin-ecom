import { useSession } from 'next-auth/react';

const usePermission = () => {
	const { data } = useSession();

	return {
		has(permission: string) {
			return data?.user.permissions.includes(permission);
		},
	};
};

export { usePermission };
