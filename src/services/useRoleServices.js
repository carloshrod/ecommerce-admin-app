import {
	collection,
	deleteDoc,
	doc,
	serverTimestamp,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { db } from '@firebase/client';
import withEnhances from './withEnhances';
import toast from 'react-hot-toast';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { AUTH_TYPES } from '@contexts/auth/authActions';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import { formatDisplayName } from './utils';

const rolesCollectionRef = collection(db, 'roles');

const useRoleServices = () => {
	const { toggleLoader } = useGlobalContext();
	const { authDispatch } = useAuthContext();

	const addRole = withEnhances(
		async role => {
			const newRoleRef = doc(rolesCollectionRef);
			const { id } = newRoleRef;
			const roleToCreate = {
				...role,
				id,
				displayName: formatDisplayName(role?.displayName),
				createdAt: serverTimestamp(),
				lastUpdate: serverTimestamp(),
			};
			await setDoc(newRoleRef, roleToCreate);
			authDispatch({ type: AUTH_TYPES.ADD_ROLE, payload: roleToCreate });
			toast.success('Role created!');
		},
		{ loader: toggleLoader },
	);

	const updateRole = withEnhances(
		async role => {
			const { id, displayName } = role;
			const roleToUpdate = {
				...role,
				displayName: formatDisplayName(displayName),
				lastUpdate: serverTimestamp(),
			};
			await updateDoc(doc(rolesCollectionRef, id), roleToUpdate);
			authDispatch({ type: AUTH_TYPES.UPDATE_ROLE, payload: roleToUpdate });
			toast.success('Role updated!');
		},
		{ loader: toggleLoader },
	);

	const deleteRole = withEnhances(
		async roleIds => {
			roleIds.forEach(async roleId => {
				await deleteDoc(doc(rolesCollectionRef, roleId));
				authDispatch({ type: AUTH_TYPES.DELETE_ROLE, payload: roleId });
			});
			toast.success(`${roleIds.length > 1 ? 'Roles' : 'Role'} deleted!`);
		},
		{
			confirm: true,
			text: roleIds =>
				`¿Are you sure to delete ${
					roleIds.length > 1 ? 'these roles' : 'this role'
				} permanently? <br> <br> <b>¡You won't be able to revert this action!</b>`,
		},
	);

	return { addRole, updateRole, deleteRole };
};

export default useRoleServices;
