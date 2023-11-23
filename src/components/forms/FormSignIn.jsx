import { Box, Stack, Typography, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Input from './Input';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AuthServices from '@services/authServices';

const FormSignIn = () => {
	const [form, setForm] = useState({
		email: process.env.NEXT_PUBLIC_TEST_EMAIL,
		password: process.env.NEXT_PUBLIC_TEST_PASSWORD,
	});
	// const { form, errors, setErrors, handleInputChange, handleSignIn } =
	//   useForm(initialForm);
	const { signIn } = AuthServices();

	const inputProps = [
		{
			id: 'idEmail',
			name: 'email',
			label: 'Email',
			icon: <EmailIcon />,
		},
		{
			id: 'idPassword',
			name: 'password',
			type: 'password',
			label: 'Password',
			icon: <LockIcon />,
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
		await signIn(form);
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
					sx={{ fontWeight: 'bold', mb: 2, display: { md: 'none' } }}
					variant='h4'
					color='primary'
					gutterBottom
				>
					WELCOME!
				</Typography>
				<Typography sx={{ maxWidth: 300, fontSize: 14, mb: 3 }} gutterBottom>
					Use your email and password to sign in:
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
					<Link href='/auth/forgot-password'>Forgot password?</Link>
				</Typography>
				<Button
					sx={{ width: '100%' }}
					variant='contained'
					type='submit'
					disabled={!(Object.keys(errors).length === 0)}
				>
					Sign In
				</Button>
			</Stack>
		</Box>
	);
};

export default FormSignIn;
