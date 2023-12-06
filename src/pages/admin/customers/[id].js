import { Grid } from '@mui/material';
import { useUsersContext } from '@contexts/users/UsersContext';
import Profile from '@components/data/Profile';
import ProfileActions from '@components/ui/ProfileActions';
import ProfileInfo from '@components/data/ProfileInfo';

const CustomersDetails = () => {
	const { user } = useUsersContext();

	return (
		<Grid item xs={12}>
			<Profile>
				<ProfileActions user={user} />
				<ProfileInfo user={user} />
			</Profile>
		</Grid>
	);
};

export default CustomersDetails;
