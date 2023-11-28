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
			const { modal, dataToEdit } = action.payload;
			return {
				...state,
				modal,
				dataToEdit,
			};
		}
		case TYPES.CLOSE_MODAL: {
			return {
				...state,
				modal: { state: false, title: null, child: null },
				dataToEdit: null,
			};
		}
		default:
			return state;
	}
};

export default globalReducers;
