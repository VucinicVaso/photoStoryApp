import { FOLLOWING_LIST, FOLLOWERS_LIST, FOLLOW, UNFOLLOW } from '../actions/appTypes';

const initialState = {
	following: [],
	followers: []
};

export default function(state = initialState, action){
	switch(action.type) {
		case FOLLOWING_LIST:
			return {
				...state,
				following: action.payload
			}
		case FOLLOWERS_LIST:
			return {
				...state,
				followers: action.payload
			}
		case FOLLOW:
			return {
				...state,
				following: [...state.following, state.followers.filter(follower => {
					let user = {};
					if(follower.id === action.payload){
						user = {
							id:            follower.id,
							fullname:      follower.fullname,
							profile_image: follower.profile_image							
						};
					}
					return user;
				})],	
				followers: state.followers.filter(follower => {
					if(follower.id === action.payload){
						follower.isFollowing = 1; 
					}
					return follower;
				}),
			}
		case UNFOLLOW:
			return {
				...state,
				followers: state.followers.filter(follower => {
					if(follower.id === action.payload){
						follower.isFollowing = 0; 
					}
					return follower;
				}),				
				following: state.following.filter(follower => follower.id !== action.payload)
			}
		default:
			return state;
	}
}