import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import Header from '../common/Header'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ProductItem from '../common/ProductItem';
import CheckoutLayout from '../common/CheckoutLayout';

const Cart = () => {

    const navigation = useNavigation();

    const {data} = useSelector((state) => state.cart);
    const [cartItems, setCartItems] = React.useState([]);

    React.useEffect(() => {
     if(data){
      setCartItems(data)
     }
    },[data])

   let total = 0 ;
  cartItems && cartItems.map(item => {
    total = total+item.qty*item.price
   })
  return (
    <View style={styles.container}>
     <Header
        leftIcon={require('../assets/icons/previous.png')}
        rightIcon={require('../assets/icons/shopping-cart.png')}
        title={'Cart Items'}
        isCart={true}
        onClickLeftIcon={() => navigation.goBack()}
        onClickRightIcon={() =>  navigation.navigate("Cart")}
      />
      <FlatList data={cartItems} renderItem={({item, index}) => {
        return(
          <ProductItem item={item} index={index} isCart={true} />
        )
      }} style={{marginBottom:100}} />
      {
       cartItems && cartItems.length > 0 ? (
          <CheckoutLayout items={cartItems.length} total={total.toFixed(2)} />
        ):(
          <View style={styles.noItem}>
            <Text style={styles.txt}>No cart Items have!</Text>
          </View>
        )
      }
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
    container:{
        flex:1,
      },
      noItem:{
        width:"100%",
        height:"100%",
        position:"absolute",
        justifyContent:"center",
        alignItems:"center"
      },
     
      txt:{
        textAlign:"center",
        fontSize:18,
        fontWeight:"600",
        color:"#000"
      }
})