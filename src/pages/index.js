import { Box, Button, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';
import { SIGNIN } from '@utils/routes';

export default function Home() {
	return (
		<Box className='home'>
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
			<Link href={SIGNIN}>
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
