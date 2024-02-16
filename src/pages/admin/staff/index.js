import DataTable from '@components/data/DataTable';
import { useUsersContext } from '@contexts/users/UsersContext';
import { Grid } from '@mui/material';
import withUserRoleCheck from '@pages/_withUserRoleCheck';

const Staff = () => {
	const { staff } = useUsersContext();

	return (
		<Grid item xs={12}>
			<DataTable staff={staff} />
		</Grid>
	);
};

export default withUserRoleCheck(Staff, 'admin');
