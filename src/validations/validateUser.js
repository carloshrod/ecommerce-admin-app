import { regex } from './regex';

const validateUser = user => {
	const { email, phoneNumber } = user;
	const errors = {};

	Object.keys(user).forEach(field => {
		if (field !== 'avatar') {
			if (user[field] === '') {
				errors[field] = 'Field required';
			} else if (field === 'email' && !regex.email.test(email)) {
				errors.email = 'Enter a valid email address! Ex: example@mail.com';
			} else if (field === 'phoneNumber' && !regex.phone.test(phoneNumber)) {
				errors.phoneNumber = 'Enter a valid phone number! Ex: (321) 456-7890';
			}
		}
	});

	return errors;
};

export default validateUser;
