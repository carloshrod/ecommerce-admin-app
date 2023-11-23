import { createContext, useContext, useEffect, useReducer } from 'react';
import usersReducer from './usersReducer';
import { fetchData } from '@contexts/utils';
import { collection } from 'firebase/firestore';
import { db } from '@firebase';
import { USERS_TYPES as TYPES } from './userActions';

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

	const data = { staff, costumers };

	return <UsersContext.Provider value={data}>{children}</UsersContext.Provider>;
};

export const useUsersContext = () => useContext(UsersContext);

export default UsersProvider;