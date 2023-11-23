import { INDEXES, USERS_INDEXES } from './consts';

export const capFirstLetter = word => {
	return word.substr(0, 1).toUpperCase() + word.substr(1);
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

		return roleName
			.split('_')
			.map(word => {
				return capFirstLetter(word);
			})
			.join(' ');
	} catch (error) {
		console.error(error.message);
	}
};
