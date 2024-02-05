import { Grid } from '@mui/material';
import Input from './Input';
import InputSelect from './InputSelect';
import { ITEMS_WIDTH } from './consts';
import { normalizeName } from '@components/utils';

export const filterRoles = (roles, pathname) => {
	if (pathname.includes('customer')) {
		roles = roles.filter(
			item => item?.displayName?.toLowerCase() === 'customer',
		);
	} else {
		roles = roles.filter(
			item => item?.displayName?.toLowerCase() !== 'customer',
		);
	}

	return roles;
};

export const generateInputs = (
	input,
	{ form, errors, handleInputChange, handleSelectChange },
	generic = false,
) => {
	const inputWidth = generic ? 12 : ITEMS_WIDTH[input.name + 'Sm'] ?? 6;

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
					form={form}
				/>
			)}
		</Grid>
	);
};

export const setOptions = array => {
	const newArray = [];
	array.forEach(role => {
		newArray.push({
			value: role.id,
			label: normalizeName(role.displayName),
		});
	});

	return newArray;
};
