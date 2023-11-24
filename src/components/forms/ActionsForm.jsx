import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';

const ActionsForm = ({ handleReset = null, errors = [], label = 'Send' }) => {
	const [isFormOk, setIsFormOk] = useState();

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
			<Button
				sx={{ width: 100 }}
				variant='outlined'
				type='submit'
				color='success'
				disabled={!isFormOk}
			>
				{label}
			</Button>
		</Box>
	);
};

export default ActionsForm;
