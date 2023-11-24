import { Box, Stack, Typography, Button } from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Input from './Input';
import { formForgotPasswordProps, formSignInProps } from '@components/consts';
import { FORGOT_PASSWORD, SIGNIN } from '@utils/routes';
import authServices from '@services/authServices';

const signinInitialForm = {
	email: process.env.NEXT_PUBLIC_TEST_EMAIL,
	password: process.env.NEXT_PUBLIC_TEST_PASSWORD,
};

const FormAuth = () => {
	const { pathname } = useRouter();
	const isSignIn = pathname === SIGNIN;
	const initialForm = isSignIn ? signinInitialForm : { email: '' };
	const [form, setForm] = useState(initialForm);
	// const { form, errors, setErrors, handleInputChange, handleSignIn } =
	//   useForm(initialForm);
	const { signIn } = authServices();
	const { inputProps, title, paragraph, textLink, textBtn } = isSignIn
		? formSignInProps
		: formForgotPasswordProps;
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
					sx={{
						maxWidth: 300,
						fontWeight: 'bold',
						mb: 2,
						display: { md: `${isSignIn ? 'none' : 'block'}` },
					}}
					variant='h4'
					color='primary'
					gutterBottom
				>
					{title}
				</Typography>
				<Typography sx={{ maxWidth: 300, fontSize: 14, mb: 3 }} gutterBottom>
					{paragraph}
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
					<Link href={isSignIn ? FORGOT_PASSWORD : SIGNIN}>{textLink}</Link>
				</Typography>
				<Button
					sx={{ width: '100%' }}
					variant='contained'
					type='submit'
					disabled={!(Object.keys(errors).length === 0)}
				>
					{textBtn}
				</Button>
			</Stack>
		</Box>
	);
};

export default FormAuth;
