import { Grid, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import FormAuth from '@components/forms/FormAuth';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useGlobalContext } from '@contexts/global/GlobalContext';

const SignIn = () => {
	const { isLoading } = useGlobalContext();
	const { isAuth } = useAuthContext();
	const router = useRouter();

	useEffect(() => {
		if (isAuth && !isLoading) {
			router.push('/admin/dashboard');
		}
	}, [isAuth, isLoading]);

	return (
		<Grid container className='signIn'>
			<Grid item xs={12} md={4.6}>
				<IconButton sx={{ position: 'fixed' }}>
					<Link href='/'>
						<ArrowBackIcon />
					</Link>
				</IconButton>
				<FormAuth />
			</Grid>
			<Grid item md={7.4} className='signIn__right'>
				<Typography variant='h2' color='primary' gutterBottom>
					Welcome!
				</Typography>
				<Typography variant='h6' color='secondary' gutterBottom>
					Ecommerce Management App
				</Typography>
			</Grid>
		</Grid>
	);
};

export default SignIn;
