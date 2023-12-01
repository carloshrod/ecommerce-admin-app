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
import withEnhances from './withEnhances';
import { useAuthContext } from '@contexts/auth/AuthContext';

const authServices = () => {
	const { dispatchSignOut } = useAuthContext();

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
			dispatchSignOut();
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
				dispatchSignOut();
			}
		},
	);

	return { signIn, resetPassword, logout, changePassword };
};

export default authServices;
