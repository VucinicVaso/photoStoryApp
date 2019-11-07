import { PROFILE, UPDATE_PROFILE, LOGOUT } from '../actions/appTypes';

const initialState = {
	isAuthenticated: false,
	token:   "",		
	profile: {},
	posts:   []
};

export default function(state = initialState, action){
	switch(action.type) {
		case PROFILE:
			return {
				...state,
				isAuthenticated: true,
				token:   action.payload.token,
				profile: action.payload.user,
				posts:   action.payload.posts
			}
		case UPDATE_PROFILE:
			return {
				...state,
				profile: action.payload.user,
				posts:   action.payload.posts
			}
		case LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				token:   "",
				profile: {},
				posts:   []
			}
		default:
			return state;
	}
}