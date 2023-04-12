import { Button, ScrollView, StyleSheet, Text, View ,TouchableOpacity,BackHandler,Alert} from 'react-native'
import React, { useState, useEffect } from 'react'
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import RadioForm from 'react-native-simple-radio-button';

const Language = () => {
  const navigation = useNavigation()

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
   
  

      const [englishorfinnsh, setEnglish] = useState("")
    const [language, setlanguage] = useState("")

    useEffect(() => {
      AsyncStorage.setItem('language',englishorfinnsh)
    }, [englishorfinnsh])
    
        const getDatalanguage = async () => {
      try {
        const value = await AsyncStorage.getItem("language");
  
        setlanguage(value);
      } catch (e) {
        // error reading value
      }
    };
       useEffect(() => {
      getDatalanguage();
    });
    

    return (
      <ScrollView>
        <View style={{height:'100%',width:'100%'}}>
            <View style={{ marginTop: 40, flexDirection: 'row', justifyContent: 'center', width: "100%" }}>
                <Text 
         
             style={{ fontSize: 22, fontWeight: "700" ,color:"black"}}>{language === 'english' ? "Langauge": "Kieli" }</Text>

            </View>
            <View style={{ width: '100%', height: 0.5, backgroundColor: 'grey', marginTop: 20 }}></View>
          <View>
          <TouchableOpacity name="name" style={{marginTop:20}} 
            // onPress={() => {handleLanguage}}
   onPress={(e) => {

    setEnglish('english')
    // setText({...text,english:true})

  //  console.log(e.target.name,"elisha");
}}
  >
    <Text name="english" style={{color:'black',padding:20}}>English</Text>
  </TouchableOpacity>
          </View>
          


  
  <TouchableOpacity style={{marginTop:20}} 
   onPress={() => {
  //   setText({...text,english:false})
  //  console.log(text,"elisha");
  setEnglish('finnish')

}}
  >
    <Text style={{color:'black',padding:20}}>Suomi</Text>
  </TouchableOpacity>
            
          

            <View style={{marginTop:"100%",marginBottom:20}}>
                <Text
                    onPress={() => navigation.navigate('Signin')}
                    // onPress={HnadleLogin}
                    style={{ color: 'white', backgroundColor: 'black', width: "90%", height: 50, fontWeight: '300', fontSize: 17, textAlign: 'center', borderRadius: 25, paddingTop: 10, flexDirection: 'row', justifyContent: 'center', marginLeft: 20, }}>
                        {language === 'english' ? "Submit": "Lähetä" }
                    </Text>

            </View>
        </View>
        </ScrollView>
    )
}

export default Language

const styles = StyleSheet.create({})