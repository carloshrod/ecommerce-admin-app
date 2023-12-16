import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewSharpIcon from '@mui/icons-material/PowerSettingsNewSharp';
import PersonIcon from '@mui/icons-material/Person';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { CUSTOMERS, DASHBOARD, PRODUCTS, SETTINGS, STAFF } from '@utils/routes';

// ********** Layout **********
export const sidebarMenu = [
	{
		id: 0,
		label: 'Dashboard',
		icon: <DashboardIcon />,
		path: DASHBOARD,
	},
	{
		id: 1,
		label: 'Products',
		icon: <InventoryIcon />,
		path: PRODUCTS,
	},
	{
		id: 2,
		label: 'Users',
		icon: <GroupIcon />,
		path: undefined,
	},
	{
		id: 5,
		label: 'Settings',
		icon: <SettingsIcon />,
		path: SETTINGS,
	},
	{
		id: 6,
		label: 'Logout',
		icon: <PowerSettingsNewSharpIcon />,
		path: undefined,
	},
];

export const sidebarUsersMenu = [
	{
		id: 3,
		label: 'Staff',
		icon: <EngineeringIcon />,
		path: STAFF,
	},
	{
		id: 4,
		label: 'Customers',
		icon: <PersonIcon />,
		path: CUSTOMERS,
	},
];

export const INDEXES = {
	'/admin/dashboard': 0,
	'/admin/products': 1,
	'/admin/settings': 5,
};

export const USERS_INDEXES = {
	'/admin/staff': 3,
	'/admin/staff/[id]': 3,
	'/admin/customers': 4,
	'/admin/customers/[id]': 4,
};

export const BG_IMAGES = {
	[SETTINGS]: '/bg-settings.jpg',
	[STAFF]: '/bg-staff.jpg',
	[CUSTOMERS]: '/bg-customers.jpg',
};
