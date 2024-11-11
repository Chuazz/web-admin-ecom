import { request } from '@/src/utils';
import { api } from '@configs/api';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
	const data = await req.json();

	const response = await request({
		api: api.selectBranch,
		req,
		options: {
			method: 'POST',
			body: data,
		},
	});

	return Response.json(response, {
		status: response?.status,
	});
};
