import DataTable from '@components/data/DataTable';
import { useUsersContext } from '@contexts/users/UsersContext';
import { Grid } from '@mui/material';

const Customers = () => {
	const { customers } = useUsersContext();

	return (
		<Grid item xs={12}>
			<DataTable customers={customers} />
		</Grid>
	);
};

export default Customers;
