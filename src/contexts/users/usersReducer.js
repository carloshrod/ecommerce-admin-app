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
			const { userCreated, isStaff } = action.payload;

			if (isStaff) {
				return {
					...state,
					staff: [...state.staff, userCreated],
				};
			} else {
				return {
					...state,
					customers: [...state.customers, userCreated],
				};
			}
		}

		case TYPES.UPDATE_USER: {
			const { userUpdated, isStaff } = action.payload;

			const db = isStaff ? state.staff : state.customers;
			const newData = db.map(user =>
				user.id === userUpdated?.id ? userUpdated : user,
			);

			if (isStaff) {
				return {
					...state,
					staff: newData,
				};
			} else {
				return {
					...state,
					customers: newData,
				};
			}
		}

		case TYPES.DELETE_USER: {
			const { userId, isStaff } = action.payload;

			const db = isStaff ? state.staff : state.customers;
			const newData = db.filter(user => user.id !== userId);

			if (isStaff) {
				return {
					...state,
					staff: newData,
				};
			} else {
				return {
					...state,
					customers: newData,
				};
			}
		}

		default:
			return state;
	}
};

export default usersReducer;
