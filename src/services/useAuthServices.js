import { auth } from '@firebase/client';
import {
	EmailAuthProvider,
	reauthenticateWithCredential,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updatePassword,
} from 'firebase/auth';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import withEnhances from './withEnhances';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { AUTH_TYPES } from '@contexts/auth/authActions';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import { useRouter } from 'next/router';
import { SIGNIN } from '@utils/routes';

const useAuthServices = () => {
	const { toggleLoader, setRedirectMsg } = useGlobalContext();
	const { authDispatch } = useAuthContext();
	const router = useRouter();

	const signIn = withEnhances(
		async ({ email, password }) => {
			await signInWithEmailAndPassword(auth, email, password);
			setRedirectMsg('Redirecting to dashboard!');
		},
		{ loader: toggleLoader, delay: 2000 },
	);

	const resetPassword = withEnhances(
		async ({ email }) => {
			await sendPasswordResetEmail(auth, email);
			toast.success('Please, check your email!');
		},
		{ loader: toggleLoader },
	);

	const logout = withEnhances(
		async () => {
			await signOut(auth);
			Cookies.remove('authToken');
			setRedirectMsg('Redirecting to signin!');
			setTimeout(() => {
				authDispatch({ type: AUTH_TYPES.SIGN_OUT });
				router.push(SIGNIN);
			}, 2000);
		},
		{
			confirm: true,
			text: '¿Are you sure you want to log out?',
			loader: toggleLoader,
			delay: 2000,
		},
	);

	const changePassword = withEnhances(
		async ({ currentPassword, newPassword }) => {
			const user = auth.currentUser;
			const credential = EmailAuthProvider.credential(
				user.email,
				currentPassword,
			);
			const res = await reauthenticateWithCredential(user, credential);
			if (res.user) {
				await updatePassword(user, newPassword);
				await signOut(auth);
				Cookies.remove('authToken');
				setRedirectMsg('Redirecting to signin!');
				setTimeout(() => {
					authDispatch({ type: AUTH_TYPES.SIGN_OUT });
					router.push(SIGNIN);
					toast.success('Please sign in again!');
				}, 2000);
			}
		},
		{ loader: toggleLoader, delay: 2000 },
	);

	return { signIn, resetPassword, logout, changePassword };
};

export default useAuthServices;
