import { regex } from './regex';

const validatePassword = passwords => {
	const { newPassword, renewPassword } = passwords;
	const errors = {};

	Object.keys(passwords).forEach(field => {
		if (!passwords[field]) {
			errors[field] = 'Field required!';
		} else if (field === 'newPassword' && !regex.password.test(newPassword)) {
			errors.newPassword =
				'Password must contain minimun 8 characters and at least one uppercase, one lowercase, one number and one special character!';
		} else if (field === 'renewPassword' && renewPassword !== newPassword) {
			errors.renewPassword = 'Passwords does not match!';
		}
	});

	return errors;
};

export default validatePassword;
