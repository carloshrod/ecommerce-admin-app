import { Grid } from '@mui/material';
import { useAuthContext } from '@contexts/auth/AuthContext';
import Details from '@components/data/Details';
import DetailsActions from '@components/ui/DetailsActions';
import UserInfo from '@components/data/UserInfo';

const Settings = () => {
	const { loggedUser } = useAuthContext();

	return (
		<Grid item xs={12}>
			<Details>
				<DetailsActions item={loggedUser} />
				<UserInfo user={loggedUser} />
			</Details>
		</Grid>
	);
};

export default Settings;
