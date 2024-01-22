const validateEmptyField = form => {
	const { permissions } = form;
	const errors = {};

	Object.keys(form).forEach(field => {
		if (!form[field]) {
			errors[field] = 'Field required!';
		} else if (field === 'permissions' && permissions.length === 0) {
			errors.permissions = 'Field required!';
		}
	});

	return errors;
};

export default validateEmptyField;
