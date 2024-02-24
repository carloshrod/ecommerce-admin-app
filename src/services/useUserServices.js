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
import useFileServices from './useFileServices';
import { USER_TYPES } from '@contexts/users/userActions';
import { AUTH_TYPES } from '@contexts/auth/authActions';
import { setUserToCreateObj, setUserToUpdateObj } from './utils';
import { useGlobalContext } from '@contexts/global/GlobalContext';

const staffCollectionRef = collection(db, 'staff');
const customersCollectionRef = collection(db, 'customers');

const useUserServices = () => {
	const {
		authRegisterUser,
		authUpdateUser,
		authUpdateUserStatus,
		authDeleteUser,
	} = useApi();
	const { toggleLoader } = useGlobalContext();
	const { authDispatch } = useAuthContext();
	const { userDispatch } = useUsersContext();
	const { generateImageURL, deleteFile } = useFileServices();
	const { pathname, query, push } = useRouter();

	const isSettings = pathname === SETTINGS;
	const isStaff = pathname.includes('staff');
	const isProfile = !!(query?.id || isSettings);
	const collection =
		isStaff || isSettings ? staffCollectionRef : customersCollectionRef;

	const getOneUser = withEnhances(async userId => {
		const collection = isStaff ? 'staff' : 'customers';
		const docRef = doc(db, collection, userId);
		const docSnap = await getDoc(docRef);
		userDispatch({
			type: USER_TYPES.GET_ONE_USER,
			payload: docSnap.data(),
		});
	});

	const addUser = withEnhances(
		async (user, file) => {
			const res = await authRegisterUser(user);
			if (res?.status === 201) {
				const { uid } = res.data;
				const avatar = file ? await generateImageURL(file, uid) : '';
				const userToCreate = setUserToCreateObj(user, uid, avatar);
				await setDoc(doc(collection, uid), userToCreate);
				userDispatch({
					type: USER_TYPES.ADD_USER,
					payload: { userCreated: userToCreate, isStaff },
				});
				toast.success('User registered!');
			}
		},
		{ loader: toggleLoader },
	);

	const updateUser = withEnhances(
		async (user, file) => {
			const { avatar, id } = user;
			const res = await authUpdateUser(id, user);
			if (res?.status === 200) {
				let newAvatar = avatar;
				if (file) {
					await deleteFile(id);
					newAvatar = await generateImageURL(file, id);
				}
				const userToUpdate = setUserToUpdateObj(user, newAvatar);
				await updateDoc(doc(collection, id), userToUpdate);
				const dispatch = isSettings ? authDispatch : userDispatch;
				dispatch({
					type: isSettings
						? AUTH_TYPES.UPDATE_LOGGED_USER
						: USER_TYPES.UPDATE_USER,
					payload: { userUpdated: userToUpdate, isStaff },
				});
				toast.success(isSettings ? 'Profile updated!' : 'User updated!');
				if (isProfile) getOneUser(id);
			}
		},
		{ loader: toggleLoader },
	);

	const toggleUserStatus = withEnhances(
		async user => {
			const { id, disabled } = user;
			const res = await authUpdateUserStatus(id, { disabled: !disabled });
			if (res?.status === 200) {
				await updateDoc(doc(collection, id), {
					disabled: !disabled,
					lastUpdate: serverTimestamp(),
				});
				userDispatch({
					type: USER_TYPES.UPDATE_USER,
					payload: { userUpdated: { ...user, disabled: !disabled }, isStaff },
				});
				toast.success(`User ${disabled ? 'enabled' : 'disabled'}!`);
				if (isProfile) getOneUser(id);
			}
		},
		{ loader: toggleLoader },
	);

	const deleteUser = withEnhances(
		async userIds => {
			userIds.forEach(async userId => {
				const res = await authDeleteUser(userId);
				if (res?.status === 200) {
					await deleteFile(userId);
					await deleteDoc(doc(collection, userId));
					userDispatch({
						type: USER_TYPES.DELETE_USER,
						payload: { userId, isStaff },
					});
					if (isProfile) push(isStaff ? STAFF : CUSTOMERS);
					toast.success(`${userIds.length > 1 ? 'Users' : 'User'} deleted!`, {
						id: 'userDeleted',
					});
				}
			});
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
		addUser,
		updateUser,
		toggleUserStatus,
		deleteUser,
	};
};

export default useUserServices;
