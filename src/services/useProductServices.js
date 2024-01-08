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
import { deleteFiles, generateImagesArray } from './fileServices';
import { setProductToCreateObj, setProductToUpdateObj } from './utils';
import withEnhances from './withEnhances';
import { PRODUCTS } from '@utils/routes';
import { useProductsContext } from '@contexts/products/ProductsContext';
import { PRODUCT_TYPES } from '@contexts/products/productActions';
import { useGlobalContext } from '@contexts/global/GlobalContext';

const productsCollectionRef = collection(db, 'products');

const useProductServices = () => {
	const { toggleLoader } = useGlobalContext();
	const { productDispatch } = useProductsContext();
	const {
		query: { id },
		push,
	} = useRouter();

	const getOneProduct = withEnhances(async productId => {
		const docRef = doc(db, 'products', productId);
		const docSnap = await getDoc(docRef);
		productDispatch({
			type: PRODUCT_TYPES.GET_ONE_PRODUCT,
			payload: docSnap.data(),
		});
	});

	const addProduct = withEnhances(
		async (product, files) => {
			const newProductRef = doc(productsCollectionRef);
			const { id } = newProductRef;
			const productImages =
				files?.length === 5 ? await generateImagesArray(files, id) : [];
			const productToCreate = setProductToCreateObj(product, id, productImages);
			await setDoc(newProductRef, productToCreate);
			productDispatch({
				type: PRODUCT_TYPES.ADD_PRODUCT,
				payload: productToCreate,
			});
			toast.success('Product added!');
		},
		{ loader: toggleLoader },
	);

	const updateProduct = withEnhances(
		async (product, files) => {
			const { id, images } = product;
			let newProductImages = images;
			if (files?.length === 5) {
				await deleteFiles(id);
				newProductImages = await generateImagesArray(files, id);
			}
			const productToUpdate = setProductToUpdateObj(product, newProductImages);
			await updateDoc(doc(productsCollectionRef, id), productToUpdate);
			productDispatch({
				type: PRODUCT_TYPES.UPDATE_PRODUCT,
				payload: productToUpdate,
			});
			toast.success('Product updated!');
			if (id) getOneProduct(id);
		},
		{ loader: toggleLoader },
	);

	const deleteProduct = withEnhances(
		async productIds => {
			productIds.forEach(async id => {
				await deleteDoc(doc(productsCollectionRef, id));
				productDispatch({
					type: PRODUCT_TYPES.DELETE_PRODUCT,
					payload: id,
				});
				await deleteFiles(id);
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
