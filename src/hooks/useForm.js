import { useEffect, useState } from 'react';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import useAuthServices from '@services/useAuthServices';
import useUserServices from '@services/useUserServices';
import { useRouter } from 'next/router';
import { SIGNIN } from '@utils/routes';
import useProductServices from '@services/useProductServices';

const useForm = initialForm => {
	const [form, setForm] = useState(initialForm);
	const [file, setFile] = useState(null);
	const [pathImage, setPathImage] = useState('');
	const [errors, setErrors] = useState({});
	const { dataToEdit, closeModal } = useGlobalContext();
	const { signIn, resetPassword, changePassword } = useAuthServices();
	const { addProduct, updateProduct } = useProductServices();
	const { addUser, updateUser } = useUserServices();
	const { pathname } = useRouter();

	useEffect(() => {
		if (dataToEdit) {
			setForm(dataToEdit);
			const pathImage = pathname.includes('products')
				? dataToEdit?.image
				: dataToEdit?.avatar;
			setPathImage(pathImage?.url);
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

	const handleFileChange = e => {
		if (e.target.files && e.target.files.length > 0) {
			const image = e.target.files[0];
			if (image.type.includes('image')) {
				const reader = new FileReader();
				reader.readAsDataURL(image);
				reader.onload = function load() {
					setPathImage(reader.result);
				};
				setFile(image);
			}
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

	const handleSubmitProduct = async event => {
		event.preventDefault();
		if (!dataToEdit) {
			await addProduct(form, file);
		} else {
			await updateProduct(form, file);
		}
		handleReset();
	};

	const handleSubmitStaff = async event => {
		event.preventDefault();
		if (!dataToEdit) {
			await addUser(form, file);
		} else {
			await updateUser(form, file);
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
		file,
		pathImage,
		errors,
		setErrors,
		handleInputChange,
		handleSelectChange,
		handleFileChange,
		handleReset,
		handleAuth,
		handleSubmitProduct,
		handleSubmitStaff,
		handleSubmitPassword,
	};
};

export default useForm;
