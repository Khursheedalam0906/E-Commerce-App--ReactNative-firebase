import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Button from './Button';

const AskForLoginModal = ({
  modalVisible,
  onClickLogin,
  onClickSignup,
  onClose,
}) => {
  return (
    <Modal visible={modalVisible} transparent>
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              onClickLogin();
            }}>
            <Text style={styles.btnText}>{'Login'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, {marginBottom: 20}]}
            onPress={() => {
              onClickSignup();
            }}>
            <Text style={styles.btnText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => {
              onClose();
            }}>
            <Image
              source={require('../images/close.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AskForLoginModal;

const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    // height: 200,
    width: '90%',
  },
  btn: {
    width: '80%',
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  clearBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
