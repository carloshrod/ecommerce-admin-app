import { auth, db } from '@firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import authReducers from './authReducers';
import { AUTH_TYPES as TYPES } from './authActions';
import AuthServices from '@services/AuthServices';
import { fetchData } from '@contexts/utils';
import { collection, doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext(undefined);

const rolesCollectionRef = collection(db, 'roles');

const initialState = {
	isAuth: false,
	loggedUser: {},
	roles: [],
};

const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducers, initialState);
	const { isAuth, loggedUser, roles } = state;
	const { logout } = AuthServices();
	const isAdmin = true;

	useEffect(() => {
		onAuthStateChanged(auth, async currentUser => {
			try {
				if (currentUser) {
					const fbToken = await currentUser.getIdToken();
					const userDoc = await getDoc(doc(db, 'staff', currentUser.uid));
					const roles = await fetchData(rolesCollectionRef);
					dispatch({
						type: TYPES.SIGN_IN,
						payload: { isAuth: true, loggedUser: userDoc.data(), roles },
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

	const data = { isAuth, loggedUser, roles, signOut, isAdmin };

	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
