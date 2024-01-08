import { Skeleton } from '@mui/material';
import React from 'react';

const CustomSkeleton = ({ isFetched, variant, style, children }) => {
	if (isFetched) {
		return <>{children}</>;
	}

	if (variant) {
		return (
			<Skeleton variant={variant} animation='wave' sx={style}>
				{children}
			</Skeleton>
		);
	}

	return (
		<Skeleton variant='rounded' animation='wave' sx={{ ...style, m: 2 }} />
	);
};

export default CustomSkeleton;
