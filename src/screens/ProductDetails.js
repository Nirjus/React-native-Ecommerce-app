import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import Header from '../common/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../common/Button';
import AskForLoginModal from '../common/AskForLoginModal';
import StarRating from "react-native-star-rating"
const ProductDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const {data} = useSelector((state) => state.wishlist);

  const [qty, setQty] = React.useState(1);
  const [modalVisible, setModalVisible] = React.useState(false);

  let indexWishList = data && data.findIndex((item) => item.id === route.params.data.id);
  
  const addToWishListHandler = async () => {
    const user = await AsyncStorage.getItem("USER_INFO");
    if(user === null){
     setModalVisible(true)
    }else{
    dispatch({
      type: 'ADDTO_WISHLIST',
      payload: route.params?.data,
      index: indexWishList
    });
  }
  }

  const incrementQty = () => {
    setQty(qty + 1);
  };
  const decrementQty = () => {
   setQty(qty > 1 ? qty - 1 : 1);
  };
   
  const addToCartHandler = async () => {
    const user = await AsyncStorage.getItem("USER_INFO");
    // const userData = JSON.parse(user)
     if(user === null){
     setModalVisible(true);
     }else{
      // await AsyncStorage.setItem("CART_ADD,")
      dispatch({
        type: 'ADDTO_CART',
        payload: {
         item: {...route.params.data,qty},
          qty: qty
        }
      });
     }
  }

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../assets/icons/previous.png')}
        rightIcon={require('../assets/icons/shopping-cart.png')}
        isCart={true}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        onClickRightIcon={() => navigation.navigate('Cart')}
        title={'Product Details'}
      />
      <ScrollView>
        <View style={{paddingBottom: 20}}>
          <Image
            source={{uri: route.params.data.image}}
            style={styles.productImage}
          />
          <Text style={styles.title}>{route.params.data.title}</Text>
        <View style={{width:"30%", marginTop:10, marginLeft:20}}>
        <StarRating   
          disabled={true}
        maxStars={5} 
        starSize={20}
        rating={route.params.data.rating.rate}
        fullStarColor={'#e8ca08'}
        halfStarEnabled={true} 
        />
        </View>
          <Text style={styles.description}>
            {route.params.data.description}
          </Text>
          <View style={styles.qty}>
            <Text style={styles.price}>
              <Text style={{color: '#000000'}}>Price: </Text>
              {' ₹' + route.params.data.price}
            </Text>
            <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => decrementQty()}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
                  -
                </Text>
              </TouchableOpacity>
              <Text style={{fontSize: 18, fontWeight: '600', color:"#797878"}}>
                {qty}
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => incrementQty()}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.wishlist}
            onPress={() => addToWishListHandler()}>
            <Image
              source={indexWishList === -1 ? require('../assets/icons/heart.png') : require('../assets/icons/heart_fill.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Button
            bg={'#e46b1b'}
            title={'Add To Cart'}
            color={'#fff'}
            onClick={() => addToCartHandler()}
          />
        </View>
      </ScrollView>
      <AskForLoginModal visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onCLickLogin={() => {
          setModalVisible(false);
          navigation.navigate("SignIn")
        }}
        onClickRegister={() => {
          setModalVisible(false);
          navigation.navigate("Register")
        }}
      />
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'center',
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
    marginTop: 10,
    marginHorizontal: 20,
  },
  description: {
    fontSize: 15,
    color: '#666565',
    fontWeight: '500',
    textAlign: 'justify',
    width: '90%',
    marginTop: 15,
    marginLeft: 20,
  },
  price: {
    color: 'green',
    fontWeight: '800',
    fontSize: 20,
  },
  wishlist: {
    position: 'absolute',
    right: 20,
    top: 50,
    backgroundColor: '#c3c1c18a',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 99,
  },
  icon: {
    width: 24,
    height: 24,
  },
  qty: {
    display:"flex",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:20,
    paddingHorizontal:20
  },
  btn: {
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 0.6,
    backgroundColor: '#d4d4d4',
  },
});
