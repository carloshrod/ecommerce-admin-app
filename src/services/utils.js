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

export const setProductToCreateObj = (product, id, productImage) => {
	return {
		...product,
		id,
		image: productImage,
		// TODO: generate SKU
		createdAt: serverTimestamp(),
		lastUpdate: serverTimestamp(),
	};
};

// TODO:
// export const generateSKU = product => {};

export const setProductToUpdateObj = (product, productImage) => {
	return {
		...product,
		image: productImage,
		lastUpdate: serverTimestamp(),
	};
};

export const setUserToCreateObj = (uid, user, avatar) => {
	return {
		...user,
		id: uid,
		avatar,
		disabled: false,
		createdAt: serverTimestamp(),
		lastUpdate: serverTimestamp(),
	};
};

export const setUserToUpdateObj = (user, newAvatar) => {
	return {
		...user,
		avatar: newAvatar,
		lastUpdate: serverTimestamp(),
	};
};
