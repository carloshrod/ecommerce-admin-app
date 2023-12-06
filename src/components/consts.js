import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewSharpIcon from '@mui/icons-material/PowerSettingsNewSharp';
import PersonIcon from '@mui/icons-material/Person';
import EngineeringIcon from '@mui/icons-material/Engineering';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { CUSTOMERS, DASHBOARD, PRODUCTS, SETTINGS, STAFF } from '@utils/routes';
import { ar, co, mx, us, ve } from './forms/svgs';

// ********** Forms **********
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

export const countryCodes = [
	{
		value: '+1',
		label: 'United States',
		flag: us,
	},
	{
		value: '+52',
		label: 'Mexico',
		flag: mx,
	},
	{
		value: '+54',
		label: 'Argentina',
		flag: ar,
	},
	{
		value: '+57',
		label: 'Colombia',
		flag: co,
	},
	{
		value: '+58',
		label: 'Venezuela',
		flag: ve,
	},
];

export const inputUserProps = [
	{
		id: 'idName',
		name: 'displayName',
		label: 'Name',
		icon: <PersonIcon />,
		placeholder: 'User name',
	},
	{
		id: 'idEmail',
		name: 'email',
		label: 'Email',
		icon: <EmailIcon />,
		placeholder: 'example@mail.com',
	},
	{
		id: 'idCountryCode',
		name: 'countryCode',
		label: 'Country code',
		icon: <PublicIcon />,
		type: 'select',
		options: countryCodes,
	},
	{
		id: 'idPhone',
		name: 'phoneNumber',
		label: 'Phone number',
		icon: <PhoneIphoneIcon />,
		placeholder: '(123) 456-7890',
		// mask: `(999) 999-9999`,
	},
	{
		id: 'idRole',
		name: 'role',
		label: 'Select a role',
		icon: <AssignmentIndIcon />,
		type: 'select',
	},
];

export const inputPasswordProps = [
	{
		id: 'idCurrentPassword',
		name: 'currentPassword',
		label: 'Current Password',
		icon: <LockIcon />,
		placeholder: 'Enter current password',
		type: 'password',
	},
	{
		id: 'idNewPassword',
		name: 'newPassword',
		label: 'New Password',
		icon: <LockIcon />,
		placeholder: 'Enter new password',
		type: 'password',
	},
	{
		id: 'idRenewPassword',
		name: 'renewPassword',
		label: 'New Password',
		icon: <LockIcon />,
		placeholder: 'Re-enter new password',
		type: 'password',
	},
];

export const ITEMS_WIDTH = {
	countryCodeXs: 4,
	countryCodeSm: 3.3,
	phoneNumberXs: 8,
	phoneNumberSm: 4.2,
	roleSm: 4.5,
};

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
	'/admin/customers': 4,
};
