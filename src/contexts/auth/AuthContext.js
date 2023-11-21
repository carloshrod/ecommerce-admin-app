import { auth } from '@firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import authReducers from './authReducers';
import { AUTH_TYPES as TYPES } from './authActions';
import AuthServices from '@services/AuthServices';

const AuthContext = createContext(undefined);

const initialState = {
	isAuth: false,
	loggedUser: {},
};

const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducers, initialState);
	const { isAuth, loggedUser } = state;
	const { getUserData, logout } = AuthServices();
	const isAdmin = true;

	useEffect(() => {
		onAuthStateChanged(auth, async currentUser => {
			try {
				if (currentUser) {
					const fbToken = await currentUser.getIdToken();
					const userData = await getUserData(currentUser.uid);
					dispatch({
						type: TYPES.SIGN_IN,
						payload: { isAuth: true, loggedUser: userData },
					});
					Cookies.set('authToken', fbToken);
				}
			} catch (error) {
				console.error(error.message);
			}
		});
	}, []);

	const signOut = async () => {
		const res = await logout();
		if (res) {
			setTimeout(() => {
				dispatch({ type: TYPES.SIGN_OUT });
			}, 1000);
		}
	};

	const data = { isAuth, loggedUser, signOut, isAdmin };

	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
