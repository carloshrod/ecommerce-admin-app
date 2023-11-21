import { Box, Stack, Typography, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import Input from './Input';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SIGNIN } from '@utils/routes';
import AuthServices from '@services/AuthServices';

const FormForgotPassword = () => {
	const [form, setForm] = useState({
		email: '',
	});
	// const { form, errors, setErrors, handleInputChange, handleSignIn } =
	//   useForm(initialForm);
	const { resetPassword } = AuthServices();

	const inputProps = [
		{
			id: 'idEmail',
			name: 'email',
			label: 'Email',
			icon: <EmailIcon />,
		},
	];

	const errors = {};

	const handleChange = event => {
		const { value, name } = event.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = async event => {
		event.preventDefault();
		console.log(form);
		await resetPassword(form.email);
	};

	// useEffect(() => {
	//   setErrors(validateSignIn(form));
	// }, [form]);

	return (
		<Box className='formAuth'>
			<Stack
				component='form'
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit}
			>
				<Image
					src='/ec-admin-logo.png'
					width='120'
					height='120'
					alt='logo'
					priority='true'
				/>
				<Typography
					sx={{ fontWeight: 'bold', mb: 2 }}
					variant='h5'
					color='primary'
					gutterBottom
				>
					Forgot your password?
				</Typography>
				<Typography sx={{ maxWidth: 300, fontSize: 14, mb: 3 }} gutterBottom>
					Enter your email and we will send you a link to reset your password:
				</Typography>
				{inputProps.map(input => (
					<Box key={input.id} mb={3}>
						<Input
							{...input}
							value={form[input.name]}
							onChange={handleChange}
							errors={errors}
						/>
					</Box>
				))}
				<Typography
					sx={{ fontSize: 14, textAlign: 'right', mb: 1 }}
					gutterBottom
				>
					<Link href={SIGNIN}>Do you want to signin?</Link>
				</Typography>
				<Button
					sx={{ width: '100%' }}
					variant='contained'
					type='submit'
					disabled={!(Object.keys(errors).length === 0)}
				>
					Send
				</Button>
			</Stack>
		</Box>
	);
};

export default FormForgotPassword;
