const validateAuth = form => {
	const errors = {};

	Object.keys(form).forEach(field => {
		if (!form[field]) {
			errors[field] = 'Field required!';
		}
	});

	return errors;
};

export default validateAuth;
