import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import Button from '../common/Button';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoginUser = () => {
    firestore()
      .collection('Users')
      // Filter results
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.docs[0]._data);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        value={email}
        placeholder="Enter Email"
        style={styles.input}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        value={password}
        placeholder="Enter Password"
        style={styles.input}
        onChangeText={text => setPassword(text)}
      />
      <Button
        bgColor={'orange'}
        title={'Login'}
        color={'#fff'}
        onClick={() => {
          LoginUser();
        }}
      />
      <Text
        style={styles.newAccText}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        {'Create new account ?'}
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  newAccText: {
    marginTop: 20,
    alignSelf: 'center',
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
