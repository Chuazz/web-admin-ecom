import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

const CardFooter = (props: ComponentPropsWithoutRef<'div'>) => {
	return (
		<div
			{...props}
			className={clsx('border-t bg-slate-50 px-3 py-4', props.className)}
		>
			{props.children}
		</div>
	);
};

export { CardFooter };
