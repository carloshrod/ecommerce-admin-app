import { CardActions, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PasswordIcon from '@mui/icons-material/Password';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import { useAuthContext } from '@contexts/auth/AuthContext';
import FormUser from '@components/forms/FormUser';
import FormProduct from '@components/forms/FormProduct';
import FormGeneric from '@components/forms/FormGeneric';
import ToolTip from './ToolTip';
import useProductServices from '@services/useProductServices';
import useUserServices from '@services/useUserServices';
import useSkeleton from '@hooks/useSkeleton';
import { setItemName } from '@components/utils';

const DetailsActions = ({ item, isLoggedUser = false }) => {
	const { toggleModal } = useGlobalContext();
	const { isAdmin } = useAuthContext();
	const { deleteProduct } = useProductServices();
	const { deleteUser } = useUserServices();
	const { isFetched } = useSkeleton(item);
	const {
		pathname,
		query: { id },
	} = useRouter();
	const itemName = setItemName(pathname, id);
	const isProduct = pathname.includes('products');

	const handleEdit = () => {
		const modal = {
			title: `Edit ${id ? itemName : 'Profile'}`,
			child: isProduct ? <FormProduct /> : <FormUser />,
		};
		toggleModal(modal, item);
	};

	const handleChangePassword = () => {
		const modal = {
			title: 'Change password',
			child: <FormGeneric item='password' />,
		};
		toggleModal(modal);
	};

	const handleDelete = async () => {
		if (isProduct) {
			await deleteProduct([id]);
		} else {
			await deleteUser([id]);
		}
	};

	return isFetched ? (
		<CardActions
			className='actions'
			sx={{
				justifyContent: { xs: 'space-between', sm: 'end' },
				px: 4,
				top: {
					xs: `${isProduct ? '120px !important' : '190px !important'}`,
					sm: '200px !important',
				},
			}}
		>
			{isAdmin || isLoggedUser ? (
				<ToolTip title='Edit'>
					<IconButton aria-label='edit' onClick={handleEdit}>
						<EditIcon />
					</IconButton>
				</ToolTip>
			) : null}
			{!id && (
				<ToolTip title='Change password'>
					<IconButton
						aria-label='change password'
						onClick={handleChangePassword}
					>
						<PasswordIcon />
					</IconButton>
				</ToolTip>
			)}
			{id && isAdmin && (
				<ToolTip title='Delete'>
					<IconButton aria-label={`delete ${itemName}`} onClick={handleDelete}>
						<DeleteIcon />
					</IconButton>
				</ToolTip>
			)}
		</CardActions>
	) : null;
};

export default DetailsActions;
