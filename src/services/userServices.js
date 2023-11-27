// import { USERS_TYPES as TYPES } from "@contexts/users/userActions";
import { db } from '@firebase';
// import useApiServices from '@hooks/useApiServices';
import {
	collection,
	deleteDoc,
	doc,
	serverTimestamp,
	setDoc,
} from 'firebase/firestore';
import withEnhances from './withEnhances';
import toast from 'react-hot-toast';
import { useUsersContext } from '@contexts/users/UsersContext';
import axios from 'axios';

const staffCollectionRef = collection(db, 'staff');

const userServices = () => {
	// const { authRegisterUser } = useApiServices();
	const { addUser, deleteUser } = useUsersContext();

	const addStaff = withEnhances(async data => {
		const res = await axios.post('/api/auth', data);
		console.log(res);
		if (res.status === 201) {
			const { displayName, email, countryCode, phoneNumber, role } = data;
			const { uid } = res.data;
			const userToCreate = {
				id: uid,
				displayName,
				email,
				phoneNumber,
				countryCode,
				role,
				createdAt: serverTimestamp(),
				lastUpdate: serverTimestamp(),
				disabled: false,
			};
			await setDoc(doc(staffCollectionRef, uid), userToCreate);
			addUser(userToCreate);
			toast.success('User registered!');
		}
	});

	const deleteStaff = withEnhances(
		async data => {
			console.log(data);
			data.forEach(async userId => {
				console.log(userId);
				const res = await axios.delete(`/api/auth/${userId}`);
				if (res.status === 200) {
					deleteDoc(doc(staffCollectionRef, userId));
					deleteUser(userId);
				}
			});
			toast.success(`${data.length > 1 ? 'Users' : 'User'} deleted!`);
		},
		{
			confirm: true,
			text: data =>
				`¿Are you sure to delete ${
					data.length > 1 ? 'these users' : 'this user'
				} permanently? <br> <br> <b>¡You won't be able to revert this action!</b>`,
		},
	);

	return { addStaff, deleteStaff };
};

export default userServices;
