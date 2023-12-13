import { serverTimestamp } from 'firebase/firestore';
import Swal from 'sweetalert2';

export const SwalConfirm = async text => {
	return await Swal.fire({
		icon: 'question',
		html: text,
		showCancelButton: true,
		confirmButtonColor: '#20cb84',
		confirmButtonText: 'Aceptar',
		cancelButtonColor: '#dc4035',
		cancelButtonText: 'Cancelar',
		width: '24em',
	});
};

export const generateUserToCreate = (uid, user, avatar) => {
	const { displayName, email, countryCode, phoneNumber, role } = user;

	return {
		id: uid,
		displayName,
		email,
		phoneNumber,
		countryCode,
		role,
		avatar,
		disabled: false,
		createdAt: serverTimestamp(),
		lastUpdate: serverTimestamp(),
	};
};

export const generateUserToUpdate = (user, newAvatar) => {
	const { displayName, email, countryCode, phoneNumber, role } = user;

	return {
		displayName,
		email,
		countryCode,
		phoneNumber,
		role,
		avatar: newAvatar,
		lastUpdate: serverTimestamp(),
	};
};
