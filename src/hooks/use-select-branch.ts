import { api } from '@configs/api';
import { env } from '@configs/env';
import { useMutation } from '@tanstack/react-query';
import { Response, SelectBranchResponse } from '@type/index';
import { request } from '../utils';

const useSelectBranch = () => {
	return useMutation<Response<SelectBranchResponse> | null, Response, void>({
		mutationFn: async () => {
			const response = await request<SelectBranchResponse>({
				api: api.selectBranch,
				options: {
					method: 'POST',
					body: {
						branch_id: env.ECOM_BRAND_ID,
						site: 'admin',
						is_get_company_info: true,
						is_get_permissions: true,
					},
				},
			});

			return response;
		},
	});
};

export { useSelectBranch };
