import { GLOBAL_TYPES as TYPES } from './globalActions';

const globalReducers = (state, action) => {
	switch (action.type) {
		case TYPES.TOGGLE_MENU: {
			return {
				...state,
				hideMenu: action.payload,
			};
		}

		case TYPES.TOGGLE_MODAL: {
			const { isOpen } = state.modal;
			const { modal, dataToEdit } = action.payload;
			const { title, child } = modal ?? { title: null, child: null };

			return {
				...state,
				modal: { isOpen: !isOpen, title, child },
				dataToEdit,
			};
		}

		case TYPES.TOGGLE_LOADER: {
			return {
				...state,
				isLoading: action.payload,
			};
		}

		case TYPES.SET_REDIRECT_MSG: {
			return {
				...state,
				redirectMsg: action.payload,
			};
		}

		default:
			return state;
	}
};

export default globalReducers;
