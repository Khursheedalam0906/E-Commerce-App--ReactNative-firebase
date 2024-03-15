import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import Button from '../common/Button';
import {useDispatch} from 'react-redux';
import {addItemToWishList} from '../redux/slices/WishlistSlice';
import {addItemToCart} from '../redux/slices/CartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AskForLoginModal from '../common/AskForLoginModal';

const ProductDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const checkUserStatus = async () => {
    let isUserLoggedIn = false;
    const status = await AsyncStorage.getItem('IS_USER_LOGGED_IN');
    if (status == null) {
      isUserLoggedIn = false;
    } else {
      isUserLoggedIn = true;
    }
    return isUserLoggedIn;
  };

  return (
    <View style={styles.container}>
      <Header
        //isCart={true}
        leftIcon={require('../images/arrow.png')}
        rightIcon={require('../images/cart.png')}
        title={'Product Detail'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <Image source={{uri: route.params.data.image}} style={styles.banner} />
        <Text style={styles.title}>{route.params.data.title}</Text>
        <Text style={styles.description}>{route.params.data.description}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.price}>Price: $ {route.params.data.price}</Text>
          <View style={styles.qtyView}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (qty > 1) {
                  setQty(qty - 1);
                }
              }}>
              <Text style={{fontSize: 18, fontWeight: '600'}}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{qty}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setQty(qty + 1);
              }}>
              <Text style={{fontSize: 18, fontWeight: '600'}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.wishlistBtn}
          onPress={() => {
            if (checkUserStatus() === true) {
              dispatch(addItemToWishList(route.params.data));
            } else {
              setModalVisible(true);
            }
          }}>
          <Image
            source={require('../images/heart.png')}
            style={styles.wishlistIcon}
          />
        </TouchableOpacity>

        <Button
          bgColor={'#FF9A0C'}
          color={'#fff'}
          title={'Add To Card'}
          onClick={() => {
            console.log(route.params.data);
            if (checkUserStatus() === true) {
              dispatch(
                addItemToCart({
                  category: route.params.data.category,
                  description: route.params.data.description,
                  id: route.params.data.id,
                  image: route.params.data.image,
                  price: route.params.data.price,
                  qty: qty,
                  rating: route.params.data.rating,
                  title: route.params.data.title,
                }),
              );
            } else {
              setModalVisible(true);
            }
          }}
        />
      </ScrollView>
      <AskForLoginModal
        modalVisible={modalVisible}
        onClickLogin={() => {
          navigation.navigate('Login');
        }}
        onClose={() => {
          setModalVisible(false);
        }}
        onClickSignup={() => {
          navigation.navigate('Signup');
        }}
      />
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 300,
    resizeMode: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    marginHorizontal: 20,
    marginTop: 10,
  },
  description: {
    marginHorizontal: 20,
    marginTop: 10,
    fontSize: 15,
  },
  price: {
    color: 'green',
    marginLeft: 20,
    marginTop: 20,
    fontSize: 20,
    fontWeight: '800',
  },
  wishlistBtn: {
    position: 'absolute',
    right: 20,
    top: 100,
    backgroundColor: '#E2DFDF',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  wishlistIcon: {
    width: 24,
    height: 24,
  },
  qtyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 10,
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
});
