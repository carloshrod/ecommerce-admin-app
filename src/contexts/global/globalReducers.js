import { GLOBAL_TYPES as TYPES } from './globalActions';

const globalReducers = (state, action) => {
	switch (action.type) {
		case TYPES.TOGGLE_MENU: {
			return {
				...state,
				hideMenu: action.payload,
			};
		}
		case TYPES.OPEN_MODAL: {
			return {
				...state,
				modal: action.payload,
			};
		}
		case TYPES.CLOSE_MODAL: {
			return {
				...state,
				modal: { state: false, title: null, child: null },
			};
		}
		case TYPES.SET_DATA_TO_EDIT: {
			return {
				...state,
				dataToEdit: action.payload,
			};
		}
		case TYPES.CLEAN_DATA_TO_EDIT: {
			return {
				...state,
				dataToEdit: null,
			};
		}
		default:
			return state;
	}
};

export default globalReducers;
