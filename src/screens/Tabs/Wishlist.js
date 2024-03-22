import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import Header from '../../common/Header'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../common/ProductItem';

const Wishlist = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.wishlist);
  const [listData, setListData] = React.useState([]);

  React.useEffect(() => {
    dispatch({
      type:"LOAD_WISHLIST"
    })
  },[])
  
  React.useEffect(() => {
    if(data){
      setListData(data)
    }
  },[])

  return (
    <View style={styles.container}>
     <Header
        leftIcon={require('../../assets/icons/menu.png')}
        rightIcon={require('../../assets/icons/shopping-cart.png')}
        title={'Wishlist'}
        onClickLeftIcon={() => navigation.openDrawer()}
        onClickRightIcon={() =>  navigation.navigate("Cart")}
      />
      <View>
        {listData.length === 0 ? (
          <Text style={[styles.txt,{textAlign:"center", marginTop:20}]}>No Items have</Text>
        ):(
          <View style={styles.txtBox}>
            <Text style={styles.txt}>Total Item:</Text>
            <Text style={styles.txt}>{data.length}</Text>
          </View>
        ) }
      </View>
      <FlatList data={listData} 
      renderItem={({item, index}) => {
        return(
           <ProductItem item={item} index={index} />
        )
      }} />
    </View>
  )
}

export default Wishlist

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  txtBox:{
    padding:10,
     borderWidth:1,
     width:"95%",
     alignSelf:"center",
     marginVertical:5,
     flexDirection:"row",
     justifyContent:"space-between",
     alignItems:"center",
     backgroundColor:"#ffffff60",
  },
  txt:{
    color:"#000",
    fontSize:16,
    fontWeight:"600",
  }
})