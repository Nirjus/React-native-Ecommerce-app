import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './screens/Main';
import ProductDetails from './screens/ProductDetails';
import Cart from './screens/Cart';
import SignIn from './screens/SignIn';
import Register from './screens/Register';
import Checkout from './screens/Checkout';
import Address from './screens/Address';
import AddAddress from './screens/AddAddress';
import OrderSuccess from './screens/OrderSuccess';
import Orders from './screens/Orders';

const AppNavigator = () => {

    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
         <Stack.Navigator initialRouteName='Main'>
             <Stack.Screen name='Main' component={Main} options={{headerShown:false}} />
             <Stack.Screen name='ProductDetails' component={ProductDetails} options={{headerShown: false}} />
             <Stack.Screen name='Cart' component={Cart} options={{headerShown: false}} />
             <Stack.Screen name='Register' component={Register} options={{headerShown: false}} />
             <Stack.Screen name='SignIn' component={SignIn} options={{headerShown: false}} />
             <Stack.Screen name='Checkout' component={Checkout} options={{headerShown: false}} />
             <Stack.Screen name='Address' component={Address} options={{headerShown: false}} />
             <Stack.Screen name='AddAddress' component={AddAddress} options={{headerShown: false}} />
             <Stack.Screen name='OrderSuccess' component={OrderSuccess} options={{headerShown: false}} />
             <Stack.Screen name='Orders' component={Orders} options={{headerShown: false}} />
         </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator