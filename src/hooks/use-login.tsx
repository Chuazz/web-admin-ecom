import { api } from '@configs/api';
import { useMutation } from '@tanstack/react-query';
import { LoginResponse } from '@type/auth';
import { Page } from '@type/common';
import { Response } from '@type/request';
import { signIn, useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Login } from '../schemas/login-schema';
import { appendLocale } from '../utils';
import { clientRequest } from '../utils/request';
import { useSelectBranch } from './use-select-branch';

const useLogin = () => {
	const param = useParams<Page['params']>();
	const selectBranchMutate = useSelectBranch();
	const { update } = useSession();
	const router = useRouter();

	return useMutation<Response<LoginResponse> | null, Response, Login>({
		mutationFn: async (data) => {
			const response = await clientRequest<LoginResponse>({
				api: api.login,
				options: {
					method: 'POST',
					body: data,
				},
			});

			return response;
		},
		async onSuccess(response) {
			await signIn('credentials', {
				redirect: false,
				accessToken: response?.data?.access_token,
			});

			const branch = await selectBranchMutate.mutateAsync();

			await update({
				branchToken: branch?.data?.branch_token,
				profile: branch?.data?.user,
				roles: branch?.data?.roles,
				permissions: branch?.data?.permissions,
				company_info: branch?.data?.company_info,
			});

			router.replace(appendLocale(param.lng));
		},
		onError(error) {
			toast.error(error.message);
		},
	});
};

export { useLogin };
