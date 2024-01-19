import { Grid, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import ActionsForm from './ActionsForm';
import { formCategoryProps, formPasswordProps, formRoleProps } from './consts';
import useForm from '@hooks/useForm';
import { generateInputs } from './utils';
import { useGlobalContext } from '@contexts/global/GlobalContext';

const FORM_PROPS = {
	password: formPasswordProps,
	role: formRoleProps,
	category: formCategoryProps,
};

const FormGeneric = ({ item }) => {
	const { initialForm, inputProps, validateForm } = FORM_PROPS[item];
	const {
		form,
		errors,
		setErrors,
		handleInputChange,
		handleSelectChange,
		handleSubmitRole,
		handleSubmitPassword,
		handleReset,
	} = useForm(initialForm);
	const { dataToEdit } = useGlobalContext();

	const SUBMITS = {
		role: handleSubmitRole,
		password: handleSubmitPassword,
	};
	const handleSubmit = SUBMITS[item];

	useEffect(() => {
		const roleErrors = validateForm(form);
		setErrors(roleErrors);
	}, [form]);

	return (
		<Stack
			component='form'
			noValidate
			autoComplete='off'
			onSubmit={handleSubmit}
			sx={{ mt: 1, gap: 3, maxWidth: item === 'password' ? 300 : 450 }}
		>
			<Grid container spacing={3}>
				{inputProps.map(input =>
					generateInputs(
						input,
						{
							form,
							errors,
							handleInputChange,
							handleSelectChange,
						},
						true,
					),
				)}
			</Grid>
			<ActionsForm
				handleReset={handleReset}
				errors={errors}
				label={item !== 'password' ? (dataToEdit ? 'Edit' : 'Add') : undefined}
			/>
		</Stack>
	);
};

export default FormGeneric;
