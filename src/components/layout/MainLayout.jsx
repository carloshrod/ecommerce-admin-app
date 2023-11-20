import { useGlobalContext } from '@contexts/global/GlobalContext';
import { Box, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const MainLayout = ({ children }) => {
	const { hideMenu } = useGlobalContext();
	const { pathname } = useRouter();
	const title = pathname.slice(7, 8).toUpperCase() + pathname.substring(8);

	return (
		<Box
			className={`myContainer ${hideMenu ? 'myContainer--left' : null}`}
			id={!hideMenu ? null : 'right'}
		>
			<Typography variant='h5'>{title}</Typography>
			<Grid container spacing={3} py={2}>
				{children}
			</Grid>
		</Box>
	);
};

export default MainLayout;
