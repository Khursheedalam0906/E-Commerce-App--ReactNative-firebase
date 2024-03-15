import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteAddress} from '../redux/slices/addressSlice';

const Addresses = () => {
  const navigation = useNavigation();
  const addressList = useSelector(state => state.address);
  const isFocused = useIsFpcused();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(addressList);
  }, [isFocused]);

  const defaultAddrss = async item => {
    await AsyncStorage.setItem(
      'My_ADDRESS',
      '' +
        item.city +
        ',' +
        item.state +
        ',' +
        item.pincode +
        ',' +
        'type:' +
        item.type,
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/arrow.png')}
        title={'My Addresses'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={addressList.data}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.stateView}
              onPress={() => {
                defaultAddrss(item);
              }}>
              <Text style={styles.state}>{`State : ${item.state}`}</Text>
              <Text style={styles.state}>{`City : ${item.city}`}</Text>
              <Text style={styles.state}>{`Pincode : ${item.pincode}`}</Text>
              <Text
                style={[
                  styles.state,
                  {
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    backgroundColor: '#B1BFF5',
                    padding: 10,
                    borderRadius: 10,
                    fontSize: 10,
                    fontWeight: '600',
                  },
                ]}>
                {item.type}
              </Text>
              <View style={styles.bottomView}>
                <TouchableOpacity
                  style={[styles.bottomIcon, {marginRight: 10}]}
                  onPress={() => {
                    navigation.navigate('AddAddress', {
                      type: 'edit',
                      data: item,
                    });
                  }}>
                  <Image
                    source={require('../images/arrow.png')}
                    style={styles.bottomIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.bottomIcon}
                  onPress={() => {
                    dispatch(deleteAddress(item.id));
                  }}>
                  <Image
                    source={require('../images/arrow.png')}
                    style={styles.bottomIcon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('AddAddress', {type: 'new'});
        }}>
        <Text style={{fontSize: 30, color: '#fff'}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Addresses;

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
  stateView: {
    with: '100%',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 10,
  },
  state: {
    color: '#000',
    fontSize: '18',
  },
  bottomView: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
  },
  bottomIcon: {
    width: 24,
    height: 24,
  },
});
