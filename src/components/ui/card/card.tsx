import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import { CardFooter } from './card-footer';
import { CardHeader } from './card-header';
import { CardBody } from './card-body';

const Card = (props: ComponentPropsWithoutRef<'div'>) => {
	return (
		<div
			{...props}
			className={clsx('overflow-hidden rounded-lg border bg-white shadow-md', props.className)}
		>
			{props.children}
		</div>
	);
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export { Card };
