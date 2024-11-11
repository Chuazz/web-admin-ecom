import { request } from '@/src/utils';
import { api } from '@configs/api';
import { env } from '@configs/env';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
	const data = await req.json();

	const response = await request({
		api: `${env.BASE_AUTH_URL}${api.login}`,
		req,
		options: {
			method: 'POST',
			body: data,
		},
	});

	return Response.json(response);
};
