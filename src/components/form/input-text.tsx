'use client';

import { Description, Field, Input, Label } from '@headlessui/react';
import clsx from 'clsx';
import { FormEvent, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Props = {
	label?: string;
	placeholder?: string;
	value?: string;
	message?: string;
	password?: boolean;
	debounce?: boolean;
	onChange?: (value: string) => void;
};

const InputText = ({ label, placeholder, value, password, message, debounce, onChange }: Props) => {
	const handleOnChange = useCallback(
		(e: FormEvent<HTMLInputElement>) => {
			const target = e.target as HTMLInputElement;

			onChange?.(target.value);
		},
		[onChange],
	);

	const debounceOnChange = useDebouncedCallback((e: FormEvent<HTMLInputElement>) => {
		handleOnChange(e);
	}, 600);

	return (
		<Field>
			{label && <Label className='font-medium'>{label}</Label>}

			<Input
				placeholder={placeholder}
				value={value}
				type={password ? 'password' : 'text'}
				className={clsx(
					'mt-1 block w-full rounded-md border border-gray-300 px-3 py-2',
					'data-[focus]:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25',
				)}
				onChange={(e) => {
					if (debounce) {
						debounceOnChange(e);

						return;
					}

					handleOnChange(e);
				}}
			/>

			{message && (
				<Description className='mt-1 text-xs font-semibold text-red-400'>{message}</Description>
			)}
		</Field>
	);
};

export { InputText };
