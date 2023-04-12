import { StyleSheet, Image, Text, View, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = () => {
  
    const navigation = useNavigation()
   
    const HandleResturant = () => {
        navigation.navigate('Language')
    } 

    // useEffect(() => {

    //     setTimeout(() => {
    //         navigation.navigate('Language')
    //     }, 3000);
    // }, [])
    

    return (
        <SafeAreaView>
            <StatusBar style="auto" />
     
            <View style={{backgroundColor:"#2973CC",width:'100%',height:'100%'}}>

                <View 
                // className="mt-10" 
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end',marginTop:30 }}>
                    <Image source={require('../assets/flagoutside.png')}
                        style={{ flexDirection: 'row', alignItems: "flex-end" }}/>
                    <Image source={require('../assets/flaglogo.png')}
                        style={{ position: 'absolute', right: 40, top: 7 }}/>
                </View>

                <View style={{flex:20,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../assets/Reilu.png')}style={{}}/>
              <Text onPress={HandleResturant} style={{color:'white',backgroundColor:'black',width:200,height:40,fontWeight:'800',fontSize:17,textAlign:'center',borderRadius:10,marginTop:10,paddingTop:7}}>Restaurant Manager</Text>

              </View>

           
            </View>
          
        </SafeAreaView>
    )
}

export default Splash

const styles = StyleSheet.create({})