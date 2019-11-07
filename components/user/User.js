import React, { useEffect }                  from 'react';
import { withNavigation, NavigationActions } from 'react-navigation';
import Icon                                  from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions, FlatList } from 'react-native';

//redux && redux actions
import { connect }          from 'react-redux';
import { getUserData }      from '../../actions/userActions';
import { follow, unfollow } from '../../actions/followActions';

//config
import { API_IMAGES } from '../../config/config';

//components
import Message from '../Message';
import Loader  from '../Loader';
import Footer  from '../Footer';

const User = (props) => {

  useEffect(() => {
    props.getUserData(props.token, props.navigation.getParam('id', ''), props.navigation);   
    // eslint-disable-next-line
  }, []);

  const renderUserPostsItem = ({item, index}) => {
    return(
      <TouchableOpacity key={index} onPress={() => { props.navigation.push('Post', {post_id: item.id}) }}>
        <Image
          source={{uri: `${API_IMAGES}${item.image}`}}
              style={styles.postImage}
        />
      </TouchableOpacity>
    );
  }

  const { id, fullname, username, profile_image, following, followers, isFollowed, count_posts } = props.user.user.user;

  return props.loader === true
  ? <Loader />
  : (
		<View style={styles.container}>

			<View style={styles.profileView}>

			 <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
					
          <TouchableOpacity style={styles.profileViewImageItem}>
						<Image
		         	source={{uri: `${API_IMAGES}${profile_image}`}}
						  style={styles.profileImage}
		        />
		      </TouchableOpacity> 

          <View style={{ flexDirection: 'column' }}>
						
            <View style={{ flexDirection: 'row' }}>
							<TouchableOpacity style={styles.profileViewItem}>
				      	<Text style={styles.profileViewText}>{ count_posts }</Text>
				      	<Text style={styles.profileText}>posts</Text>
				      </TouchableOpacity>	
					    <TouchableOpacity style={styles.profileViewItem}>
					    	<Text style={styles.profileViewText}>{ followers }</Text>
					    	<Text style={styles.profileText}>followers</Text>
					    </TouchableOpacity>	
					    <TouchableOpacity style={styles.profileViewItem}>
					    	<Text style={styles.profileViewText}>{ following }</Text>
					    	<Text style={styles.profileText}>following</Text>
				      </TouchableOpacity>
					  </View>

				    <View style={{ flexDirection: "column", alignItems: 'center' }}>
							{ isFollowed === 1 ?
				        <TouchableOpacity onPress={() => { props.unfollow(props.token, id, "User"); }}>
				        	<Text style={styles.buttonFollowing}>Following</Text>
				        </TouchableOpacity>
							: 
				        <TouchableOpacity onPress={() => { props.follow(props.token, id, "User"); }}>
				        	<Text style={styles.buttonFollow}>Follow</Text>
				        </TouchableOpacity>										
							}
	        			<Text style={styles.profileText}>{ username }</Text>
				    </View>	

				  </View>
			  </View>	

      </View>

			<View style={styles.profilePostsView}>
        <FlatList
          data={ props.user.user.posts }
          numColumns={3}
          keyExtractor={ ( item, index ) => item.id }
          renderItem={ renderUserPostsItem }
        />
			</View>

      <Message />
			<Footer />

		</View>
	);

}

const mapStateToProps = (state) => ({
  loader: state.app.loader,
	token:  state.profile.token,
	user:   state.user
});

export default connect(
  mapStateToProps,
  { follow, unfollow, getUserData }
)(withNavigation(User));

const styles = StyleSheet.create({
  navBTN: {
  	marginRight: 10
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  profileView: {
    height: "27%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderBottomColor: '#999999'
  },
  profileViewImageItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10
  },
  profileImage: {
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 4,
    resizeMode: "stretch",
    borderRadius: 25
  },  
  profileViewItem: {
  	width: Dimensions.get('window').width / 4,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 10
  },
  profileViewText: {
  	fontSize: 20,
    color: "#000000"
  },
  profileText: {
  	fontSize: 17,
    color: "#000000"
  },
  profilePostsView: {
    height: "65%",
    flexDirection: 'row',
  },
  buttonFollow: {
  	marginTop: 15,
  	paddingTop: 10,
  	width: Dimensions.get('window').width / 4,
  	height: 50,
  	fontSize: 20,
  	textAlign: 'center',
  	fontWeight: 'bold', 
  	color: 'black',
  	backgroundColor: '#4d94ff',
  	borderRadius: 10,
  },
	buttonFollowing: {
  	marginTop: 15,
  	paddingTop: 10,
  	width: Dimensions.get('window').width / 4,
  	height: 50,
  	fontSize: 18,
  	textAlign: 'center',
  	fontWeight: 'bold', 
  	color: 'black',
  	borderRadius: 10,
    borderColor: '#999999',
  	borderWidth: 1,		
   },
  postImage: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    resizeMode: "stretch",
  },
});
