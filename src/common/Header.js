import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const {height, width} = Dimensions.get('window');
const Header = ({
  title,
  leftIcon,
  rightIcon,
  onClickLeftIcon,
  onClickRightIcon,
  isCart
}) => {
  const {data} = useSelector(state => state.cart);
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => onClickLeftIcon()}>
        <Image source={leftIcon} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={[styles.btn, {position: 'relative'}]}
        onPress={() => onClickRightIcon()}>
        <Image
          source={rightIcon}
          style={[styles.icon, {width: 35, height: 35}]}
        />
        {data.length > 0 && isCart && (
          <View
            style={{
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              position: 'absolute',
              top: 0,
              right: 0,
              borderRadius: 99,
            }}>
            <Text style={{color: '#000'}}>{data.length}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 65,
    backgroundColor: '#6661f8fb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  btn: {
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});
