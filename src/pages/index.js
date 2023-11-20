import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import LoginIcon from '@mui/icons-material/Login';

export default function Home() {
	return (
		<Box className='home' sx={{ padding: 15 }}>
			<Typography
				sx={{ fontWeight: 'bold' }}
				variant='h1'
				color='primary'
				gutterBottom
			>
				Welcome!
			</Typography>
			<Typography
				sx={{ display: 'block', paddingBottom: 2 }}
				variant='h4'
				color='secondary'
				gutterBottom
			>
				Ecommerce Management App
			</Typography>
			<Link href='/auth/signin'>
				<Button
					variant='contained'
					size='large'
					endIcon={<LoginIcon sx={{ color: '#e2e8f0 !important' }} />}
				>
					Signin
				</Button>
			</Link>
		</Box>
	);
}
