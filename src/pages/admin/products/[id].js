import Details from '@components/data/Details';
import ProductInfo from '@components/data/ProductInfo';
import DetailsActions from '@components/ui/DetailsActions';
import { useProductsContext } from '@contexts/products/ProductsContext';
import { Grid } from '@mui/material';
import withUserRoleCheck from '@pages/_withUserRoleCheck';

const ProductsDetails = () => {
	const { product } = useProductsContext();

	return (
		<Grid item xs={12}>
			<Details data={product}>
				<DetailsActions item={product} />
				<ProductInfo product={product} />
			</Details>
		</Grid>
	);
};

export default withUserRoleCheck(ProductsDetails, [
	'admin',
	'products_manager',
]);
