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
import { useEffect, useState } from 'react';
import useUserServices from '@services/useUserServices';
import ToolTip from '@components/ui/ToolTip';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { formatRoleName } from '@components/utils';
import { useRouter } from 'next/router';
import { SETTINGS } from '@utils/routes';

const UserInfo = ({ user }) => {
	const [checked, setChecked] = useState(!user?.disabled);
	const { roles, isAdmin } = useAuthContext();
	const { toggleUserStatus } = useUserServices();
	const { displayName, email, countryCode, phoneNumber, role, disabled } =
		user ?? {};
	const userRole = roles.find(r => r?.id === role) ?? {};
	const { pathname } = useRouter();
	const isSettings = pathname === SETTINGS;

	useEffect(() => {
		setChecked(!disabled);
	}, [user]);

	const handleChange = event => {
		setChecked(event.target.checked);
	};

	return (
		<CardContent sx={{ p: 3 }}>
			<Grid container className='userInfo'>
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
						<Typography variant='h5'>{displayName}</Typography>
						{isSettings ? null : isAdmin ? (
							<ToolTip title={`${disabled ? 'Enable' : 'Disable'} user`}>
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
						{email}
					</Typography>
					<Typography className='contact'>
						<PhoneIphoneIcon />
						{`${countryCode} ${phoneNumber}`}
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					sm={7}
					sx={{ alignSelf: 'center', textAlign: 'justify' }}
				>
					<Chip
						label={formatRoleName(role, roles)}
						color='success'
						sx={{
							mx: 2,
							my: 1,
							'& .MuiChip-label': {
								color: '#f8fafc !important',
							},
						}}
					/>
					<Typography element={'p'} mx={2} sx={{ fontWeight: 300 }}>
						{userRole?.description}
					</Typography>
				</Grid>
			</Grid>
		</CardContent>
	);
};

export default UserInfo;
