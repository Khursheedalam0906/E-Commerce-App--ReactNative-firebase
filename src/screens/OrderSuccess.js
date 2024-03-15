import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const OrderSuccess = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require('../images/arrow.png')} style={styles.icon} />
      <Text style={styles.msg}>Order Placed Successsfully...</Text>
      <Text
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Main');
        }}>
        {' '}
        Go To Home
      </Text>
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
  msg: {
    marginTop: 20,
    fontSize: 16,
    color: '#000',
  },
  btn: {
    padding: 10,
    borderWidth: 1,
    color: '#000',
  },
});
