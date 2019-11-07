import { API } from '../config/config';
import { 
	POST, SET_IS_POST_LIKED, SET_IS_POST_FOLLOWED, 
	POSTS, LIKED_POSTS, FOLLOWING_POSTS, 
	SET_IS_POST_LIKED_FOLLOWING_POSTS, SET_UNFOLLOW_POST_FOLLOWING_POSTS
} from './appTypes';
import { showMessage, setSpinner, setLoader } from './appActions';
import { emptyToken }                         from './registerActions';
import { setProfileData }                     from './profileActions';

/* create new post */
export const createPost = (token, post) => async dispatch => {
    const formData = new FormData();
  	let filename   = post.image.split('/').pop();
  	let match      = /\.(\w+)$/.exec(filename);
  	let type       = match ? `image/${match[1]}` : `image`;
	formData.append('image', {
	    uri:  post.image,
	    name: filename,
	    type: type,
	});
    formData.append("captions", post.captions);

	const result = await fetch(`${API}post/create`, {
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

	if(result.errors && result.errors !== undefined && result.errors !== null && result.errors.length > 0){
		dispatch( setSpinner(false) );
		dispatch( showMessage(result.errors, "error") );
	}

	if(result.token){ dispatch(emptyToken(result.token)); }	

	if(result.message && result.message !== undefined && result.message !== null && result.message !== ""){
		dispatch( setSpinner(false) );
		dispatch( showMessage(result.message, "success") );
		dispatch( setProfileData(result.user, result.posts) );
	}
}

/* get post by id */
export const getPost = (token, id) => async dispatch => {
	dispatch( setLoader(true) );

	const result = await fetch(`${API}post/${id}`, {
		method: 'GET',
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

	if(result.token){ dispatch(emptyToken()); }	

	dispatch( setLoader(false) );
	dispatch( setPost(result.post, result.comments) );
}

/* set post */
export const setPost = (post, comments) => dispatch => {
	dispatch({
		type: POST,
		payload: {
			post: post,
			comments: comments,
		}
	});	
}

/* set post is liked */
export const isPostLiked = (isLiked) => dispatch => {
	dispatch({
		type: SET_IS_POST_LIKED,
		payload: isLiked
	});
}

/* set post is followed */
export const isPostFollowed = (isFollowed) => dispatch => {
	dispatch({
		type: SET_IS_POST_FOLLOWED,
		payload: isFollowed
	});	
}

/* get liked posts for loggedin user */
export const getLikedPosts = (token) => async dispatch => {
	dispatch( setLoader(true) );

	const result = await fetch(`${API}post/liked`, {
		method: 'GET',
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
		dispatch( setLikedPosts([]) );
		dispatch( showMessage(result.errors, "error") );
	}

	if(result.token){ dispatch(emptyToken(result.token)); }	

	dispatch( setLoader(false) );
	dispatch( setLikedPosts(result.likedPosts) );	
}

/* set liked posts */
export const setLikedPosts = (posts) => dispatch => {
	dispatch({
		type: LIKED_POSTS,
		payload: posts
	});	
}

/* get following users posts for loggedin user */
export const getFollowingPosts = (token) => async dispatch => {
	dispatch( setLoader(true) );

	const result = await fetch(`${API}post/followingPosts`, {
		method: 'GET',
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
		dispatch({
			type: FOLLOWING_POSTS,
			payload: []
		});
		dispatch( showMessage(result.errors, "error") );
	}

	if(result.token){ dispatch(emptyToken(result.token)); }	

	dispatch({
		type: FOLLOWING_POSTS,
		payload: result.posts
	});	

	dispatch( setLoader(false) );
}

/* set is post liked in following posts */
export const setIsPostLikedFollowingPosts = (id, isLiked) => dispatch => {
	dispatch({
		type: SET_IS_POST_LIKED_FOLLOWING_POSTS,
		payload: {
			id: id,
			isLiked: isLiked
		}
	});		
}

/* set is post followed in following posts */
export const setUnfollowFollowingPosts = (id) => dispatch => {
	dispatch({
		type: SET_UNFOLLOW_POST_FOLLOWING_POSTS,
		payload: id
	});
}

/* get all posts */
export const getPosts = (token) => async dispatch => {
	dispatch( setLoader(true) );

	const result = await fetch(`${API}post/posts`, {
		method: 'GET',
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
		dispatch({
			type: POSTS,
			payload: []
		});
		dispatch( showMessage(result.errors, "error") );
	}

	if(result.token){ dispatch(emptyToken(result.token)); }	

	dispatch({
		type: POSTS,
		payload: result.posts
	});	

	dispatch( setLoader(false) );	
}