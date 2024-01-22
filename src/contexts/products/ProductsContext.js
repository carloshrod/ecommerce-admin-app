import { fetchData } from '@contexts/utils';
import productsReducer from './productsReducer';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { collection } from 'firebase/firestore';
import { db } from '@firebase/client';
import { PRODUCT_TYPES as TYPES } from './productActions';

const ProductsContext = createContext(undefined);

const productsCollectionRef = collection(db, 'products');
const categoriesCollectionRef = collection(db, 'categories');
const subCategoriesCollectionRef = collection(db, 'subcategories');

const initialState = {
	products: [],
	product: {},
	categories: [],
	subCategories: [],
};

const ProductsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(productsReducer, initialState);
	const { products, product, categories, subCategories } = state;

	const fetchProducts = async () => {
		const productsData = await fetchData(productsCollectionRef);
		const categoriesData = await fetchData(categoriesCollectionRef);
		const subCategoriesData = await fetchData(subCategoriesCollectionRef);

		dispatch({
			type: TYPES.GET_ALL_PRODUCTS,
			payload: productsData,
		});

		dispatch({
			type: TYPES.GET_ALL_CATEGORIES,
			payload: { categoriesData, subCategoriesData },
		});
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const data = {
		products,
		product,
		categories,
		subCategories,
		productDispatch: dispatch,
	};

	return (
		<ProductsContext.Provider value={data}>{children}</ProductsContext.Provider>
	);
};

export const useProductsContext = () => useContext(ProductsContext);

export default ProductsProvider;
