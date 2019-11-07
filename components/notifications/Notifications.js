import React              from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';

//redux && redux actions
import { connect }           from 'react-redux';
import { getFollowingPosts } from '../../actions/postActions';

//config
import { API_IMAGES } from '../../config/config';

//components
import Message from '../Message';
import Footer  from '../Footer';

const Notifications = (props) => { 

	return (
		<View style={styles.container}>

			<View style={styles.notificationsView}>
				<ScrollView>
				{props.notifications && props.notifications.length > 0 ?
			 	[props.notifications.map(notification => (
					<View key={notification.notificationId} style={styles.notification}>
						<TouchableOpacity style={styles.notificaitonItem} onPress={() => { props.navigation.navigate('User', {id: notification.user_id}) }}>
							<Image
		         	 			source={{uri: `${API_IMAGES}${notification.profile_image}`}}
						      	style={styles.image}
		        			/>
		        			<Text>{ notification.username }</Text>
	        			</TouchableOpacity>
	        			<TouchableOpacity style={styles.notificaitonItem}>
	        			{notification.type === "comment" 
	        				? <Text style={styles.notificationText}>liked your post</Text>
	        				: <Text style={styles.notificationText}>commented on your post</Text>
	        			}
						</TouchableOpacity>
	        			<TouchableOpacity style={styles.notificaitonItem} onPress={() => { props.navigation.navigate('Post', {post_id: notification.post_id}) }}>
							<Image
		         	 			source={{uri: `${API_IMAGES}${notification.image}`}}
						      	style={styles.image}
		        			/>
		        			<Text>{ notification.created_at }</Text>
	        			</TouchableOpacity>
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
	token:         state.profile.token,
	notifications: state.notifications.notifications
});

export default connect(
	mapStateToProps,
	{ }
)(withNavigation(Notifications));

const styles = StyleSheet.create({
	container: {
    	flex: 1,
    	flexDirection: 'column',
	},
	notificationsView: {
    	height: "92%",
    	flexDirection: 'column', 
  	},
  	notification: {
    	flexDirection: 'row',
    	justifyContent: 'space-between',
    	marginTop: 10,
  	},
  	notificaitonItem: {
    	flex: 1,
    	flexDirection: 'column',
    	alignItems: 'center'
  	},
	image: {
		width: Dimensions.get('window').width / 3,
		height: 100,
		resizeMode: "stretch",
  	},
  	notificationText: {
    	marginTop: 35,
    	textAlign: 'center',
    	fontWeight: 'bold', 
    	color: 'black',  	
	}
});