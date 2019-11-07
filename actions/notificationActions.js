import { NOTIFICATIONS } from './appTypes';
import { showMessage }   from './appActions';
import { emptyToken }    from './registerActions';
import { API }           from '../config/config';

export const getNotifications = (token) => async dispatch => {
	const result = await fetch(`${API}notifications`, {
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

	dispatch({
		type:    NOTIFICATIONS,
		payload: result.notifications
	});
}
