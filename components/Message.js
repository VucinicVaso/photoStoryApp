import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, Modal } from 'react-native';

//redux && redux actions
import { connect }     from 'react-redux';
import { hideMessage } from '../actions/appActions';

const Message = ({ success_message, error_message, hideMessage }) => {

  const [ getModal, setModal ] = useState({
    modalVisible: false
  });

  useEffect(() => {
    if(success_message) {
      setModal({...getModal, modalVisible: true});
    }
  }, [success_message]);

  useEffect(() => {
    if(error_message.length > 0) {
      setModal({...getModal, modalVisible: true});
    }
  }, [error_message]);

  const closeModal = () => { 
    setModal({...getModal, modalVisible: false}); 
  }

  if(success_message || error_message.length > 0){
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={ getModal.modalVisible }
          onRequestClose={() => { closeModal(); }}
        >
          <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', marginTop: Dimensions.get('window').height / 2 }}>
          
          <ScrollView>
            {error_message && error_message !== undefined && error_message !== null && error_message.length > 0 ? 
              [error_message.map((err, index)=> (
                <Text style={styles.errorMessage} key={index} onPress={() => { hideMessage() }}>{err}</Text>
              ))] 
            : null }
          </ScrollView>

          {success_message && success_message !== undefined && success_message !== null && success_message !== "" ? 
            <Text style={styles.successMessage} onPress={() => { hideMessage() }}>{success_message}</Text> 
          : null }
          </View>

        </Modal>

      </View>
    );
  }else { return null; }

}

const mapStateToProps = (state) => ({
  error_message:   state.app.error_message,
  success_message: state.app.success_message,  
});

export default connect(
  mapStateToProps,
  { hideMessage }
)(Message);

const styles = StyleSheet.create({
  successMessage: {
  	height: 50,
    width: Dimensions.get('window').width - 20,
  	padding: 10,
    fontSize: 17,
    borderRadius: 75,
    textAlign: 'center',
    backgroundColor: '#19cd62',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  errorMessage: {
  	height: 50,
    width: Dimensions.get('window').width - 20,
  	padding: 10,
    fontSize: 17,
    marginTop: 5,
    borderRadius: 75,
    textAlign: 'center',
    backgroundColor: '#ff4444',
    color: '#ffffff',
    fontWeight: 'bold',
  } 
});
