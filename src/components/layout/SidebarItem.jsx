import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import NavLink from '@components/ui/NavLink';
import ToolTip from '@components/ui/ToolTip';
import useScreen from '@hooks/useScreen';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { isItemSelected } from '@components/utils';

const SidebarItem = ({ item, hideMenu, open, handleOpen }) => {
	const { signOut } = useAuthContext();
	const { width } = useScreen();
	const isSidebarHidden =
		(width < 1200 && hideMenu) || (width > 1200 && !hideMenu);
	const router = useRouter();

	const ITEM_BTN_CLICKS = {
		Users: handleOpen,
		Logout: signOut,
	};

	const addPaddingLeft =
		isSidebarHidden && (item.label === 'Staff' || item.label === 'Costumers')
			? 'iconPaddingLeft'
			: null;

	return (
		<NavLink href={item.path}>
			<ToolTip title={width < 600 ? item.label : null} placement='right'>
				<ListItemButton
					className={item.label === 'Logout' ? 'sidebar--logout' : null}
					selected={isItemSelected(item, open, router)}
					onClick={ITEM_BTN_CLICKS[item.label]}
				>
					<ListItemIcon className={addPaddingLeft}>{item.icon}</ListItemIcon>
					<ListItemText
						primary={item.label}
						primaryTypographyProps={{ style: { fontSize: '14px' } }}
					/>
					{item.label === 'Users' ? (
						<>
							{open ? (
								<ExpandLess
									className={`${isSidebarHidden ? null : 'expand'}`}
								/>
							) : (
								<ExpandMore
									className={`${isSidebarHidden ? null : 'expand'}`}
								/>
							)}
						</>
					) : null}
				</ListItemButton>
			</ToolTip>
		</NavLink>
	);
};

export default SidebarItem;
