import { Box, Grid, Typography } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';

const NotAllowed = () => {
	return (
		<Grid item xs={12}>
			<Box
				sx={{
					height: 300,
					width: '100%',
					mb: 2,
					px: 2,
					py: 1,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Typography variant='h3'>
					<BlockIcon sx={{ fontSize: 50, color: '#dc2626 !important' }} />
					You are not allowed to see this info
					<BlockIcon sx={{ fontSize: 50, color: '#dc2626 !important' }} />
				</Typography>
			</Box>
		</Grid>
	);
};

export default NotAllowed;
