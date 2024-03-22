import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

const OrderSuccess = () => {
 
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
     <Image source={require("../assets/images/greenTick.png")} style={styles.icon} />
            <Text style={styles.msg}>Order Successfull!</Text>
            <Pressable onPress={() => navigation.navigate("Main")} style={styles.btn}>
              <Text style={{color:"#000"}}>Go To Home</Text>
            </Pressable>
    </View>
  )
}

export default OrderSuccess

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    justifyContent:"center",
    alignItems:"center"
  },
  icon:{
    width:100,
    height:100
  },
  msg:{
    marginTop:20,
    color:"#000",
    fontSize:16,
  },
  btn:{
    padding:10,
    marginTop:10,
    backgroundColor:"#c2c2c3",
    borderRadius:10,
    borderWidth:1
  }
})