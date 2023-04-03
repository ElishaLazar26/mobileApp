import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './Screens/Splash';
import Language from './Screens/Language';
import Signin from './Screens/Sigin';
import Incoming from './Screens/Incoming';
import Footer from './Screens/Footer';
import Accept from './Screens/Accept';
import OrderDetails from './Screens/OrderDetails';
import AcceptOrderDetail from './Screens/AcceptOrderDetail'
import Ready from './Screens/Ready';
import ReadyOrderDetail from './Screens/ReadyOrderDetail';
import Profile from './Screens/Profile';
import OrderHistory from './Screens/OrderHistory';
import OrderComplete from './Screens/OrderComplete';
import CancelORderDetails from './Screens/CancelORderDetails';
import CompleteOrderDetail from './Screens/CompleteOrderDetail';
import Payments from './Screens/Payments';

import Paymentsyear from './Screens/Paymentsyear';
import DailyPayment from './Screens/DailyPayment';
import PaymentsDetails from './Screens/PaymentsDetails';



const App = () => {
  const Stack =createNativeStackNavigator();
  return (


     <NavigationContainer>
    <Stack.Navigator 
     screenOptions={{headerShown:false}}
      >
       <Stack.Screen name="Splash" component={Splash} />
       <Stack.Screen name="Language" component={Language} />
       <Stack.Screen name="Signin" component={Signin} />
       <Stack.Screen name="Incoming" component={Incoming} />
       <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="Accept" component={Accept} />
        <Stack.Screen name="AcceptOrderDetail" component={AcceptOrderDetail} />
        <Stack.Screen name="Ready" component={Ready} />
        <Stack.Screen name="ReadyOrderDetail" component={ReadyOrderDetail} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />

        <Stack.Screen name="CancelORderDetails" component={CancelORderDetails} />
        <Stack.Screen name="CompleteOrderDetail" component={CompleteOrderDetail} />

        <Stack.Screen name="OrderComplete" component={OrderComplete} />
        

        <Stack.Screen name="Payments" component={Payments} />
        <Stack.Screen name="Paymentsyear" component={Paymentsyear} />
        <Stack.Screen name="DailyPayment" component={DailyPayment} />
        <Stack.Screen name="PaymentsDetails" component={PaymentsDetails} />






  


      <Stack.Screen name="Footer" component={Footer} />












      
    </Stack.Navigator>
   </NavigationContainer> 
  )
}

export default App

const styles = StyleSheet.create({})