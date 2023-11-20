import { useEffect, useState } from 'react';

const useScrollY = () => {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		setScrollY(window.scrollY);
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleScroll = () => {
		setScrollY(window.scrollY);
	};

	return { scrollY };
};

export default useScrollY;
