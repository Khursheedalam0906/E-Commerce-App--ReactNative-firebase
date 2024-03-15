import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const Button = ({color, bgColor, onClick, title}) => {
  return (
    <TouchableOpacity
      style={[styles.btn, {backgroundColor: bgColor}]}
      onPress={() => {
        onClick();
      }}>
      <Text style={{color: color, fontSize: 18, fontWeight: '500'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    width: Dimensions.get('window').width - 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
});
