'use client';

import { Button } from '@components/ui';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ProductCategory } from '@type/data';

type Props = {
	data: ProductCategory | undefined;
	onClose: () => void;
};

const ProductCategoryModal = ({ data, onClose }: Props) => {
	return (
		<Dialog
			open={!!data}
			as='div'
			className='relative z-50 focus:outline-none'
			onClose={onClose}
		>
			<DialogBackdrop className='fixed inset-0 bg-black/30' />

			<div className='fixed inset-0 z-50 w-screen overflow-y-auto'>
				<div className='flex min-h-full items-center justify-center p-4'>
					<DialogPanel
						transition={true}
						className='data-[closed]:transform-[scale(95%)] w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0'
					>
						<div className='flex items-center'>
							<DialogTitle
								as='h3'
								className='flex-1 text-base/7 font-medium'
							>
								{data?.name}
							</DialogTitle>

							<Button
								leftIcon={XMarkIcon}
								schema='gray'
								rounded={true}
								onClick={onClose}
							/>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

export { ProductCategoryModal };
