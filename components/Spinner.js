import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

// redux && redux actions
import { connect } from 'react-redux';

const Spinner = (props) => {

	if(props.spinner === true){
		return(
			<View style={styles.container}>
	           	
	           	<Image
	            	source={ require('../assets/uploadGif.gif') }
	            	style={styles.spinner}
	            />

			</View>
		);
	}

}

const mapStateToProps = (state) => ({ 
	spinner: state.app.spinner
});

export default connect(
	mapStateToProps,
	{ }
)(Spinner);

const styles = StyleSheet.create({
	container: {
    	height: '100%',
    	flexDirection: 'column',
  	},
  	spinner: {
  		width: Dimensions.get('window').width,
  		height: Dimensions.get('window').height
  	}
});