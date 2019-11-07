import React 									  from 'react';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { createAppContainer } 					  from 'react-navigation';
import Icon                                       from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, Text }                 from 'react-native';

//components
import Login          from '../components/register/Login';
import Register       from '../components/register/Register';
import Menu           from '../components/menu/Menu';
import EditProfile    from '../components/menu/EditProfile';
import Password       from '../components/menu/Password';
import LikedPosts     from '../components/menu/LikedPosts';
import Profile        from '../components/profile/Profile';
import Notifications  from '../components/notifications/Notifications';
import Create         from '../components/create/Create';
import Post           from '../components/post/Post';
import Following      from '../components/following/Following';
import Followers      from '../components/followers/Followers';
import User           from '../components/user/User';
import FollowingPosts from '../components/followingPosts/FollowingPosts';
import Search         from '../components/search/Search';

const AppNavigator = createStackNavigator(
	{
		Login: {
			screen: Login,
	    	navigationOptions: {
	    		header: null
			}
		},
		Register: {
			screen: Register,
	    	navigationOptions: {
	    		header: null
			}
		},
		Menu: {
			screen: Menu,
		 	navigationOptions: ({ navigation }) => {
      			return {
      				title: 'Settings',
       				headerLeft: (<HeaderBackButton onPress={_ => navigation.navigate("Profile")}/>)
      			}
    		}
		},
		EditProfile: {
			screen: EditProfile,
	    	navigationOptions: {
	    		title: 'Edit Profile'
			}			
		},
		Password: {
			screen: Password,
	    	navigationOptions: {
	    		title: 'Password'
			}			
		},
		LikedPosts: {
			screen: LikedPosts,
	    	navigationOptions: {
	    		title: 'Likes'
			}
		},
		Profile: {
			screen: Profile,
		 	navigationOptions: ({ navigation }) => {
		 		const { params = {} } = navigation.state;
      			return {
      				title: params.fullname,
       				headerLeft: null,
				    headerRight: (
				        <TouchableOpacity style={{ marginRight: 10 }} onPress={_ => navigation.navigate('Menu')}>
				            <Icon name="arrow-right" size={25} color="#000000" />
				        </TouchableOpacity>
				    )
      			}
    		}
		},
		Following: {
			screen: Following,
	    	navigationOptions: {
	    		title: 'Following'
			}			
		},
		Followers: {
			screen: Followers,
	    	navigationOptions: {
	    		title: 'Followers'
			}			
		},
		Notifications: {
			screen: Notifications,
			navigationOptions: {
	    		title: 'Notifications',
	    		headerLeft: null,
			}
		},
		Create: {
			screen: Create,
			navigationOptions: {
	    		title: 'Create',
	    		headerLeft: null,
			}
		},
		Post: {
			screen: Post,
			navigationOptions: {
				title: 'Photo',
			}
		},
		User: {
			screen: User,
		 	navigationOptions: ({ navigation }) => {
		 		const { params = {} } = navigation.state;
      			return {
      				title: params.fullname,
      			}
    		}
		},
		FollowingPosts: {
			screen: FollowingPosts,
		 	navigationOptions: {
		        headerLeft: (
		        	<TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
		            	<Icon name="photo" size={30} color="#000000" />
		            	<Text style={{ fontSize: 30, fontFamily: 'Lobster', paddingLeft: 3}}>Instagram</Text>
		         	</TouchableOpacity>
		        )
    		}			
		},
		Search: {
			screen: Search,
	    	navigationOptions: {
	    		header: null
			}
		}
	},
  	{
    	initialRouteName: "Login",
  	}  
);

export default createAppContainer(AppNavigator);