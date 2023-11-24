import { useGlobalContext } from '@contexts/global/GlobalContext';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

const Modal = () => {
	const { modal, closeModal } = useGlobalContext();

	return (
		<Dialog
			open={modal?.state}
			onClose={closeModal}
			sx={{ '@media (450px < width < 600px )': { px: 6 } }}
		>
			<DialogTitle>{modal?.title}</DialogTitle>
			<DialogContent>{modal?.child}</DialogContent>
		</Dialog>
	);
};

export default Modal;
