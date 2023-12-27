import { BG_IMAGES } from '@components/consts';
import Carousel from '@components/ui/Carousel';
import { Card, CardMedia, Grid } from '@mui/material';
import useProductServices from '@services/useProductServices';
import useUserServices from '@services/useUserServices';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Details = ({ children }) => {
	const [isDataFetched, setIsDataFetched] = useState(false);
	const { getOneProduct } = useProductServices();
	const { getOneUser } = useUserServices();
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
		setTimeout(() => {
			setIsDataFetched(true);
		}, 100);
	}, [id]);

	return (
		<Grid item xs={12}>
			{!isDataFetched ? (
				<span>Loader...</span>
			) : (
				<Card className='details'>
					{isProduct ? (
						<Carousel />
					) : (
						<CardMedia
							component='img'
							height='300'
							image={BG_IMAGES[bgImage]}
							alt='header image'
							sx={{ bgcolor: '#f0f9ff' }}
						/>
					)}
					{children}
				</Card>
			)}
		</Grid>
	);
};

export default Details;
