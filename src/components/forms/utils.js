import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { ITEMS_WIDTH, countryCodes } from './consts';
import { setOptions } from '@components/utils';
import { Grid } from '@mui/material';
import Input from './Input';
import InputSelect from './InputSelect';

export const generateInputUserProps = (roles, pathname) => {
	let arrayOptions = setOptions(roles);

	if (pathname.includes('staff') || pathname.includes('settings')) {
		arrayOptions = arrayOptions.filter(
			item => item?.label?.toLowerCase() !== 'customer',
		);
	} else {
		arrayOptions = arrayOptions.filter(
			item => item?.label?.toLowerCase() === 'customer',
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

export const generateInputs = (
	input,
	{ form, errors, handleInputChange, handleSelectChange },
) => {
	const isSmall = 'permissions' in form;
	const inputWidth = isSmall ? 12 : ITEMS_WIDTH[input.name + 'Sm'] ?? 6;

	return (
		<Grid item xs={12} sm={inputWidth} key={input.id}>
			{input.type !== 'select' ? (
				<Input
					{...input}
					value={form[input.name]}
					onChange={handleInputChange}
					errors={errors}
				/>
			) : (
				<InputSelect
					{...input}
					value={form[input.name]}
					onChange={handleSelectChange}
					errors={errors}
				/>
			)}
		</Grid>
	);
};
