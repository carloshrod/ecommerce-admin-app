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
	const { price, stock, category, subCategory, ...rest } = product;

	return {
		...rest,
		id,
		images: productImages,
		price: parseFloat(price),
		stock: parseInt(stock),
		category: {
			main: category,
			sub: subCategory,
		},
		// TODO: generate SKU
		createdAt: serverTimestamp(),
		lastUpdate: serverTimestamp(),
	};
};

// TODO:
// export const generateSKU = product => {};

export const setProductToUpdateObj = (product, productImages) => {
	const { price, stock, category, subCategory, ...rest } = product;

	return {
		...rest,
		images: productImages,
		price: parseFloat(price),
		stock: parseInt(stock),
		category: {
			main: category,
			sub: subCategory,
		},
		lastUpdate: serverTimestamp(),
	};
};

export const setUserToCreateObj = (user, uid, avatar) => {
	const { countryCode, phoneNumber, ...rest } = user;

	return {
		...rest,
		id: uid,
		avatar,
		phone: {
			countryCode,
			number: phoneNumber,
		},
		disabled: false,
		createdAt: serverTimestamp(),
		lastUpdate: serverTimestamp(),
	};
};

export const setUserToUpdateObj = (user, newAvatar) => {
	const { countryCode, phoneNumber, ...rest } = user;

	return {
		...rest,
		avatar: newAvatar,
		phone: {
			countryCode,
			number: phoneNumber,
		},
		lastUpdate: serverTimestamp(),
	};
};

export const formatDisplayName = displayName => {
	return displayName.toLowerCase().split(' ').join('_');
};
