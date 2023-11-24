import { createContext, useContext, useReducer } from 'react';
import globalReducers from './globalReducers';
import { GLOBAL_TYPES as TYPES } from './globalActions';

const GlobalContext = createContext();

const initialState = {
	hideMenu: false,
	modal: {
		state: false,
		title: null,
		child: null,
	},
	dataToEdit: null,
};

const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(globalReducers, initialState);
	const { hideMenu, modal, dataToEdit } = state;

	const toggleMenu = () => {
		dispatch({ type: TYPES.TOGGLE_MENU, payload: !hideMenu });
	};

	const openModal = (title, child) => {
		dispatch({
			type: TYPES.OPEN_MODAL,
			payload: { state: true, title, child },
		});
	};

	const closeModal = () => {
		dispatch({
			type: TYPES.CLOSE_MODAL,
		});
	};

	const data = {
		hideMenu,
		modal,
		dataToEdit,
		toggleMenu,
		openModal,
		closeModal,
	};

	return (
		<GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
	);
};

const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider;
export { useGlobalContext };
