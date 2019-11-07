import { API }         from '../config/config';
import { showMessage } from './appActions';
import { emptyToken }  from './registerActions';
import { isPostLiked, setLikedPosts, setIsPostLikedFollowingPosts } from './postActions';

/* like post */
export const likePost = (token, id, page) => async dispatch => {
	const result = await fetch(`${API}like/store`, {
		method: "POST", 
        headers: {
        	'Content-Type': 'application/json',
        	'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
        },
		body: JSON.stringify({
			"post_id": id
		})
	})
	.then(result  => result.json())
	.then(result => { return result; });

	if(result.errors && result.errors !== undefined && result.errors != null && result.errors.length > 0){
		dispatch( showMessage(result.errors, "error") );
	}

	if(result.token){ dispatch(emptyToken(result.token)); }	

	if(page === "Post"){ dispatch( isPostLiked(1) ); }
	
	if(page === "FollowingPosts"){ dispatch( setIsPostLikedFollowingPosts(id, 1) ); }
	
	dispatch( setLikedPosts(result.likedPosts) );
}

/* unlike post */
export const unlikePost = (token, id, page) => async dispatch => {
	const result = await fetch(`${API}like/destroy/${id}`, {
		method: "POST", 
        headers: {
        	'Content-Type': 'application/json',
        	'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
        }
	})
	.then(result  => result.json())
	.then(result => { return result; });

	if(result.errors && result.errors !== undefined && result.errors != null && result.errors.length > 0){
		dispatch( showMessage(result.errors, "error") );
	}

	if(result.token){ dispatch(emptyToken(result.token)); }	

	if(page === "Post"){ dispatch( isPostLiked(0) ); }
	
	if(page === "FollowingPosts"){ dispatch( setIsPostLikedFollowingPosts(id, 0) ); }
	
	dispatch( setLikedPosts(result.likedPosts) );
}