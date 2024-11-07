'use client';

import { Page } from '@type/common';
import { useParams } from 'next/navigation';

const ProductCategoryForm = () => {
	const { id } = useParams<Page['params']>();

	return <>Your ID is: {id}</>;
};

export { ProductCategoryForm };
