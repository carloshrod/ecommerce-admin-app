import { Box, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import PowerSettingsNewSharpIcon from '@mui/icons-material/PowerSettingsNewSharp';
import ToolTip from '@components/ui/ToolTip';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthContext } from '@contexts/auth/AuthContext';
import ToggleSidebar from './ToggleSidebar';
import useAuthServices from '@services/useAuthServices';

const Header = () => {
	const { loggedUser } = useAuthContext();
	const { logout } = useAuthServices();
	const image = loggedUser?.avatar?.url || null;

	return (
		<Box component='header' className='header'>
			<Toolbar component='nav' className='header__toolbar'>
				<ToggleSidebar className='header__toggleSidebar' />
				<section className='header__logo'>
					<Image src='/ec-admin-logo.png' width='50' height='50' alt='logo' />
					<Typography variant='h5' component='div'>
						<span>ECOMMERCE</span> ADMIN
					</Typography>
				</section>
				<section className='header__options'>
					<ToolTip title='Settings'>
						<IconButton sx={{ p: 0 }}>
							<Link href='/admin/settings'>
								<Avatar alt='avatar' src={image} />
							</Link>
						</IconButton>
					</ToolTip>
					<ToolTip title='Logout '>
						<IconButton onClick={() => logout()}>
							<PowerSettingsNewSharpIcon />
						</IconButton>
					</ToolTip>
				</section>
			</Toolbar>
		</Box>
	);
};

export default Header;
