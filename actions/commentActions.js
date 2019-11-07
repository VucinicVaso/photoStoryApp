import { SET_COMMENTS_FOR_POST } from './appTypes';
import { showMessage }           from './appActions';
import { emptyToken }            from './registerActions';
import { setPost }               from './postActions';
import { API }                   from '../config/config';

/* create comment for a post */
export const createComment = (token, post_id, comment) => async dispatch => {
	const result = await fetch(`${API}comments/store`, {
		method: "POST", 
        headers: {
        	'Content-Type': 'application/json',
        	'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
        },
		body: JSON.stringify({
			"post_id": post_id,
			'comment': comment
		})
	})
	.then(result  => result.json())
	.then(result => { return result; });

	if(result.errors && result.errors !== undefined && result.errors != null && result.errors.length > 0){
		dispatch( showMessage(result.errors, "error") );
	}

	if(result.token){ dispatch(emptyToken(result.token)); }

	dispatch( setPost(result.post, result.comments) );
}

/* get comments for a post by id in FollowingPosts.js */
export const getCommentsByPostId = (token, post_id) => async dispatch => {
	dispatch({
		type: SET_COMMENTS_FOR_POST,
		payload: []
	});

	const result = await fetch(`${API}comments/show/${post_id}`, {
		method: "GET", 
        headers: {
        	'Content-Type': 'application/json',
        	'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
        }
	})
	.then(result  => result.json())
	.then(result => { return result; });

	if(result.token){ dispatch(emptyToken(result.token)); }	

	if(result.comments && result.comments !== undefined && result.comments != null && result.comments.length > 0){
		dispatch({
			type: SET_COMMENTS_FOR_POST,
			payload: result.comments
		});
	}
}