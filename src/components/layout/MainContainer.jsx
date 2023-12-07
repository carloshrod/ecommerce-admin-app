import BreadCrumbs from '@components/ui/BreadCrumbs';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import { Box, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const MainContainer = ({ children }) => {
	const { hideMenu } = useGlobalContext();
	const {
		pathname,
		query: { id },
	} = useRouter();
	const title = pathname.slice(7, 8).toUpperCase() + pathname.substring(8);

	return (
		<Box
			className={`mainContainer ${hideMenu ? 'mainContainer--left' : null}`}
			id={!hideMenu ? null : 'right'}
		>
			{id ? (
				<BreadCrumbs title={title} pathname={pathname} />
			) : (
				<Typography variant='h5'>{title}</Typography>
			)}
			<Grid container spacing={3} py={2}>
				{children}
			</Grid>
		</Box>
	);
};

export default MainContainer;
