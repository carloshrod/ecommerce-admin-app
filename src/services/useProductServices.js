import {
	collection,
	doc,
	setDoc,
	updateDoc,
	deleteDoc,
	getDoc,
} from 'firebase/firestore';
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
	const {
		pathname,
		query: { id },
		push,
	} = useRouter();
	const isProduct = pathname === PRODUCTS;

	const getOneProduct = withEnhances(async productId => {
		const docRef = doc(db, 'products', productId);
		const docSnap = await getDoc(docRef);
		dispatch({
			type: PRODUCT_TYPES.GET_ONE_PRODUCT,
			payload: docSnap.data(),
		});
	});

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

	const deleteProduct = withEnhances(
		async productIds => {
			productIds.forEach(async id => {
				await deleteFile(id, isProduct);
				await deleteDoc(doc(productsCollectionRef, id));
				dispatch({
					type: PRODUCT_TYPES.DELETE_PRODUCT,
					payload: id,
				});
			});
			if (id) push(PRODUCTS);
			toast.success(
				`${productIds.length > 1 ? 'Products' : 'Product'} deleted!`,
			);
		},
		{
			confirm: true,
			text: productIds =>
				`¿Are you sure to delete ${
					productIds.length > 1 ? 'these products' : 'this product'
				} permanently? <br> <br> <b>¡You won't be able to revert this action!</b>`,
		},
	);

	return {
		getOneProduct,
		addProduct,
		updateProduct,
		deleteProduct,
	};
};

export default useProductServices;
