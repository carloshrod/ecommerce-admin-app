import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from 'react';
import usersReducer from './usersReducer';
import { fetchData } from '@contexts/utils';
import { collection } from 'firebase/firestore';
import { db } from '@firebase/client';
import { USERS_TYPES as TYPES } from './userActions';
import { useAuthContext } from '@contexts/auth/AuthContext';

const UsersContext = createContext(undefined);

const staffCollectionRef = collection(db, 'staff');
const costumersCollectionRef = collection(db, 'costumers');

const initialState = {
	staff: [],
	costumers: [],
};

const UsersProvider = ({ children }) => {
	const [state, dispatch] = useReducer(usersReducer, initialState);
	const { staff, costumers } = state;
	const { loggedUser } = useAuthContext();

	const fetchUsers = async () => {
		const staff = await fetchData(staffCollectionRef);
		const costumers = await fetchData(costumersCollectionRef);
		dispatch({
			type: TYPES.GET_ALL_USERS,
			payload: { staff, costumers },
		});
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const addUser = userCreated => {
		dispatch({
			type: TYPES.ADD_USER,
			payload: userCreated,
		});
	};

	const updateUser = userUpdated => {
		dispatch({
			type: TYPES.UPDATE_USER,
			payload: userUpdated,
		});
	};

	const deleteUser = userId => {
		dispatch({
			type: TYPES.DELETE_USER,
			payload: userId,
		});
	};

	const filteredStaff = useMemo(() => {
		return loggedUser ? staff.filter(s => s.id !== loggedUser.id) : staff;
	}, [staff, loggedUser]);

	const data = {
		staff: filteredStaff,
		costumers,
		dispatchAddUser: addUser,
		dispatchUpdateUser: updateUser,
		dispatchDeleteUser: deleteUser,
	};

	return <UsersContext.Provider value={data}>{children}</UsersContext.Provider>;
};

export const useUsersContext = () => useContext(UsersContext);

export default UsersProvider;
