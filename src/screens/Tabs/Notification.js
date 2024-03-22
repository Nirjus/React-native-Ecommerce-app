import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Header from '../../common/Header'
import { useNavigation } from '@react-navigation/native';

const Notification = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../../assets/icons/menu.png')}
        rightIcon={require('../../assets/icons/shopping-cart.png')}
        title={'Notification'}
        onClickLeftIcon={() => navigation.openDrawer()}
        onClickRightIcon={() =>  navigation.navigate("Cart")}
      />
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
  container:{
   flex:1
  }
})