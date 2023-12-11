import { useRouter } from 'next/router';
import React from 'react';

const ProductsDetails = () => {
	const {
		query: { id },
	} = useRouter();
	return <div>Product: {id}</div>;
};

export default ProductsDetails;
