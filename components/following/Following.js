import React, { useEffect } from 'react';
import { withNavigation }   from 'react-navigation';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';

//redux && redux actions
import { connect }                      from 'react-redux';
import { getFollowUsersList, unfollow } from '../../actions/followActions';

//config
import { API_IMAGES } from '../../config/config';

//components
import Message from '../Message';
import Loader  from '../Loader';
import Footer  from '../Footer';

const Following = (props) => {

  useEffect(() => {
    props.getFollowUsersList(props.token, "following");
    // eslint-disable-next-line
  }, []);

  return props.loader === true
  ? <Loader />
  : (
		<View style={styles.container}>

			<View style={styles.followingView}>

        <ScrollView>
          {props.following ?
          [props.following.map((user, index) => (
          <View key={index} style={styles.followingRow}>
            <View style={styles.followingRowItem}>
              <TouchableOpacity onPress={() => { props.navigation.navigate('User', {id: user.id}); }}>
                <Image
                  source={{uri: `${API_IMAGES}${user.profile_image}`}}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.followingRowItem}>
              <Text style={styles.followingName}>{user.fullname}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followingRowItem} onPress={() => { props.unfollow(props.token, user.id, "Following/Followers"); }}>
              <Text style={styles.button}>Following</Text>
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
  loader:    state.app.loader,
  token:     state.profile.token,
  following: state.follow.following
});

export default connect(
  mapStateToProps,
  { getFollowUsersList, unfollow }
)(withNavigation(Following));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  followingView: {
    height: "92%",
    flexDirection: 'column', 
  },
  followingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  followingRowItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'  	
  },
  image: {
  	width: Dimensions.get('window').width / 4,
  	height: 100,
  	resizeMode: "stretch",
  	borderRadius: 25,
  },
  followingName: {
    marginTop: 35,
    textAlign: 'center',
    fontWeight: 'bold', 
    color: 'black',
    width: Dimensions.get('window').width / 4,
  },
  button: {
  	marginTop: 25,
  	paddingTop: 10,
  	width: Dimensions.get('window').width / 4,
  	height: 50,
  	fontSize: 18,
  	textAlign: 'center',
  	fontWeight: 'bold', 
  	color: 'black',
  	borderRadius: 10,
    borderColor: '#999999',
  	borderWidth: 1,
  }
});