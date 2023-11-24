import { Button, IconButton, Toolbar, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { useAuthContext } from '@contexts/auth/AuthContext';
// import UserServices from '../../services/UserServices';
import ToolTip from '@components/ui/ToolTip';
import { COSTUMERS, PRODUCTS, STAFF } from '@utils/routes';
import { useGlobalContext } from '@contexts/global/GlobalContext';

const DataTableToolbar = ({ selected, setSelected }) => {
	const { isAdmin } = useAuthContext();
	const { pathname } = useRouter();
	const { openModal } = useGlobalContext();
	// const { deleteStaff } = UserServices();
	const isProduct = pathname === PRODUCTS;
	const numSelected = selected.length;

	const handleAdd = () => {
		const title = `Add ${isProduct ? 'Product' : 'Staff'}`;
		openModal(title, <div>Form</div>);
	};

	// const handleDelete = async data => {
	// 	await deleteStaff(data);
	// 	setSelected([]);
	// };

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: theme =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity,
						),
				}),
				justifyContent: 'space-between',
				flexWrap: 'wrap',
				gap: 2,
			}}
		>
			{numSelected > 0 ? (
				<Typography color='inherit' variant='subtitle1' component='div'>
					{numSelected} selected
				</Typography>
			) : pathname === STAFF ? (
				// <FloatingActionsBtn action />
				'FloatingActions'
			) : (
				'Filter'
			)}

			{numSelected > 0 ? (
				<ToolTip title='Delete'>
					<IconButton
					// onClick={() => handleDelete(selected)}
					>
						<DeleteIcon />
					</IconButton>
				</ToolTip>
			) : pathname === COSTUMERS ? null : (
				<ToolTip title={isAdmin ? '' : 'Allowed for admins only'}>
					<span>
						<Button
							sx={{
								width: '180px',
								fontSize: { xs: 12, sm: 14 },
								cursor: `${!isAdmin && 'not-allowed'}`,
							}}
							variant='outlined'
							color='primary'
							onClick={handleAdd}
							disabled={!isAdmin}
						>
							Add {pathname.slice(7)}
						</Button>
					</span>
				</ToolTip>
			)}
		</Toolbar>
	);
};

export default DataTableToolbar;
