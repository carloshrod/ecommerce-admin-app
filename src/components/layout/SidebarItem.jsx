import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import NavLink from '@components/ui/NavLink';
import ToolTip from '@components/ui/ToolTip';
import useScreen from '@hooks/useScreen';
import { setItemSelected } from '@components/utils';
import useAuthServices from '@services/useAuthServices';

const SidebarItem = ({ item, open, handleOpen }) => {
	const { logout } = useAuthServices();
	const { width } = useScreen();
	const { pathname } = useRouter();

	const ITEM_BTN_CLICKS = {
		Users: handleOpen,
		Logout: logout,
	};

	const isUser = item.label === 'Staff' || item.label === 'Customers';

	return (
		<NavLink href={item.path}>
			<ToolTip title={width < 600 ? item.label : null} placement='right'>
				<ListItemButton
					className={isUser ? 'sidebar--collapse' : ''}
					selected={setItemSelected(item, open, pathname)}
					onClick={ITEM_BTN_CLICKS[item.label]}
				>
					<ListItemIcon>{item.icon}</ListItemIcon>
					<ListItemText
						primary={item.label}
						primaryTypographyProps={{ style: { fontSize: '14px' } }}
					/>
					{item.label === 'Users' ? (
						<>
							{open ? (
								<ExpandLess className='expandIcon' />
							) : (
								<ExpandMore className='expandIcon' />
							)}
						</>
					) : null}
				</ListItemButton>
			</ToolTip>
		</NavLink>
	);
};

export default SidebarItem;
