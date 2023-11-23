import { auth } from '@firebase';
import {
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { SIGNIN } from '@utils/routes';

const AuthServices = () => {
	const router = useRouter();

	const signIn = async ({ email, password }) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.error(error.message);
			toast.error(error.message);
		}
	};

	const resetPassword = async email => {
		try {
			await sendPasswordResetEmail(auth, email);
			toast.success('Please, check your email!');
		} catch (error) {
			console.error(error.message);
			toast.error(error.message);
		}
	};

	const logout = async () => {
		const resConfirm = await Swal.fire({
			icon: 'question',
			html: `¿Are you sure you want to log out?`,
			showCancelButton: true,
			confirmButtonColor: '#20cb84',
			confirmButtonText: 'Aceptar',
			cancelButtonColor: '#dc4035',
			cancelButtonText: 'Cancelar',
			width: '24em',
		});
		if (resConfirm.isConfirmed) {
			try {
				await signOut(auth);
				Cookies.remove('authToken');
				router.push(SIGNIN);
				return true;
			} catch (error) {
				console.error(error.message);
				return false;
			}
		}
		return false;
	};

	return { signIn, resetPassword, logout };
};

export default AuthServices;
