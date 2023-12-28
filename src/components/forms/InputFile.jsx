import { Avatar, Box, IconButton, Typography } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useRouter } from 'next/router';
import ToolTip from '@components/ui/ToolTip';

const InputFile = ({ pathImage, isInvalid, setFocused, errors, onChange }) => {
	const { pathname } = useRouter();
	const isProduct = pathname.includes('products');

	const handleFocus = () => {
		setTimeout(() => {
			setFocused(true);
		}, 5000);
	};

	return (
		<Box sx={{ display: 'grid', placeContent: 'center' }} onBlur={handleFocus}>
			<ToolTip title='Upload image'>
				<IconButton
					color='primary'
					aria-label='upload picture'
					component='label'
					sx={{
						width: 120,
						height: 120,
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
							width: 120,
							height: 120,
							borderRadius: `${isProduct ? '3px' : '50%'}`,
							border: `${isInvalid ? '1px solid #dc2626' : undefined}`,
						}}
						src={pathImage ?? undefined}
					>
						{isProduct ? <InventoryIcon sx={{ fontSize: 50 }} /> : undefined}
					</Avatar>
					<input name='file' type='file' hidden onChange={onChange} />
					<FileUploadIcon sx={{ position: 'absolute', opacity: 0 }} />
				</IconButton>
			</ToolTip>
			<Typography
				element='span'
				sx={{
					color: 'warning.main',
					fontSize: 12,
					textAlign: 'center',
					display: `${isInvalid ? 'block' : 'none'}`,
					mt: 1,
				}}
			>
				{errors?.file}
			</Typography>
		</Box>
	);
};

export default InputFile;
