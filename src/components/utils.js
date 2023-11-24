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

export const isItemSelected = (item, open, router) => {
	const {
		pathname,
		query: { id },
	} = router;

	const usersLinkSelected =
		pathname === `/admin/staff/${id}` ? 3 : USERS_INDEXES[pathname];

	const usersIsSelected = usersLinkSelected === 3 || usersLinkSelected === 4;

	if (item.label === 'Users' && !open) {
		return usersIsSelected;
	}

	if (usersIsSelected) {
		return usersLinkSelected === item.id;
	}

	return INDEXES[pathname] === item.id;
};

export const formatRoleName = (roleId, roles) => {
	try {
		const roleName = roles.find(role => role.id === roleId).roleName;
		return normalizeName(roleName);
	} catch (error) {
		console.error(error.message);
	}
};

export const setOptions = roles => {
	const newArray = [];
	roles.forEach(role => {
		newArray.push({
			value: role.roleName,
			label: normalizeName(role.roleName),
		});
	});
	return newArray;
};
