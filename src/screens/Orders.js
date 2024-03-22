import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../common/Header'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const Orders = () => {
    const navigation = useNavigation();
    const {data} = useSelector((state) => state.order);
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        if(data){
            setOrders(data);
        }
    },[data])
    
  return (
    <View style={styles.container}>
     
      <Header leftIcon={require("../assets/icons/previous.png")}
       rightIcon={require("../assets/images/transparent.png")}
      onClickLeftIcon={() => navigation.goBack()}
      onClickRightIcon={() => {}}
      title={"Orders"}
      />
           <FlatList data={orders} renderItem={({item, index}) => {
            return(
                <View style={styles.orderItems} key={index}> 
                    <FlatList data={item.items} renderItem={({item, index}) => {
                        return (
                            <View  style={styles.productItem}>
                          <Image source={{uri:item.image}} style={styles.itemImage} />
                          <View style={styles.itemTxt}>
                            <Text style={styles.productName}>{item.title.length > 20 ? item.title.substring(0,20)+".." : item.title}</Text>
                            <Text style={styles.productDescription}>{item.description.length > 20 ? item.description.substring(0,20)+".." : item.description}</Text>
                            <Text style={{color:"green", fontWeight:"500"}}>{"₹"+item.price}</Text>
                          </View>
                            </View>
                        )
                    }} />
                </View>
            )
           }} />
    </View>
  )
}

export default Orders

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    orderItems:{
        width:"90%",
        backgroundColor:"#c4c4c43bc",
        alignSelf:"center",
        marginTop:20,
        borderWidth:0.3,
        padding:5,
        borderRadius:10,
        borderColor:"#797878"
    },
    productItem:{
         padding:5,
         width:"95%",
         marginVertical:2,
         flexDirection:"row",
         alignSelf:"center",
         backgroundColor:"#fff",
         borderRadius:5
    },
   itemImage:{
    width:60,
    height:"100%",
    objectFit:"contain",
    
   },
   productName:{
    color:"#646464",
    fontSize:15,
    fontWeight:"500"
   },
   productDescription:{
    color:"#8e8b8b"
   },
   itemTxt:{
    marginLeft:10
   }
})