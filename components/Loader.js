import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

// redux && redux actions
import { connect } from 'react-redux';

const Loader = (props) => {

	if(props.loader === true){
		return(
			<View style={styles.container}>           	
    
	           	<Image
	            	source={ require('../assets/332.gif') }
	            	style={styles.loader}
	            />

			</View>
		);
	}

}

const mapStateToProps = (state) => ({ 
	loader: state.app.loader
});

export default connect(
	mapStateToProps,
	{ }
)(Loader);

const styles = StyleSheet.create({
	container: {
    	height: "100%",
    	flexDirection: 'column',
   		justifyContent: 'center',
    	alignItems: 'center',
  	},
  	loader: {
    	width: Dimensions.get('window').width - 10,
    	height: 75	
  	}
});