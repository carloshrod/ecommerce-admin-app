import { PRODUCT_TYPES as TYPES } from './productActions';

const productsReducer = (state, action) => {
	switch (action.type) {
		case TYPES.GET_ALL_PRODUCTS: {
			return {
				...state,
				products: action.payload,
			};
		}

		case TYPES.GET_ONE_PRODUCT: {
			return {
				...state,
				product: action.payload,
			};
		}

		case TYPES.ADD_PRODUCT: {
			return {
				...state,
				products: [...state.products, action.payload],
			};
		}

		case TYPES.UPDATE_PRODUCT: {
			const productUpdated = action.payload;
			const newData = state.products.map(product =>
				product?.id === productUpdated.id ? productUpdated : product,
			);

			return {
				...state,
				products: newData,
			};
		}

		case TYPES.DELETE_PRODUCT: {
			const productId = action.payload;
			const newData = state.products.filter(
				product => product?.id !== productId,
			);

			return {
				...state,
				products: newData,
			};
		}

		case TYPES.GET_ALL_CATEGORIES: {
			const { categoriesData, subCategoriesData } = action.payload;

			return {
				...state,
				categories: categoriesData,
				subCategories: subCategoriesData,
			};
		}

		case TYPES.ADD_CATEGORY: {
			const { categoryToCreate, isSub } = action.payload;

			if (isSub) {
				return {
					...state,
					subCategories: [...state.subCategories, categoryToCreate],
				};
			}

			return {
				...state,
				categories: [...state.categories, categoryToCreate],
			};
		}

		case TYPES.UPDATE_CATEGORY: {
			const { categoryToUpdate, isSub } = action.payload;
			const db = isSub ? state.subCategories : state.categories;
			const newData = db.map(category =>
				category?.id === categoryToUpdate?.id ? categoryToUpdate : category,
			);

			if (isSub) {
				return {
					...state,
					subCategories: newData,
				};
			}

			return {
				...state,
				categories: newData,
			};
		}

		case TYPES.DELETE_CATEGORY: {
			const { categoryId, isSub } = action.payload;
			const db = isSub ? state.subCategories : state.categories;
			const newData = db.filter(category => category.id !== categoryId);

			if (isSub) {
				return {
					...state,
					subCategories: newData,
				};
			}

			return {
				...state,
				categories: newData,
			};
		}

		default:
			return state;
	}
};

export default productsReducer;
