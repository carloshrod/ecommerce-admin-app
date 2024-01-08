import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { Box } from '@mui/material';
import { useProductsContext } from '@contexts/products/ProductsContext';
import useSkeleton from '@hooks/useSkeleton';
import CustomSkeleton from './CustomSkeleton';

const Carousel = () => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const { product } = useProductsContext();
	const { isFetched } = useSkeleton(product);
	const imagesArray = product?.images ?? [];

	return (
		<Box sx={{ pb: 1, backgroundColor: '#f0f9ff' }}>
			<Swiper
				style={{
					'--swiper-navigation-color': '#fff',
					'--swiper-pagination-color': '#fff',
				}}
				spaceBetween={10}
				navigation={true}
				thumbs={{
					swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
				}}
				modules={[FreeMode, Navigation, Thumbs]}
				className='MySwiper'
			>
				{imagesArray.map((img, index) => (
					<SwiperSlide key={`carousel-img${index}`}>
						<CustomSkeleton isFetched={isFetched} variant='text'>
							{img && (
								<Image
									className='imgSlide'
									width='150'
									height='150'
									src={img}
									alt='Carousel image'
									priority={true}
								/>
							)}
						</CustomSkeleton>
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				spaceBetween={10}
				slidesPerView={5}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				className='MySwiper2'
			>
				{imagesArray.map((img, index) => (
					<SwiperSlide key={`carousel-img${index}`}>
						<CustomSkeleton isFetched={isFetched} variant='text'>
							{img && (
								<Image
									className='imgSlide'
									width='40'
									height='40'
									src={img}
									alt='Carousel image'
									priority={true}
								/>
							)}
						</CustomSkeleton>
					</SwiperSlide>
				))}
			</Swiper>
		</Box>
	);
};

export default Carousel;
