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

const Carousel = () => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const { product } = useProductsContext();
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
					</SwiperSlide>
				))}
			</Swiper>
		</Box>
	);
};

export default Carousel;
