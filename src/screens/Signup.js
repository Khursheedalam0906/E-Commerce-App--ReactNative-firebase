import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../common/Button';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const AddUser = () => {
    firestore()
      .collection('Users')
      .add({
        name: name,
        email: email,
        mobile: mobile,
        Password: Password,
      })
      .then(() => {
        Alert.alert('Account created!');
        navigation.navigate('Login');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Sign up'}</Text>
      <TextInput
        value={name}
        placeholder="Enter Name"
        style={styles.input}
        onChangeText={text => setName(text)}
      />
      <TextInput
        value={email}
        placeholder="Enter Email"
        style={styles.input}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        value={mobile}
        placeholder="Enter Mobile"
        style={styles.input}
        onChangeText={text => setMobile(text)}
      />
      <TextInput
        value={Password}
        placeholder="Enter Password"
        style={styles.input}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        placeholder="Enter Confirm Password"
        style={styles.input}
        onChangeText={text => setConfirmPassword(text)}
      />
      <Button
        bgColor={'orange'}
        title={'Signup'}
        color={'#fff'}
        onClick={() => AddUser()}
      />
      <Text
        style={styles.loginText}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        {'Already have an account ?'}
      </Text>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontSize: 40,
    marginLeft: 20,
    marginTop: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    alignSelf: 'center',
    marginTop: 15,
  },
  loginText: {
    marginTop: 20,
    alignSelf: 'center',
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
