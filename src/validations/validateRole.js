const validateRole = role => {
	const { permissions } = role;
	const errors = {};

	Object.keys(role).forEach(field => {
		if (!role[field]) {
			errors[field] = 'Field required!';
		} else if (field === 'permissions' && permissions.length === 0) {
			errors.permissions = 'Field required!';
		}
	});

	return errors;
};

export default validateRole;
