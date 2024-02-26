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
		createdAt: serverTimestamp(),
		lastUpdate: serverTimestamp(),
	};
};

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

export const generateSKU = (product, categories, subCategories) => {
	const createdAt = new Date();
	const createdAtFormatted = `${createdAt.getFullYear()}${(
		createdAt.getMonth() + 1
	)
		.toString()
		.padStart(2, '0')}${createdAt.getDate().toString().padStart(2, '0')}`;

	const brandInitials = product.brand.slice(0, 2);

	const categoryName = getCategoryName(product.category, categories);
	const subCategoryName = getCategoryName(product.subCategory, subCategories);
	const categoryInitials =
		categoryName.slice(0, 2) + subCategoryName.slice(0, 2);

	const SKU = `${createdAtFormatted}-${brandInitials}-${categoryInitials}`;

	return SKU.toUpperCase();
};

export const getCategoryName = (id, db) => {
	return db.find(item => item.id === id)?.displayName;
};
