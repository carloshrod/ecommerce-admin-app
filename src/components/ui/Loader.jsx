import { useEffect } from 'react';
import { Backdrop, Box, Typography } from '@mui/material';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import ProgressBar from './ProgressBar';

const Loader = () => {
	const { isLoading, redirectMsg, setRedirectMsg, progress } =
		useGlobalContext();

	useEffect(() => {
		if (!isLoading) {
			setRedirectMsg(null);
		}
	}, [isLoading]);

	return (
		<Backdrop
			className='loader'
			sx={{ zIndex: theme => theme.zIndex.drawer + 999 }}
			open={isLoading}
		>
			<Box
				sx={{
					display: 'flex',
					placeContent: 'center',
					position: 'relative',
					width: 250,
				}}
			>
				<span className='loader__logo'></span>
				{progress?.value ? (
					<ProgressBar value={progress?.value} index={progress?.index} />
				) : null}
				{redirectMsg ? (
					<Typography
						element='span'
						sx={{
							color: 'text.light',
							backgroundColor: 'primary.transparent',
							borderRadius: 2,
							py: 1.5,
							px: 3,
							position: 'absolute',
							top: 50,
						}}
					>
						{redirectMsg}
					</Typography>
				) : null}
			</Box>
		</Backdrop>
	);
};

export default Loader;
