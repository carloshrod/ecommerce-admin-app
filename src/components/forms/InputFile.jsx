import { Avatar, Badge, Box, IconButton, Typography } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useRouter } from 'next/router';
import ToolTip from '@components/ui/ToolTip';

const InputFile = ({ pathImage, files, focused, errors, onChange }) => {
	const { pathname } = useRouter();
	const isProduct = pathname.includes('products');

	const areFilesValid = files?.length === 5;
	const isInputInvalid = focused && 'productImages' in errors;

	return (
		<Box>
			<Box element='section' sx={{ display: 'grid', placeContent: 'center' }}>
				<ToolTip title={`Upload ${isProduct ? 'images' : 'image'}`}>
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
						<Badge
							badgeContent={files?.length}
							color={`${areFilesValid ? 'success' : 'warning'}`}
							sx={{
								'& .MuiBadge-badge': {
									right: '10%',
									top: '90%',
									opacity: `${isProduct ? 1 : 0}`,
								},
							}}
						>
							<Avatar
								alt='Image preview'
								sx={{
									width: 120,
									height: 120,
									borderRadius: `${isProduct ? '3px' : '50%'}`,
									border: `${
										isProduct && isInputInvalid
											? '1px solid #dc2626'
											: undefined
									}`,
								}}
								src={pathImage ?? undefined}
							>
								{isProduct ? (
									<InventoryIcon sx={{ fontSize: 50 }} />
								) : undefined}
							</Avatar>
						</Badge>
						<input
							name='file'
							type='file'
							multiple={isProduct}
							hidden
							onChange={onChange}
						/>
						<FileUploadIcon sx={{ position: 'absolute', opacity: 0 }} />
					</IconButton>
				</ToolTip>
			</Box>
			{isProduct && !areFilesValid && (
				<Typography
					sx={{
						fontSize: 12,
						textAlign: 'center',
						mt: 1,
						color: `${isInputInvalid ? '#dc2626' : undefined}`,
					}}
				>
					Upload 5 product images
				</Typography>
			)}
		</Box>
	);
};

export default InputFile;
