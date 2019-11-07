import React                   						from "react";
import { withNavigation }                           from "react-navigation";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

//redux && redux actions
import { connect }    from 'react-redux';
import { logoutUser } from '../../actions/registerActions';

//components
import Footer from '../Footer';

const Menu = (props) => {

	return(
		<View style={styles.container}>

	        <View style={styles.listItemsView}>
	          	<TouchableOpacity onPress={() => { props.navigation.navigate('EditProfile') }}>
	            	<Text style={styles.listItem}>Edit Profile</Text>
	          	</TouchableOpacity>
	          	<TouchableOpacity onPress={() => { props.navigation.navigate('Password') }}>
	            	<Text style={styles.listItem}>Change Password</Text>
	          	</TouchableOpacity>
	          	<TouchableOpacity onPress={() => { props.navigation.navigate('LikedPosts') }}>
	            	<Text style={styles.listItem}>Posts You've Liked</Text>
	          	</TouchableOpacity>
	        	<TouchableOpacity onPress={() => { props.logoutUser(props.token) }}>
	        		<Text style={styles.listItem}>Log Out</Text>
	        	</TouchableOpacity>
	        </View>

        	<Footer />

		</View>
	);

}

const mapStateToProps = (state) => ({
	token: state.profile.token
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(withNavigation(Menu));

const styles = StyleSheet.create({
	container: {
    	flex: 1,
    	flexDirection: 'column',
  	},
  	listItemsView: {
    	height: "92%",
    	flexDirection: 'column',
    	justifyContent: 'flex-start',
  	},  
  	listItem: {
    	top: 10,
    	left: 20,
    	fontSize: 25,
    	height: 45,
  	},   
});