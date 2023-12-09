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

const useAuthServices = () => {
	const { authDispatch } = useAuthContext();
	const router = useRouter();

	const signIn = withEnhances(async ({ email, password }) => {
		await signInWithEmailAndPassword(auth, email, password);
	});

	const resetPassword = withEnhances(async ({ email }) => {
		await sendPasswordResetEmail(auth, email);
		toast.success('Please, check your email!');
	});

	const logout = withEnhances(
		async () => {
			await signOut(auth);
			Cookies.remove('authToken');
			router.push(SIGNIN);
			setTimeout(() => {
				authDispatch({ type: AUTH_TYPES.SIGN_OUT });
			}, 1500);
		},
		{
			confirm: true,
			text: '¿Are you sure you want to log out?',
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
				setTimeout(() => {
					Cookies.remove('authToken');
					router.push(SIGNIN);
					authDispatch({ type: AUTH_TYPES.SIGN_OUT });
				}, 1500);
			}
		},
	);

	return { signIn, resetPassword, logout, changePassword };
};

export default useAuthServices;
