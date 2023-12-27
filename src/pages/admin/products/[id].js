import Details from '@components/data/Details';
import ProductInfo from '@components/data/ProductInfo';
import DetailsActions from '@components/ui/DetailsActions';
import { useProductsContext } from '@contexts/products/ProductsContext';
import { Grid } from '@mui/material';

const ProductsDetails = () => {
	const { product } = useProductsContext();

	return (
		<Grid item xs={12}>
			<Details>
				<DetailsActions item={product} />
				<ProductInfo product={product} />
			</Details>
		</Grid>
	);
};

export default ProductsDetails;
