import { db } from '@firebase/client';
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
import useApi from '@hooks/useApi';

const staffCollectionRef = collection(db, 'staff');

const userServices = () => {
	const { authRegisterUser, authDeleteUser } = useApi();
	const { addUser, deleteUser } = useUsersContext();

	const addStaff = withEnhances(async data => {
		const res = await authRegisterUser(data);
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
			data.forEach(async userId => {
				const res = await authDeleteUser(userId);
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
