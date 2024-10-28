import { Description, Field, Input, Label } from '@headlessui/react';
import clsx from 'clsx';

type InputTextProps = {
	label?: string;
	placeholder?: string;
	value?: string;
	message?: string;
	password?: boolean;
	onChange?: (value: string) => void;
};

const InputText = ({ label, placeholder, value, password, message, onChange }: InputTextProps) => {
	return (
		<Field>
			{label && <Label className='text-sm/6 font-medium'>{label}</Label>}

			<Input
				placeholder={placeholder}
				value={value}
				type={password ? 'password' : 'text'}
				onInput={(e) => {
					const target = e.target as HTMLInputElement;

					onChange?.(target.value);
				}}
				className={clsx(
					'mt-1 block w-full rounded-md border border-gray-300 py-1.5 px-3 text-sm/6',
					'focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25',
				)}
			/>

			{message && (
				<Description className='text-xs mt-1 font-semibold text-red-400'>{message}</Description>
			)}
		</Field>
	);
};

export { InputText };
