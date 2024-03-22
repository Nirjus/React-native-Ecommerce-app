import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Button from './Button'
import { useNavigation } from '@react-navigation/native'

const CheckoutLayout = ({total, items}) => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
       <View style={[styles.tab,{paddingLeft:40}]}>
              <Text style={styles.text}>(Items: {items})</Text>
              <Text style={styles.text}>Total: <Text style={{color:"green", fontWeight:"900"}}>{" ₹"+total}</Text></Text>
       </View>
       <View style={[styles.tab,{marginTop:-30}]}>
         <Button  bg={'#e46b1b'}
            title={'Checkout'}
            color={'#fff'} onClick={() => navigation.navigate("Checkout")} />
       </View>
    </View>
  )
}

export default CheckoutLayout

const styles = StyleSheet.create({
    container:{
          position:"absolute",
          bottom:0,
          padding:10,
          width:Dimensions.get("window").width,
          height:100,
          backgroundColor:"#fff",
          flexDirection:"row",
          justifyContent:"space-evenly",
          alignItems:"center",
          borderTopRightRadius:10,
          borderTopLeftRadius:10
    },
    text:{
      color:"#7d7d7d",
     fontSize:16,
     fontWeight:"600",
    }, 
    tab:{
        width:"50%", 
        justifyContent:"flex-start",
    }
})