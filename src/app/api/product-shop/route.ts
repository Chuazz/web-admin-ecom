import { request } from '@/src/utils';
import { api } from '@configs/api';
import { Product } from '@type/data';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
	const response = await request<Product[]>({
		req: req,
		api: api.productShop,
	});

	return Response.json(response, {
		status: response?.status,
	});
};
