import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Fontisto';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Header from '../common/Header';
import Button from '../common/Button';

const AddAddress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const [type, setType] = useState(route.params.type === "edit" ? route.params.data.type === "Home" ? 0 : 1 : 0);
  const [state, setState] = useState(route.params.type === "edit" ? route.params.data.state : "");
  const [pinCode, setPinCode] = useState(route.params.type === "edit" ? route.params.data.pinCode : "");
  const [country, setCountry] = useState(route.params.type === "edit" ? route.params.data.country : "");
  const [city, setCity] = useState(route.params.type === "edit" ? route.params.data.city : "");

  const onSubmitHandler = () => {
    if(!state || !pinCode || !country || !city){
      Alert.alert("Please enter all fields")
    }else{
    if(route.params.type === "edit"){
      const doc = `${route.params.data.id}`;
      firestore().collection("Address").doc(doc).update({
        state: state,
        city: city,
        pinCode: pinCode,
        country: country,
        type: type === 0 ? 'Home' : 'Office',
        id: route.params.data.id,
      }).then(()=> {
        firestore().collection("Address").doc(doc).get().then((res) =>{
          if(res.exists){
            console.log(res.data())
            dispatch({
              type: 'UPDATE_ADDRESS',
              payload: {
                state: res.data().state,
                city: res.data().city,
                pinCode: res.data().pinCode,
                country: res.data().country,
                type: res.data().type,
                id: res.data().id,
              },
            });      
          }
        })
       
      })
    }else{
      const constant = `${Math.floor(Math.random() * 10890000)}`
     firestore().collection("Address").doc(constant).set({
      state: state,
      city: city,
      pinCode: pinCode,
      country: country,
      type: type === 0 ? 'Home' : 'Office',
      id: constant,
    }).then(() => {
      firestore().collection("Address").doc(constant).get().then((doc) => {
        if(doc.exists){
          dispatch({
            type: 'ADD_ADDRESS',
            payload: {
              state: doc.data().state,
              city: doc.data().city,
              pinCode: doc.data().pinCode,
              country: doc.data().country,
              type: doc.data().type,
              id: doc.data().id,
            },
          });
        }else{
          console.log("No such doqument have")
        }
      }).catch((error) => {
        console.log(error)
      })
    })
   }
    navigation.goBack();
   }
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../assets/icons/previous.png')}
        rightIcon={require('../assets/images/transparent.png')}
        title={`${route.params.type === "new" ? "Add New Address" : "Edit Address"}`}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        onClickRightIcon={() => {}}
      />
      <Text
        style={{
          fontSize: 18,
          color: '#000',
          textAlign: 'center',
          fontWeight: '500',
          marginTop: 10,
        }}>
        Save your Address
      </Text>
      <View style={styles.inputSection}>
        <TextInput
        placeholderTextColor={"#949191"}
          style={styles.input}
          placeholder="Enter State.."
          value={state}
          onChangeText={txt => setState(txt)}
        />
        <TextInput
        placeholderTextColor={"#949191"}
          style={styles.input}
          placeholder="Enter City.."
          value={city}
          onChangeText={txt => setCity(txt)}
        />
        <TextInput
        placeholderTextColor={"#949191"}
          style={styles.input}
          placeholder="Enter Pin Code.."
          keyboardType="number-pad"
          value={pinCode}
          onChangeText={txt => setPinCode(txt)}
        />
        <TextInput
        placeholderTextColor={"#949191"}
          style={styles.input}
          placeholder="Enter Country.."
          value={country}
          onChangeText={txt => setCountry(txt)}
        />
      </View>
      <View style={styles.addressType}>
        <TouchableOpacity
          style={[
            styles.typeBtn,
            {
              borderWidth: type === 0 ? 1 : 0.3,
              borderBlockColor: type === 0 ? 'orange' : 'black',
            },
          ]}
          onPress={() => setType(0)}>
          <Icon
            name={type === 0 ? 'radio-btn-active' : 'radio-btn-passive'}
            size={22}
            color={type === 0 ? 'orange' : 'black'}
          />
          <Text style={styles.radioText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeBtn,
            {
              borderWidth: type === 1 ? 1 : 0.3,
              borderBlockColor: type === 1 ? 'orange' : 'black',
            },
          ]}
          onPress={() => setType(1)}>
          <Icon
            name={type === 1 ? 'radio-btn-active' : 'radio-btn-passive'}
            size={22}
            color={type === 1 ? 'orange' : 'black'}
          />
          <Text style={styles.radioText}>Office</Text>
        </TouchableOpacity>
      </View>
      <Button
        bg={'orange'}
        title={'Save Address'}
        color={'#fff'}
        onClick={() => onSubmitHandler()}
      />
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 25,
    position: 'absolute',
    bottom: 50,
    right: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSection: {
    marginTop: 30,
  },
  input: {
    color:"#3a3a3a",
    width: '90%',
    height: 50,
    margin: 10,
    borderRadius: 10,
    borderWidth: 0.3,
    alignSelf: 'center',
    paddingLeft: 20,
    fontSize: 17,
  },
  addressType: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  typeBtn: {
    width: '40%',
    height: 50,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    paddingHorizontal: 15,
    borderWidth: 0.3,
  },
  radioText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4e4d4d',
  },
});
