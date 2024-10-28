'use client';

import clsx from 'clsx';
import styles from './loading.module.css';

type LoadingProps = {
	show: boolean;
	size?: number;
	lineSize?: number;
	onTop?: boolean;
};

const Loading = ({ size = 64, show = true, lineSize = 5, onTop }: LoadingProps) => {
	return (
		show && (
			<div
				className={clsx(
					'bg-black/60',
					onTop ? 'fixed' : 'absolute',
					'top-0 left-0 right-0 bottom-0 z-50',
				)}
			>
				<div
					className={clsx(styles.loader)}
					style={{ width: size, height: size }}
				>
					<div
						className={clsx(styles.inner, styles.one)}
						style={{ borderBottom: `${lineSize}px solid #efeffa` }}
					/>
					<div
						className={clsx(styles.inner, styles.two)}
						style={{ borderRight: `${lineSize}px solid #efeffa` }}
					/>
					<div
						className={clsx(styles.inner, styles.three)}
						style={{ borderTop: `${lineSize}px solid #efeffa` }}
					/>
				</div>
			</div>
		)
	);
};

export { Loading };
