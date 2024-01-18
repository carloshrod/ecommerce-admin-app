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
import { findRoleInfo, normalizeName } from '@components/utils';
import { useRouter } from 'next/router';
import { SETTINGS } from '@utils/routes';
import CustomSkeleton from '@components/ui/CustomSkeleton';
import useSkeleton from '@hooks/useSkeleton';

const UserInfo = ({ user }) => {
	const [checked, setChecked] = useState(!user?.disabled);
	const { roles, isAdmin } = useAuthContext();
	const { toggleUserStatus } = useUserServices();
	const { isFetched } = useSkeleton(user);
	const {
		displayName,
		email,
		countryCode,
		phoneNumber,
		role,
		disabled,
		avatar,
	} = user ?? {};
	const userRole = findRoleInfo(role, roles) ?? {};
	const roleName = normalizeName(userRole?.displayName) ?? '';
	const { pathname } = useRouter();
	const isSettings = pathname === SETTINGS;

	useEffect(() => {
		setChecked(!disabled);
	}, [user]);

	const handleChange = event => {
		setChecked(event.target.checked);
	};

	const avatarStyle = {
		width: { xs: 120, sm: 150 },
		height: { xs: 120, sm: 150 },
		m: 'auto',
		mb: 1,
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
					<CustomSkeleton
						isFetched={isFetched}
						variant='circular'
						style={avatarStyle}
					>
						<Avatar
							alt='Superadmin'
							src={avatar ?? undefined}
							sx={avatarStyle}
						/>
					</CustomSkeleton>
					<Box mb={2}>
						<CustomSkeleton isFetched={isFetched}>
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
						</CustomSkeleton>
					</Box>
					<CustomSkeleton isFetched={isFetched} style={{ height: 50 }}>
						<Typography className='contact'>
							<EmailIcon />
							{email}
						</Typography>
						<Typography className='contact'>
							<PhoneIphoneIcon />
							{`${countryCode} ${phoneNumber}`}
						</Typography>
					</CustomSkeleton>
				</Grid>
				<Grid
					item
					xs={12}
					sm={7}
					sx={{ alignSelf: 'center', textAlign: 'justify' }}
				>
					<CustomSkeleton isFetched={isFetched}>
						<Chip
							label={roleName || 'No role assigned'}
							color={`${roleName ? 'success' : 'warning'}`}
							sx={{
								mx: 2,
								my: 1,
								'& .MuiChip-label': {
									color: '#f8fafc !important',
								},
							}}
						/>
					</CustomSkeleton>
					<CustomSkeleton isFetched={isFetched} style={{ height: 100 }}>
						<Typography element={'p'} mx={2} sx={{ fontWeight: 300 }}>
							{userRole?.description}
						</Typography>
					</CustomSkeleton>
				</Grid>
			</Grid>
		</CardContent>
	);
};

export default UserInfo;
