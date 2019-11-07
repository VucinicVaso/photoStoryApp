import React, { useState, useEffect } from 'react';
import { withNavigation }  			  from 'react-navigation';
import Icon                 		  from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Dimensions } from 'react-native';

//redux && redux actions
import { connect }                 from 'react-redux';
import { showMessage, setSpinner } from '../../actions/appActions';
import { updatePassword }          from '../../actions/profileActions';

//components
import Message from '../Message';
import Spinner from '../Spinner';
import Footer  from '../Footer';

const Password = (props) => {

	const [ password, setPassword ] =  useState({
		oldPassword:     "",
		newPassword:     "",
		confirmPassword: ""
	});

	const update = (type, text) => { setPassword({...password, [type]: text}); }

	const checkInput = () => {
		if(password.oldPassword !== "" && password.newPassword !== "" && password.confirmPassword !== ""){
			if(password.oldPassword !== password.newPassword){
				if(password.newPassword === password.confirmPassword){
					return true;
				}else { 
					setPassword({...password, oldPassword: "", newPassword: "", confirmPassword: "" });
					props.showMessage("New password and confirm password must be the same!", "error"); 
				}
			}else { 
				props.showMessage("New password should not be the same as the old password!", "error");
				setPassword({...password, oldPassword: "", newPassword: "", confirmPassword: "" });	
			}
		}else { 
			props.showMessage("Password form is empty!", "error");
			setPassword({...password, oldPassword: "", newPassword: "", confirmPassword: "" });	
		}
	}

	const submitForm = () => {
		if(checkInput() === true){
			props.setSpinner(true);
			props.updatePassword(props.token, password.oldPassword, password.newPassword, password.confirmPassword);
			setPassword({...password, oldPassword: "", newPassword: "", confirmPassword: "" });			
		}
	}

	return props.spinner === true
	? <Spinner />
	: (
  		<View style={styles.container}>

  			<View style={styles.passwordView}>

        		<TouchableOpacity>
            		<Text style={styles.label}>Old password</Text>
            		<TextInput style={styles.textInput} secureTextEntry={true} onChangeText={(text) => update('oldPassword', text)} value={password.oldPassword} />
          		</TouchableOpacity>

        		<TouchableOpacity>
            		<Text style={styles.label}>New password</Text>
            		<TextInput style={styles.textInput} secureTextEntry={true} onChangeText={(text) => update('newPassword', text)} value={password.newPassword} />
          		</TouchableOpacity>

          		<TouchableOpacity>
            		<Text style={styles.label}>New password, again</Text>
            		<TextInput style={styles.textInput} secureTextEntry={true} onChangeText={(text) => update('confirmPassword', text)} value={password.confirmPassword} />
          		</TouchableOpacity>

          		<TouchableOpacity style={styles.submitButton} onPress={() => { submitForm() }}>
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
	{ showMessage, setSpinner, updatePassword }
)(withNavigation(Password));

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	passwordView: {
		height: "92%",
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'center',
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
		height: 45,
		width: Dimensions.get('window').width - 20,
		fontSize: 20
	},
	submitButton: {
		alignItems: 'center'
	}
});