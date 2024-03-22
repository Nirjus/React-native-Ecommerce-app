import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScree from './HomeScree';
const Drawer = createDrawerNavigator();
const Main = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeScree"
        component={HomeScree}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default Main;
