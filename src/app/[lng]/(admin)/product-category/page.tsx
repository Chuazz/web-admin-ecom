'use client';

import { useState } from 'react';
import { ProductCategoryList } from './product-category-list';
import { ProductCategoryModal } from './product-category-modal';
import { ProductCategory } from '@type/data';

const ProductCategoryPage = () => {
	const [productCategory, setProductCategory] = useState<ProductCategory | undefined>();

	return (
		<>
			<ProductCategoryList onUpdate={(data) => setProductCategory(data)} />

			<ProductCategoryModal
				data={productCategory}
				onClose={() => setProductCategory(undefined)}
			/>
		</>
	);
};

export default ProductCategoryPage;
