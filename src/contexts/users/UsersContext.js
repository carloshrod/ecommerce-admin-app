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
import { USER_TYPES } from './userActions';
import { useAuthContext } from '@contexts/auth/AuthContext';

const UsersContext = createContext(undefined);

const staffCollectionRef = collection(db, 'staff');
const customersCollectionRef = collection(db, 'customers');

const initialState = {
	staff: [],
	customers: [],
	user: {},
};

const UsersProvider = ({ children }) => {
	const [state, dispatch] = useReducer(usersReducer, initialState);
	const { staff, customers, user } = state;
	const { loggedUser } = useAuthContext();

	const fetchUsers = async () => {
		const staff = await fetchData(staffCollectionRef);
		const customers = await fetchData(customersCollectionRef);
		dispatch({
			type: USER_TYPES.GET_ALL_USERS,
			payload: { staff, customers },
		});
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const filteredStaff = useMemo(() => {
		return loggedUser ? staff?.filter(s => s.id !== loggedUser.id) : staff;
	}, [staff, loggedUser]);

	const data = {
		staff: filteredStaff,
		customers,
		user,
		userDispatch: dispatch,
	};

	return <UsersContext.Provider value={data}>{children}</UsersContext.Provider>;
};

export const useUsersContext = () => useContext(UsersContext);

export default UsersProvider;
