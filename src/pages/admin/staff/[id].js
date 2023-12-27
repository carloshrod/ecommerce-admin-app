import { Grid } from '@mui/material';
import { useUsersContext } from '@contexts/users/UsersContext';
import Details from '@components/data/Details';
import DetailsActions from '@components/ui/DetailsActions';
import UserInfo from '@components/data/UserInfo';

const StaffDetails = () => {
	const { user } = useUsersContext();

	return (
		<Grid item xs={12}>
			<Details>
				<DetailsActions item={user} />
				<UserInfo user={user} />
			</Details>
		</Grid>
	);
};

export default StaffDetails;
