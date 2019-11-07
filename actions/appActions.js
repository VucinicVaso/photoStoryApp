import * as Font from 'expo-font';
import { LOAD_FONTS, ERROR_MESSAGE, SUCCESS_MESSAGE, EMPTY_MESSAGE, SET_SPINNER, SET_LOADER } from './appTypes';

export const loadFonts = () => async dispatch => {
	await Font.loadAsync({
	    'Lobster': require('../assets/fonts/Lobster-Regular.ttf'),
	});
	dispatch({
		type: LOAD_FONTS,
		payload: true
	});
}

export const showMessage = (msg, type) => dispatch => {
	if(type === 'error'){
		if(Array.isArray(msg)){
			dispatch({
				type: ERROR_MESSAGE,
				payload: msg
			});
		}else{
			dispatch({
				type: ERROR_MESSAGE,
				payload: [msg]
			});
		}
		setTimeout(() => dispatch({ type: EMPTY_MESSAGE }), 5000);
	}
	if(type === 'success'){
		dispatch({
			type: SUCCESS_MESSAGE,
			payload: msg
		});
		setTimeout(() => dispatch({ type: EMPTY_MESSAGE }), 5000);
	}
}

export const hideMessage = () => dispatch => { dispatch({ type: EMPTY_MESSAGE }); }

export const setSpinner = (type) => dispatch => {
	dispatch({
		type: SET_SPINNER,
		payload: type
	});	
}

export const setLoader = (type) => dispatch => {
	dispatch({
		type: SET_LOADER,
		payload: type
	});		
}