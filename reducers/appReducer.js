import { LOAD_FONTS, ERROR_MESSAGE, SUCCESS_MESSAGE, EMPTY_MESSAGE, SET_SPINNER, SET_LOADER } from '../actions/appTypes';

const initialState = {
	fontLoaded:      false,
 	error_message:   [],
 	success_message: "",
 	spinner:         false,
 	loader:          false,
};

export default function(state = initialState, action){
	switch(action.type) {
		case LOAD_FONTS:
			return {
				...state,
				fontLoaded: action.payload
			}
		case ERROR_MESSAGE:
			return {
				...state,
				error_message: action.payload
			}
		case SUCCESS_MESSAGE:
			return {
				...state,
				success_message: action.payload
			}
		case EMPTY_MESSAGE:
			return {
				...state,
				error_message:   [],
				success_message: ""
			}
		case SET_SPINNER:
			return {
				...state,
				spinner: action.payload
			}
		case SET_LOADER:
			return {
				...state,
				loader: action.payload
			}
		default:
			return state;
	}
}