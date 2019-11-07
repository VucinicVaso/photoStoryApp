import React, { useState, useEffect } from 'react';
import { withNavigation }             from 'react-navigation';
import Icon                           from 'react-native-vector-icons/FontAwesome';
import * as Permissions               from 'expo-permissions';
import * as ImagePicker               from 'expo-image-picker';
import { StyleSheet, TouchableOpacity, View, ScrollView, 
		Text, TextInput, Dimensions, CameraRoll, Image, DatePickerAndroid } from 'react-native';

//redux && redux actions
import { connect }       from 'react-redux';
import { setSpinner }    from '../../actions/appActions';
import { updateProfile } from '../../actions/profileActions';

//components
import Message from '../Message';
import Spinner from '../Spinner';
import Footer  from '../Footer';

const EditProfile = ({ token, profile, spinner, setSpinner, updateProfile }) => {

	const [ data, setData ] = useState({
		fullname: "",
		username: "",
		email:    "",
		city:     "",
		country:  "",
		date:     "",
		gender:   "",
		image:    null
	});

  	useEffect(() => {
  		if(profile){ setData({...data, fullname: profile.fullname, username: profile.username, email: profile.email, city: profile.city, country: profile.country, date: profile.dateofbirth, gender: profile.gender }); }
  	}, [profile]);

  	async function setDate() {
	    try {
	    	const {action, year, month, day} = await DatePickerAndroid.open({
	        	date: new Date()
	    	});
	    	if(action !== DatePickerAndroid.dismissedAction) {
		    	setData({...data, date: year + "-" + month + "-" + day });
	    	}
	    } catch ({code, message}) {
	    	console.warn('Cannot open date picker', message);
	    }
  	}

  	const _pickImage = async () => {
    	const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      	if (cameraRollPerm === 'granted') {
        	let pickerResult = await ImagePicker.launchImageLibraryAsync({
          		allowsEditing: true,
       		});
        	setData({...data, image: pickerResult.uri});
    	}
  	};

 	const _takePhoto = async () => {
    	const { status: cameraPerm } = await Permissions.askAsync(Permissions.CAMERA);
    	const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
   		if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
    		let pickerResult = await ImagePicker.launchCameraAsync({
        		allowsEditing: false,
        		exif: true
      		});
      		CameraRoll.saveToCameraRoll(pickerResult.uri);
      		setData({...data, image: pickerResult.uri});
    	}
  	};

	const update = (type, text) => { setData({...data, [type]: text}); }

	const submitForm = () => { 
		setSpinner(true);
		updateProfile(token, data); 
	}

	return spinner === true
	? <Spinner />
	: (
    	<View style={styles.container}>

        	<View style={styles.editProfileView}>	
        		<ScrollView>

	            	<View style={styles.imageView}>
	             	 	<View style={styles.imageViewIcon}>
	                		<TouchableOpacity onPress={() => { _pickImage() }}>
	                  			<Icon name="image" size={40} color="#4285F4" />
	                  			<Text>Gallery</Text>
	                		</TouchableOpacity>
	              		</View>
	              		<View style={styles.imageViewIcon}>
	                		<TouchableOpacity onPress={() => { _takePhoto() }}>
	                 			<Icon name="camera" size={40} color="#4285F4" />
	                  			<Text>Photo</Text>
	                		</TouchableOpacity>
	              		</View>
	            	</View>

		            {data.image != null ? 
	            	<View style={styles.selectedImageView}>
		            	<Image 
		            		source={{uri: `${data.image}`}} 
		            		style={styles.selectedImage}
		            	/>
		            	<Text>Image selected!</Text>
		            </View>
		            : null }

	            	<TouchableOpacity>
	              		<Text style={styles.label}>Name</Text>
	              		<TextInput style={styles.textInput} onChangeText={(text) => update('fullname', text)} value={data.fullname} />
	            	</TouchableOpacity>

	            	<TouchableOpacity>
	              		<Text style={styles.label}>Username</Text>
	              		<TextInput style={styles.textInput} onChangeText={(text) => update('username', text)} value={data.username} />
	            	</TouchableOpacity>
	       
	            	<TouchableOpacity>
	              		<Text style={styles.label}>Email</Text>
	              		<TextInput style={styles.textInput} onChangeText={(text) => update('email', text)}  value={data.email} />
	            	</TouchableOpacity>

	            	<TouchableOpacity>
	              		<Text style={styles.label}>City</Text>
	              		<TextInput style={styles.textInput} onChangeText={(text) => update('city', text)}  value={data.city} />
	            	</TouchableOpacity>

	            	<TouchableOpacity>
	              		<Text style={styles.label}>Country</Text>
	              		<TextInput style={styles.textInput} onChangeText={(text) => update('country', text)}  value={data.country} />
	            	</TouchableOpacity>

	            	<TouchableOpacity style={styles.datePicker} onPress={() => { setDate(); }}>
	              		<Text style={styles.label}>Date of birth</Text>
	              		<Icon name="calendar" size={30} color="#4285F4" />
	              		{data.date !== "" ? <Text>{data.date}</Text> : null }
	            	</TouchableOpacity>

	            	<TouchableOpacity>
	              		<Text style={styles.label}>Gender</Text>
	              		<TextInput style={styles.textInput} onChangeText={(text) => update('gender', text)}  value={data.gender} />
	            	</TouchableOpacity>
	       
	            	<TouchableOpacity style={styles.submitButton} onPress={() => { submitForm(); }}>
	             		<Icon name="check-circle" size={60} color="#4285F4" />
	            	</TouchableOpacity>

            	</ScrollView>
        	</View>

        	<Message />
        	<Footer />
      
    	</View>
	);

}

const mapStateToProps = (state) => ({
	spinner: state.app.spinner,
	token:   state.profile.token,
	profile: state.profile.profile
});

export default connect(
	mapStateToProps,
	{ setSpinner, updateProfile }
)(withNavigation(EditProfile));

const styles = StyleSheet.create({
	container: {
    	flex: 1,
    	flexDirection: 'column',
  	},
  	editProfileView: {
    	height: "92%",
    	paddingTop: "5%",
    	paddingBottom: "5%",
    	flexDirection: 'column',
    	justifyContent: 'space-evenly',
    	alignItems: 'center',
  	},
  	imageView: {
    	flexDirection: 'row',
    	justifyContent: 'space-between',
  		height: '10%'
  	},
  	imageViewIcon: {
   		padding: 5,
    	alignItems: 'center'
  	},
  	selectedImageView: {
  		flexDirection: 'column',
  		justifyContent: 'space-between',
  		alignItems: 'center'
  	},
	selectedImage: {
		width: Dimensions.get('window').width / 3,
		height: Dimensions.get('window').width / 3,
		resizeMode: "stretch",
		borderRadius: 25,
	},
	datePicker: {
		margin: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
  	label: {
    	color: 'black',
    	padding: 5,
    	fontSize: 20
  	},
  	textInput: {
    	borderRadius: 10,
    	borderColor: 'black',
    	color: 'black',
    	borderWidth: 1,
    	height: 50,
    	width: Dimensions.get('window').width - 20,
    	fontSize: 20
  	},
  	submitButton: {
    	marginTop: 10,
    	alignItems: 'center',
  	}, 
});