import { 
	POST, POSTS, LIKED_POSTS, SET_IS_POST_LIKED, SET_IS_POST_FOLLOWED, 
	FOLLOWING_POSTS, SET_IS_POST_LIKED_FOLLOWING_POSTS, SET_UNFOLLOW_POST_FOLLOWING_POSTS,
	SET_COMMENTS_FOR_POST
} from '../actions/appTypes';

const initialState = {		
	post: {	
		post:     {},
		comments: []
	},
	likedPosts:     [],
	posts:          [],
	followingPosts: [],
	comments:       []
};

export default function(state = initialState, action){
	switch(action.type) {
		case POST:
			return {
				...state,
				post: {
					post:     action.payload.post,
					comments: action.payload.comments
				}
			}
		case SET_IS_POST_LIKED: {
			return {
				...state,
				post: {
					post: {
						...state.post.post,
						isLiked: action.payload,
					},
					comments: [ ...state.post.comments ]
				}
			}
		}
		case SET_IS_POST_FOLLOWED: {
			return {
				...state,
				post: {
					post: {
						...state.post.post,
						isFollowed: action.payload,
					},
					comments: [ ...state.post.comments ]
				}
			}
		}
		case POSTS: 
			return {
				...state,
				posts: action.payload
			}
		case LIKED_POSTS: 
			return {
				...state,
				likedPosts: action.payload
			}
		case FOLLOWING_POSTS: 
			return {
				...state,
				followingPosts: action.payload
			}
		case SET_IS_POST_LIKED_FOLLOWING_POSTS:
			return {
				...state,
				followingPosts: state.followingPosts.filter(followingPost => {
					if(followingPost.id === action.payload.id){
						followingPost.isLiked = action.payload.isLiked
					}
					return followingPost;
				})
			}
		case SET_UNFOLLOW_POST_FOLLOWING_POSTS:
			return {
				...state,
				followingPosts: state.followingPosts.filter(followingPost => followingPost.userId !== action.payload)
			}	
		case SET_COMMENTS_FOR_POST:
			return {
				...state,
				comments: action.payload
			}	
		default:
			return state;
	}
}