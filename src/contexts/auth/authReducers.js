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

		default:
			return state;
	}
};

export default authReducers;
