import { USERS_TYPES as TYPES } from './userActions';

const usersReducer = (state, action) => {
	switch (action.type) {
		case TYPES.GET_ALL_USERS: {
			const { staff, costumers } = action.payload;
			return {
				...state,
				staff,
				costumers,
			};
		}
		default:
			return state;
	}
};

export default usersReducer;
