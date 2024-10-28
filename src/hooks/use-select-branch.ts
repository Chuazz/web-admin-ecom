import { api } from '@configs/api';
import { useMutation } from '@tanstack/react-query';
import { Response, SelectBranchResponse } from '@type/index';
import { clientRequest } from '../utils';
import { env } from '@configs/env';

const useSelectBranch = () => {
	return useMutation<Response<SelectBranchResponse> | null, Response, void>({
		mutationFn: async () => {
			const response = await clientRequest<SelectBranchResponse>({
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
