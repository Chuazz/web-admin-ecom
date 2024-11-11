'use client';

import { Page } from '@type/common';
import { useParams } from 'next/navigation';

const ProductForm = () => {
	const { id } = useParams<Page['params']>();

	return <>Your Product ID is: {id}</>;
};

export { ProductForm };
