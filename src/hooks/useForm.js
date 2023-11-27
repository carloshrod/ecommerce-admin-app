import { useGlobalContext } from '@contexts/global/GlobalContext';
import authServices from '@services/authServices';
import userServices from '@services/userServices';
import { useState } from 'react';

const useForm = initialForm => {
	const [form, setForm] = useState(initialForm);
	const [errors, setErrors] = useState({});
	const { signIn } = authServices();
	const { closeModal } = useGlobalContext();
	const { addStaff } = userServices();

	const handleInputChange = event => {
		const { value, name } = event.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSelectChange = (name, options) => {
		setForm({
			...form,
			[name]: Array.isArray(options)
				? options.map(option => option?.value)
				: options?.value,
		});
		if (name === 'countryCode') {
			setForm({ ...form, countryCode: options?.value, phoneNumber: '' });
		}
	};

	const handleReset = () => {
		closeModal();
		// dispatch({ type: TYPES.CLEAN_DATA_TO_EDIT });
		setForm(initialForm);
	};

	const handleSignIn = async event => {
		event.preventDefault();
		await signIn(form);
	};

	const handleSubmitStaff = async event => {
		event.preventDefault();
		await addStaff(form);
		handleReset();
	};

	return {
		form,
		setForm,
		errors,
		setErrors,
		handleInputChange,
		handleSelectChange,
		handleReset,
		handleSignIn,
		handleSubmitStaff,
	};
};

export default useForm;
