import {
	collection,
	deleteDoc,
	doc,
	serverTimestamp,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import withEnhances from './withEnhances';
import { db } from '@firebase/client';
import toast from 'react-hot-toast';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import { PRODUCT_TYPES } from '@contexts/products/productActions';
import { formatDisplayName } from './utils';
import { useProductsContext } from '@contexts/products/ProductsContext';

const categoriesCollectionRef = collection(db, 'categories');
const subCategoriesCollectionRef = collection(db, 'subcategories');

const useCategoryServices = isSub => {
	const { toggleLoader } = useGlobalContext();
	const { productDispatch } = useProductsContext();
	const collection = isSub
		? subCategoriesCollectionRef
		: categoriesCollectionRef;
	const toastMsg = isSub ? 'Subcategory' : 'Category';

	const addCategory = withEnhances(
		async category => {
			const newCategoryRef = doc(collection);
			const { id } = newCategoryRef;
			const categoryToCreate = {
				...category,
				id,
				displayName: formatDisplayName(category?.displayName),
				createdAt: serverTimestamp(),
				lastUpdate: serverTimestamp(),
			};
			await setDoc(newCategoryRef, categoryToCreate);
			productDispatch({
				type: PRODUCT_TYPES.ADD_CATEGORY,
				payload: { categoryToCreate, isSub },
			});
			toast.success(`${toastMsg} created!`);
		},
		{ loader: toggleLoader },
	);

	const updateCategory = withEnhances(
		async category => {
			const { id } = category;
			const categoryToUpdate = {
				...category,
				displayName: formatDisplayName(category?.displayName),
				lastUpdate: serverTimestamp(),
			};
			await updateDoc(doc(collection, id), categoryToUpdate);
			productDispatch({
				type: PRODUCT_TYPES.UPDATE_CATEGORY,
				payload: { categoryToUpdate, isSub },
			});
			toast.success(`${toastMsg} updated!`);
		},
		{ loader: toggleLoader },
	);

	const deleteCategory = withEnhances(
		async categoryIds => {
			categoryIds.forEach(async categoryId => {
				await deleteDoc(doc(collection, categoryId));
				productDispatch({
					type: PRODUCT_TYPES.DELETE_CATEGORY,
					payload: { categoryId, isSub },
				});
			});
			toast.success(
				`${
					categoryIds.length > 1 ? toastMsg.replace(/y/, 'ies') : toastMsg
				} deleted!`,
			);
		},
		{
			confirm: true,
			text: categoryIds => {
				return `¿Are you sure to delete ${
					categoryIds.length > 1
						? `these ${toastMsg.toLowerCase().replace(/y/, 'ies')}`
						: `this ${toastMsg.toLowerCase()}`
				} permanently? <br> <br> <b>¡You won't be able to revert this action!</b>`;
			},
		},
	);

	return { addCategory, updateCategory, deleteCategory };
};

export default useCategoryServices;
