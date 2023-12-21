import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@firebase/client';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { deleteFile, generateImageObj } from './fileServices';
import { setProductToCreateObj, setProductToUpdateObj } from './utils';
import withEnhances from './withEnhances';
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

	const updateProduct = withEnhances(async (product, file) => {
		const { id, image } = product;
		let newProductImage = image;
		if (file) {
			deleteFile(id);
			newProductImage = await generateImageObj(file, id, isProduct);
		}
		const productToUpdate = setProductToUpdateObj(product, newProductImage);
		await updateDoc(doc(productsCollectionRef, id), productToUpdate);
		dispatch({
			type: PRODUCT_TYPES.UPDATE_PRODUCT,
			payload: productToUpdate,
		});
		toast.success('Product updated!');
	});

	const deleteProduct = withEnhances(async productIds => {});

	return {
		addProduct,
		updateProduct,
		deleteProduct,
	};
};

export default useProductServices;
