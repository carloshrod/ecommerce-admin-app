import authServices from '@services/authServices';
import { useState } from 'react';

const useForm = initialForm => {
	const [form, setForm] = useState(initialForm);
	const [errors, setErrors] = useState({});
	const { signIn } = authServices();

	const handleInputChange = event => {
		const { value, name } = event.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSignIn = async event => {
		event.preventDefault();
		await signIn(form);
	};

	return {
		form,
		setForm,
		errors,
		setErrors,
		handleInputChange,
		handleSignIn,
	};
};

export default useForm;
