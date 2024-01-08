import { BG_IMAGES } from '@components/consts';
import Carousel from '@components/ui/Carousel';
import { Card, CardMedia, Grid } from '@mui/material';
import useProductServices from '@services/useProductServices';
import useUserServices from '@services/useUserServices';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CustomSkeleton from '@components/ui/CustomSkeleton';
import useSkeleton from '@hooks/useSkeleton';

const Details = ({ data, children }) => {
	const { getOneProduct } = useProductServices();
	const { getOneUser } = useUserServices();
	const { isFetched } = useSkeleton(data);
	const {
		query: { id },
		pathname,
	} = useRouter();
	const bgImage = id ? pathname.slice(0, -5) : pathname;
	const isProduct = pathname.includes('products');

	useEffect(() => {
		if (id) {
			if (isProduct) {
				getOneProduct(id);
			} else {
				getOneUser(id);
			}
		}
	}, [id]);

	return (
		<Grid item xs={12}>
			<Card className='details'>
				{isProduct ? (
					<Carousel />
				) : (
					<CustomSkeleton
						isFetched={isFetched}
						style={{ mb: '0 !important', height: 300 }}
					>
						<CardMedia
							component='img'
							height='300'
							image={BG_IMAGES[bgImage]}
							alt='header image'
							sx={{ bgcolor: '#f0f9ff' }}
						/>
					</CustomSkeleton>
				)}
				{children}
			</Card>
		</Grid>
	);
};

export default Details;
