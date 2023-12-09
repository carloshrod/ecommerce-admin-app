import { USER_TYPES as TYPES } from './userActions';

const usersReducer = (state, action) => {
	switch (action.type) {
		case TYPES.GET_ALL_USERS: {
			const { staff, customers } = action.payload;
			return {
				...state,
				staff,
				customers,
			};
		}
		case TYPES.GET_ONE_USER: {
			return {
				...state,
				user: action.payload,
			};
		}
		case TYPES.ADD_USER: {
			return {
				...state,
				staff: [...state.staff, action.payload],
			};
		}
		case TYPES.UPDATE_USER: {
			const userUpdated = action.payload;
			const newData = state.staff.map(user =>
				user.id === userUpdated.id ? userUpdated : user,
			);
			return {
				...state,
				staff: newData,
			};
		}
		case TYPES.DELETE_USER: {
			const userId = action.payload;
			const newData = state.staff.filter(user => user.id !== userId);
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
