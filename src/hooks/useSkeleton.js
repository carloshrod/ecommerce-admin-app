import { useEffect, useState } from 'react';

const useSkeleton = data => {
	const [isFetched, setIsFetched] = useState(false);

	useEffect(() => {
		if (Object.keys(data).length > 0) {
			setTimeout(() => {
				setIsFetched(true);
			}, 500);
		}
	}, [data]);

	return { isFetched };
};

export default useSkeleton;
