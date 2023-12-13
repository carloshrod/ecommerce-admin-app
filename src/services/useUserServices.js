import { db } from '@firebase/client';
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	serverTimestamp,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import withEnhances from './withEnhances';
import toast from 'react-hot-toast';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useUsersContext } from '@contexts/users/UsersContext';
import useApi from '@hooks/useApi';
import { CUSTOMERS, SETTINGS, STAFF } from '@utils/routes';
import { useRouter } from 'next/router';
import { generateImageObj, deleteFile } from './fileServices';
import { USER_TYPES } from '@contexts/users/userActions';
import { AUTH_TYPES } from '@contexts/auth/authActions';
import { generateUserToCreate, generateUserToUpdate } from './utils';

const staffCollectionRef = collection(db, 'staff');
// const customersCollectionRef = collection(db, 'customers');

const useUserServices = () => {
	const {
		authRegisterUser,
		authUpdateUser,
		authUpdateUserStatus,
		authDeleteUser,
	} = useApi();
	const { authDispatch } = useAuthContext();
	const { userDispatch } = useUsersContext();
	const { pathname, query, push } = useRouter();

	const isSettings = pathname === SETTINGS;
	const isStaff = pathname.includes('staff');
	const isProfile = !!(query?.id || isSettings);

	const getOneUser = withEnhances(async userId => {
		const collection = isStaff ? 'staff' : 'customers';
		const docRef = doc(db, collection, userId);
		const docSnap = await getDoc(docRef);
		userDispatch({
			type: USER_TYPES.GET_ONE_USER,
			payload: docSnap.data(),
		});
	});

	const addStaff = withEnhances(async (user, file) => {
		const res = await authRegisterUser(user);
		if (res.status === 201) {
			const { uid } = res.data;
			const avatar = file ? await generateImageObj(file, uid) : {};
			const userToCreate = generateUserToCreate(uid, user, avatar);
			await setDoc(doc(staffCollectionRef, uid), userToCreate);
			userDispatch({
				type: USER_TYPES.ADD_USER,
				payload: userToCreate,
			});
			toast.success('User registered!');
		}
	});

	const updateStaff = withEnhances(async (user, file) => {
		const { avatar, id, disabled } = user;
		const res = await authUpdateUser(id, user);
		if (res.status === 200) {
			let newAvatar = avatar;
			if (file) {
				deleteFile(id);
				newAvatar = await generateImageObj(file, id);
			}
			const userToUpdate = generateUserToUpdate(user, newAvatar);
			await updateDoc(doc(staffCollectionRef, id), userToUpdate);
			const dispatch = isSettings ? authDispatch : userDispatch;
			dispatch({
				type: isSettings
					? AUTH_TYPES.UPDATE_LOGGED_USER
					: USER_TYPES.UPDATE_USER,
				payload: { ...userToUpdate, id, disabled },
			});
			toast.success(isSettings ? 'Profile updated!' : 'User updated!');
			if (isProfile) getOneUser(id);
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
			userDispatch({
				type: USER_TYPES.UPDATE_USER,
				payload: { ...user, disabled: !disabled },
			});
			toast.success(`User ${disabled ? 'enabled' : 'disabled'}!`);
		}
	});

	const deleteStaff = withEnhances(
		async userIds => {
			userIds.forEach(async id => {
				const res = await authDeleteUser(id);
				if (res.status === 200) {
					await deleteFile(id);
					await deleteDoc(doc(staffCollectionRef, id));
					userDispatch({
						type: USER_TYPES.DELETE_USER,
						payload: id,
					});
				}
			});
			if (isProfile) push(isStaff ? STAFF : CUSTOMERS);
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

	return {
		getOneUser,
		addStaff,
		updateStaff,
		toggleUserStatus,
		deleteStaff,
	};
};

export default useUserServices;
