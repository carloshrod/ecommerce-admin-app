import { getDocs, orderBy, query } from 'firebase/firestore';
import toast from 'react-hot-toast';

export const fetchData = async ref => {
	const q = query(ref, orderBy('createdAt', 'asc'));
	try {
		const querySnapshot = await getDocs(q);
		const array = [];
		querySnapshot.forEach(doc => {
			array.push(doc.data());
		});
		return array;
	} catch (error) {
		toast.error(error.message);
		console.error(error);
	}
};
