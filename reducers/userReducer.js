import { USER, SET_USER, UNSET_USER, SEARCH } from '../actions/appTypes';

const initialState = {
	user: {	
		user:  {},
		posts: []
	},
	users: []
};

export default function(state = initialState, action){
	switch(action.type) {
		case USER:
			return {
				...state,
				user: {
					user:  action.payload.user,
					posts: action.payload.posts
				}
			}
		case SET_USER:
			return {
				...state,
				user: {
					user: {
						...state.user.user,
						followers:  state.user.user.followers + 1,
						isFollowed: action.payload,
					},
					posts: state.user.posts
				}
			}
		case UNSET_USER:
			return {
				...state,
				user: {
					user: {
						...state.user.user,
						followers:  state.user.user.followers - 1,
						isFollowed: action.payload,
					},
					posts: state.user.posts
				}
			}	
		case SEARCH: 
			return {
				...state,
				users: action.payload
			}	
		default:
			return state;
	}
}