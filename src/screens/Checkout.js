import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../common/Header';
import ProductItem from '../common/ProductItem';
import CheckoutOnboard from '../common/CheckoutOnboard';

const Checkout = () => {
  const navigation = useNavigation();
  const {data} = useSelector(state => state.cart);
  const [cartItems, setCartItems] = React.useState([]);
  const [visible, setVisible] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setVisible(true);
      return () => {};
    }, []),
  );

  React.useEffect(() => {
    if (data) {
      setCartItems(data);
    }
  }, [data]);

  let total = 0;
  cartItems.map(item => {
    total = total + item.qty * item.price;
  });

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../assets/icons/previous.png')}
        title={'Checkout'}
        isCart={true}
        rightIcon={require('../assets/icons/shopping-cart.png')}
        onClickLeftIcon={() => navigation.goBack()}
        onClickRightIcon={() => {}}
      />
      <Text style={styles.title}>Added Items</Text>

      <FlatList
        data={cartItems}
        renderItem={({item, index}) => {
          return <ProductItem item={item} index={index} isCart={true} />;
        }}
      />

      <TouchableOpacity
        activeOpacity={1}
        style={styles.bottomTab}
        onPress={() => setVisible(true)}>
        <View
          style={[
            styles.bottomView,
            {justifyContent: 'space-between', borderBottomWidth: 0.5},
          ]}>
          <Text style={styles.bottomTxt}>Total: </Text>
          <Text style={[styles.bottomTxt, {color: 'green'}]}>
            {'₹' + total.toFixed(2)}
          </Text>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.bottomTxt}>Add Payment Mode</Text>
          <Icon name="payments" size={22} color={'#9960fc'} />
        </View>
      </TouchableOpacity>
      <CheckoutOnboard
        total={total.toFixed(2)}
        cartItem={cartItems}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontStyle: 'normal',
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 20,
    paddingTop: 30,
    color: '#9367fc',
  },
  bottomTxt: {
    fontStyle: 'normal',
    fontSize: 16,
    fontWeight: '600',
    color: '#2e2e2e',
  },
  bottomTab: {
    position: 'absolute',
    alignSelf: 'center',
    width: 'auto',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#e4e4e4',
    padding: 10,
    bottom: 0,
    elevation: 10,
  },
  bottomView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'cente0r',
    gap: 10,
    paddingVertical: 2,
  },
});
