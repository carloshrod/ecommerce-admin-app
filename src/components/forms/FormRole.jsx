import { Grid, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import ActionsForm from './ActionsForm';
import { inputRoleProps } from './consts';
import useForm from '@hooks/useForm';
import { generateInputs } from './utils';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import validateRole from '@validations/validateRole';

const initialForm = {
	displayName: '',
	permissions: [],
	description: '',
};

const FormRole = () => {
	const {
		form,
		errors,
		setErrors,
		handleInputChange,
		handleSelectChange,
		handleSubmitRole,
		handleReset,
	} = useForm(initialForm);
	const { dataToEdit } = useGlobalContext();

	useEffect(() => {
		const roleErrors = validateRole(form);
		setErrors(roleErrors);
	}, [form]);

	return (
		<Stack
			component='form'
			noValidate
			autoComplete='off'
			onSubmit={handleSubmitRole}
			sx={{ mt: 1, gap: 3, maxWidth: 450 }}
		>
			<Grid container spacing={3}>
				{inputRoleProps.map(input =>
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

export default FormRole;
