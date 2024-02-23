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

export const setProductToCreateObj = (product, id, productImages) => {
	const { price, stock } = product;

	return {
		...product,
		id,
		images: productImages,
		price: parseFloat(price),
		stock: parseInt(stock),
		// TODO: generate SKU
		createdAt: serverTimestamp(),
		lastUpdate: serverTimestamp(),
	};
};

// TODO:
// export const generateSKU = product => {};

export const setProductToUpdateObj = (product, productImages) => {
	const { price, stock } = product;

	return {
		...product,
		images: productImages,
		price: parseFloat(price),
		stock: parseInt(stock),
		lastUpdate: serverTimestamp(),
	};
};

export const setUserToCreateObj = (uid, user, avatar) => {
	const { displayName, email, countryCode, phoneNumber, role } = user;

	return {
		id: uid,
		avatar,
		displayName,
		email,
		phone: {
			countryCode,
			number: phoneNumber,
		},
		role,
		disabled: false,
		createdAt: serverTimestamp(),
		lastUpdate: serverTimestamp(),
	};
};

export const setUserToUpdateObj = (user, newAvatar) => {
	const { id, displayName, email, countryCode, phoneNumber, role } = user;

	return {
		id,
		avatar: newAvatar,
		displayName,
		email,
		phone: {
			countryCode,
			number: phoneNumber,
		},
		role,
		lastUpdate: serverTimestamp(),
	};
};

export const formatDisplayName = displayName => {
	return displayName.toLowerCase().split(' ').join('_');
};
