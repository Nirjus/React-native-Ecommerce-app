import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../common/Header';
import {useNavigation} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import ProductItem from '../../common/ProductItem';

const Home = () => {
  const navigation = useNavigation();
  const [products, setProducts] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        json.map((item) => {
          item.qty = 1
        })
        const categoryArray = new Map();
        json.map((item) => {
          categoryArray.set(item.category);
        })
        const arr = []
         for(const key of categoryArray.keys()){
                    arr.push(key)
         }
        setCategory(arr)
        dispatch({
          type:"ADD_PRODUCT",
          payload:json
        })
      });
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../../assets/icons/menu.png')}
        rightIcon={require('../../assets/icons/shopping-cart.png')}
        title={'Grocery App'}
        isCart={true}
        onClickLeftIcon={() => navigation.openDrawer()}
        onClickRightIcon={() => navigation.navigate("Cart")}
      />
      <Image source={require("../../assets/images/banner.jpg")} style={styles.bannerImg} />
     <View style={{marginTop:20, marginBottom:10}}>
      <FlatList data={category} 
      horizontal
       renderItem={({item, index}) => {
         return(
            <TouchableOpacity style={styles.category}>
            <Text style={{color:"#000"}}>{item}</Text>
           </TouchableOpacity>
         )
      }} />
      </View>
       <Text style={styles.trending}>Trending Items</Text>
      <FlatList
        data={products}
        renderItem={({item, index}) => {
          return (
            <ProductItem item={item} index={index} />
          );
        }}
      />
      </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  trending:{
   color:"#615cfa",
   fontSize:20,
   paddingHorizontal:20,
   fontWeight:"800",
   marginBottom:10,
  },
   bannerImg:{
    width:"90%",
    height:200,
    objectFit:"cover",
    borderRadius:10,
    alignSelf:"center",
    marginTop:10
  },
  category:{
  padding:10,
  borderWidth:1,
  borderRadius:20,
  backgroundColor:"#fff",
  marginLeft:10
  }
});
