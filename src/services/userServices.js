import { db } from '@firebase/client';
import {
	collection,
	deleteDoc,
	doc,
	serverTimestamp,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import withEnhances from './withEnhances';
import toast from 'react-hot-toast';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useUsersContext } from '@contexts/users/UsersContext';
import useApi from '@hooks/useApi';
import { SETTINGS } from '@utils/routes';
import { useRouter } from 'next/router';

const staffCollectionRef = collection(db, 'staff');

const userServices = () => {
	const {
		authRegisterUser,
		authUpdateUser,
		authUpdateUserStatus,
		authDeleteUser,
	} = useApi();
	const { dispatchUpdateLoggedUser } = useAuthContext();
	const { dispatchAddUser, dispatchUpdateUser, dispatchDeleteUser } =
		useUsersContext();
	const { pathname } = useRouter();
	const isSettings = pathname === SETTINGS;

	const addStaff = withEnhances(async user => {
		const { displayName, email, countryCode, phoneNumber, role } = user;
		const res = await authRegisterUser(user);
		if (res.status === 201) {
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
			dispatchAddUser(userToCreate);
			toast.success('User registered!');
		}
	});

	const updateStaff = withEnhances(async user => {
		const { displayName, email, countryCode, phoneNumber, role, id, disabled } =
			user;
		const res = await authUpdateUser(id, { email });
		if (res.status === 200) {
			let userToUpdate = {
				displayName,
				email,
				countryCode,
				phoneNumber,
				role,
				lastUpdate: serverTimestamp(),
			};
			await updateDoc(doc(staffCollectionRef, id), userToUpdate);
			userToUpdate = { ...userToUpdate, id, disabled };
			isSettings
				? dispatchUpdateLoggedUser(userToUpdate)
				: dispatchUpdateUser(userToUpdate);
			toast.success('User updated!');
		}
	});

	const toggleUserStatus = withEnhances(async user => {
		const { id, disabled } = user;
		const res = await authUpdateUserStatus(id, {
			disabled: !disabled,
		});
		if (res.status === 200) {
			await updateDoc(doc(staffCollectionRef, id), {
				disabled: !disabled,
				lastUpdate: serverTimestamp(),
			});
			dispatchUpdateUser({ ...user, disabled: !disabled });
			toast.success(`User ${disabled ? 'enabled' : 'disabled'}!`);
		}
	});

	const deleteStaff = withEnhances(
		async userIds => {
			userIds.forEach(async id => {
				const res = await authDeleteUser(id);
				if (res.status === 200) {
					deleteDoc(doc(staffCollectionRef, id));
					dispatchDeleteUser(id);
				}
			});
			toast.success(`${userIds.length > 1 ? 'Users' : 'User'} deleted!`);
		},
		{
			confirm: true,
			text: userIds =>
				`¿Are you sure to delete ${
					userIds.length > 1 ? 'these users' : 'this user'
				} permanently? <br> <br> <b>¡You won't be able to revert this action!</b>`,
		},
	);

	return { addStaff, updateStaff, toggleUserStatus, deleteStaff };
};

export default userServices;
