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
import { useRouter } from 'next/router';
import withEnhances from './withEnhances';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { AUTH_TYPES } from '@contexts/auth/authActions';
import { SIGNIN } from '@utils/routes';
import { useGlobalContext } from '@contexts/global/GlobalContext';

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
			setTimeout(() => {
				router.push(SIGNIN);
				setTimeout(() => {
					authDispatch({ type: AUTH_TYPES.SIGN_OUT });
				}, 1000);
			}, 2000);
			setRedirectMsg('Redirecting to signin!');
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
				setTimeout(() => {
					router.push(SIGNIN);
					setTimeout(() => {
						authDispatch({ type: AUTH_TYPES.SIGN_OUT });
					}, 500);
					toast.success('Please sign in again!');
				}, 2000);
				setRedirectMsg('Redirecting to signin!');
			}
		},
		{ loader: toggleLoader, delay: 2000 },
	);

	return { signIn, resetPassword, logout, changePassword };
};

export default useAuthServices;
