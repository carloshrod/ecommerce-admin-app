import { fetchData } from '@contexts/utils';
import productsReducer from './productsReducer';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { collection } from 'firebase/firestore';
import { db } from '@firebase/client';
import { PRODUCT_TYPES as TYPES } from './productActions';

const ProductsContext = createContext(undefined);

const productsCollectionRef = collection(db, 'products');

const initialState = {
	products: [],
	product: {},
};

const ProductsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(productsReducer, initialState);
	const { products, product } = state;

	const fetchProducts = async () => {
		const data = await fetchData(productsCollectionRef);
		dispatch({
			type: TYPES.GET_ALL_PRODUCTS,
			payload: data,
		});
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const data = { products, product, productDispatch: dispatch };

	return (
		<ProductsContext.Provider value={data}>{children}</ProductsContext.Provider>
	);
};

export const useProductsContext = () => useContext(ProductsContext);

export default ProductsProvider;
