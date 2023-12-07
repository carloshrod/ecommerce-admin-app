import { INDEXES, USERS_INDEXES } from './consts';

export const capFirstLetter = word => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

export const normalizeName = name => {
	return name
		.split('_')
		.map(word => capFirstLetter(word))
		.join(' ');
};

export const setItemSelected = (item, open, router) => {
	const { pathname } = router;
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

export const formatRoleName = (roleId, roles) => {
	try {
		const roleName = roles.find(role => role.id === roleId)?.roleName;
		return roleName && normalizeName(roleName);
	} catch (error) {
		console.error(error.message);
	}
};

export const setOptions = roles => {
	const newArray = [];
	roles.forEach(role => {
		newArray.push({
			value: role.id,
			label: normalizeName(role.roleName),
		});
	});
	return newArray;
};

export const setDefaultValue = ({
	multiple,
	name,
	selectOptions,
	dataToEdit,
}) => {
	if (multiple) {
		return selectOptions
			.filter(option => dataToEdit && dataToEdit[name].includes(option.value))
			.map(data => data);
	}
	return selectOptions.find(
		option => dataToEdit && option.value === dataToEdit[name],
	);
};
