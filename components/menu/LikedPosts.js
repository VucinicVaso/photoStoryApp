import React, { useEffect } from 'react';
import { withNavigation }   from 'react-navigation';
import { StyleSheet, TouchableOpacity, View, Image, Dimensions, FlatList } from 'react-native';

// redux && redux actions
import { connect }       from 'react-redux';
import { getLikedPosts } from '../../actions/postActions';

// config
import { API_IMAGES } from '../../config/config';

// components
import Message from '../Message';
import Loader  from '../Loader';
import Footer  from '../Footer';

const LikedPosts = (props) => {

	useEffect(() => {
		props.getLikedPosts(props.token);
		// eslint-disable-next-line
  	}, []);

	const renderLikedPostsItem = ({item, index}) => {
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
  			
  			<View style={styles.postsView}>
  			{ props.likedPosts && props.likedPosts.length > 0 ? 
				<FlatList
					data={ props.likedPosts }
					numColumns={3}
					keyExtractor={ ( item, index ) => item.id }
					renderItem={ renderLikedPostsItem }
				/>	
			: null }
  			</View>
  			
			<Message />
  			<Footer />

  		</View>
	);

}

const mapStateToProps = (state) => ({
	loader:     state.app.loader,
	token:      state.profile.token,
	likedPosts: state.posts.likedPosts
});

export default connect(
	mapStateToProps,
	{ getLikedPosts }
)(withNavigation(LikedPosts));

const styles = StyleSheet.create({
	container: {
    	flex: 1,
    	flexDirection: 'column',
  	},
  	postsView: {
    	height: "92%",
    	flexDirection: 'row',
  	},
	postImage: {
		width: Dimensions.get('window').width / 3,
  		height: Dimensions.get('window').width / 3,
		resizeMode: "stretch",
  	},
});