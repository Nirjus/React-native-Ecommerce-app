import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AskForLoginModal from './AskForLoginModal';

const ProductItem = ({item, index, isCart}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
  const {data} = useSelector((state) => state.wishlist);
  const [modalVisible, setModalVisible] = React.useState(false);
  let indexWishlist = data && data.findIndex((i) => i?.id === item?.id)
     
  const addToWishListHandler = async () => {
    const user = await AsyncStorage.getItem("USER_INFO");
    if(user === null){
     setModalVisible(true)
    }else{
    dispatch({
      type: 'ADDTO_WISHLIST',
      payload: item,
      index: indexWishlist
    });
  }
  }
    const addToCartHandler  = () => {
    dispatch({
      type:"ADDTO_CART",
      payload:{
        item,
        qty: 1
      }
    })
    }
    const removeFromCartHandler = () => {
      dispatch({
        type:"REMOVE_FROM_CART",
        payload: {
          id: item.id,
          index: index
        }
      })
    }
    
  return (
    <TouchableOpacity
              activeOpacity={1}
              style={styles.productItem}
              onPress={() =>{
                navigation.navigate('ProductDetails',{data: item})
              }
              } key={index}>
              <Image
                source={{uri: item?.image}}
                width={500}
                height={500}
                style={styles.image}
              />
              <View style={{marginLeft: 10}}>
                <Text style={styles.name}>
                  {item?.title?.length > 25
                    ? item.title.substring(0, 25) + '...'
                    : item.title}
                </Text>
                <Text style={styles.description}>
                  {item?.description?.length > 25
                    ? item.description.substring(0, 25) + '...'
                    : item.description}
                </Text>
                <View style={styles.qty}>
                <Text style={styles.price}>{'₹' + item.price}</Text>
                {
                  isCart ? (
                    <View style={{flexDirection:"row", gap:15, alignItems:"center"}}>
                    <TouchableOpacity style={styles.btn} onPress={() => removeFromCartHandler()}>
                        <Text style={{fontSize:20, fontWeight:"bold", color:"#000"}}>-</Text>
                      </TouchableOpacity>
                      <Text style={{fontSize:18,color:"#787878", fontWeight:"600"}}>{item.qty}</Text>
                      <TouchableOpacity style={styles.btn} onPress={() => addToCartHandler()}>
                        <Text style={{fontSize:20, fontWeight:"bold", color:"#000"}}>+</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
            onPress={() => addToWishListHandler()}>
            <Image
              source={indexWishlist === -1 ? require('../assets/icons/heart.png') : require('../assets/icons/heart_fill.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
                  )
                }
                </View>
              </View>
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
            </TouchableOpacity>
  )
}

export default ProductItem

const styles = StyleSheet.create({
    productItem: {
        width:Dimensions.get("window").width-20,
        padding:5,
        alignSelf:"center",
        marginTop:10,
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: "row",
        borderRadius: 10,
        paddingLeft:10,
        elevation:5
      },
      image: {
        width: 100,
        height: 100,
        objectFit: 'contain',
        alignSelf:'center'
      },
      name: {
        color:"#6f6e6e",
        fontSize: 16,
        fontWeight: '600',
      },
      description: {
        color:"#7f7f7f",
        fontWeight: '400',
      },
      price: {
        color: 'green',
        fontSize: 18,
        fontWeight: '800',
      },
      qty:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginTop:10,
        width:"75%"
      },
      btn:{
        paddingHorizontal:10,
        borderRadius:5,
        borderWidth:0.6,
        backgroundColor:"#d4d4d4"
      },
      icon:{
        width: 24,
        height: 24,
      }
})