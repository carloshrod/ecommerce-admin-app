import FormForgotPassword from '@components/forms/FormForgotPassword';
import { Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

const ForgotPassword = () => {
	return (
		<Grid container className='forgotPassword'>
			<Grid item md={7.4} className='forgotPassword__left'>
				<IconButton sx={{ position: 'fixed' }}>
					<Link href='/auth/signin'>
						<ArrowBackIcon />
					</Link>
				</IconButton>
			</Grid>
			<Grid item xs={12} md={4.6}>
				<FormForgotPassword />
			</Grid>
		</Grid>
	);
};

export default ForgotPassword;
