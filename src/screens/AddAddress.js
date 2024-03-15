import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../common/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import Button from '../common/Button';
import {useDispatch} from 'react-redux';
import {addAddress, updateAddress} from '../redux/slices/addressSlice';
import uuid from 'react-native-uuid';

const AddAddress = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [type, setType] = useState(
    route.params.type == 'edit'
      ? route.params.data.type == 'Home'
        ? 1
        : 2
      : 1,
  );
  const [state, setState] = useState(
    route.params.type == 'edit' ? route.params.data.state : '',
  );
  const [city, setCity] = useState(
    route.params.type == 'edit' ? route.params.data.city : '',
  );
  const [pinCode, setPinCode] = useState(
    route.params.type == 'edit' ? route.params.data.pinCode : '',
  );

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/arrow.png')}
        title={route.params.type == 'edit' ? 'Edit Address' : 'Add New Address'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <TextInput
        placeholder="Enter State"
        style={[styles.input, {marginTop: 50}]}
        value={state}
        onChangeText={text => setState(text)}
      />
      <TextInput
        placeholder="Enter City"
        style={[styles.input, {marginTop: 15}]}
        value={city}
        onChangeText={text => setCity(text)}
      />
      <TextInput
        placeholder="Enter Pincode"
        keyboardType="number-pad"
        style={[styles.input, {marginTop: 15}]}
        value={pinCode}
        onChangeText={text => setPinCode(text)}
      />
      <View style={styles.typeView}>
        <TouchableOpacity
          style={[
            styles.typeBtn,
            {borderWidth: 0.3, borderColor: type == 0 ? 'orange' : 'black'},
          ]}
          onPress={() => {
            setType(0);
          }}>
          <Image
            source={
              type == 0
                ? require('../images/radio-fill.png')
                : require('../images/radio.png')
            }
            style={styles.radio}
          />
          <Text style={styles.radioText}>{'Home'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeBtn,
            {borderWidth: 0.3, borderColor: type == 1 ? 'orange' : 'black'},
          ]}
          onPress={() => {
            setType(1);
          }}>
          <Image
            source={
              type == 1
                ? require('../images/radio-fill.png')
                : require('../images/radio.png')
            }
            style={styles.radio}
          />
          <Text style={styles.radioText}>{'Office'}</Text>
        </TouchableOpacity>
      </View>
      <Button
        bgColor={'#orange'}
        title={'Save Address'}
        color={'#fff'}
        onClick={() => {
          if (route.params.type == 'edit') {
            dispatch(
              updateAddressAddress({
                state: state,
                city: city,
                pinCode: pinCode,
                type: type == 1 ? 'Home' : 'office',
                id: route.params.data.id,
              }),
              navigation.goBack(),
            );
          } else {
            dispatch(
              addAddress({
                state: state,
                city: city,
                pinCode: pinCode,
                type: type == 1 ? 'Home' : 'office',
                id: uuid.v4(),
              }),
              navigation.goBack(),
            );
          }
        }}
      />
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#EC8A00',
    borderRadius: 25,
    position: 'absolute',
    bottom: 50,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.3,
    alignSelf: 'center',
    paddingLeft: 20,
  },
  typeView: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  typeBtn: {
    width: '40%',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  radio: {
    width: 24,
    height: 24,
  },
  radioText: {
    marginLeft: 10,
  },
});
