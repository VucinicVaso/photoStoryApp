import React, { useState, useEffect } from 'react';
import { withNavigation }             from 'react-navigation';
import Icon                           from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Image, Dimensions, TextInput, FlatList } from 'react-native';

//redux && redux actions
import { connect }     from 'react-redux';
import { searchUsers } from '../../actions/userActions';
import { getPosts }    from '../../actions/postActions';
import { showMessage } from '../../actions/appActions';

//config
import { API_IMAGES } from '../../config/config';

// components
import Message from '../Message';
import Loader  from '../Loader';
import Footer  from '../Footer';

const Search = (props) => {

	const [getUsers, setUsers] = useState({
		search: false,
		name: ""
	});

	useEffect(() => {
		props.getPosts(props.token);   
		// eslint-disable-next-line
	}, []);

	const update = (text) => { setUsers({...getUsers, name: text}); }
	
	const submitForm = () => {
		if(getUsers.name !== ''){
		  setUsers({...getUsers, search: true});
		  props.searchUsers(props.token, getUsers.name);
		}else {
		  props.showMessage('Form is empty. Please try again!', 'error');
		}
	}

	const goBack = () => { setUsers({...getUsers, search: false, name: "" }); }

	const renderPostsItem = ({item, index}) => {
		return(
			<TouchableOpacity key={index} onPress={() => { props.navigation.push('Post', {post_id: item.id}) }}>
				<Image
	 	 			source={{uri: `${API_IMAGES}${item.image}`}}
			      	style={styles.postImage}
				/>
			</TouchableOpacity>
		);
	} 

	return props.loader === true
	? <Loader />
	: (
		<View style={styles.container}>

		{/* search users form */}
      	{getUsers.search === true ? 
      		<View style={styles.searchView}>
	      		<TouchableOpacity onPress={() => goBack() }>
	      			<Icon name="arrow-circle-left" size={40} color="#000000" />
	      		</TouchableOpacity>
		      	<TouchableOpacity>
		      		<TextInput style={styles.searchInputTwo} placeholder="Search..." value={getUsers.name} onChangeText={(text) => update(text) } />
		      	</TouchableOpacity>	
	      		<TouchableOpacity onPress={() => submitForm() }>
	      			<Icon name="search" size={40} color="#000000" />
	      		</TouchableOpacity>
      		</View>
      		:
      		<View style={styles.searchView}>
	      		<TouchableOpacity onPress={() => submitForm() }>
	      			<Icon name="search" size={40} color="#000000" />
	      		</TouchableOpacity>			      	
	      		<TouchableOpacity>
	      			<TextInput style={styles.searchInput} placeholder="Search..." value={getUsers.name} onChangeText={(text) => update(text) } />
	      		</TouchableOpacity>
      		</View>
      	}

		{/* search results */}
	    { getUsers.search === true ? 
			<View style={styles.usersView}>
			{props.users ? 
			[props.users.map((user, index) => (
                <View key={index} style={styles.userRow}>
                  <View style={styles.userRowItem}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('User', {id: user.id}); }}>
                       <Image
                          source={{uri: `${API_IMAGES}${user.profile_image}`}}
                          style={styles.profile_image}
                        />            
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.userRowItem} onPress={() => { props.navigation.navigate('User', {id: user.id}); }}>
                    <Text style={styles.userName}>{ user.fullname }</Text>
                  </TouchableOpacity>
                </View> 
			))] 
			: null }
			</View>
		:
			<View style={styles.postsView}>
			{ props.posts.length > 0 ? 
				<FlatList
					data={ props.posts }
					numColumns={3}
					keyExtractor={ ( item, index ) => item.id }
					renderItem={ renderPostsItem }
				/>
			: null }
			</View>
		}

      		<Message />
      		<Footer />

		</View>
	)

}

const mapStateToProps = (state) => ({
	loader: state.app.loader,
	token:  state.profile.token,
	users:  state.user.users,
	posts:  state.posts.posts
});

export default connect(
  mapStateToProps,
  { getPosts, searchUsers, showMessage }
)(withNavigation(Search));

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	searchView: {
		height: "7%",
		marginTop: 15,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	searchInput: {
		marginLeft: 10,
		borderRadius: 10,
		borderColor: 'white',
		color: 'grey',
		borderWidth: 1,
		height: 50,
		fontSize: 20,
		width: Dimensions.get('window').width - 50
	},
	searchInputTwo: {
		marginLeft: 10,
		borderRadius: 10,
		borderColor: 'white',
		color: 'grey',
		borderWidth: 1,
		height: 50,
		fontSize: 20,
		width: Dimensions.get('window').width - 90
	},  
	usersView: {
	    height: "85%",
	    flexDirection: 'column'
	},
  	userRow: {
	    flexDirection: 'row',
	    justifyContent: 'space-between',
	    marginTop: 10,
  	},
  	userRowItem: {
    	flex: 1,
    	flexDirection: 'column',
    	alignItems: 'center', 	
  	},
	profile_image: {
	    width: Dimensions.get('window').width / 4,
	    height: Dimensions.get('window').width / 4,
	    resizeMode: "stretch",
	    borderRadius: 25,
	},    
  	userName: {
	  	marginTop: 35,
	  	textAlign: 'center',
	  	fontWeight: 'bold', 
	  	color: 'black',
	},
	postsView: {
		height: "85%",
		flexDirection: 'row'
	},
	postImage: {
		width: Dimensions.get('window').width / 3,
  		height: Dimensions.get('window').width / 3,
		resizeMode: "stretch",
  	},
});


