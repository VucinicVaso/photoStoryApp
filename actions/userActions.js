import { USER, SET_USER, UNSET_USER, SEARCH } from './appTypes';
import { emptyToken }                         from './registerActions';
import { showMessage, setSpinner, setLoader } from './appActions';
import { API }                                from '../config/config';

/* get user data by id */
export const getUserData = (token, user, navigation) => async dispatch => {
	dispatch( setLoader(true) );

	const response = await fetch(`${API}user/${user}`, {
		method: "GET",
        headers: {
        	'Content-Type': 'application/json',
        	'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
        }
	})
	.then(result  => result.json())
	.then(result => { return result; });

	if(response.errors && response.errors !== undefined && response.errors != null && response.errors.length > 0){
		dispatch( setLoader(false) );
		dispatch( showMessage(result.errors, "error") );
	}

	if(response.token){ dispatch(emptyToken(response.token)); }

  	navigation.dispatch( navigation.setParams({ fullname: response.user.fullname }) );

	dispatch({
		type: USER,
		payload: {
			user:  response.user,
			posts: response.posts
		}
	});

	dispatch( setLoader(false) );
};

/* set user is followed (1, 0) */
export const setUser = (isFollowed, type) => dispatch => {
	if(type === "set"){
		dispatch({
			type: SET_USER,
			payload: isFollowed
		});
	}
	if(type === "unset"){
		dispatch({
			type: UNSET_USER,
			payload: isFollowed
		});
	}
}

/* search for a user */
export const searchUsers = (token, name) => async dispatch => {
	dispatch( setLoader(true) );

	const result = await fetch(`${API}user/search/${name}`, {
		method: "GET",
        headers: {
        	'Content-Type': 'application/json',
        	'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
        }
	})
	.then(result  => result.json())
	.then(result => { return result; });

	if(result.errors && result.errors !== undefined && result.errors != null && result.errors.length > 0){
		dispatch( setLoader(false) );
		dispatch( showMessage(result.errors, "error") );
	}

	if(result.token){ dispatch(emptyToken(result.token)); }

	dispatch({
		type: SEARCH,
		payload: result.users
	});

	dispatch( setLoader(false) );	
}