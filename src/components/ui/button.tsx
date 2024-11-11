import clsx from 'clsx';
import {
	ComponentPropsWithoutRef,
	ForwardRefExoticComponent,
	RefAttributes,
	SVGProps,
	useMemo,
} from 'react';

type Props = ComponentPropsWithoutRef<'div'> & {
	size?: 'md' | 'lg';
	schema?: 'primary' | 'blue' | 'gray' | 'red' | 'black';
	leftIcon?: ForwardRefExoticComponent<
		Omit<SVGProps<SVGSVGElement>, 'ref'> & {
			title?: string;
			titleId?: string;
		} & RefAttributes<SVGSVGElement>
	>;
	content?: string;
	rounded?: boolean;
	outline?: boolean;
	filled?: boolean;
};

const Button = ({
	size = 'md',
	schema = 'primary',
	filled = true,
	leftIcon,
	content,
	rounded,
	outline,
	...props
}: Props) => {
	const LeftIcon = leftIcon ? leftIcon : () => null;

	const classes = useMemo(() => {
		const content: string[] = [];
		const icon: string[] = [];

		const wrapper: string[] = [
			'cursor-pointer transition-all duration-200 hover:scale-105',
			'hover:opacity-95 hover:shadow-md active:scale-95 select-none',
		];

		if (rounded) {
			wrapper.push('rounded-full');
		}

		if (!rounded) {
			wrapper.push('rounded-md');
		}

		if (size === 'md') {
			icon.push('size-5');

			wrapper.push('px-2 py-2');
		}

		if (schema === 'primary') {
			if (filled) {
				wrapper.push('bg-primary text-white');
			} else {
				wrapper.push('text-primary');
				wrapper.push('hover:text-white hover:bg-primary');
			}
		}

		if (schema === 'gray') {
			if (filled) {
				wrapper.push('bg-gray-500 text-white');
			} else {
				wrapper.push('text-gray-500');
			}
		}

		if (schema === 'blue') {
			if (filled) {
				wrapper.push('bg-blue-500 text-white');
			} else {
				wrapper.push('text-blue-500');
				wrapper.push('hover:text-white hover:bg-blue-500');
			}
		}

		if (schema === 'red') {
			if (filled) {
				wrapper.push('bg-red-500 text-white');
			} else {
				wrapper.push('text-red-500');
				wrapper.push('hover:text-white hover:bg-red-500');
			}
		}

		if (schema === 'black') {
			if (filled) {
				wrapper.push('bg-black text-white');
			} else {
				wrapper.push('text-black');
			}
		}

		return {
			content: content.join(' '),
			icon: icon.join(' '),
			wrapper: wrapper.join(' '),
		};
	}, [filled, rounded, schema, size]);

	return (
		<div
			{...props}
			className={clsx('flex items-center gap-1', classes.wrapper, props.className)}
		>
			{leftIcon && <LeftIcon className={classes.icon} />}

			{content ? <p className={classes.content}>{content}</p> : props.children}
		</div>
	);
};

export { Button };
