import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../../common/Header'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();
   const [userProfile, setUserProfile] = React.useState();
  useEffect(() => {
   getUser();
  },[])
  const getUser = async () => {
    const userData = await AsyncStorage.getItem("USER_INFO");
    if(userData !== null){
    const user = JSON.parse(userData)
     setUserProfile(user)
    }else{
      navigation.navigate("SignIn")
    }
  }
  
  return (
    <View style={styles.container}>
     <Header
        leftIcon={require('../../assets/icons/menu.png')}
        rightIcon={require('../../assets/icons/shopping-cart.png')}
        title={'Profile'}
        onClickLeftIcon={() => navigation.openDrawer()}
        onClickRightIcon={() =>  navigation.navigate("Cart")}
      />
          <Image source={require("../../assets/images/pngegg.png")} style={styles.avatar} />
          <Text style={styles.name}>{userProfile?.name}</Text>
          <Text style={[styles.name,{fontSize:16, marginTop:0}]}>{userProfile?.email}</Text>

         <View style={styles.userOption}>
         <TouchableOpacity style={styles.tabs}>
             <Text style={styles.tabsText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabs} onPress={() => navigation.navigate("Orders")}>
             <Text style={styles.tabsText}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabs} onPress={() => navigation.navigate("Address")}>
             <Text style={styles.tabsText}>Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabs}>
             <Text style={styles.tabsText}>Payment Mods</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabs}>
             <Text style={styles.tabsText}>Admin Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabs}>
             <Text style={styles.tabsText}>Log out</Text>
            </TouchableOpacity>
         </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
   avatar:{
    width:100,
    height:100,
    alignSelf:"center",
    marginTop:50
   },
   name:{
    textAlign:"center",
    fontSize:20,
    marginTop:10,
    fontWeight:"600",
    color:"#000"
   },
   userOption:{
    marginTop:50,
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    gap:10,
    rowGap:20,
    flexWrap:"wrap",
   }, 
   tabs:{
    width:"40%",
    height:50,
    backgroundColor:"#e0e0e0",
    borderRadius:10,
    justifyContent:"center",
   },
   tabsText:{
     color:"#1f134b",
     fontSize:18,
     textAlign:"center",
     fontWeight:"400"
   }
})