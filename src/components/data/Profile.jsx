import { BG_IMAGES } from '@components/consts';
import { Card, CardMedia, Grid } from '@mui/material';
import useUserServices from '@services/useUserServices';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Profile = ({ children }) => {
	const [isDataFetched, setIsDataFetched] = useState(false);
	const { getOneUser } = useUserServices();
	const {
		query: { id },
		pathname,
	} = useRouter();
	const bgImage = id ? pathname.slice(0, -5) : pathname;

	useEffect(() => {
		if (id) {
			getOneUser(id);
		}
		setTimeout(() => {
			setIsDataFetched(true);
		}, 100);
	}, [id]);

	return (
		<Grid item xs={12}>
			{!isDataFetched ? (
				<span>Loader...</span>
			) : (
				<Card className='profile'>
					<CardMedia
						component='img'
						height='300'
						image={BG_IMAGES[bgImage]}
						alt='header image'
						sx={{ bgcolor: 'azure' }}
					/>
					{children}
				</Card>
			)}
		</Grid>
	);
};

export default Profile;
