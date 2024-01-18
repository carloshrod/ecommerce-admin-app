import { useEffect, useState } from 'react';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import useAuthServices from '@services/useAuthServices';
import useUserServices from '@services/useUserServices';
import { useRouter } from 'next/router';
import { SIGNIN } from '@utils/routes';
import useProductServices from '@services/useProductServices';
import { formatInputValue } from './utils';
import useRoleServices from '@services/useRoleServices';
import DataList from '@components/data/DataList';

const useForm = initialForm => {
	const [form, setForm] = useState(initialForm);
	const [file, setFile] = useState(null);
	const [files, setFiles] = useState([]);
	const [pathImage, setPathImage] = useState('');
	const [errors, setErrors] = useState({});
	const { dataToEdit, toggleModal } = useGlobalContext();
	const { signIn, resetPassword, changePassword } = useAuthServices();
	const { addProduct, updateProduct } = useProductServices();
	const { addUser, updateUser } = useUserServices();
	const { addRole, updateRole } = useRoleServices();
	const { pathname } = useRouter();

	useEffect(() => {
		if (dataToEdit) {
			setForm(dataToEdit);
			const pathImage = pathname.includes('products')
				? dataToEdit?.images[0]
				: dataToEdit?.avatar;
			setPathImage(pathImage);
		}
	}, []);

	const handleInputChange = event => {
		const { value, name } = event.target;
		const formattedValue = formatInputValue(value, name);
		setForm({
			...form,
			[name]: formattedValue,
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

	const handleFileChange = event => {
		if (event.target.files && event.target.files.length > 0) {
			const image = event.target.files[0];

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

	const handleArrayFilesChange = event => {
		if (event.target.files && event.target.files.length > 0) {
			const newFiles = Array.from(event.target.files);
			const validImages = newFiles.filter(image =>
				image.type.includes('image'),
			);

			const newImages = validImages.map(image => URL.createObjectURL(image));

			if (!pathImage) {
				setPathImage(newImages[0]);
			}
			setFiles(prevFiles => [...prevFiles, ...validImages]);
		}
	};

	const handleSubmitAuth = async event => {
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
			await addProduct(form, files);
		} else {
			await updateProduct(form, files);
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

	const handleSubmitRole = async event => {
		event.preventDefault();
		if (!dataToEdit) {
			await addRole(form);
		} else {
			await updateRole(form);
		}
		handleReset();
		toggleModal({ title: 'User roles', child: <DataList /> });
	};

	const handleSubmitPassword = async event => {
		event.preventDefault();
		const { currentPassword, newPassword } = form;
		await changePassword({ currentPassword, newPassword });
		handleReset();
	};

	const handleReset = () => {
		toggleModal();
		setForm(initialForm);
	};

	return {
		form,
		file,
		files,
		pathImage,
		errors,
		setErrors,
		handleInputChange,
		handleSelectChange,
		handleFileChange,
		handleArrayFilesChange,
		handleSubmitAuth,
		handleSubmitProduct,
		handleSubmitStaff,
		handleSubmitRole,
		handleSubmitPassword,
		handleReset,
	};
};

export default useForm;
