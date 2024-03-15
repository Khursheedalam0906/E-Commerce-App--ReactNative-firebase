import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../common/Header';
import {useDispatch, useSelector} from 'react-redux';
import {
  addItemToCart,
  emptyCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../redux/slices/CartSlice';
import Button from '../common/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {orderItem} from '../redux/slices/OrderSlice';

const CheckOut = () => {
  const items = useSelector(state => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(
    'Please select address',
  );

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    setCartItems(items.data);
  }, [items]);

  const getTotal = () => {
    let total = 0;
    cartItems.map(item => {
      total = total + item.qty * item.price;
    });
    return total.toFixed(0);
  };

  useEffect(() => {
    getSelectedAddress();
  }, [isFocused]);

  const getSelectedAddress = async () => {
    setSelectedAddress(await AsyncStorage.getItem('MY_ADDRESS'));
  };

  const orderPlace = paymentId => {
    const data = {
      items: cartItems,
      amount: '$' + getTotal(),
      address: selectedAddress,
      paymentId: paymentId,
      paymentStatus: selectedMethod == 3 ? 'Pending' : 'Successs',
    };
    dispatch(orderItem(data));
    dispatch(emptyCart([]));
    navigation.navigate('OrderSuccess');
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/arrow.png')}
        title={'Checkout'}
        onClickLeftIcon={() => {
          NavigationContainer.goBack();
        }}
      />
      <Text style={styles.title}>Added Items</Text>
      <View>
        <FlatList
          data={cartItems}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.productItem}
                onPress={() => {
                  navigation.navigate('ProductDetails', {
                    data: item,
                  });
                }}>
                <Image source={{uri: item.image}} style={styles.itemImage} />
                <View>
                  <Text style={styles.name}>
                    {item.title.length > 25
                      ? item.title.substring(0, 25) + '...'
                      : item.title}
                  </Text>
                  <Text style={styles.description}>
                    {item.description.length > 30
                      ? item.description.substring(0, 30) + '...'
                      : item.description}
                  </Text>
                  <View style={styles.qtyView}>
                    <Text style={styles.price}>{'$' + ' ' + item.price}</Text>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => {
                        if (item.qty > 1) {
                          dispatch(reduceItemFromCart(item));
                        } else {
                          dispatch(removeItemFromCart(index));
                        }
                      }}>
                      <Text style={{fontSize: 18, fontWeight: '600'}}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qty}>{item.qty}</Text>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => {
                        dispatch(addItemToCart(item));
                      }}>
                      <Text style={{fontSize: 18, fontWeight: '600'}}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.totalView}>
        <Text style={styles.title}>Total</Text>
        <Text style={[styles.title, {marginRight: 20}]}>
          {'$' + getTotal()}
        </Text>
      </View>
      <Text style={styles.title}>Select Payment Mode</Text>
      <TouchableOpacity
        style={styles.paymentMethod}
        onPress={() => {
          selectedMethod(0);
        }}>
        <Image
          source={
            selectedMethod == 0
              ? require('../images/radio-fill.png')
              : require('../images/radio.png')
          }
          style={styles.icon}
        />
        <Text style={styles.paymentMethodText}>Credit Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentMethod}
        onPress={() => {
          setSelectedMethod(1);
        }}>
        <Image
          source={
            selectedMethod == 1
              ? require('../images/radio-fill.png')
              : require('../images/radio.png')
          }
          style={styles.icon}
        />
        <Text style={styles.paymentMethodText}>Debit Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentMethod}
        onPress={() => {
          setSelectedMethod(2);
        }}>
        <Image
          source={
            selectedMethod == 2
              ? require('../images/radio-fill.png')
              : require('../images/radio.png')
          }
          style={styles.icon}
        />
        <Text style={styles.paymentMethodText}>UPI</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentMethod}
        onPress={() => {
          setSelectedMethod(3);
        }}>
        <Image
          source={
            selectedMethod == 3
              ? require('../images/radio-fill.png')
              : require('../images/radio.png')
          }
          style={styles.icon}
        />
        <Text style={styles.paymentMethodText}>Cash on Delevery</Text>
      </TouchableOpacity>
      <View style={styles.addressView}>
        <Text style={styles.title}>Address</Text>
        <Text
          style={[
            styles.title,
            {textDecorationLine: 'underline', color: '#000'},
          ]}
          onPress={() => {
            navigation.navigate('Addresses');
          }}>
          Edit Address
        </Text>
      </View>
      <Text
        style={[styles.title, {marginTop: 10, fontSize: 16, color: '#636363'}]}>
        {selectedAddress}
      </Text>
      <Button bgColor={'green'} title={'Pay & Order'} color={'#fff'} />
    </View>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 30,
    color: '#000',
  },
  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
    marginTop: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  itemImage: {
    width: 70,
    height: 90,
  },
  name: {
    fontSize: 18,
    fontWeginLeft: 20,
  },
  descriptiight: '600',
  maron: {
    marginLeft: 20,
  },
  price: {
    color: 'green',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
    marginLeft: 20,
  },
  qtyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    padding: 5,
    borderWidth: 0.5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  qty: {
    marginLeft: 10,
    fontSize: 18,
  },
  noItems: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemText: {
    fontSize: 18,
  },
  totalView: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    borderBottomWidth: 0.3,
    alignItems: 'center',
    borderBottomColor: '#B7B7B7',
  },
  paymentMethod: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 20,
    paddingLeft: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  paymentMethodText: {
    marginLeft: 20,
    fontSize: 15,
    color: '#000',
  },
  addressView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 20,
    marginTop: 20,
  },
});
