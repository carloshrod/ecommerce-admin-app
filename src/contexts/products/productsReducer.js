import { PRODUCT_TYPES as TYPES } from './productActions';

const productsReducer = (state, action) => {
	switch (action.type) {
		case TYPES.GET_ALL_PRODUCTS: {
			return {
				...state,
				products: action.payload,
			};
		}
		default:
			return state;
	}
};

export default productsReducer;
