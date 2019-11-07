import React, { useEffect } from 'react';
import { withNavigation }   from 'react-navigation';
import Icon                 from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

//redux && redux actions
import { connect }           from 'react-redux';
import { getFollowingPosts } from '../actions/postActions';
import { getNotifications }  from '../actions/notificationActions';
import { getProfileData }    from '../actions/profileActions';

const Footer = (props) => {

  useEffect(() => {
    if(!props.isAuthenticated){ props.navigation.navigate('Login'); }
  }, [props.isAuthenticated]);

	return(
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => { props.navigation.navigate('FollowingPosts'); props.getFollowingPosts(props.token); }} style={styles.footerItem}>
        <Icon name="home" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { props.navigation.navigate('Search'); }} style={styles.footerItem}>
        <Icon name="search" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { props.navigation.navigate('Create') }} style={styles.footerItem}>
        <Icon name="plus-square-o" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { props.navigation.navigate('Notifications'); props.getNotifications(props.token); }} style={styles.footerItem}>
        <Icon name="heart-o" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { props.navigation.navigate('Profile'); props.getProfileData(props.token, props.navigation); }} style={styles.footerItem}>
        <Icon name="user-o" size={30} color="black" />
      </TouchableOpacity>
    </View>
	);

}

const mapStateToProps = (state) => ({
  token:           state.profile.token,
  isAuthenticated: state.profile.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getFollowingPosts, getNotifications, getProfileData }
)(withNavigation(Footer));

const styles = StyleSheet.create({
  footer: {
    position: 'relative',
    height: "8%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#999999',
    left: 0,
    right: 0,
  },
  footerItem: {
    padding: 10,
  }
});