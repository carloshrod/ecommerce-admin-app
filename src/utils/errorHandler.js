const ERRORS = {
	'invalid-email': 'Invalid email!',
	'user-disabled': 'User has been disabled by an admin!',
	'user-not-found': 'User not found!',
	'wrong-password': 'Wrong credentials!',
	'invalid-credential': 'Invalid credentials!',
	'email-already-exists':
		'The email address is already in use by another account!',
	'weak-password': 'Password is too weak!',
	'too-many-requests':
		'Access to this account has been temporarily disabled. Please reset your password or you can try again later!',
	ECONNABORTED: 'Something went wrong. Please try it later!',
	defaultError: 'Something went wrong. Please try it later!',
};

const errorHandler = error => {
	let handler = ERRORS.defaultError;

	if (error?.response) {
		handler = `${error?.response?.data?.slice(0, -1)}!`;
	} else if (error?.code) {
		const code = error?.code?.replace(/auth\//, '');
		handler = ERRORS[code];
	} else {
		handler = error?.message;
	}

	return handler;
};

export default errorHandler;
