import React, { useState, useEffect } from 'react';
import { AppLoading }                 from 'expo';
import { withNavigation }             from 'react-navigation';
import Icon                           from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';

//redux && redux actions
import { connect }                from 'react-redux';
import { loadFonts, showMessage } from '../../actions/appActions';
import { loginUser }              from '../../actions/registerActions';

//components
import Message from '../Message';

const Login = (props) => {

  const [ login, setLogin ] = useState({
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

  const update = (type, text) => { setLogin({...login, [type]: text}); }

	const submitForm = () => {
		if(login.email !== "" && login.password !== ""){
			props.loginUser(login.email, login.password);
			setLogin({...login, email: "", password: "" });
		}else {
			props.showMessage('Your email or password are empty!', 'error');
   	}
	}

	return !props.fontLoaded ? 
    <AppLoading />
	: (
		<View style={styles.container}>

			<View style={styles.header}>
        <View style={{ height: '30%' }}>
          <Text style={styles.title}>PhotoStory</Text>
        </View>
        <View style={{ height: '70%' }}>
          <Icon name="user-circle" size={190} color="white" style={{ padding: '7%' }} />
        </View>
			</View>

      <View style={styles.loginFormView}>
        <View style={styles.formTextFields}>
      
          <TouchableOpacity style={{ paddingBottom: 12 }}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.textInput} onChangeText={(text) => update('email', text)} value={login.email} />
          </TouchableOpacity>

          <TouchableOpacity style={{ paddingBottom: 12 }}>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.textInput} secureTextEntry={true} onChangeText={(text) => update('password', text)} value={login.password}  />
          </TouchableOpacity>
     
          <TouchableOpacity style={styles.submitButton} onPress={() => { submitForm() }}>
            <Text style={styles.submitButtonText}>LOG IN</Text>
          </TouchableOpacity>
     
        </View>
      </View>

			<View style={styles.footer}>
				<TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
					<Text style={styles.redirectButtonText}>Don't have an account? Sign in here.</Text>
				</TouchableOpacity>
			</View>

      <Message />

		</View>
	);

}

const mapStateToProps = (state) => ({
  fontLoaded:      state.app.fontLoaded,
  isAuthenticated: state.profile.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loadFonts, showMessage, loginUser }
)(withNavigation(Login));

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cc2366',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  header: {
    height: '50%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
  	color: 'white',
    fontFamily: 'Lobster',
    fontSize: 60,
    top: 25,
    paddingBottom: 15
  },
  loginFormView: {
    height: '45.5%',
    alignItems: 'center',
  },
  formTextFields: {
    top: -10,
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
  	height: 50,
    width: Dimensions.get('window').width - 50,
  	fontSize: 20
  },
  submitButton: {
    marginTop: 15,
    height: 30,
  },
  submitButtonText: {
  	fontSize: 30,
  	color: 'white',
  	textAlign: 'center',
  	fontWeight: 'bold',
  },
  footer: {
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