import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewSharpIcon from '@mui/icons-material/PowerSettingsNewSharp';
import PersonIcon from '@mui/icons-material/Person';
import EngineeringIcon from '@mui/icons-material/Engineering';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { COSTUMERS, DASHBOARD, PRODUCTS, SETTINGS, STAFF } from '@utils/routes';

export const formSignInProps = {
	inputProps: [
		{
			id: 'idEmail',
			name: 'email',
			label: 'Email',
			icon: <EmailIcon />,
		},
		{
			id: 'idPassword',
			name: 'password',
			type: 'password',
			label: 'Password',
			icon: <LockIcon />,
		},
	],
	title: 'Welcome!',
	paragraph: 'Use your email and password to sign in:',
	textLink: 'Forgot password?',
	textBtn: 'Sign in',
};

export const formForgotPasswordProps = {
	inputProps: [
		{
			id: 'idEmail',
			name: 'email',
			label: 'Email',
			icon: <EmailIcon />,
		},
	],
	title: 'Forgot your password?',
	paragraph:
		'Enter your email and we will send you a link to reset your password:',
	textLink: 'Do you want to sign in?',
	textBtn: 'Send',
};

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
		label: 'Costumers',
		icon: <PersonIcon />,
		path: COSTUMERS,
	},
];

export const INDEXES = {
	'/admin/dashboard': 0,
	'/admin/products': 1,
	'/admin/settings': 5,
};

export const USERS_INDEXES = {
	'/admin/staff': 3,
	'/admin/costumers': 4,
};
