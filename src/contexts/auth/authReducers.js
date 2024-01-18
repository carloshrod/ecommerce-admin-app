import { AUTH_TYPES as TYPES } from './authActions';

const authReducers = (state, action) => {
	switch (action.type) {
		case TYPES.SIGN_IN: {
			const { isAuth, loggedUser, roles, idToken } = action?.payload;
			return {
				...state,
				isAuth,
				loggedUser,
				roles,
				idToken,
			};
		}

		case TYPES.SIGN_OUT: {
			return {
				...state,
				isAuth: false,
				loggedUser: {},
			};
		}

		case TYPES.UPDATE_LOGGED_USER: {
			const { userUpdated } = action?.payload;
			return {
				...state,
				loggedUser: userUpdated,
			};
		}

		case TYPES.ADD_ROLE: {
			return {
				...state,
				roles: [...state.roles, action.payload],
			};
		}

		case TYPES.UPDATE_ROLE: {
			const roleUpdated = action.payload;
			const newData = state.roles.map(role =>
				role?.id === roleUpdated?.id ? roleUpdated : role,
			);

			return {
				...state,
				roles: newData,
			};
		}

		case TYPES.DELETE_ROLE: {
			const roleId = action.payload;
			const newData = state.roles.filter(role => role?.id !== roleId);

			return {
				...state,
				roles: newData,
			};
		}

		default:
			return state;
	}
};

export default authReducers;
