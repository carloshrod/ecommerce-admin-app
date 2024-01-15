import { useGlobalContext } from '@contexts/global/GlobalContext';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';

const ActionsForm = ({
	handleReset = null,
	errors = [],
	label = 'Send',
	setInputFileFocused = () => null,
}) => {
	const [isFormOk, setIsFormOk] = useState();
	const { isLoading } = useGlobalContext();
	const isDisabled = !isFormOk || isLoading;

	useEffect(() => {
		if (Object.keys(errors).length === 0) {
			return setIsFormOk(true);
		}
		return setIsFormOk(false);
	}, [errors]);

	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
			<Button
				sx={{ width: 100 }}
				variant='outlined'
				color='warning'
				onClick={handleReset}
			>
				Close
			</Button>
			<Box onClick={() => setInputFileFocused(true)}>
				<Button
					sx={{ width: 100 }}
					variant='outlined'
					type='submit'
					color='success'
					disabled={isDisabled}
				>
					{label}
				</Button>
			</Box>
		</Box>
	);
};

export default ActionsForm;
