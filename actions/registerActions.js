import { PROFILE, LOGOUT } from './appTypes';
import { showMessage }     from './appActions';
import { API }             from '../config/config';

/* register user ( create new profile ) */
export const registerUser = (name, email, password) => async dispatch => {
    const formData = new FormData();
	formData.append('fullname', name);
	formData.append('email', email);
	formData.append('password', password);

	const result = await fetch(`${API}register`, {
		method: "POST",
		body: formData,	
	})
	.then(result => result.json())
	.then(result => { return result; });

	if(result.errors && result.errors !== undefined && result.errors != null && result.errors.length > 0){
		dispatch( showMessage(result.errors, "error") );
	}

	if(result.message && result.message !== undefined && result.message != null && result.message !== ""){
		dispatch( showMessage(result.message, "success") );
	}
} 

/* login user (create login token and get profile data) */
export const loginUser = (email, password) => async dispatch => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

	const result = await fetch(`${API}login`, {
		method: "POST",
		body: formData
	})
	.then(result  => result.json())
	.then(result => { return result; });

	if(result.errors && result.errors !== undefined && result.errors != null && result.errors.length > 0){	
		dispatch( showMessage(result.errors, "error") );
	}

	if(result.token && result.token !== undefined && result.token != null && result.token !== "") {
		dispatch({
			type: PROFILE,
			payload: {
				token: result.token,
				user:  result.user,
				posts: result.posts
			}
		});
	}
}

/* if token is empty logut */
export const emptyToken = (msg) => dispatch => {
	dispatch( showMessage("Login token has expired", "error") );
	console.log(msg);
	dispatch({ type: LOGOUT });
}

/* logout user (destroy login token) */
export const logoutUser = (token) => async dispatch => {
	const result = await fetch(`${API}logout`, {
		method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
	})
	.then(result  => result.json())
	.then(result => { return result; });

	if(result.logout && result.logout !== undefined && result.logout !== null && result.logout == true){
		dispatch({ type: LOGOUT });
	}else {
		dispatch( showMessage(result.errors, "error") );
	}
}
