import { useEffect } from 'react';
import { Grid, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import useForm from '@hooks/useForm';
import Input from './Input';
import ActionsForm from './ActionsForm';
import InputSelect from './InputSelect';
import InputFile from './InputFile';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { generateInputUserProps } from './utils';
import { ITEMS_WIDTH } from './consts';
import validateUser from '@validations/validateUser';

const initialForm = {
	displayName: '',
	email: '',
	countryCode: '',
	phoneNumber: '',
	role: '',
};

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
	} = useForm(initialForm);
	const { dataToEdit } = useGlobalContext();
	const { roles } = useAuthContext();
	const { pathname } = useRouter();

	useEffect(() => {
		const userErrors = validateUser(form);
		setErrors(userErrors);
	}, [form]);

	const inputProps = generateInputUserProps(roles, pathname);

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
				{inputProps.map(input => (
					<Grid
						item
						xs={12}
						sm={ITEMS_WIDTH[input.name + 'Sm'] ?? 6}
						key={input.id}
					>
						{input.type !== 'select' ? (
							<Input
								{...input}
								value={form[input.name]}
								onChange={handleInputChange}
								errors={errors}
							/>
						) : (
							<InputSelect
								{...input}
								value={form[input.name]}
								onChange={handleSelectChange}
								errors={errors}
							/>
						)}
					</Grid>
				))}
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
