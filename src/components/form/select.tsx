import { Button } from '@components/ui';
import {
	Description,
	Field,
	Label,
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { Fragment, ReactNode } from 'react';

type Props<T> = {
	label?: string;
	placeholder?: string;
	value?: T;
	data: T[];
	valueId?: keyof T | ({} & string);
	valueLabel?: keyof T | ({} & string);
	renderItem?: (data: T, focus: boolean, selected: boolean) => ReactNode;
	message?: string;
	onChange?: (value: T) => void;
};

const Select = <T,>({
	label,
	message,
	placeholder,
	value,
	data = [],
	valueId = 'id',
	valueLabel = 'name',
	renderItem,
	onChange,
}: Props<T>) => {
	return (
		<Field>
			{label && <Label className='font-medium'>{label}</Label>}

			<Listbox
				value={value}
				onChange={onChange}
			>
				<ListboxButton
					className={clsx(
						'mt-1 block w-full rounded-md border border-gray-300 px-3 py-2',
						'data-[open]:outline-none data-[open]:outline-1 data-[open]:-outline-offset-2 data-[open]:outline-black/25',
						'flex items-center gap-2 text-left',
					)}
				>
					{value ? (
						<p className='flex-1'></p>
					) : (
						<p
							className={clsx('flex-1 text-gray-400', {
								'text-transparent': !placeholder,
							})}
						>
							{placeholder || 'temp'}
						</p>
					)}

					<ChevronDownIcon
						className='size-4'
						aria-hidden='true'
					/>
				</ListboxButton>

				<ListboxOptions
					anchor='bottom'
					transition
					className={clsx(
						'w-[var(--button-width)] rounded-md border shadow-xl focus:outline-none',
						'bg-white transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
						{
							'px-3 py-1': !!valueLabel,
						},
					)}
				>
					{data.map((item) => (
						<ListboxOption
							key={String(item?.[valueId as keyof T])}
							value={item}
							as={Fragment}
						>
							{({ focus, selected }) => (
								<>
									{valueLabel ? (
										<Button
											schema='black'
											filled={false}
											content={String(item?.[valueLabel as keyof T])}
										/>
									) : (
										renderItem?.(item, focus, selected)
									)}
								</>
							)}
						</ListboxOption>
					))}
				</ListboxOptions>
			</Listbox>

			{message && (
				<Description className='mt-1 text-xs font-semibold text-red-400'>{message}</Description>
			)}
		</Field>
	);
};

export { Select };
