import { Box, Stack, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Input from './Input';
import { FORGOT_PASSWORD, SIGNIN } from '@utils/routes';
import useForm from '@hooks/useForm';
import { formSignInProps, formForgotPasswordProps } from './consts';
import validateAuth from '@validations/validateAuth';
import { useEffect } from 'react';

const signinInitialForm = {
	email: process.env.NEXT_PUBLIC_TEST_EMAIL,
	password: process.env.NEXT_PUBLIC_TEST_PASSWORD,
};

const FormAuth = () => {
	const { pathname } = useRouter();
	const isSignIn = pathname === SIGNIN;
	const initialForm = isSignIn ? signinInitialForm : { email: '' };
	const { form, errors, setErrors, handleInputChange, handleSubmitAuth } =
		useForm(initialForm);
	const { inputProps, title, paragraph, textLink, textBtn } = isSignIn
		? formSignInProps
		: formForgotPasswordProps;

	useEffect(() => {
		setErrors(validateAuth(form));
	}, [form]);

	return (
		<Box className='formAuth'>
			<Stack
				component='form'
				noValidate
				autoComplete='off'
				onSubmit={handleSubmitAuth}
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
							onChange={handleInputChange}
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
