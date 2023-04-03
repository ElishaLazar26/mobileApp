import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,Linking
} from "react-native";
import React, {useState, useEffect} from "react";
// import Input from "./Input";
import { useNavigation } from "@react-navigation/native";
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UseTogglePasswordVisibility } from './UseTogglePasswordVisibility';
// import local strong step 1
import AsyncStorage from '@react-native-async-storage/async-storage';


const Signin = () => {

  const { passwordVisibility, rightIcon, handlePasswordVisibility } = UseTogglePasswordVisibility();
  const [passwordd, setPasswordd] = useState('');
  const navigation = useNavigation();
  // step 2 state langauge 
  const [language, setlanguage] = useState("")
  // const [signin, setSignin] = useState({
  //   email: "",
  //   password: "",
  // });
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  // const b = () => <Text style={{fontWeight: 'bold'}}></Text>


  // get local stroge langauge 
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





  console.log(language, 'languagelanguagelanguage')


  console.log(email, "email")
  console.log(password, "password")

  const HnadleLogin = (e) => {
    e.preventDefault();
    console.log( "email")

    
    fetch(`https://delivigo-api.herokuapp.com/api/v5/restaurant/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: "fk.support@gmail.com",
        Password: "123456789",
        DeviceToken: "postman"
      }),
    })
      .then((res) => res.json())
      .then(async (data)=>{
        console.log('login data', data);
        try {
           const alertmessage = data.ResultMessages?.map((message) => {
              // console.log(message.MessageType)
              // Alert.alert(message.Message)
              if(message.MessageType === "success")
              {
                Alert.alert(message.Message)
               AsyncStorage.setItem('token',data.token)
            
                // localStorage.setItem("admin", JSON.stringify(data.result)); // // saving admin in localStorage
                navigation.navigate('Incoming',{Language:text.english})
              }
              else if(message.MessageType === "danger")
              {
                Alert.alert(message.Message)
    
              }
            })
          // await AsyncStorage.setItem('token',data.token)
          console.log(data)
          // navigation.navigate('Incoming')
        } catch (e) {
          console.log("error hai",e)
           Alert(e)
        }
 })
       };

       const [text, setText] = useState({

        original: 'SIGN-IN YOUR ACCOUNT',
        alternate: 'KIRJAUDU SISÄÄN TILILSI',
    
        Password: 'Password',
        Passwordalternate: 'Salasana',
    
        forget: 'Forget Password',
        forgetalternate: 'Unohditko salasanasi',
    
        dearParnet: 'Dear Partner! we are excited to have you onboard',
        dearParnetalternate: 'Mahtavaa, että ryhdyit kumppaniksemme!',
    
        bycontinuing: 'By continuing, you agree to Reilu Kuljetus ',
        bycontinuingalternate: 'Jatkamalla hyväksyt Reilu kuljetuksen ',
    
        Term: 'Terms and Conditions',
        Termalternate: 'käyttöehdot',
    
        and: 'and',
        andalternate: 'sekä ',
    
        PP: 'Privacy Policy',
        ppalternate: 'Ykistyisyysasetukset',
    
    
        Submit: 'submit',
        Submitalternate: 'Lähetä',
    
        Needhelp:'Need help',
        Needhelpalternate:'Tarvitsetko apua?',
    
        Contact:'Contact Us',
        Contactalternate:' Ota yhteyttä.'
    
    
      })
  return (
    
    <ScrollView>
      <View style={{ width: "100%", height: "100%" }}>

        {/* <Image source={require('../assets/Intersect.png')}style={{ position: 'absolute', left: 30, height: 230, zIndex: -100 }} /> */}
        
        <View>
          <Image
            source={require("../assets/Intersect.png")}
            style={{
              position: "absolute",
              left: "20%",
              height: 240,
              zIndex: -100,
            }}
          />
        </View>
        <View
          
          style={{
          marginTop:"10%",
            flexDirection: "row",
            justifyContent: "flex-end",
            zIndex: 1000,
          }}
        >
          <Image
            source={require("../assets/flagoutside.png")}
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              zIndex: 1000,
            }}
          />
          <Image
            source={require("../assets/flaglogo.png")}
            style={{ position: "absolute", right: 40, top: 7, zIndex: 1000 }}
          />
        </View>
        <View style={{marginLeft:30,marginTop:20}}>
         <Text style={{ fontWeight: '900', fontSize: 30, width: 280,  }}>{language === 'english' ? "SIGN-IN YOUR ACCOUNT": "KIRJAUDU SISÄÄN TILILSI" }</Text>
         <Text style={{ fontWeight: '400', fontSize: 16, width: 300, color: '#939393', lineHeight: 25 }}>
         {language === 'english' ? "Dear Partner! we are excited to have you onboard": "Mahtavaa, että ryhdyit kumppaniksemme!" }
         </Text>
        </View>


        {/* <View style={{ flexDirection: 'row',marginLeft:10 }}>
             <Text style={{ fontWeight: '400', fontSize: 16, width: 145, marginTop: 15, marginLeft: 20, color: '#939393' }}>Don’t have account?</Text>
             <Text style={{ fontWeight: '800', fontSize: 17, marginTop: 13, color: 'black', lineHeight: 25, textDecorationLine: 'underline' }}>Create an account</Text>
         </View> */}

         <View>
            <Text style={{ fontWeight: '700', fontSize: 20, marginTop: 40, color: 'black', marginLeft: 20 }}>{language === 'english' ? "E-mail": "E-mail" }</Text>
             <View style={styles.container}>
                 <View style={styles.inputContainer}>
                     <TextInput
                         style={styles.inputField}
                         name="email"
                         placeholder="Email"
                        //  value={email}
                        //  onChangeText={HandleSignin}
                        onChangeText={(email) => setemail(email)}
                         autoCapitalize="none"
                         autoCorrect={false}
                         textContentType="newPassword"
                         enablesReturnKeyAutomatically

                     />

                 </View>
             </View>
         </View>
         <View style={{ marginTop: -10 }}>
             <Text style={{ fontWeight: '700', fontSize: 20, marginTop: 35, color: 'black', marginLeft: 20 }}> {language === 'english' ? "Password": "Salasana" }</Text>
             {/* <Input  onChangeText={(password) => console.log(password, 'dd')} /> */}
             <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          name="password"
          placeholder={language === 'english' ? "Password": "Salasana" }
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="newPassword"
          secureTextEntry={passwordVisibility}
          // value={passwordd}
          enablesReturnKeyAutomatically
          onChangeText={text => setpassword(text)}
        />
        <Pressable onPress={handlePasswordVisibility}>
          {/* <MaterialCommunityIcons name={rightIcon} size={25} color="#232323" /> */}
        </Pressable>
      </View>
    </View>
        </View>
        <View style={{ width: "90%", flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, marginLeft: 10 }}>
             <Text style={{ fontSize: 15, fontWeight: '400' }}>{language === 'english' ? "Forget Password": "Unohditko salasanasi" }</Text>
         </View>
         <View style={{ width: "90%", flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginLeft: 10 }}>
         <Text style={{ fontSize: 15, fontWeight: '400', width: 300, textAlign: "center" }}>{language === 'english' ? "By continuing, you agree to Reilu Kuljetus": "Jatkamalla hyväksyt Reilu kuljetuksen" }
          <Text onPress={() => Linking.openURL('https://www.reilukuljetus.fi/terms')} style={{ fontWeight: '700' }}>
          {language === 'english' ? "Terms and Conditions": "käyttöehdot" }
            </Text> 
            {language === 'english' ? " and": " sekä" }<Text onPress={() => Linking.openURL('https://www.reilukuljetus.fi/privacy-Policy')} style={{ fontWeight: '700' }}>
            {language === 'english' ? " Privacy Policy": " Ykistyisyysasetukset" }</Text>.</Text>

         </View>

<View>
<Text
        // onPress={() => navigation.navigate('Incoming')}
        onPress={HnadleLogin}
         style={{ color: 'white', backgroundColor: '#2973CC', width: "90%", height: 50, fontWeight: '300', fontSize: 17, textAlign: 'center', borderRadius: 25, paddingTop: 10, flexDirection: 'row', justifyContent: 'center',marginTop: 40, marginLeft: 20, }}>
         {language === 'english' ? " submit": " Lähetä" }</Text>

</View>

<View style={{flexDirection:'row',justifyContent:'center',marginTop:20,marginBottom:30}}>
           <Image source={require('../assets/contactpic.png')}
                 style={{}} />
                <Text style={{ fontWeight: '400', fontSize: 18,marginTop: 15, marginLeft: 20, color: 'black' }}> {language === 'english' ? " Need help": " Lähetä" } </Text>
             <Text style={{ fontWeight: '800', fontSize: 19, marginTop: 15, color: '#2973CC', lineHeight: 25 }}> {language === 'english' ? " Contact Us": " Ota yhteyttä" }</Text>
         </View>
      </View>
    </ScrollView>

  );
};

export default Signin;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
        marginTop: 10
    },
    inputContainer: {
        backgroundColor: 'rgba(246, 246, 246, 1)',
        width: '100%',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#d7d7d7'
    },
    inputField: {
        padding: 12,
        fontSize: 18,
        width: '90%'
    }
})


