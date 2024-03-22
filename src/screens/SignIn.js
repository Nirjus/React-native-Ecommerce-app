import {Alert, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../common/Button';
import Loader from '../assets/Loader';

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [visible, setVisible] = React.useState(false);

   const setAsyncUserData = async (data) => {
    const userData = JSON.stringify(data);
    await AsyncStorage.setItem("USER_INFO", userData);
   }
  
  const loginUser = () => {
    setVisible(true);
    if(!email || !password){
      setVisible(false)
      Alert.alert("Please fill all the fields")
    }else{
    firestore()
      .collection('Users')
      // Filter results
      .where('email', '==', email)
      .where('password', '==', password)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.docs[0].data());
        setAsyncUserData(querySnapshot.docs[0].data());
        setVisible(false)
        navigation.navigate('Main');
      }).catch((error) => {
        setVisible(false)
         Alert.alert(error)
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={require('../assets/images/Logo.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.text}>Hippo</Text>
        <Text style={{color: '#fff'}}>E-commerce</Text>
      </View>
      <View style={styles.inputView}>
        <Text style={{fontSize: 22, color: '#545353', fontWeight: '600'}}>
          Sign In
        </Text>
        <View style={{marginTop: 20}}>
          <View style={{marginTop: 15}}>
            <Text style={{fontSize: 18, color: '#393939', fontWeight: '500'}}>
              Email
            </Text>
            <View style={styles.inputContainer}>
              <Icon name="email-outline" size={23} color={'#929292'} />
              <TextInput
               placeholderTextColor={"#828080"}
                keyboardType={"email-address"}
                placeholder="email@gmail.com"
                value={email}
                onChangeText={txt => setEmail(txt)}
                style={styles.input}
              />
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <Text style={{fontSize: 18, color: '#373737', fontWeight: '500'}}>
              Password
            </Text>
            <View style={styles.inputContainer}>
              <Icon2 name="lock" size={22} color={'#929292'} />
              <TextInput
               placeholderTextColor={"#828080"}
               secureTextEntry
                placeholder="#4JH%Y897gjv"
                value={password}
                onChangeText={txt => setPassword(txt)}
                style={styles.input}
              />
            </View>
          </View>
          <Button
            bg={'#8f78f3'}
            title={'Sign In'}
            color={'#fff'}
            onClick={() => loginUser()}
          />
        </View>
        <Text style={styles.loginText}>
          Dont have an Account?
          <Text
            style={{color: '#8371f9'}}
            onPress={() => navigation.navigate('Register')}>
            {' '}
            Register
          </Text>
        </Text>
      </View>
      <Loader visible={visible} />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 320,
    backgroundColor: '#8f78f3',
    alignItems: 'center',
  },
  imgContainer: {
    width: 150,
    height: 150,
    borderRadius: 50,
    backgroundColor: '#fff',
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    objectFit: 'contain',
  },
  text: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
  },
  inputView: {
    backgroundColor: '#fff',
    marginTop: -50,
    borderRadius: 40,
    width: '100%',
    height: '100%',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomColor: '#8c8c8c',
  },
  input: {
    fontSize: 15,
    width: '90%',
    height: 40,
    color: '#000',
  },
  loginText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    paddingVertical: 25,
  },
});
