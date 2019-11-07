import React, { useState, useEffect } from 'react';
import { withNavigation }             from 'react-navigation';
import Icon                           from 'react-native-vector-icons/FontAwesome';
import * as Permissions               from 'expo-permissions';
import * as ImagePicker               from 'expo-image-picker';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Dimensions, CameraRoll, Image } from 'react-native';

//redux && redux actions
import { connect }                 from 'react-redux';
import { showMessage, setSpinner } from '../../actions/appActions';
import { createPost }              from '../../actions/postActions';

//components
import Message from '../Message';
import Spinner from '../Spinner';
import Footer  from '../Footer';

const Create = (props) => {

	const [ post, setPost ] = useState({
		image:    null,
		captions: ""
	});

	const { image, captions } = post;

	const update = (type, text) => { setPost({...post, [type]: text}); }

  	const _pickImage = async () => {
    	const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      	if (cameraRollPerm === 'granted') {
        	let pickerResult = await ImagePicker.launchImageLibraryAsync({
          		allowsEditing: true,
       		});
        	setPost({...post, image: pickerResult.uri});
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
      		setPost({...post, image: pickerResult.uri});
    	}
  	};

	const submitForm = () => { 
		if(image !== null && captions !== ""){
			props.setSpinner(true);
			props.createPost(props.token, post);
			setPost({...post, image: null, captions: ""});
		}else {
			props.showMessage('Please select image', 'error');
		}
	}

	return props.spinner === true
	? <Spinner />
	: ( 
		<View style={styles.container}>
			
			<View style={styles.createPostView}>

	            <View style={styles.imageView}>
	            	<View style={styles.imageViewIcon}>
	                	<TouchableOpacity onPress={() => { _pickImage() }}>
	                  		<Icon name="image" size={40} color="#4285F4" />
	                	</TouchableOpacity>
	                	<Text>Gallery</Text>
	              	</View>
	              	<View style={styles.imageViewIcon}>
	                	<TouchableOpacity onPress={() => { _takePhoto() }}>
	                  		<Icon name="camera" size={40} color="#4285F4" />
	                	</TouchableOpacity>
	                	<Text>Photo</Text>
	              	</View>
	            </View>

	            {image != null ? 
	        	<View style={styles.selectedImageView}>
	            	<Image
	            		source={{uri: `${image}`}}
	            		style={styles.selectedImage}
	            	/>
	            	<Text>Image selected!</Text>
	            </View>
	            : null }
	            
	            <TouchableOpacity>
	            	<Text style={styles.label}>Captions</Text>
	            	<TextInput style={styles.textInput} value={captions} onChangeText={(text) => update('captions', text)} />
	            </TouchableOpacity>

	            <TouchableOpacity style={styles.submitButton} onPress={() => { submitForm(); }}>
	            	<Icon name="check-circle" size={60} color="#4285F4" />
	            </TouchableOpacity>

			</View>

	        <Message />
			<Footer />
		</View>
	);

}

const mapStateToProps = (state) => ({
	spinner: state.app.spinner,
	token:   state.profile.token
});

export default connect(
	mapStateToProps,
	{ showMessage, setSpinner, createPost }
)(withNavigation(Create));

const styles = StyleSheet.create({
	container: {
    	flex: 1,
    	flexDirection: 'column',
  	},
  	createPostView: {
    	height: "92%",
    	flexDirection: 'column',
    	justifyContent: 'space-evenly',
    	alignItems: 'center',   
  	},
  	imageView: {
   		flexDirection: 'row',
    	justifyContent: 'space-between',
  	},
  	imageViewIcon: {
    	flex: 1,
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
    	width: Dimensions.get('window').width - 30,
    	fontSize: 20
  	},
  	submitButton: {
    	marginTop: 10,
    	alignItems: 'center',
  	}
});