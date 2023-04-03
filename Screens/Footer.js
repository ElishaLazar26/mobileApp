import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native';


const Footer = () => {

  const navigation = useNavigation();


  return (
    <View>
      <View style={{ width: '100%', height: 0.5, backgroundColor: 'rgba(172, 172, 172, 1)', marginTop: 30 }}></View>
      <View style={{ marginTop: 20, marginBottom: 20 }}>

        {/* mainbox */}
        <View style={{ width: '80%', marginLeft: 40, flexDirection: 'row', justifyContent: 'space-between' }}>

          {/* 1 */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={{ justifyContent: 'center', flexDirection: "column", alignItems: 'center' }}>
            <Image source={require('../assets/FooterProfile.png')}
              style={{ width: 30, height: 30 }} />
            <Text style={{ color: 'rgba(137, 137, 137, 1)' }}>Profile</Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => navigation.navigate("Incoming")}
            style={{ justifyContent: 'center', flexDirection: "column", alignItems: 'center' }}>
            <Image source={require('../assets/footerorder.png')}
              style={{ width: 30, height: 30 }} />
            <Text style={{ color: 'rgba(137, 137, 137, 1)' }}>Orders</Text>
          </TouchableOpacity>



          <TouchableOpacity
            onPress={() => navigation.navigate("OrderHistory")}
            style={{ justifyContent: 'center', flexDirection: "column", alignItems: 'center' }}>
            <Image source={require('../assets/sheduler.png')}
              style={{ width: 25, height: 30 }} />
            <Text style={{ color: 'rgba(137, 137, 137, 1)' }}>History</Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => navigation.navigate("Payments")}
            style={{ justifyContent: 'center', flexDirection: "column", alignItems: 'center' }}>
            <Image source={require('../assets/dashboad.png')}
              style={{ width: 25, height: 25 }} />
            <Text style={{ color: 'rgba(137, 137, 137, 1)' }}>Payouts</Text>
          </TouchableOpacity>

          {/* 1 */}

        </View>


      </View>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({})  