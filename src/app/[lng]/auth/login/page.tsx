'use client';

import { useLogin } from '@/src/hooks';
import { Login, loginWithEmailSchema, loginWithPhoneNumberSchema } from '@/src/schemas';
import { InputText } from '@components/form';
import { Link, Loading } from '@components/ui';
import { translation } from '@configs/i18n';
import { Button } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Page } from '@type/common';
import clsx from 'clsx';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

const LoginPage = ({ searchParams }: Page) => {
	const t = translation();
	const loginMutate = useLogin();

	const loginWithPhoneNumber = useMemo(
		() => searchParams.method === 'phone_number',
		[searchParams.method],
	);

	const { control, handleSubmit } = useForm<Login>({
		defaultValues: {
			email: 'linhdtp71@gmail.com',
			phone_number: '0394101088',
			password: '11111111',
		},
		resolver: zodResolver(
			loginWithPhoneNumber ? loginWithPhoneNumberSchema : loginWithEmailSchema,
		),
	});

	const onSubmit = async (data: Login) => {
		loginMutate.mutate(data);
	};

	return (
		<div className='flex min-h-screen items-center justify-center bg-slate-100'>
			<div className='relative w-96 overflow-hidden rounded-lg bg-white shadow-lg'>
				<Loading show={loginMutate.isPending} />

				<div className='h-[3px] bg-blue-500' />

				<div className='flex flex-col gap-4 py-4'>
					<p className='text-center text-2xl font-bold'>{t('info:name')}</p>

					<div className='border border-gray-200' />

					<p className='px-4 text-center font-semibold text-gray-500'>
						{t('auth:login_to_continue')}
					</p>
				</div>

				<div className='px-4 pb-4'>
					{loginWithPhoneNumber && (
						<Controller
							control={control}
							name={'phone_number'}
							render={({ field, fieldState }) => (
								<InputText
									value={field.value}
									placeholder={t('auth:phone_number')}
									message={fieldState.error?.message}
									onChange={field.onChange}
								/>
							)}
						/>
					)}

					{!loginWithPhoneNumber && (
						<Controller
							control={control}
							name={'email'}
							render={({ field, fieldState }) => (
								<InputText
									value={field.value}
									placeholder={t('auth:email')}
									message={fieldState.error?.message}
									onChange={field.onChange}
								/>
							)}
						/>
					)}

					<div className='py-2'>
						<Controller
							control={control}
							name='password'
							render={({ field, fieldState }) => (
								<InputText
									value={field.value}
									placeholder={t('auth:password')}
									message={fieldState.error?.message}
									password={true}
									onChange={field.onChange}
								/>
							)}
						/>
					</div>

					<Link
						type='update'
						className='font-medium text-blue-500'
						replace={true}
						params={{
							method: loginWithPhoneNumber ? 'email' : 'phone_number',
						}}
					>
						{searchParams.method === 'phone_number'
							? t('auth:login_with_email')
							: t('auth:login_with_phone_number')}
					</Link>

					<Button
						className={clsx(
							'mt-6 w-full rounded-md bg-blue-500 py-2 text-center text-white',
							'cursor-pointer hover:bg-blue-600',
						)}
						onClick={handleSubmit(onSubmit)}
					>
						{t('auth:login')}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
