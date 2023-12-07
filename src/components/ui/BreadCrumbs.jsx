import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';

const BreadCrumbs = ({ title, pathname }) => {
	const breadcrumbs = [
		<Link key='1' href={pathname.slice(0, -5)}>
			<Typography
				color='text.primary'
				sx={{ '&:hover': { color: 'text.secondary' } }}
			>
				{title.slice(0, -5)}
			</Typography>
		</Link>,
		<Typography key='2' color='primary' sx={{ fontWeight: 600 }}>
			Details
		</Typography>,
	];

	return (
		<Stack spacing={2}>
			<Breadcrumbs
				separator={<NavigateNextIcon fontSize='small' />}
				aria-label='breadcrumb'
			>
				{breadcrumbs}
			</Breadcrumbs>
		</Stack>
	);
};

export default BreadCrumbs;
