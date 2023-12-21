import { Avatar, Box, IconButton } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useRouter } from 'next/router';
import { PRODUCTS } from '@utils/routes';
import ToolTip from '@components/ui/ToolTip';

const InputFile = ({ pathImage, onChange }) => {
	const { pathname } = useRouter();
	const isProduct = pathname === PRODUCTS;

	return (
		<Box sx={{ display: 'grid', placeContent: 'center' }}>
			<ToolTip title='Upload image'>
				<IconButton
					color='primary'
					aria-label='upload picture'
					component='label'
					sx={{
						width: 110,
						height: 110,
						borderRadius: `${isProduct ? '4px' : '50%'}`,
						position: 'relative',
						'&:hover > .MuiAvatar-root': {
							opacity: 0.5,
						},
						'&:hover > svg': {
							fontSize: 32,
							color: '#0e7490 !important',
							opacity: 1,
						},
					}}
				>
					<Avatar
						alt='Image preview'
						sx={{
							width: 100,
							height: 100,
							borderRadius: `${isProduct ? '3px' : '50%'}`,
						}}
						src={pathImage ?? undefined}
					>
						{isProduct ? <InventoryIcon sx={{ fontSize: 50 }} /> : undefined}
					</Avatar>
					<input name='file' type='file' hidden onChange={onChange} />
					<FileUploadIcon sx={{ position: 'absolute', opacity: 0 }} />
				</IconButton>
			</ToolTip>
		</Box>
	);
};

export default InputFile;
