import { request } from '@/src/utils';
import { api } from '@configs/api';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
	const response = await request({
		req: req,
		api: api.productCategory,
	});

	return Response.json(response, {
		status: response?.status,
	});
};
