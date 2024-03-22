import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import Button from './Button';
import { useDispatch } from 'react-redux';

const CheckoutOnboard = ({visible, onClose, cartItem, total}) => {
  const [selected, setSelected] = React.useState(1);
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = React.useState(
    'Please select Address',
  );
  const timeGenerator = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    
    const date = `${day}/${month}/${year} + ${hours}:${minutes}`;
      return date
  }
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    getSelectedAddress();
  }, [isFocused]);
  const getSelectedAddress = async () => {
    const address = await AsyncStorage.getItem('MY_ADDRESS');
    setSelectedAddress(address);
  };
  const order = (paymentId) => {
     const data = {
      items: cartItem,
      amount: '₹'+ total,
      address: selectedAddress,
      paymentId: paymentId,
      paymentStatus: selected === 4 ? "Pending" : "Success",
      orderDate: timeGenerator()
     }
     dispatch({
      type:"ADD_ORDER",
      payload:data
     })
     dispatch({
      type:"EMPTY_CART"
     })
     onClose();
     navigation.navigate("OrderSuccess")
  }
  const paymentHandler = () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_1sQ4VzQeYIa1rv', // Your api key
      amount: total * 100,
      name: 'foo',
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'Razorpay Software',
      },
      theme: {color: '#7450f7'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        order(data.razorpay_payment_id)
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalView}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={{width: '100%', height: '30%'}}></TouchableOpacity>
        <View style={styles.mainView}>
          <View style={styles.totalAmount}>
            <Text style={styles.title}>Total</Text>
            <Text style={[styles.title, {color: 'green'}]}>{'₹' + total}</Text>
          </View>
          <Text style={styles.title}>Select Payment Mode</Text>
          <View>
            <TouchableOpacity
              style={styles.paymentMethod}
              onPress={() => setSelected(1)}>
              <Icon
                name={selected === 1 ? 'radio-btn-active' : 'radio-btn-passive'}
                size={22}
                color={selected === 1 ? '#32c119' : '#000'}
              />
              <Text style={styles.methods}>Credit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.paymentMethod}
              onPress={() => setSelected(2)}>
              <Icon
                name={selected === 2 ? 'radio-btn-active' : 'radio-btn-passive'}
                size={22}
                color={selected === 2 ? '#32c119' : '#000'}
              />
              <Text style={styles.methods}>Debit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.paymentMethod}
              onPress={() => setSelected(3)}>
              <Icon
                name={selected === 3 ? 'radio-btn-active' : 'radio-btn-passive'}
                size={22}
                color={selected === 3 ? '#32c119' : '#000'}
              />
              <Text style={styles.methods}>UPI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.paymentMethod}
              onPress={() => setSelected(4)}>
              <Icon
                name={selected === 4 ? 'radio-btn-active' : 'radio-btn-passive'}
                size={22}
                color={selected === 4 ? '#32c119' : '#000'}
              />
              <Text style={styles.methods}>Cash on Delivery</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addressTab}>
            <View style={{width: '50%'}}>
              <Text style={styles.title}>Address</Text>
              <Text style={styles.addressTxt}>{selectedAddress}</Text>
            </View>
            <View
              style={{
                paddingRight: 18,
                width: '50%',
                height: '100%',
                borderLeftWidth: 0.3,
              }}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  backgroundColor: '#dfd0f9',
                  gap: 5,
                  alignItems: 'center',
                  padding: 5,
                  borderRadius: 5,
                }}
                onPress={() => {
                  onClose(), navigation.navigate('Address');
                }}>
                <Text style={styles.editAddress}>Edit Address</Text>
                <MaterialIcon name="pencil" size={20} color={'black'} />
              </TouchableOpacity>
            </View>
          </View>
          <Button
            bg={'#028b02'}
            title={'Pay & Order'}
            color={'#fff'}
            onClick={() => paymentHandler()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CheckoutOnboard;

const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#00000067',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mainView: {
    backgroundColor: '#fff',
    height: '70%',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  title: {
    fontStyle: 'normal',
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 20,
    color: '#9367fc',
  },
  totalAmount: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    borderBottomWidth: 0.3,
    borderBottomColor: '#fe8e52',
    marginBottom: 30,
  },
  paymentMethod: {
    flexDirection: 'row',
    gap: 20,
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 5,
    marginTop: 15,
  },
  methods: {
    fontSize: 16,
    color: '#000',
  },
  addressTxt: {
    color: '#5d5d5d',
    fontWeight: '400',
    fontSize: 16,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 10,
  },
  addressTab: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  editAddress: {
    fontSize: 17,
    textDecorationLine: 'underline',
    color: '#442dee',
    fontWeight: '400',
  },
});
