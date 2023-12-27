import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useGlobalContext } from '@contexts/global/GlobalContext';

const Modal = () => {
	const { modal, closeModal } = useGlobalContext();

	return (
		<Dialog
			maxWidth='md'
			open={modal?.state}
			onClose={closeModal}
			sx={{
				'@media (500px < width <= 600px )': { px: 6 },
				'@media (700px < width <= 800px )': { px: 4 },
				'@media (800px < width <= 900px )': { px: 8 },
				'@media (900px < width <= 1000px )': { px: 10 },
				'@media (1000px < width )': { px: 16 },
			}}
		>
			<DialogTitle>{modal?.title}</DialogTitle>
			<DialogContent>{modal?.child}</DialogContent>
		</Dialog>
	);
};

export default Modal;
