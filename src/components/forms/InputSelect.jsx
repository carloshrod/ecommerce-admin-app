import { useState } from 'react';
import { Autocomplete, Box, InputAdornment, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuthContext } from '@contexts/auth/AuthContext';
import useScreen from '@hooks/useScreen';
import { SETTINGS } from '@utils/routes';
import { setDefaultValue } from '@components/utils';
import { useGlobalContext } from '@contexts/global/GlobalContext';

const InputSelect = ({
	name,
	value,
	label,
	icon,
	options = null,
	multiple = null,
	maxWidth = null,
	onChange = null,
	errors,
	inputSubCategoryFocused = null,
}) => {
	const [focused, setFocused] = useState(false);
	const { dataToEdit } = useGlobalContext();
	const { isAdmin } = useAuthContext();
	const { width } = useScreen();
	const { pathname } = useRouter();

	const handleFocus = () => {
		setFocused(true);
	};

	const isSubCategory =
		value && name === 'subCategory' && inputSubCategoryFocused;
	const isInputWrong = !!((focused || isSubCategory) && errors[name]);

	const defaultValue = setDefaultValue({
		multiple,
		name,
		options,
		dataToEdit,
	});

	const noOptions = options?.length === value?.length;

	const isCountryCode = name === 'countryCode';

	const isNotEditable = name === 'role' && pathname === SETTINGS;
	const roleHelperText = isNotEditable
		? isAdmin
			? "You can't edit your own role"
			: 'Only admins can edit roles'
		: null;

	return (
		<Autocomplete
			options={options}
			multiple={multiple}
			filterSelectedOptions={multiple}
			getOptionLabel={option => option.label}
			isOptionEqualToValue={(option, value) => option.label === value.label}
			defaultValue={dataToEdit ? defaultValue : multiple ? [] : null}
			onChange={(_e, options) => onChange(name, options)}
			readOnly={isNotEditable}
			sx={{
				position: 'relative',
				'.MuiAutocomplete-inputRoot': {
					paddingLeft: `${isCountryCode && value ? '3.5rem' : '2.5rem'}`,
				},
			}}
			noOptionsText='No options available'
			renderOption={
				isCountryCode
					? (props, option) => (
							<Box
								component='li'
								{...props}
								sx={{
									svg: { mr: 1 },
									'& > span': { sm: { display: 'none' } },
									justifyContent: `${width >= 600 && 'center !important'}`,
								}}
							>
								{option.flag} <span>{option.label}</span>
							</Box>
					  )
					: null
			}
			className={`${
				isCountryCode && value && width >= 600 && width < 1200 && 'hiddenInput'
			}`}
			renderInput={params => {
				const selectedCountry = options?.find(
					country => country.label === params.inputProps.value,
				)?.flag;
				return (
					<>
						<TextField
							{...params}
							InputProps={{
								...params.InputProps,
								startAdornment: (
									<>
										{params.inputProps.value ? selectedCountry : null}
										{params.InputProps.startAdornment}
									</>
								),
							}}
							label={label}
							error={!!isInputWrong}
							placeholder={`${
								multiple
									? `${noOptions ? 'No options' : 'Select one or more...'}`
									: `${!value ? 'Select one...' : ''}`
							}`}
							helperText={
								(focused || isInputWrong ? errors[name] : null) ??
								roleHelperText
							}
							onBlur={handleFocus}
							InputLabelProps={{
								shrink: true,
							}}
							sx={{
								maxWidth,
								width: '100%',
								'& .MuiFormLabel-root': {
									color: `${isInputWrong && '#d32f2f'} !important`,
								},
								'& .MuiOutlinedInput-root': {
									'&:hover fieldset': {
										borderColor: `${isInputWrong && '#d32f2f'} !important`,
									},
								},
								'& .flag': { minWidth: 18 },
							}}
						/>
						<InputAdornment
							position='start'
							sx={{
								'& > svg': {
									color: `${isInputWrong && '#d32f2f'} !important`,
								},
								position: 'absolute',
								top: `calc(50% - ${
									isInputWrong ? 10 : isNotEditable ? 10 : 0
								}px)`,
								left: '14px',
							}}
						>
							{icon}
						</InputAdornment>
					</>
				);
			}}
		/>
	);
};

export default InputSelect;
