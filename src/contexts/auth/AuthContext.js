import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import { auth, db } from '@firebase/client';
import authReducers from './authReducers';
import { AUTH_TYPES as TYPES } from './authActions';
import { fetchData } from '@contexts/utils';

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

	const data = {
		isAuth,
		loggedUser,
		roles,
		isAdmin,
		idToken,
		authDispatch: dispatch,
	};

	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
