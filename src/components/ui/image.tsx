import clsx from 'clsx';
import NextImage, { StaticImageData } from 'next/image';
import { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'div'> & {
	src: string | StaticImageData;
};

const Image = ({ ...props }: Props) => {
	return (
		<div
			{...props}
			className={clsx(
				'relative flex items-center justify-center overflow-hidden',
				props.className,
			)}
		>
			<NextImage
				src={props.src}
				alt=''
				fill={true}
			/>
		</div>
	);
};

export { Image };
