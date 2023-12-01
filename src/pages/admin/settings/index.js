import { Card, CardMedia, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import Profile from '@components/data/Profile';
import ProfileActions from '@components/ui/ProfileActions';
import { useAuthContext } from '@contexts/auth/AuthContext';

const Settings = () => {
	const [isDataFetched, setIsDataFetched] = useState(false);
	const { loggedUser } = useAuthContext();

	useEffect(() => {
		setTimeout(() => {
			setIsDataFetched(true);
		}, 100);
	}, []);

	return (
		<Grid item xs={12}>
			{!isDataFetched ? (
				<span>Loader...</span>
			) : (
				<Card className='myProfile'>
					<CardMedia
						component='img'
						height='300'
						image='/bg-user-info.jpg'
						alt='header image'
						sx={{ bgcolor: 'azure' }}
					/>
					<ProfileActions user={loggedUser} isLoggedUser={true} />
					<Profile user={loggedUser} isLoggedUser={true} />
				</Card>
			)}
		</Grid>
	);
};

export default Settings;
