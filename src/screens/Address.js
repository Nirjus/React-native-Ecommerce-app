import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../common/Header';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Feather';
import firestore from "@react-native-firebase/firestore"

const Address = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.address);
  const [addressData, setAddressData] = React.useState([]);
  const loadAddress = async () => {
    await firestore().collection("Address").get().then((res) => {
      const arr = [];
      res.docs.map((i) => {
        arr.push(i.data());
      })
      dispatch({
        type:"LOAD_ADDRESS",
        payload: arr
      })
     })
  }
   React.useEffect(() => {
     loadAddress()
   },[])
  React.useEffect(() => {
    if (data) {
      setAddressData(data);
    }else{
      
    }
  }, [data]);

  const deleteHandler = item => {
    const id = `${item.id}`
    firestore().collection("Address").doc(id).delete();
    dispatch({
      type: 'DELETE_ADDRESS',
      payload: item,
    });
  };
  const defaultAddress = async item => {
    const itemString =
      ' ' +
      item.city +
      ',' +
      item.state +
      ',' +
      item.pinCode +
      ',' +
      item.country +
      ',' +
      item.type;
    await AsyncStorage.setItem('MY_ADDRESS', itemString);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../assets/icons/previous.png')}
        rightIcon={require('../assets/images/transparent.png')}
        title={'My Address'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        onClickRightIcon={() => {}}
      />
      <FlatList
        data={addressData}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.addressItem}
              key={index}
              onPress={() => {
                defaultAddress(item);
              }}>
              <Text style={styles.addressTxt}>
                State:{' '}
                <Text style={{color: '#4e4d4d', fontWeight:"400", fontSize: 16}}>
                  {item.state}
                </Text>
              </Text>
              <Text style={styles.addressTxt}>
                Country:{' '}
                <Text style={{color: '#4e4d4d', fontWeight:"400", fontSize: 16}}>
                  {item.country}
                </Text>
              </Text>
              <Text style={styles.addressTxt}>
                City:{' '}
                <Text style={{color: '#4e4d4d', fontWeight:"400", fontSize: 16}}>
                  {item.city}
                </Text>
              </Text>
              <Text style={styles.addressTxt}>
                Pin Code:{' '}
                <Text style={{color: '#4e4d4d', fontWeight:"400", fontSize: 16}}>
                  {item.pinCode}
                </Text>
              </Text>
              <Text style={[styles.addressTxt, styles.floatTxt]}>
                <Text style={{color: '#0da123'}}>{item.type}</Text>
              </Text>
              <View style={styles.bottomView}>
                <TouchableOpacity onPress={() => deleteHandler(item)}>
                  <Icon name="delete" size={23} color={'red'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AddAddress', {
                      type: 'edit',
                      data: item,
                    })
                  }>
                  <Icons name="edit" size={23} color={'blue'} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('AddAddress', {type: 'new'});
        }}>
        <AntIcon name="plus" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Address;

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
  addressItem: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 15,
    elevation: 5,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  addressTxt: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  floatTxt: {
    position: 'absolute',
    top: 15,
    right: 30,
    backgroundColor: '#c1facb',
    padding: 6,
    borderRadius: 5,
  },
  bottomView: {
    position: 'absolute',
    bottom: 15,
    right: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
  },
});
