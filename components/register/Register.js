import React, { useState, useEffect } from 'react';
import { AppLoading }                 from 'expo';
import { withNavigation }             from 'react-navigation';
import Icon                           from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';

//redux && redux actions
import { connect }                from 'react-redux';
import { loadFonts, showMessage } from '../../actions/appActions'; 
import { registerUser }           from '../../actions/registerActions';

//components
import Message from '../Message';

const Register = (props) => {

	const [ register, setRegister ] = useState({
		name:     "",
		email:    "",
		password: ""
	});

  useEffect(() => {
    props.loadFonts();
    // eslint-disable-next-line 
  }, []);

  useEffect(() => {
    if(props.isAuthenticated === true){ props.navigation.navigate('Menu'); }
  }, [props.isAuthenticated]);

 	const update = (type, text) => { setRegister({...register, [type]: text}); }

	const submitForm = () => {
		if(register.name !== "" && register.email !== "" && register.password !== ""){
			props.registerUser(register.name, register.email, register.password);
			setRegister({...register, name: "", email: "", password: "" });
		}else {
			props.showMessage('Your name, email or password are empty!', 'error');
		}
	}

  return !props.fontLoaded ? 
    <AppLoading />
  : (
		<View style={styles.container}>

			<View style={styles.headerView}>
        <View style={{ height: '30%' }}>
          <Text style={styles.title}>PhotoStory</Text>
        </View>
        <View style={{ height: '70%' }}>
          <Icon name="user-circle" size={190} color="white" style={{ padding: '7%' }} />
        </View>
			</View>

			<View style={styles.registerFormView}>
        <View style={styles.formTextFields}>
    
        	<TouchableOpacity>
				    <Text style={styles.label}>Name</Text>
				    <TextInput style={styles.textInput} onChangeText={(text) => update('name', text)} value={register.name} />
			    </TouchableOpacity>
			
      		<TouchableOpacity>
				    <Text style={styles.label}>Email</Text>
				    <TextInput style={styles.textInput} onChangeText={(text) => update('email', text)} value={register.email} />
			    </TouchableOpacity>
	  				
	        <TouchableOpacity>
	  				<Text style={styles.label}>Password</Text>
	  				<TextInput style={styles.textInput} secureTextEntry={true} onChangeText={(text) => update('password', text)} value={register.password} />
	  			</TouchableOpacity>
	  				
	        <TouchableOpacity style={styles.submitButton} onPress={() => { submitForm() }}>
	  				<Text style={styles.submitButtonText}>SIGN IN</Text>
	  			</TouchableOpacity>

        </View>
			</View>

			<View style={styles.footerView}>
				<TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
					<Text style={styles.redirectButtonText}>Already have an account? Log in.</Text>
				</TouchableOpacity>
			</View>

      <Message />
			
		</View>
	);

}

const mapStateToProps = (state) => ({
  fontLoaded: state.app.fontLoaded,
  isAuthenticated: state.profile.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loadFonts, showMessage, registerUser }
)(withNavigation(Register));

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#cc2366',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  headerView: {
    height: '47.5%',
    flexDirection: 'column',
    alignItems: 'center',  
  },
  title: {
  	color: 'white',
    fontFamily: 'Lobster',
    fontSize: 60,
    top: 15,
    marginBottom: 12
  },
  registerFormView: {
    height: '47.5%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },  
  formTextFields: {
    top: -20
  },
  label: {
  	color: 'white',
  	padding: 5,
  	fontSize: 20
  },
  textInput: {
  	borderRadius: 10,
  	borderColor: 'white',
  	color: 'white',
  	borderWidth: 1,
  	height: 40,
  	width: Dimensions.get('window').width - 50,
    fontSize: 20
  },
  submitButton: {
    height: 40,
    top: 10
  },
  submitButtonText: {
  	fontSize: 30,
  	color: 'white',
  	textAlign: 'center',
  	fontWeight: 'bold',
  },
  footerView: {
    height: '5%',
    flexDirection: 'column',
    justifyContent: 'center',    
    left: 0,
    right: 0
  },
  redirectButtonText: {
  	fontSize: 15,
  	color: 'white',
  	textAlign: 'center',
  	fontWeight: 'bold',  	
  }
});