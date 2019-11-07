import React, { useState, useEffect } from 'react';
import { withNavigation }             from 'react-navigation';
import Icon                           from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, TouchableOpacity, View, ScrollView, Text, TextInput, Image, Dimensions } from 'react-native';

//redux && redux actions
import { connect }              from 'react-redux';
import { showMessage }          from '../../actions/appActions';
import { getPost }              from '../../actions/postActions';
import { follow, unfollow }     from '../../actions/followActions';
import { likePost, unlikePost } from '../../actions/likeActions';
import { createComment }        from '../../actions/commentActions';

//config
import { API_IMAGES } from '../../config/config';

//components
import Message from '../Message';
import Loader  from '../Loader';
import Footer  from '../Footer';

const Post = (props) => {

	const [ comment, setComment ] = useState({
		commentBody: "",
		commentForm: false
	});

	const { commentBody, commentForm } = comment;

	useEffect(() => {
		props.getPost(props.token, props.navigation.getParam('post_id', ''));		
		// eslint-disable-next-line
  	}, []);

	const showCommentForm = () => {  setComment({...comment, commentForm: true}); }

	const update = (text) => { setComment({...comment, commentBody: text}); }

  	const submitForm = () => {
	    if(commentBody !== ''){
	    	props.createComment(props.token, props.post.post.id, commentBody);
	    	setComment({...comment, commentBody: "", commentForm: false}); 
	    }else { props.showMessage('Comment is empty! Please try again!', 'error'); }
  	}

	return props.loader === true
	? <Loader />
	: (
		<View style={styles.container}>

			<View style={styles.postView}>
				<ScrollView>
					
					{/* post data (profile name, image, Following/Follow button) */}
					<View style={styles.postDataView}>
						<TouchableOpacity onPress={() => { 
							props.profile.id === props.post.post.userId 
								? props.navigation.navigate('Profile')
								: props.navigation.navigate('User', {id: props.post.post.userId});
						}}>
							<Image 
		         				source={{uri: `${API_IMAGES}${props.post.post.profile_image}`}}
								style={styles.profileImage}
							/>
						</TouchableOpacity>
						<Text style={styles.userText}>{props.post.post.fullname}</Text>
						{ props.profile.id === props.post.post.userId ? null : 
							[ props.post.post.isFollowed === 1 ?
					        <TouchableOpacity onPress={() => { props.unfollow(props.token, props.post.post.userId, "Post"); }}>
					        	<Text style={styles.buttonFollowing}>Following</Text>
					        </TouchableOpacity>
							:
					        <TouchableOpacity onPress={() => { props.follow(props.token, props.post.post.userId, "Post"); }}>
					        	<Text style={styles.buttonFollow}>Follow</Text>
					        </TouchableOpacity>	
							]
						}
					</View>
					
					{/* post image */}
					<View style={styles.postImageView}>
						<Image source={{uri: `${API_IMAGES}${props.post.post.image}`}} style={styles.image} />
					</View>

					{/* like/dislike, comment on post */}
					<View style={styles.likeCommentView}>
						{props.post.post.isLiked === 1 ? 
				        <TouchableOpacity style={{ paddingRight: 30 }} onPress={() => { props.unlikePost(props.token, props.post.post.id, "Post"); }}>
				        	<Icon name="heart" size={25} color="red" />
				        </TouchableOpacity>									
						: 
				        <TouchableOpacity style={{ paddingRight: 30 }} onPress={() => { props.likePost(props.token, props.post.post.id, "Post"); }}>
				        	<Icon name="heart-o" size={25} color="black" />
				        </TouchableOpacity>
						}
				        <TouchableOpacity style={{ paddingRight: 30 }} onPress={() => showCommentForm() }>
				        	<Icon name="comment-o" size={25} color="black" />
				        </TouchableOpacity>
					</View>

					{/* post text */}
					<View style={styles.bodyView}>
						<Text style={styles.postText}>{props.post.post.body} {props.post.post.created_at}</Text>
					</View>

				    {/* comment form */}
					{commentForm ?
						<View style={styles.commentFormView}>
				            <TouchableOpacity>
				              <TextInput style={styles.formTextInput} placeholder="Add a comment ..." value={commentBody} onChangeText={(text) => update(text)} />
				            </TouchableOpacity>							
				            <TouchableOpacity style={styles.formSubmitButton} onPress={() => { submitForm(); }}>
				              <Text style={styles.formSubmitButtonText}>POST</Text>
				            </TouchableOpacity>
						</View>
					 : null}

				    {/* comments list */}
					<View style={styles.commentsView}>
						<ScrollView>
						{props.post.comments ? 
							[props.post.comments.map((comment, index) => (
								<View style={styles.commentRow} key={index}>
							        <TouchableOpacity key={comment.id} onPress={() => { props.navigation.push('User', {id: comment.userId}) }}>
							        	<Text style={styles.commentText}>{comment.fullname}</Text>
							        </TouchableOpacity>
							        <Text>{comment.comment}</Text>
								</View>
							))] 
						: null }
						</ScrollView>
					</View>

				</ScrollView>
			</View>

			<Message />
			<Footer />

		</View>
	);

}

const mapStateToProps = (state) => ({
	loader:  state.app.loader,
	token:   state.profile.token,
	profile: state.profile.profile,
	post:    state.posts.post,
});

export default connect(
	mapStateToProps,
	{ showMessage, getPost, follow, unfollow, likePost, unlikePost, createComment }
)(withNavigation(Post));

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-evenly',
	},
	postView: {
		height: "92%",
		flexDirection: 'column',
	},  
	postDataView: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: 5,
	},
	profileImage: {
		width: 80,
		height: 80,
		resizeMode: 'stretch',
		borderRadius: 25
	},
	postImageView: {		
		flex: 4.5,
		flexDirection: 'column',
	},
	image: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').width,
		resizeMode: 'stretch'
	},
	userText: {
		marginTop: 15,
		paddingTop: 10,
		fontSize: 15,
	},
	likeCommentView: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		margin: 10,
	},
	bodyView: {
		flex: 1,
		flexDirection: 'column',
		margin: 5,
	},
	postText: {
		fontSize: 15,
	},
	commentFormView: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		margin: 5,
	},
	formTextInput: {
		borderRadius: 10,
		borderColor: '#999999',
		borderWidth: 1,
		height: 50,
		fontSize: 20,
		width: Dimensions.get('window').width / 2,
	},
	formSubmitButton: {
		borderRadius: 10,
		borderColor: '#999999',
		borderWidth: 1,
		height: 50,
	},
	formSubmitButtonText: {
		fontSize: 20,
		color: '#1ac6ff',
		textAlign: 'center',
		fontWeight: 'bold',
		paddingTop: 10
	},
	commentsView: {
		flex: 2.5,
		flexDirection: 'column',
		margin: 5,
	},
	commentRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10
	},
	commentText: {
		fontSize: 15,
		fontWeight: 'bold',
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
		borderRadius: 10
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
	}
});
