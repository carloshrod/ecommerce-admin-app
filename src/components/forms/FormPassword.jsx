import { Box, Stack } from '@mui/material';
import Input from './Input';
import useForm from '@hooks/useForm';
import ActionsForm from './ActionsForm';
import { inputPasswordProps } from './consts';
import { useEffect } from 'react';
import validatePassword from '@validations/validatePassword';

const initialForm = {
	currentPassword: '',
	newPassword: '',
	renewPassword: '',
};

const FormPassword = () => {
	const {
		form,
		errors,
		setErrors,
		handleInputChange,
		handleReset,
		handleSubmitPassword,
	} = useForm(initialForm);

	useEffect(() => {
		const passwordErrors = validatePassword(form);
		setErrors(passwordErrors);
	});

	return (
		<Stack
			component='form'
			noValidate
			autoComplete='off'
			onSubmit={handleSubmitPassword}
			sx={{ mt: 1, gap: 3 }}
		>
			{inputPasswordProps.map(input => (
				<Box key={input.id}>
					<Input
						{...input}
						value={form[input.name]}
						onChange={handleInputChange}
						errors={errors}
					/>
				</Box>
			))}
			<ActionsForm handleReset={handleReset} errors={errors} />
		</Stack>
	);
};

export default FormPassword;
