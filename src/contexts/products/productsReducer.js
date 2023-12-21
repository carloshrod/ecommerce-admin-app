import { PRODUCT_TYPES as TYPES } from './productActions';

const productsReducer = (state, action) => {
	switch (action.type) {
		case TYPES.GET_ALL_PRODUCTS: {
			return {
				...state,
				products: action.payload,
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

		default:
			return state;
	}
};

export default productsReducer;
