import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

const CardBody = (props: ComponentPropsWithoutRef<'div'>) => {
	return (
		<div
			{...props}
			className={clsx('flex flex-col gap-5 px-3 py-5', props.className)}
		>
			{props.children}
		</div>
	);
};

export { CardBody };
