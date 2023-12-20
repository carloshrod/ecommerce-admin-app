import { collection, doc, setDoc } from 'firebase/firestore';
import { generateImageObj } from './fileServices';
import { setProductToCreateObj } from './utils';
import withEnhances from './withEnhances';
import { db } from '@firebase/client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { PRODUCTS } from '@utils/routes';
import { useProductsContext } from '@contexts/products/ProductsContext';
import { PRODUCT_TYPES } from '@contexts/products/productActions';

const productsCollectionRef = collection(db, 'products');

const useProductServices = () => {
	const { dispatch } = useProductsContext();
	const { pathname } = useRouter();
	const isProduct = pathname === PRODUCTS;

	const addProduct = withEnhances(async (product, file) => {
		const newProductRef = doc(productsCollectionRef);
		const { id } = newProductRef;
		const productImage = file
			? await generateImageObj(file, id, isProduct)
			: {};
		const productToCreate = setProductToCreateObj(product, id, productImage);
		await setDoc(newProductRef, productToCreate);
		dispatch({
			type: PRODUCT_TYPES.ADD_PRODUCT,
			payload: productToCreate,
		});
		toast.success('Product added!');
	});

	const updateProduct = withEnhances(async (product, file) => {});

	const deleteProduct = withEnhances(async productIds => {});

	return {
		addProduct,
		updateProduct,
		deleteProduct,
	};
};

export default useProductServices;
