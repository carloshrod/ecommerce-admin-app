import { Grid } from '@mui/material';
import { useAuthContext } from '@contexts/auth/AuthContext';
import Profile from '@components/data/Profile';
import ProfileActions from '@components/ui/ProfileActions';
import ProfileInfo from '@components/data/ProfileInfo';

const Settings = () => {
	const { loggedUser } = useAuthContext();

	return (
		<Grid item xs={12}>
			<Profile>
				<ProfileActions user={loggedUser} />
				<ProfileInfo user={loggedUser} />
			</Profile>
		</Grid>
	);
};

export default Settings;
