import { STAFF } from '@utils/routes';
import { INDEXES, USERS_INDEXES } from './consts';

export const capFirstLetter = word => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

export const normalizeName = name => {
	try {
		return name
			?.split('_')
			.map(word => capFirstLetter(word))
			.join(' ');
	} catch (error) {
		console.error(error.message);
	}
};

export const setItemSelected = (item, open, pathname) => {
	const usersIsSelected =
		USERS_INDEXES[pathname] === 3 || USERS_INDEXES[pathname] === 4;

	if (item.label === 'Users' && !open) {
		return usersIsSelected;
	}

	if (usersIsSelected) {
		return USERS_INDEXES[pathname] === item.id;
	}

	return INDEXES[pathname] === item.id;
};

export const findRoleInfo = (roleId, roles) => {
	try {
		return roles.find(role => role.id === roleId);
	} catch (error) {
		console.error(error.message);
	}
};

export const formatCategoryName = (categoryId, categories) => {
	try {
		return categories.find(c => c.value === categoryId).label;
	} catch (error) {
		console.error(error.message);
	}
};

export const setOptions = array => {
	const newArray = [];
	array.forEach(role => {
		newArray.push({
			value: role.id,
			label: normalizeName(role.displayName),
		});
	});

	return newArray;
};

export const setDefaultValue = ({ multiple, name, options, dataToEdit }) => {
	if (multiple) {
		return options
			.filter(option => dataToEdit && dataToEdit[name]?.includes(option.value))
			.map(data => data);
	}

	return options.find(
		option => dataToEdit && option.value === dataToEdit[name],
	);
};

export const setItemName = (pathname, id = undefined) => {
	let endIndex = -1;

	if (pathname === STAFF) {
		endIndex = undefined;
	} else if (id) {
		endIndex = !pathname.includes(STAFF) ? -6 : -5;
	}

	return capFirstLetter(pathname.slice(7, endIndex));
};

export const setPropName = (id, db) => {
	return db.find(item => item.value === id)?.label;
};

export const formatPrice = price => {
	const decimals = price?.toString().split('.')[1];

	if (decimals === undefined) {
		return `${price}.00`;
	}

	if (decimals?.length === 1) {
		return `${price}0`;
	}

	return price;
};
