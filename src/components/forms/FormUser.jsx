import { useEffect } from 'react';
import { Grid, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import useForm from '@hooks/useForm';
import ActionsForm from './ActionsForm';
import InputFile from './InputFile';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { filterRoles, generateInputs } from './utils';
import validateUser from '@validations/validateUser';
import { inputUserProps, userInitialForm } from './consts';

const FormUser = () => {
	const {
		form,
		pathImage,
		errors,
		setErrors,
		handleInputChange,
		handleSelectChange,
		handleFileChange,
		handleReset,
		handleSubmitStaff,
	} = useForm(userInitialForm);
	const { dataToEdit } = useGlobalContext();
	const { roles } = useAuthContext();
	const { pathname } = useRouter();
	const filteredRoles = filterRoles(roles, pathname);

	useEffect(() => {
		const userErrors = validateUser(form);
		setErrors(userErrors);
	}, [form]);

	const inputProps = inputUserProps(filteredRoles);

	return (
		<Stack
			component='form'
			noValidate
			autoComplete='off'
			onSubmit={handleSubmitStaff}
			sx={{ mt: 1, gap: 3 }}
		>
			<InputFile pathImage={pathImage} onChange={handleFileChange} />
			<Grid container spacing={3}>
				{inputProps.map(input =>
					generateInputs(input, {
						form,
						errors,
						handleInputChange,
						handleSelectChange,
					}),
				)}
			</Grid>
			<ActionsForm
				handleReset={handleReset}
				errors={errors}
				label={dataToEdit ? 'Edit' : 'Add'}
			/>
		</Stack>
	);
};

export default FormUser;
