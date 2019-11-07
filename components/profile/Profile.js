import React, { useEffect }                  from 'react';
import { withNavigation, NavigationActions } from 'react-navigation';
import Icon                                  from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions, FlatList } from 'react-native';

//redux && redux actions
import { connect }        from 'react-redux';
import { getProfileData } from '../../actions/profileActions';

//config
import { API_IMAGES } from '../../config/config';

//components
import Message from '../Message';
import Footer  from '../Footer';

const Profile = (props) => {

	const { fullname, username, profile_image, count_posts, following, followers } = props.profile.profile;

	useEffect(() => {
		props.getProfileData(props.profile.token, props.navigation);
		// eslint-disable-next-line
  	}, []);

	const renderProfilePostsItem = ({item, index}) => {
		return(
			<TouchableOpacity key={index} onPress={() => { props.navigation.push('Post', {post_id: item.id}) }}>
				<Image
	 	 			source={{uri: `${API_IMAGES}${item.image}`}}
			      	style={styles.postImage}
				/>
			</TouchableOpacity>
		);
	}

	return(
		<View style={styles.container}>

			<View style={styles.profileView}>
				
				<View style={styles.profileViewUp}>
			        <TouchableOpacity style={styles.profileViewItem}>
						<Image
	         	 			source={{uri: `${ API_IMAGES }${ profile_image }`}}
					      	style={styles.profileImage}
	        			/>
	        			<Text style={styles.profileText}>{ username }</Text>
			        </TouchableOpacity>
			        <TouchableOpacity style={styles.profileViewItem}>
			        	<Text style={styles.profileViewText}>{ count_posts }</Text>
			        	<Text style={styles.profileText}>posts</Text>
			        </TouchableOpacity>	
			        <TouchableOpacity onPress={() => { props.navigation.navigate('Followers') }} style={styles.profileViewItem}>
			        	<Text style={styles.profileViewText}>{ followers }</Text>
			        	<Text style={styles.profileText}>followers</Text>
			        </TouchableOpacity>	
			        <TouchableOpacity onPress={() => { props.navigation.navigate('Following') }} style={styles.profileViewItem}>
			        	<Text style={styles.profileViewText}>{ following }</Text>
			        	<Text style={styles.profileText}>following</Text>
			        </TouchableOpacity>
	    		</View>

	    		<View style={styles.profileViewDown}>
					<TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')}>
						<Text style={styles.editProfileBTN}>Edit Profile</Text>
					</TouchableOpacity>
	    		</View>
			</View>

			<View style={styles.profilePostsView}>
				<FlatList
					data={ props.profile.posts }
					numColumns={3}
					keyExtractor={ ( item, index ) => item.id }
					renderItem={ renderProfilePostsItem }
				/>				
			</View>

			<Message />
			<Footer />
			
		</View>
	);

}

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getProfileData }
)(withNavigation(Profile));

const styles = StyleSheet.create({
  	container: {
    	flex: 1,
    	flexDirection: 'column',
  	},
  	profileView: {
		height: "35%",
		flexDirection: 'column', 
		justifyContent: 'space-between', 
		borderWidth: 1, 
		borderBottomColor: '#999999',
  	},
  	profileViewUp: {
    	flexDirection: 'row',
    	justifyContent: 'space-between',
  	},
  	profileViewItem: {
    	flexDirection: 'column',
    	alignItems: 'center',
    	textAlign: 'center',
   		marginTop: 10,
  	},
  	profileImage: {
		width: Dimensions.get('window').width / 4,
		height: Dimensions.get('window').width / 4,
		resizeMode: "stretch",
		borderRadius: 25,
  	},
  	profileViewText: {
  		fontSize: 20,
    	color: "#000000"
  	},            	
  	profileText: {
  		fontSize: 17,
   		color: "#000000"
  	},
  	profileViewDown: {
		flexDirection: 'row', 
		justifyContent: 'center', 
		marginBottom: 7,
		marginLeft: 15,
		marginRight: 15, 
		borderRadius: 85,
		borderWidth: 1, 
		borderColor: '#999999'
  	},
  	editProfileBTN: {
		height: 30, 
		padding: 5, 
		textAlign: 'center', 
		fontSize: 15, 
		color: 'black', 
		fontWeight: 'bold'
  	},
  	profilePostsView: {
    	height: "57%",
    	flexDirection: 'row',
	},
	postImage: {
		width: Dimensions.get('window').width / 3,
  		height: Dimensions.get('window').width / 3,
		resizeMode: "stretch",
  	},
});