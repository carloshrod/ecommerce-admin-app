import { Box, Button } from '@mui/material';
import { HOME } from '@utils/routes';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => {
	return (
		<Box component='div' className='notFound404'>
			<Link href={HOME}>
				<Button variant='contained' color='primary'>
					Back
				</Button>
			</Link>
			<Image
				src='/404-not-found.svg'
				width='700'
				height='700'
				alt='404-not-found'
				priority='true'
			/>
		</Box>
	);
};

export default NotFoundPage;
