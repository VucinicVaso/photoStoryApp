import React, { useState, useEffect } from 'react';
import { withNavigation }             from 'react-navigation';
import Icon                           from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Image, Dimensions, TextInput} from 'react-native';

//redux && redux actions
import { connect } from 'react-redux';
import { getFollowingPosts }                  from '../../actions/postActions';
import { unfollow }                           from '../../actions/followActions';
import { likePost, unlikePost }               from '../../actions/likeActions';
import { createComment, getCommentsByPostId } from '../../actions/commentActions';
import { showMessage }                        from '../../actions/appActions';

//config
import { API_IMAGES } from '../../config/config';

//components
import Message from '../Message';
import Loader  from '../Loader';
import Footer  from '../Footer';

const FollowingPosts = (props) => {

  const [ getComment, setComment ] = useState({
    selectPost:       "",
    commentBody:      "",
    showcommentForm:  false,
    showCommentsView: false
  });

  useEffect(() => {
    props.getFollowingPosts(props.token);   
    // eslint-disable-next-line
  }, []);

  const showComments = (id, isSet) => {
    if(isSet === "show") {
      props.getCommentsByPostId(props.token, id);
      setComment({...getComment, selectPost: id, showCommentsView: true});
    }else if(isSet === "hide") {
      setComment({...getComment, selectPost: id, showCommentsView: false});
    }
  }

  const showCommentForm = (id) => { setComment({...getComment, selectPost: id, showcommentForm: true, showCommentsView: false }); }

  const update = (text) => { setComment({...getComment, commentBody: text}); }

  const submitForm = () => {
    if(getComment.selectPost !== "" && getComment.commentBody !== ''){
      props.createComment(props.token, getComment.selectPost, getComment.commentBody);
      setComment({...getComment, selectPost: "", commentBody: "", showcommentForm: false, showCommentsView: false});
      props.showMessage('Comment was created successfully!', 'success');
    }else { props.showMessage('Comment is empty! Please try again!', 'error'); }
  }

  return props.loader === true
  ? <Loader />
  : (
    <View style={styles.container}>
		
			<View style={styles.postsView}>
			  <ScrollView>
						
        {props.posts ? 
				[props.posts.map(post => (

				  <View style={styles.postView} key={post.id}>

            {/* post user data */}
            <View style={styles.userView}>
							<TouchableOpacity key={post.userId} onPress={() => { props.navigation.navigate('User', {id: post.userId}); }}>
								<Image 
			         		source={{uri: `${API_IMAGES}${post.profile_image}`}}
									style={styles.profileImage}
								/>
							</TouchableOpacity>
							<Text style={styles.userText}>{post.fullname}</Text>
					      <TouchableOpacity onPress={() => { props.unfollow(props.token, post.userId, "FollowingPosts"); }}>
					        <Text style={styles.buttonFollowing}>Following</Text>
					      </TouchableOpacity>
						</View>
                  
            {/* post photo */}
            <View style={styles.photoView}>
							<Image 
		         		source={{uri: `${API_IMAGES}${post.image}`}}
								style={styles.postImage}
							/>								
						</View>

            {/* like/dislike, comment on post, show comments */}
            <View style={styles.likeCommentView}>
            { post.isLiked === 1 ? 
              <TouchableOpacity style={{ paddingRight: 30 }} onPress={() => { props.unlikePost(props.token, post.id, "FollowingPosts"); }}>
                <Icon name="heart" size={25} color="red" />
              </TouchableOpacity>
            :
              <TouchableOpacity style={{ paddingRight: 30 }} onPress={() => { props.likePost(props.token, post.id, "FollowingPosts"); }}>
                <Icon name="heart-o" size={25} color="black" />
              </TouchableOpacity>
            }
              <TouchableOpacity style={{ paddingRight: 30 }} onPress={() => { showCommentForm(post.id); }}>
                <Icon name="comment-o" size={25} color="black" />
              </TouchableOpacity>
            { getComment.showCommentsView == true && getComment.selectPost === post.id ?
              <TouchableOpacity style={{ paddingRight: 30 }} onPress={() => { showComments(post.id, "hide"); }}>
                <Icon name="comments" size={25} color="black" />
              </TouchableOpacity>
            :
              <TouchableOpacity style={{ paddingRight: 30 }} onPress={() => { showComments(post.id, "show"); }}>
                <Icon name="comments-o" size={25} color="black" />
              </TouchableOpacity>
            }
            </View>

            {/* comment form */}
            { getComment.showcommentForm && getComment.selectPost === post.id ?
            <View style={styles.commentFormView}>
              <TouchableOpacity>
                <TextInput style={styles.formTextInput} placeholder="Add a comment..." value={getComment.commentBody} onChangeText={(text) => update(text)} />
              </TouchableOpacity>             
              <TouchableOpacity style={styles.formSubmitButton} onPress={() => { submitForm() }}>
                <Text style={styles.formSubmitButtonText}>POST</Text>
              </TouchableOpacity>
            </View>
            : null }
            
            {/* post body and date */}
            <View style={styles.postDataView}>
              <Text>{post.body} - {post.created_at}</Text>
            </View>

            {/* post comments */}
            { getComment.showCommentsView == true && getComment.selectPost === post.id ?
            <View style={styles.commentsView}>
              <ScrollView>
              { props.comments.length > 0 ? [props.comments.map((comment, index) => (
                <View style={styles.commentRow} key={index}>
                  <TouchableOpacity key={comment.id} onPress={() => { props.navigation.push('User', {id: comment.userId}); }}>
                    <Text style={styles.commentText}>{comment.fullname}</Text>
                  </TouchableOpacity>
                  <Text>{comment.comment}</Text>
                </View>
              ))] : 
                <Text style={{ textAlign: 'center' }}>0 comments</Text>       
              }
              </ScrollView>
            </View>         
            : null } 
						
          </View>

				))]
			  : null }

				</ScrollView>
      </View>

      <Message />				
			<Footer />

		</View>
	);

}

const mapStateToProps = (state) => ({
  loader:   state.app.loader,
  token:    state.profile.token,
  posts:    state.posts.followingPosts,
  comments: state.posts.comments
});

export default connect(
  mapStateToProps,
  { getFollowingPosts, unfollow, likePost, unlikePost, createComment, getCommentsByPostId, showMessage }
)(withNavigation(FollowingPosts));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  postsView: {
    height: "92%",
    flexDirection: 'row',
  },
  userView: {
  	flex: 1,
    flexDirection: 'row',
  	justifyContent: 'space-around',
  	margin: 5  	
  },
  profileImage: {
  	marginTop: 15,
  	paddingTop: 10,
    width: Dimensions.get('window').width / 3,
    height: 50,
    resizeMode: "stretch"
  },
  userText: {
  	marginTop: 15,
  	paddingTop: 10,  	
  	width: Dimensions.get('window').width / 3,
  	height: 50,
  	fontSize: 14,
  	textAlign: 'center',
  	fontWeight: 'bold',
  },
  buttonFollowing: {
  	marginTop: 15,
  	paddingTop: 10,
  	width: Dimensions.get('window').width / 3,
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    resizeMode: "stretch"  	
  },
  photoView: {
  	marginBottom: 10
  },
  likeCommentView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 10,
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
  postDataView: {
    flex: 1,
    flexDirection: 'column',
    margin: 5    
  },
  commentsView: {
    flex: 3,
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
});