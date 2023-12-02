import {
	Avatar,
	Box,
	CardContent,
	Chip,
	Grid,
	Switch,
	Typography,
} from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';
import useUserServices from '@services/useUserServices';
import ToolTip from '@components/ui/ToolTip';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { formatRoleName } from '@components/utils';

const Profile = ({ user, isLoggedUser = false }) => {
	const [checked, setChecked] = useState(!user?.disabled);
	const { roles, isAdmin } = useAuthContext();
	const { toggleUserStatus } = useUserServices();

	const userRole = roles.find(role => role?.id === user.role) ?? {};

	const handleChange = event => {
		setChecked(event.target.checked);
	};

	return (
		<CardContent sx={{ p: 3 }}>
			<Grid container className='myProfileContent'>
				<Grid
					item
					xs={12}
					sm={5}
					sx={{ textAlign: 'center', mt: { xs: -11, sm: -13 } }}
				>
					<Avatar
						alt='Superadmin'
						src={user?.avatar?.url || null}
						sx={{
							width: { xs: 120, sm: 150 },
							height: { xs: 120, sm: 150 },
							m: 'auto',
							mb: 1,
						}}
					/>
					<Box mb={2}>
						<Typography variant='h5'>{user?.displayName}</Typography>
						{isLoggedUser ? null : isAdmin ? (
							<ToolTip title={`${user?.disabled ? 'Enable' : 'Disable'} user`}>
								<Switch
									checked={checked}
									onChange={handleChange}
									inputProps={{ 'aria-label': 'toggle' }}
									onClick={() => toggleUserStatus(user)}
									color='success'
								/>
							</ToolTip>
						) : null}
					</Box>
					<Typography className='contact'>
						<EmailIcon />
						{user?.email}
					</Typography>
					<Typography className='contact'>
						<PhoneIphoneIcon />
						{user?.phoneNumber}
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					sm={7}
					sx={{ alignSelf: 'center', textAlign: 'justify' }}
				>
					<Chip
						label={formatRoleName(user.role, roles)}
						color='success'
						sx={{
							mx: 2,
							my: 1,
							'& .MuiChip-label': {
								color: '#f8fafc !important',
							},
						}}
					/>
					<Typography element={'p'} mx={2}>
						{userRole?.description}
					</Typography>
				</Grid>
			</Grid>
		</CardContent>
	);
};

export default Profile;
