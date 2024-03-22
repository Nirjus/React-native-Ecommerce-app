import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = ({bg, title, onClick, color}) => {
  return (
    <TouchableOpacity style={[styles.btn,{backgroundColor:bg}]} onPress={() => onClick()}>
      <Text style={{color:color, fontSize:16, fontWeight:"bold"}}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    btn:{
        width: "90%",
        height:50,
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        marginTop:30,
        borderRadius:10
    }
})