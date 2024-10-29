import { auth } from '@/auth';
import { env } from '@configs/env';
import { isServer } from '@tanstack/react-query';
import { Response } from '@type/request';
import { Session } from 'next-auth';
import { NextRequest } from 'next/server';
import { stringify } from 'querystring';
import toast from 'react-hot-toast';

type Request = {
	api: string;
	session?: Session | null;
	options?: {
		method?: 'POST' | 'GET' | 'DELETE' | 'PUT';
		params?: Record<string, string | number | boolean>;
		body?: object;
	};
};

type ServerRequest = Omit<Request, 'options'> & {
	options?: Omit<Request['options'], 'params'>;
	req: NextRequest;
};

type ClientRequest = Omit<Request, 'session'>;

const request = async <T>({ api, options: _options, session }: Request) => {
	const options: RequestInit = {
		method: _options?.method || 'GET',
		body: _options?.body ? JSON.stringify(_options.body) : undefined,
		headers: {
			withCredentials: 'true',
			credentials: 'include',
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + session?.user.access_token,
		},
	};

	const params =
		_options?.params && Object.keys(_options.params).length
			? '?' + stringify(_options?.params)
			: '';

	const response = await fetch(api + params, options);

	let data: Response<T> | null = null;
	try {
		data = await response.json();
	} catch (_error) {
		data = null;
	}

	if (!response.ok && response.statusText) {
		data = {
			status: response.status,
			message: response.statusText,
			data: null,
			meta: null,
			success: false,
		};
	}

	return { data, response };
};

const serverRequest = async <T = unknown>(props: ServerRequest): Promise<Response<T> | null> => {
	const session = await auth();

	const params: Record<string, string> = {};

	let url = env.ECOM_BASE_URL + props.api;

	if (props.api.includes('https://') || props.api.includes('http://')) {
		url = props.api;
	}

	props?.req?.nextUrl?.searchParams.forEach((value, key) => {
		params[key] = value;
	});

	const result = await request<T>({
		session,
		api: url,
		options: {
			...props.options,
			params,
		},
	});

	return result.data;
};

const clientRequest = async <T = unknown>(props: ClientRequest): Promise<Response<T> | null> => {
	if (isServer) {
		return null;
	}

	let url = env.BASE_API_URL + props.api;

	if (props.api.includes('https://') || props.api.includes('http://')) {
		url = props.api;
	}

	const result = await request<T>({
		...props,
		api: url,
	});

	if (!result.response.ok && result?.data?.message) {
		toast.error(result.data.message);

		// await signOut({
		// 	redirect: true,
		// });
	}

	return result.data;
};

export { clientRequest, serverRequest };
