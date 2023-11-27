import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { auth, db } from '@firebase';
import authReducers from './authReducers';
import { AUTH_TYPES as TYPES } from './authActions';
import authServices from '@services/authServices';
import { fetchData } from '@contexts/utils';
import { SIGNIN } from '@utils/routes';

const AuthContext = createContext(undefined);

const rolesCollectionRef = collection(db, 'roles');

const initialState = {
	isAuth: false,
	loggedUser: {},
	roles: [],
	idToken: null,
};

const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducers, initialState);
	const { isAuth, loggedUser, roles, idToken } = state;
	const { logout } = authServices();
	const router = useRouter();
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
						payload: {
							isAuth: true,
							loggedUser: userDoc.data(),
							roles,
							idToken: fbToken,
						},
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
			router.push(SIGNIN);
			setTimeout(() => {
				dispatch({ type: TYPES.SIGN_OUT });
			}, 1500);
		}
	};

	const data = { isAuth, loggedUser, roles, signOut, isAdmin, idToken };

	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
