import { AUTH_TYPES as TYPES } from './authActions';

const authReducers = (state, action) => {
	switch (action.type) {
		case TYPES.SIGN_IN: {
			const { isAuth, loggedUser, roles } = action?.payload;
			return {
				...state,
				isAuth,
				loggedUser,
				roles,
			};
		}
		case TYPES.SIGN_OUT: {
			return {
				...state,
				isAuth: false,
				loggedUser: {},
			};
		}
		default:
			return state;
	}
};

export default authReducers;
