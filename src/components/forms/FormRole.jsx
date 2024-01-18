import { Grid, Stack } from '@mui/material';
import React from 'react';
import ActionsForm from './ActionsForm';
import { inputRoleProps } from './consts';
import useForm from '@hooks/useForm';
import { generateInputs } from './utils';
import { useGlobalContext } from '@contexts/global/GlobalContext';

const initialForm = {
	displayName: '',
	permissions: [],
	description: '',
};

const FormRole = () => {
	const {
		form,
		errors,
		handleInputChange,
		handleSelectChange,
		handleSubmitRole,
		handleReset,
	} = useForm(initialForm);
	const { dataToEdit } = useGlobalContext();

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
