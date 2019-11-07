import { FOLLOWING_LIST, FOLLOWERS_LIST, FOLLOW, UNFOLLOW } from './appTypes';
import { showMessage, setLoader }                           from './appActions';
import { setProfileData }                                   from './profileActions';
import { emptyToken }                                       from './registerActions';
import { setUser }										    from './userActions';
import { isPostFollowed, setUnfollowFollowingPosts }        from './postActions';
import { API }                                              from '../config/config';

/* follow user */
export const follow = (token, id, page) => async dispatch => {
	const result = await fetch(`${API}follow/store`, {
		method: 'POST',
        headers: {
        	'Content-Type': 'application/json',
        	'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
        },
		body: JSON.stringify({
			"follow_user": id
		})		
	})
	.then(result => result.json())
	.then(result => { return result; });

	if(result.errors && result.errors !== undefined && result.errors !== null && result.errors.length > 0){
		dispatch( showMessage(result.errors, "error") );
	}

	if(result.token){ dispatch(emptyToken(result.token)); }	

	if(result.message) {
		if(page === "Following/Followers"){
			dispatch({
				type: FOLLOW,
				payload: id
			});
		}
		
		if(page === "User") { dispatch( setUser(1, "set") ); }

		if(page === "Post") { dispatch( isPostFollowed(1) ); }
		
		dispatch( setProfileData(result.user, result.posts) );
	}
}

/* unfollow user */
export const unfollow = (token, id, page) => async dispatch => {
	const result = await fetch(`${API}follow/destroy/${id}`, {
		method: "POST",
        headers: {
        	'Content-Type': 'application/json',
        	'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
        }	
	})
	.then(result => result.json())
	.then(result => {
		return result;
	});

	if(result.errors && result.errors !== undefined && result.errors !== null && result.errors.length > 0){
		dispatch( showMessage(result.errors, "error") );
	}

	if(result.token){ dispatch(emptyToken(result.token)); }	

	if(result.message) {
		if(page === "Following/Followers"){
			dispatch({
				type: UNFOLLOW,
				payload: id
			});
		} 
		
		if(page === "User") { dispatch( setUser(0, "unset") ); }

		if(page === "Post") { dispatch( isPostFollowed(0) ); }
		
		if(page === "FollowingPosts") { dispatch( setUnfollowFollowingPosts(id) ); }
		
		dispatch( setProfileData(result.user, result.posts) );
	}
}

/* get list of following or followers */
export const getFollowUsersList = (token, followType) => async dispatch => {
	dispatch( setLoader(true) );

	const result = await fetch(`${API}follow/${followType}`, {
		method: "GET",
        headers: {
        	'Content-Type': 'application/json',
        	'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
        }
	})
	.then(result => result.json())
	.then(result => { return result; });

	if(result.errors && result.errors !== undefined && result.errors !== null && result.errors.length > 0){
		dispatch( setLoader(false) );
		dispatch( showMessage(result.errors, "error") );
	}

	if(result.token){ dispatch(emptyToken(result.token)); }	

	if(followType === "following"){
		dispatch({
			type: FOLLOWING_LIST,
			payload: result.message
		});	
	}

	if(followType === "followers"){
		dispatch({
			type: FOLLOWERS_LIST,
			payload: result.message
		});	
	}

	dispatch( setLoader(false) );
}