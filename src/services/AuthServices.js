import { auth, db } from '@firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

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

	const getUserData = async uid => {
		const userDoc = await getDoc(doc(db, 'staff', uid));
		return userDoc.data();
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
				router.push('/auth/signin');
				return true;
			} catch (error) {
				console.error(error.message);
				return false;
			}
		}
		return false;
	};

	return { signIn, getUserData, logout };
};

export default AuthServices;
