import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import CategoryIcon from '@mui/icons-material/Category';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import StyleIcon from '@mui/icons-material/Style';
import DescriptionIcon from '@mui/icons-material/Description';
import { ar, co, mx, us, ve } from './svgs';

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
		value: '5',
		label: 'Desktops',
	},
	{
		value: '5',
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
	countryCodeSm: 3.3,
	phoneNumberSm: 4.2,
	roleSm: 4.5,
	priceSm: 3.2,
	stockSm: 2.8,
	brandSm: 3,
	tagsSm: 9,
	descriptionSm: 12,
};
