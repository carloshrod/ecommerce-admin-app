import { Button, IconButton, Toolbar, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { useAuthContext } from '@contexts/auth/AuthContext';
import ToolTip from '@components/ui/ToolTip';
import { STAFF } from '@utils/routes';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import FormUser from '@components/forms/FormUser';
import useUserServices from '@services/useUserServices';
import FormProduct from '@components/forms/FormProduct';
import { setItemName } from '@components/utils';
import useProductServices from '@services/useProductServices';

const DataTableToolbar = ({ selected, setSelected }) => {
	const { isAdmin } = useAuthContext();
	const { toggleModal } = useGlobalContext();
	const { deleteProduct } = useProductServices();
	const { deleteUser } = useUserServices();
	const { pathname } = useRouter();
	const isProduct = pathname.includes('products');

	const numSelected = selected.length;
	const itemName = setItemName(pathname);

	const handleAdd = () => {
		toggleModal({
			title: `Add ${itemName}`,
			child: isProduct ? <FormProduct /> : <FormUser />,
		});
	};

	const handleDelete = async () => {
		if (isProduct) {
			await deleteProduct(selected);
		} else {
			await deleteUser(selected);
		}
		setSelected([]);
	};

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
					<IconButton onClick={handleDelete}>
						<DeleteIcon />
					</IconButton>
				</ToolTip>
			) : (
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
							Add {itemName}
						</Button>
					</span>
				</ToolTip>
			)}
		</Toolbar>
	);
};

export default DataTableToolbar;
