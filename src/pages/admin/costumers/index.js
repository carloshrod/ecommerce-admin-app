import DataTable from '@components/data/DataTable';
import { useUsersContext } from '@contexts/users/UsersContext';
import { Grid } from '@mui/material';

const Costumers = () => {
	const { costumers } = useUsersContext();

	return (
		<Grid item xs={12}>
			<DataTable costumers={costumers} />
		</Grid>
	);
};

export default Costumers;
