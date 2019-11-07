import { UPDATE_PROFILE }          from './appTypes';
import { showMessage, setSpinner } from './appActions';
import { emptyToken }              from './registerActions';
import { API }                     from '../config/config';

export const getProfileData = (token, navigation) => async dispatch => {
	const result = await fetch(`${API}user/profile`, {
		method: "GET",
        headers: {
        	'Content-Type': 'application/json',
        	'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
        }
	})
	.then(result => result.json())
	.then(result => { return result; });

	if(result.errors && result.errors !== undefined && result.errors != null && result.errors.length > 0){
		dispatch( showMessage(result.errors, "error") );
	}
	
	if(result.token){ dispatch(emptyToken(result.token)); }

  	navigation.dispatch( navigation.setParams({ fullname: result.user.fullname }) );

	dispatch( setProfileData(result.user, result.posts) );
}

export const setProfileData = (user, posts) => async dispatch => {
	dispatch({
		type: UPDATE_PROFILE,
		payload: {
			user:  user,
			posts: posts
		}
	});	
}

export const updatePassword = (token, oldPassword, newPassword, confirmPassword) => async dispatch => {
	const result = await fetch(`${API}user/update`, {
		method: 'POST',
        headers: {
        	'Content-Type': 'application/json',
        	'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
        }, 
		body: JSON.stringify({
			"type":            "password",
			"oldPassword":     oldPassword,
			"newPassword":     newPassword,
			"confirmPassword": confirmPassword
		})
	})
	.then(result => result.json())
	.then(result => { return result; });

	if(result.errors && result.errors !== undefined && result.errors != null && result.errors.length > 0){
		dispatch( setSpinner(false) );
		dispatch( showMessage(result.errors, "error") );
	}

	if(result.token){ dispatch(emptyToken(result.token)); }

	if(result.message && result.message !== undefined && result.message !== null && result.message !== ""){
		dispatch( setSpinner(false) );
		dispatch( showMessage(result.message, "success") );
	}
}

export const updateProfile = (token, data) => async dispatch => {
    const formData = new FormData();
    formData.append("type", "profile");
    formData.append("fullname", data.fullname);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("city", data.city);
    formData.append("country", data.country);
    if(data.image){
	  	let filename  = data.image.split('/').pop();
	  	let match     = /\.(\w+)$/.exec(filename);
	  	let type      = match ? `image/${match[1]}` : `image`;
		formData.append('userfile', {
		    uri: data.image,
		    name: filename,
		    type: type,
		});
    }else { formData.append("userfile", ""); }
    formData.append("date", data.date);
    formData.append("gender", data.gender);

	const result = await fetch(`${API}user/update`, {
		method: 'POST',
        headers: {
        	'Content-Type': 'multipart/form-data',
        	'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
        },
        body: formData
	})
	.then(result => result.json())
	.then(result => { return result; });

	if(result.errors && result.errors !== undefined && result.errors != null && result.errors.length > 0){
		dispatch( setSpinner(false) );
		dispatch( showMessage(result.errors, "error") );
	}

	if(result.token){ dispatch(emptyToken(result.token)); }

	if(result.message && result.message !== undefined && result.message !== null && result.message !== ""){
		dispatch( setSpinner(false) );
		dispatch( setProfileData(result.user, result.posts) );
		dispatch( showMessage(result.message, "success") );
	}
}