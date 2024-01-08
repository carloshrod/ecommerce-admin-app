import { Grid } from '@mui/material';
import { useUsersContext } from '@contexts/users/UsersContext';
import Details from '@components/data/Details';
import DetailsActions from '@components/ui/DetailsActions';
import UserInfo from '@components/data/UserInfo';

const CustomersDetails = () => {
	const { user } = useUsersContext();

	return (
		<Grid item xs={12}>
			<Details data={user}>
				<DetailsActions item={user} />
				<UserInfo user={user} />
			</Details>
		</Grid>
	);
};

export default CustomersDetails;
