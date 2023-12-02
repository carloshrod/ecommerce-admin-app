import { useEffect, useState } from 'react';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import useAuthServices from '@services/useAuthServices';
import useUserServices from '@services/useUserServices';
import { useRouter } from 'next/router';
import { SIGNIN } from '@utils/routes';

const useForm = initialForm => {
	const [form, setForm] = useState(initialForm);
	const [errors, setErrors] = useState({});
	const { dataToEdit, closeModal } = useGlobalContext();
	const { signIn, resetPassword, changePassword } = useAuthServices();
	const { addStaff, updateStaff } = useUserServices();
	const { pathname } = useRouter();

	useEffect(() => {
		if (dataToEdit) {
			setForm(dataToEdit);
		}
	}, []);

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
		setForm(initialForm);
	};

	const handleAuth = async event => {
		event.preventDefault();
		if (pathname === SIGNIN) {
			await signIn(form);
		} else {
			await resetPassword(form);
		}
	};

	const handleSubmitStaff = async event => {
		event.preventDefault();
		if (!dataToEdit) {
			await addStaff(form);
		} else {
			await updateStaff(form);
		}
		handleReset();
	};

	const handleSubmitPassword = async event => {
		event.preventDefault();
		const { currentPassword, newPassword } = form;
		await changePassword({ currentPassword, newPassword });
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
		handleAuth,
		handleSubmitStaff,
		handleSubmitPassword,
	};
};

export default useForm;
