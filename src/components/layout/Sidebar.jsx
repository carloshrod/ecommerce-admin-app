import {
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewSharpIcon from '@mui/icons-material/PowerSettingsNewSharp';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import EngineeringIcon from '@mui/icons-material/Engineering';
import NavLink from '@components/ui/NavLink';
import ToolTip from '@components/ui/ToolTip';
import useScrollY from '@hooks/useScroll';
import useScreen from '@hooks/useScreen';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import { useAuthContext } from '@contexts/auth/AuthContext';

const Sidebar = () => {
	const [open, setOpen] = useState(false);
	const { signOut } = useAuthContext();
	const { hideMenu } = useGlobalContext();
	const { scrollY } = useScrollY();
	const { width } = useScreen();
	const { pathname } = useRouter();
	const id = 'AS42sdf';

	const handleClick = () => {
		setOpen(!open);
	};

	const menu = [
		{
			label: 'Dashboard',
			icon: <DashboardIcon />,
			path: '/admin/dashboard',
			onClick: null,
		},
		{
			label: 'Products',
			icon: <InventoryIcon />,
			path: '/admin/products',
			onClick: null,
		},
		{
			label: 'Users',
			icon: <GroupIcon />,
			path: undefined,
			onClick: handleClick,
		},
		{
			label: 'Settings',
			icon: <SettingsIcon />,
			path: '/admin/settings',
			onClick: null,
		},
		{
			label: 'Logout',
			icon: <PowerSettingsNewSharpIcon />,
			path: undefined,
			onClick: signOut,
		},
	];

	const INDEXES = {
		'/admin/dashboard': 0,
		'/admin/products': 1,
		'/admin/settings': 3,
	};

	const USERS_INDEXES = {
		'/admin/staff': 4,
		'/admin/costumers': 5,
	};

	const usersLinkSelected =
		pathname === `/admin/staff/${id}` ? 4 : USERS_INDEXES[pathname];

	const isHidden = (width < 1200 && hideMenu) || (width > 1200 && !hideMenu);

	const usersIsSelected = usersLinkSelected === 4 || usersLinkSelected === 5;

	return (
		<aside
			className={`sidebar ${hideMenu ? 'sidebar--hide' : null} `}
			id={!hideMenu ? null : 'show'}
		>
			<List component='nav' aria-label='main sidebar'>
				{menu
					.filter(item => (scrollY < 70 ? item.label !== 'Logout' : item))
					.map((item, i) => (
						<div key={i}>
							<NavLink href={item.path}>
								<ToolTip
									title={width < 600 ? item.label : null}
									placement='right'
								>
									<ListItemButton
										className={
											item.label === 'Logout' ? 'sidebar--logout' : null
										}
										selected={
											item.label === 'Users' && !open
												? usersIsSelected
												: INDEXES[pathname] === i
										}
										onClick={
											item.label === 'Logout' || item.label === 'Users'
												? () => item.onClick()
												: null
										}
									>
										<ListItemIcon>{item.icon}</ListItemIcon>
										<ListItemText primary={item.label} />
										{item.label === 'Users' ? (
											<>
												{open ? (
													<ExpandLess
														className={`${isHidden ? null : 'expand'}`}
													/>
												) : (
													<ExpandMore
														className={`${isHidden ? null : 'expand'}`}
													/>
												)}
											</>
										) : null}
									</ListItemButton>
								</ToolTip>
							</NavLink>
							{item.label === 'Users' ? (
								<Collapse in={open} timeout='auto' unmountOnExit>
									<NavLink href='/admin/staff'>
										<ToolTip
											title={width < 600 ? 'Staff' : null}
											placement='right'
										>
											<ListItemButton
												className='collapseButton'
												selected={usersLinkSelected === 4}
											>
												<ListItemIcon>
													<EngineeringIcon
														className={`${isHidden ? 'collapseIcon' : null}`}
													/>
												</ListItemIcon>
												<ListItemText primary='Staff' />
											</ListItemButton>
										</ToolTip>
									</NavLink>
									<NavLink href='/admin/costumers'>
										<ToolTip
											title={width < 600 ? 'Costumers' : null}
											placement='right'
										>
											<ListItemButton
												className='collapseButton'
												selected={usersLinkSelected === 5}
											>
												<ListItemIcon>
													<PersonIcon
														className={`${isHidden ? 'collapseIcon' : null}`}
													/>
												</ListItemIcon>
												<ListItemText primary='Costumers' />
											</ListItemButton>
										</ToolTip>
									</NavLink>
								</Collapse>
							) : null}
						</div>
					))}
			</List>
		</aside>
	);
};

export default Sidebar;
