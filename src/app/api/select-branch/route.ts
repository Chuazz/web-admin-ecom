import { serverRequest } from '@/src/utils';
import { api } from '@configs/api';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
	const data = await req.json();

	const response = await serverRequest({
		api: api.selectBranch,
		req,
		options: {
			method: 'POST',
			body: data,
		},
	});

	return Response.json(response);
};
