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
		case TYPES.ADD_USER: {
			return {
				...state,
				staff: [...state.staff, action.payload],
			};
		}
		case TYPES.DELETE_USER: {
			const newData = state.staff.filter(user => user.id !== action.payload);

			return {
				...state,
				staff: newData,
			};
		}
		default:
			return state;
	}
};

export default usersReducer;
