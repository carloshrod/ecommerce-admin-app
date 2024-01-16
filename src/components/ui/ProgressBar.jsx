import { Box, LinearProgress, Typography } from '@mui/material';

const ProgressBar = props => {
	return (
		<Box sx={{ width: '200px', position: 'absolute', top: 50 }}>
			<Typography
				element='span'
				sx={{
					textAlign: 'center',
					fontSize: 14,
					fontWeight: 800,
					color: 'text.light',
				}}
			>
				UPLOADING FILE {props?.index}
			</Typography>
			<Box sx={{ display: 'grid', placeItems: 'center' }}>
				<Box
					sx={{
						width: '100%',
						'& .MuiLinearProgress-root': { height: '12px', borderRadius: 1 },
					}}
				>
					<LinearProgress variant='determinate' {...props} />
				</Box>
				<Box sx={{ minWidth: 35 }}>
					<Typography
						variant='body2'
						color='text.light'
						sx={{ fontWeight: 600 }}
					>{`${Math.round(props?.value)}%`}</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default ProgressBar;
