import { Card, CardMedia, Grid } from '@mui/material';
import useUserServices from '@services/useUserServices';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Profile = ({ children }) => {
	const [isDataFetched, setIsDataFetched] = useState(false);
	const { getOneUser } = useUserServices();
	const {
		query: { id },
	} = useRouter();

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
						image='/bg-user-info.jpg'
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
