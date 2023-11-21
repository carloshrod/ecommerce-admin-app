import { Box, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';

const Footer = () => {
	return (
		<Box component='footer' className='footer'>
			<div>
				<Typography component='span'>Developed by</Typography>
				<Link
					href='https://github.com/carloshrod'
					target='_blank'
					rel='noopener noreferrer'
				>
					CHRod <GitHubIcon />
				</Link>
			</div>
		</Box>
	);
};

export default Footer;
