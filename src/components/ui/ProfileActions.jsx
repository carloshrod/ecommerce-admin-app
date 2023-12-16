import { CardActions, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PasswordIcon from '@mui/icons-material/Password';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import useUserServices from '@services/useUserServices';
import { useAuthContext } from '@contexts/auth/AuthContext';
import ToolTip from './ToolTip';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import FormUser from '@components/forms/FormUser';
import FormPassword from '@components/forms/FormPassword';
import { setItemName } from '@components/utils';

const ProfileActions = ({ user, isLoggedUser = false }) => {
	const { openModal } = useGlobalContext();
	const { isAdmin } = useAuthContext();
	const {
		pathname,
		query: { id },
	} = useRouter();
	const { deleteUser } = useUserServices();
	const itemName = setItemName(pathname, id);

	const handleEdit = () => {
		const modal = {
			state: true,
			title: `Edit ${id ? itemName : 'Profile'}`,
			child: <FormUser />,
		};
		openModal(modal, user);
	};

	const handleChangePassword = () => {
		const modal = {
			state: true,
			title: 'Change password',
			child: <FormPassword />,
		};
		openModal(modal);
	};

	return (
		<CardActions
			className='profileActions'
			sx={{ justifyContent: { xs: 'space-between', sm: 'end' }, p: 4 }}
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
					<IconButton
						aria-label={`delete ${itemName}`}
						onClick={async () => await deleteUser([id])}
					>
						<DeleteIcon />
					</IconButton>
				</ToolTip>
			)}
		</CardActions>
	);
};

export default ProfileActions;
