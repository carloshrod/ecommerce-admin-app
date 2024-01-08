import {
	categories,
	subCategories,
	tags as optionTags,
} from '@components/forms/consts';
import CustomSkeleton from '@components/ui/CustomSkeleton';
import { formatPrice, setPropName } from '@components/utils';
import useScreen from '@hooks/useScreen';
import useSkeleton from '@hooks/useSkeleton';
import { Box, CardContent, Chip, Grid, Typography } from '@mui/material';

const ProductInfo = ({ product }) => {
	const { isFetched } = useSkeleton(product);
	const { width } = useScreen();
	const {
		displayName,
		price,
		stock,
		category,
		subCategory,
		brand,
		description,
		tags,
	} = product ?? {};

	const categoryName = setPropName(category, categories);
	const subCategoryName = setPropName(subCategory, subCategories);

	return (
		<CardContent sx={{ px: 4 }}>
			<Grid container={width > 600}>
				<Grid item sm={12} md={5}>
					<CustomSkeleton isFetched={isFetched}>
						<Typography variant='h6'>{displayName}</Typography>{' '}
					</CustomSkeleton>
					<CustomSkeleton isFetched={isFetched} style={{ height: 70 }}>
						<Chip
							label='Stock'
							sx={{
								backgroundColor: `${
									stock > 0 ? 'success.transparent' : 'warning.transparent'
								}`,
								'& .MuiChip-label': {
									color: `${stock > 0 ? '#10b981' : '#dc2626'} !important`,
								},
							}}
						/>
						<Box sx={{ mt: 1, mb: 2 }}>
							<Chip
								label={`$${formatPrice(price)}`}
								sx={{
									backgroundColor: 'primary.transparent',
									'& .MuiChip-label': {
										color: '#0e7490 !important',
									},
									fontSize: 20,
								}}
							/>
						</Box>
					</CustomSkeleton>
				</Grid>
				{/* TODO: Refactor */}
				<Grid item sm={12} md={3} sx={{ '& > p': { mb: 2, fontWeight: 300 } }}>
					<CustomSkeleton isFetched={isFetched}>
						<Typography
							element='p'
							sx={{ '& span': { fontWeight: 'bold', mr: 1 } }}
						>
							<span>Category:</span> {categoryName}
						</Typography>
					</CustomSkeleton>
					<CustomSkeleton isFetched={isFetched}>
						<Typography
							element='p'
							sx={{ '& span': { fontWeight: 'bold', mr: 1 } }}
						>
							<span>Subcategory:</span> {subCategoryName}
						</Typography>
					</CustomSkeleton>
					<CustomSkeleton isFetched={isFetched}>
						<Typography
							element='p'
							sx={{ '& span': { fontWeight: 'bold', mr: 1 } }}
						>
							<span>Brand:</span> {brand}
						</Typography>
					</CustomSkeleton>
				</Grid>
				<Grid item sm={12} md={4}>
					<CustomSkeleton isFetched={isFetched} style={{ height: 105 }}>
						<Box sx={{ display: 'flex' }}>
							<Typography sx={{ fontWeight: 'bold', mr: 1.5 }}>
								Tags:
							</Typography>
							<Box>
								{tags?.map(tag => {
									const tagName = setPropName(tag, optionTags);
									return (
										<Chip
											key={`tag-${tagName}`}
											label={tagName}
											sx={{
												backgroundColor: 'primary.transparent',
												'& .MuiChip-label': {
													color: '#0e7490 !important',
												},
												borderRadius: 2,
												mr: 1,
												mb: 1,
											}}
										/>
									);
								})}
							</Box>
						</Box>
					</CustomSkeleton>
				</Grid>
			</Grid>
			<CustomSkeleton isFetched={isFetched} style={{ height: 50 }}>
				<Typography element={'p'} mt={2} sx={{ fontWeight: 300 }}>
					{description}
				</Typography>
			</CustomSkeleton>
		</CardContent>
	);
};

export default ProductInfo;
