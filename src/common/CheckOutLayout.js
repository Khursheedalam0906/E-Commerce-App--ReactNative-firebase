import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const CheckOutLayout = ({total, items}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View styles={styles.tab}>
        <Text>{`(items ${items})`}</Text>
        <Text style={styles.total}>{'Total: $ ' + total}</Text>
      </View>

      <View styles={styles.tab}>
        <TouchableOpacity
          style={styles.checkout}
          onPress={() => {
            navigation.navigate('CheckOut');
          }}>
          <Text style={{color: '#fff'}}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckOutLayout;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkout: {
    width: 120,
    height: '60%',
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  total: {
    fontWeight: '700',
    fontSize: 18,
  },
});
