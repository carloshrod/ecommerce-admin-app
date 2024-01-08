import { createContext, useContext, useReducer } from 'react';
import globalReducers from './globalReducers';
import { GLOBAL_TYPES as TYPES } from './globalActions';

const GlobalContext = createContext();

const initialState = {
	hideMenu: false,
	modal: {
		isOpen: false,
		title: null,
		child: null,
	},
	dataToEdit: null,
	isLoading: false,
	redirectMsg: null,
};

const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(globalReducers, initialState);
	const { hideMenu, modal, dataToEdit, isLoading, redirectMsg } = state;

	const toggleMenu = () => {
		dispatch({ type: TYPES.TOGGLE_MENU, payload: !hideMenu });
	};

	const toggleModal = (modal, dataToEdit = undefined) => {
		dispatch({
			type: TYPES.TOGGLE_MODAL,
			payload: {
				modal,
				dataToEdit,
			},
		});
	};

	const toggleLoader = payload => {
		dispatch({ type: TYPES.TOGGLE_LOADER, payload });
	};

	const setRedirectMsg = msg => {
		dispatch({ type: TYPES.SET_REDIRECT_MSG, payload: msg });
	};

	const data = {
		hideMenu,
		modal,
		dataToEdit,
		isLoading,
		redirectMsg,
		toggleMenu,
		toggleModal,
		toggleLoader,
		setRedirectMsg,
	};

	return (
		<GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
	);
};

const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider;
export { useGlobalContext };
