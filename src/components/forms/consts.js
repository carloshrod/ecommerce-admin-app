import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import CategoryIcon from '@mui/icons-material/Category';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import StyleIcon from '@mui/icons-material/Style';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { ar, co, mx, us, ve } from './svgs';
import validateEmptyField from '@validations/validateEmptyField';
import validatePassword from '@validations/validatePassword';
import { setOptions } from '@components/utils';

// *************** Options ***************
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

export const categories = [
	{
		value: '1',
		label: 'Components',
	},
	{
		value: '2',
		label: 'Peripherals and Accessories',
	},
	{
		value: '3',
		label: 'Computers',
	},
];

export const subCategories = [
	{
		value: '1',
		label: 'CPUs',
	},
	{
		value: '2',
		label: 'Motherboards',
	},
	{
		value: '3',
		label: 'RAM Memories',
	},
	{
		value: '4',
		label: 'Graphic Cards',
	},
	{
		value: '5',
		label: 'HDDs',
	},
	{
		value: '6',
		label: 'Cases',
	},
	{
		value: '7',
		label: 'Power Supplies',
	},
	{
		value: '8',
		label: 'Monitors',
	},
	{
		value: '9',
		label: 'Keyboards',
	},
	{
		value: '10',
		label: 'Mice',
	},
	{
		value: '11',
		label: 'Audio',
	},
	{
		value: '12',
		label: 'Streaming',
	},
	{
		value: '13',
		label: 'Desktops',
	},
	{
		value: '14',
		label: 'Laptops',
	},
];

export const tags = [
	{
		value: '1',
		label: 'gaming',
	},
	{
		value: '2',
		label: 'laptop',
	},
	{
		value: '3',
		label: 'desktop',
	},
	{
		value: '4',
		label: 'intel',
	},
	{
		value: '5',
		label: 'amd',
	},
	{
		value: '6',
		label: '8gb ram',
	},
	{
		value: '7',
		label: '16gb ram',
	},
	{
		value: '8',
		label: 'motherboard',
	},
	{
		value: '9',
		label: 'graphic card',
	},
	{
		value: '10',
		label: 'sale',
	},
];

export const permissions = [
	{
		value: 'manageStaff',
		label: 'Manage staff',
	},
	{
		value: 'manageCustomers',
		label: 'Manage customers',
	},
	{
		value: 'manageProducts',
		label: 'Manage products',
	},
	{
		value: 'manageOrders',
		label: 'Manage orders',
	},
];

// *************** InitialForms ***************
export const signinInitialForm = {
	email: process.env.NEXT_PUBLIC_TEST_EMAIL,
	password: process.env.NEXT_PUBLIC_TEST_PASSWORD,
};

export const productInitialForm = {
	displayName: '',
	price: '',
	stock: '',
	brand: '',
	category: '',
	subCategory: '',
	tags: [],
	description: '',
};

export const categoryInitialForm = {
	displayName: '',
};

export const subCategoryInitialForm = {
	displayName: '',
	mainCategory: '',
};

export const userInitialForm = {
	displayName: '',
	email: '',
	countryCode: '',
	phoneNumber: '',
	role: '',
};

export const roleInitialForm = {
	displayName: '',
	permissions: [],
	description: '',
};

export const passwordInitialForm = {
	currentPassword: '',
	newPassword: '',
	renewPassword: '',
};

// *************** InputProps ***************
export const inputProductProps = [
	{
		id: 'idName',
		name: 'displayName',
		label: 'Name',
		icon: <InventoryIcon />,
		placeholder: 'Product name',
	},
	{
		id: 'idPrice',
		name: 'price',
		label: 'Price',
		icon: <AttachMoneyIcon />,
		placeholder: '99.00',
	},
	{
		id: 'idStock',
		name: 'stock',
		label: 'Stock',
		icon: <InventoryOutlinedIcon />,
		placeholder: '999',
	},
	{
		id: 'idCategory',
		name: 'category',
		label: 'Category',
		icon: <CategoryIcon />,
		type: 'select',
		options: categories,
	},
	{
		id: 'idSubCategory',
		name: 'subCategory',
		label: 'Subcategory',
		icon: <CategoryOutlinedIcon />,
		type: 'select',
		options: subCategories,
	},
	{
		id: 'idBrand',
		name: 'brand',
		label: 'Brand',
		icon: <BrandingWatermarkIcon />,
		placeholder: 'Generic',
	},
	{
		id: 'idTags',
		name: 'tags',
		label: 'Tags',
		icon: <StyleIcon />,
		type: 'select',
		options: tags,
		multiple: true,
	},
	{
		id: 'idDescription',
		name: 'description',
		label: 'Description',
		icon: <DescriptionIcon />,
		placeholder: 'Product description',
		multiline: true,
	},
];

export const inputCategoryProps = [
	{
		id: 'idName',
		name: 'displayName',
		label: 'Name',
		icon: <CategoryIcon />,
		placeholder: 'Category name',
	},
];

export const inputSubCategoryProps = categories => [
	{
		id: 'idName',
		name: 'displayName',
		label: 'Name',
		icon: <CategoryOutlinedIcon />,
		placeholder: 'Subcategory name',
	},
	{
		id: 'idMainCategory',
		name: 'mainCategory',
		label: 'Main category',
		icon: <CategoryIcon />,
		type: 'select',
		options: setOptions(categories),
	},
];

export const inputUserProps = roles => [
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
	},
	{
		id: 'idRole',
		name: 'role',
		label: 'Select a role',
		icon: <AssignmentIndIcon />,
		type: 'select',
		options: setOptions(roles),
	},
];

export const inputRoleProps = [
	{
		id: 'idName',
		name: 'displayName',
		label: 'Name',
		icon: <AccountBoxIcon />,
		placeholder: 'Role name',
	},
	{
		id: 'idPermissions',
		name: 'permissions',
		label: 'Permissions',
		icon: <AdminPanelSettingsIcon />,
		type: 'select',
		options: permissions,
		multiple: true,
	},
	{
		id: 'idDescription',
		name: 'description',
		label: 'Description',
		icon: <DescriptionIcon />,
		placeholder: 'Role description',
		multiline: true,
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

// *************** FormProps ***************
export const formSignInProps = {
	initialForm: signinInitialForm,
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
	initialForm: { email: '' },
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

export const formCategoryProps = {
	initialForm: categoryInitialForm,
	inputProps: inputCategoryProps,
	validateForm: validateEmptyField,
};

export const formSubCategoryProps = {
	initialForm: subCategoryInitialForm,
	inputProps: inputSubCategoryProps,
	validateForm: validateEmptyField,
};

export const formRoleProps = {
	initialForm: roleInitialForm,
	inputProps: inputRoleProps,
	validateForm: validateEmptyField,
};

export const formPasswordProps = {
	initialForm: passwordInitialForm,
	inputProps: inputPasswordProps,
	validateForm: validatePassword,
};

// *************** InputWidths ***************
export const ITEMS_WIDTH = {
	countryCodeSm: 3.3,
	phoneNumberSm: 4.2,
	roleSm: 4.5,
	priceSm: 3.2,
	stockSm: 2.8,
	categorySm: 4.5,
	subCategorySm: 4.5,
	brandSm: 3,
	tagsSm: 12,
	descriptionSm: 12,
};
