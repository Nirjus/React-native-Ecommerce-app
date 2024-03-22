import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import Home from './Tabs/Home';
import Search from './Tabs/Search';
import Notification from './Tabs/Notification';
import Wishlist from './Tabs/Wishlist';
import Profile from './Tabs/Profile';
import Icon from "react-native-vector-icons/Fontisto"

const HomeScree = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
   const [keyboardVisible, setKeyboardVisible] = useState(false)
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      {selectedTab === 0 && <Home />}
      {selectedTab === 1 && <Search />}
      {selectedTab === 2 && <Notification />}
      {selectedTab === 3 && <Wishlist />}
      {selectedTab === 4 && <Profile />}
    {
      !keyboardVisible && (
        <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setSelectedTab(0)}>
          <Image
            source={
              selectedTab === 0
                ? require('../assets/icons/home_fill.png')
                : require('../assets/icons/home.png')
            }
            style={styles.bottomTabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setSelectedTab(1)}>
          <Image
            source={
              selectedTab === 1
                ? require('../assets/icons/category_fill.png')
                : require('../assets/icons/category.png')
            }
            style={{width:26, height:26}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setSelectedTab(2)}>
            <View style={{backgroundColor:"#7e71f7", width:50, height:50, alignSelf:"center", justifyContent:"center", alignItems:"center", borderRadius:99}}>
         {
            selectedTab === 2 ? (
              <Image
              source={require('../assets/icons/bell_fill.png')}
              style={styles.bottomTabIcon}
            />
            ) :(
              <Icon name="bell" size={22} color={"white"} />
            )
         }
         
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setSelectedTab(3)}>
          <Image
            source={
              selectedTab === 3
                ? require('../assets/icons/heart_fill.png')
                : require('../assets/icons/heart.png')
            }
            style={styles.bottomTabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setSelectedTab(4)}>
          <Image
            source={
              selectedTab === 4
                ? require('../assets/icons/user_fill.png')
                : require('../assets/icons/user_holo.png')
            }
            style={styles.bottomTabIcon}
          />
        </TouchableOpacity>
      </View>
      )
    }
    </View>
  );
};

export default HomeScree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  bottomTab: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabIcon: {
    width: 24,
    height: 24,
  },
});
