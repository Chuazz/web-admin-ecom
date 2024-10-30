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
	schema?: 'primary' | 'blue' | 'gray' | 'red';
	leftIcon?: ForwardRefExoticComponent<
		Omit<SVGProps<SVGSVGElement>, 'ref'> & {
			title?: string;
			titleId?: string;
		} & RefAttributes<SVGSVGElement>
	>;
	content?: string;
	rounded?: boolean;
	outline?: boolean;
};

const Button = ({
	size = 'md',
	schema = 'primary',
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
			'hover:opacity-95 hover:shadow-md active:scale-90 select-none',
		];

		if (rounded) {
			wrapper.push('rounded-full');
		}

		if (!rounded) {
			wrapper.push('rounded-md');
		}

		if (size === 'md') {
			icon.push('size-5');

			wrapper.push('px-2 py-2 font-semibold');
		}

		if (schema === 'primary') {
			wrapper.push('bg-primary text-white');
		}

		if (schema === 'gray') {
			wrapper.push('bg-gray-500 text-white');
		}

		return {
			content: content.join(' '),
			icon: icon.join(' '),
			wrapper: wrapper.join(' '),
		};
	}, [rounded, schema, size]);

	return (
		<div
			{...props}
			className={clsx('flex items-center gap-1', classes.wrapper)}
		>
			{leftIcon && <LeftIcon className={classes.icon} />}

			{content ? <p className={classes.content}>{content}</p> : props.children}
		</div>
	);
};

export { Button };
