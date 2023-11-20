import { IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const Input = ({
	name,
	type = 'text',
	icon,
	maxWidth = null,
	onChange = null,
	errors,
	...inputProps
}) => {
	const [focused, setFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const handleFocus = () => {
		setFocused(true);
	};

	const isInputWrong = focused && errors[name];

	return (
		<TextField
			{...inputProps}
			name={name}
			type={type === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
			error={!!isInputWrong}
			helperText={focused ? errors[name] : null}
			onChange={onChange}
			onBlur={handleFocus}
			onKeyUp={
				name === 'repeatNewPassword'
					? () =>
							setTimeout(() => {
								handleFocus();
							}, 5000)
					: null
			}
			sx={{
				width: '100%',
				'& .MuiFormLabel-root': {
					color: `${isInputWrong && '#d32f2f'} !important`,
				},
				'& .MuiOutlinedInput-root': {
					'&:hover fieldset': {
						borderColor: `${isInputWrong && '#d32f2f'} !important`,
					},
				},
			}}
			InputProps={{
				startAdornment: (
					<InputAdornment
						position='start'
						sx={{
							'& > svg': {
								color: `${isInputWrong && '#d32f2f'} !important`,
							},
						}}
					>
						{icon}
					</InputAdornment>
				),
				endAdornment:
					type === 'password' ? (
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={() => setShowPassword(show => !show)}
								onMouseDown={handleMouseDownPassword}
								edge='end'
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					) : null,
			}}
		/>
	);
};

export default Input;
