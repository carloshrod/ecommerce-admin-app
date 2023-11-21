import DataTable from '@components/data/DataTable';
import { useProductsContext } from '@contexts/products/ProductsContext';
import { Grid } from '@mui/material';

const Products = () => {
	const { products } = useProductsContext();

	return (
		<Grid item xs={12}>
			<DataTable products={products} />
		</Grid>
	);
};

export default Products;
