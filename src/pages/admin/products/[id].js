import { useProductsContext } from '@contexts/products/ProductsContext';
import { Avatar, Grid } from '@mui/material';
import useProductServices from '@services/useProductServices';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const ProductsDetails = () => {
	const { product } = useProductsContext();
	const { getOneProduct } = useProductServices();
	const {
		query: { id },
	} = useRouter();

	useEffect(() => {
		if (id) {
			getOneProduct(id);
		}
	}, [id]);

	return (
		<Grid item xs={12}>
			<h4>{product?.displayName}</h4>
			<Avatar
				src={product?.image?.url}
				variant='square'
				sx={{
					width: { xs: 120, sm: 150 },
					height: { xs: 120, sm: 150 },
					mt: 1,
					borderRadius: 2,
				}}
			/>
		</Grid>
	);
};

export default ProductsDetails;
