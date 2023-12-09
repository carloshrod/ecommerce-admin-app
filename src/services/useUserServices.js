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
import { deleteFile, generateImageObj } from './fileServices';
import { USER_TYPES } from '@contexts/users/userActions';
import { AUTH_TYPES } from '@contexts/auth/authActions';

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
				avatar: file ? await generateImageObj(file, uid) : {},
				disabled: false,
				createdAt: serverTimestamp(),
				lastUpdate: serverTimestamp(),
			};
			await setDoc(doc(staffCollectionRef, uid), userToCreate);
			userDispatch({
				type: USER_TYPES.ADD_USER,
				payload: userToCreate,
			});
			toast.success('User registered!');
		}
	});

	const updateStaff = withEnhances(async (user, file) => {
		const {
			displayName,
			email,
			countryCode,
			phoneNumber,
			role,
			avatar,
			id,
			disabled,
		} = user;
		const res = await authUpdateUser(id, user);
		if (res.status === 200) {
			if (file) deleteFile(id);
			let userToUpdate = {
				displayName,
				email,
				countryCode,
				phoneNumber,
				role,
				avatar: file ? await generateImageObj(file, id) : avatar,
				lastUpdate: serverTimestamp(),
			};
			await updateDoc(doc(staffCollectionRef, id), userToUpdate);
			userToUpdate = { ...userToUpdate, id, disabled };
			if (isSettings) {
				authDispatch({
					type: AUTH_TYPES.UPDATE_LOGGED_USER,
					payload: userToUpdate,
				});
			} else {
				userDispatch({
					type: USER_TYPES.UPDATE_USER,
					payload: userToUpdate,
				});
			}
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
