import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

const CardHeader = (props: ComponentPropsWithoutRef<'div'>) => {
	return (
		<div
			{...props}
			className={clsx('border-b bg-slate-50 px-3 py-4', props.className)}
		>
			{props.children}
		</div>
	);
};

export { CardHeader };
