import { auth } from '@firebase/client';
import {
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import withEnhances from './withEnhances';

const authServices = () => {
	const signIn = withEnhances(async ({ email, password }) => {
		await signInWithEmailAndPassword(auth, email, password);
	});

	const resetPassword = withEnhances(async email => {
		await sendPasswordResetEmail(auth, email);
		toast.success('Please, check your email!');
	});

	const logout = withEnhances(
		async () => {
			await signOut(auth);
			Cookies.remove('authToken');
		},
		{
			confirm: true,
			text: '¿Are you sure you want to log out?',
		},
	);

	return { signIn, resetPassword, logout };
};

export default authServices;
