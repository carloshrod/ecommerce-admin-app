import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { countryCodes } from './consts';
import { setOptions } from '@components/utils';

export const generateInputUserProps = (roles, pathname) => {
	let arrayOptions = setOptions(roles);

	if (pathname.includes('staff') || pathname.includes('settings')) {
		arrayOptions = arrayOptions.filter(
			item => item.label.toLowerCase() !== 'customer',
		);
	} else {
		arrayOptions = arrayOptions.filter(
			item => item.label.toLowerCase() === 'customer',
		);
	}

	return [
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
			mask: `(999) 999-9999`,
		},
		{
			id: 'idRole',
			name: 'role',
			label: 'Select a role',
			icon: <AssignmentIndIcon />,
			type: 'select',
			options: arrayOptions,
		},
	];
};
