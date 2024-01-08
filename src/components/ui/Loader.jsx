import { useEffect } from 'react';
import { Backdrop, Typography } from '@mui/material';
import { useGlobalContext } from '@contexts/global/GlobalContext';

const Loader = () => {
	const { isLoading, redirectMsg, setRedirectMsg } = useGlobalContext();

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
			<span className='loader__logo'></span>
			{redirectMsg ? (
				<Typography
					element='span'
					sx={{
						color: 'text.light',
						backgroundColor: 'primary.transparent',
						borderRadius: 2,
						py: 1.5,
						px: 3,
						position: 'fixed',
						bottom: '38%',
					}}
				>
					{redirectMsg}
				</Typography>
			) : null}
		</Backdrop>
	);
};

export default Loader;
