import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../common/Header';
import Home from '../tabs/Home';
import Search from '../tabs/Search';
import Wishlist from '../tabs/Wishlist';
import Notifications from '../tabs/Notifications';
import User from '../tabs/User';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      {selectedTab == 0 ? (
        <Home />
      ) : selectedTab == 1 ? (
        <Search />
      ) : selectedTab == 2 ? (
        <Wishlist />
      ) : selectedTab == 3 ? (
        <Notifications />
      ) : selectedTab == 4 ? (
        <User />
      ) : null}
      {!isKeyboardVisible && (
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => setSelectedTab(0)}>
            <Image
              source={
                selectedTab == 0
                  ? require('../images/home-fill.png')
                  : require('../images/home.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => setSelectedTab(1)}>
            <Image
              source={
                selectedTab == 1
                  ? require('../images/search.png')
                  : require('../images/search.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => setSelectedTab(2)}>
            <Image
              source={
                selectedTab == 2
                  ? require('../images/heart-fill.png')
                  : require('../images/heart.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => setSelectedTab(3)}>
            <Image
              source={
                selectedTab == 3
                  ? require('../images/bell-fill.png')
                  : require('../images/bell.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => setSelectedTab(4)}>
            <Image
              source={
                selectedTab == 4
                  ? require('../images/user-fill.png')
                  : require('../images/user.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  bottomTab: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
