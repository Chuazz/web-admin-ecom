import { auth } from '@/auth';
import { env } from '@configs/env';
import { isServer } from '@tanstack/react-query';
import { Response } from '@type/request';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { NextRequest } from 'next/server';
import { stringify } from 'querystring';
import toast from 'react-hot-toast';

type Request = {
	api: string;
	session?: Session | null;
	options?: {
		method?: 'POST' | 'GET' | 'DELETE' | 'PUT';
		params?: Record<string, string | number | boolean | null>;
		body?: object;
	};
	req?: NextRequest;
};

const handleRequest = async <T>({ api, options: _options, session }: Request) => {
	const options: RequestInit = {
		method: _options?.method || 'GET',
		body: _options?.body ? JSON.stringify(_options.body) : undefined,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(_options?.method && { withCredentials: 'true', credentials: 'include' }),
			...(session?.user.access_token && {
				Authorization: 'Bearer ' + session.user.access_token,
			}),
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

const request = async <T = unknown>(props: Request): Promise<Response<T> | null> => {
	let session: Session | null = null;

	if (isServer) {
		session = await auth();
	} else {
		session = await getSession();
	}

	const params: Record<string, string | number | boolean | null> = props?.options?.params || {};

	let url = (isServer ? env.ECOM_BASE_URL : env.BASE_API_URL) + props.api;

	if (props.api.includes('https://') || props.api.includes('http://')) {
		url = props.api;
	}

	if (isServer) {
		props?.req?.nextUrl?.searchParams.forEach((value, key) => {
			params[key] = value;
		});
	}

	const result = await handleRequest<T>({
		session,
		api: url,
		options: {
			...props.options,
			params,
		},
	});

	if (!isServer && !result.response.ok && result?.data?.message) {
		if (props.options?.method === 'GET') {
			toast.error(result.data.message);

			return null;
		}

		throw result.data;
	}

	return result.data;
};

export { request };
