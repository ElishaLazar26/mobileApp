import { StyleSheet, Text, View,Image ,ScrollView,TextInput, Pressable,TouchableOpacity} from 'react-native'

import React, {useEffect, useState} from 'react'
import Footer from './Footer'
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DailyPayment = ({route}) => {
    const [token, settoken] = useState(null); // token
    const [paymentapi, setpaymentapi] = useState([]);
    const navigation = useNavigation();
    let data = route?.params?.daily;

    console.log(data, 'daily')
    const dataFOrmatset = moment(data?.Date).format('YYYY-MM-DD')
    console.log(dataFOrmatset)
    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem("token");
          console.log(value, "joshua token");
          settoken(value);
        } catch (e) {
          // error reading value
        }
      };
      useEffect(() => {
        getData();
      });
      const HandleInCommingOrder = () => {
        console.log("----rung----");
        fetch(`https://delivigo-api.herokuapp.com/api/v5/restaurant/payout/detail?Date=${dataFOrmatset}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // SET HEADER IN TOKEN
          },
        })
          .then((res) => res.json())
          .then((data) => {
           console.log(data, 'ss')
            setpaymentapi(data?.result);

    
            // setIncomingCount(data?.Count)
          })
          .catch((err) => {
            console.log(err);
          });
      };

      useEffect(() => {
        HandleInCommingOrder();
      }, [token]);

   
  return (

    <>
        <View
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
            marginLeft: 20,
            marginTop: 40,
        }}
    >
       <TouchableOpacity 
        //   onPress={() => navigation.navigate("Paymentsyear")}
        // onPress={() => navigation.navigate("Paymentsyear")}
          >
          <Image
            style={{ marginTop: 10 }}
            source={require("../assets/payaroow.png")}
            />
          </TouchableOpacity>
        <Text style={{ fontSize: 23, fontWeight: "400", paddingTop: 5 }}>
           Daily Payments
        </Text>
        <Image
            style={{ marginTop: 10 }}
            source={require("../assets/bill.png")}
        />
    </View>
    <View
        style={{
            width: "100%",
            height: 0.5,
            backgroundColor: "#ACACAC",
            marginTop: 15,
        }}  ></View>
         <ScrollView>



<View style={{ backgroundColor: 'rgba(41, 115, 204, 1)', width: "90%", marginLeft: 20, borderRadius: 10, marginTop: 40 }}>
<View style={{ flexDirection: "row", paddingHorizontal: 20, marginTop: 30 }}>
        <Text style={{ color: "white", fontSize: 18, fontWeight: '500', }}>Total earning</Text>
   
    </View>
    
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%' }}>
        <Text style={{ color: 'white', fontWeight: '900', paddingHorizontal: 20, fontSize: 40, paddingVertical:0 }}>€</Text>
       
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
        <Text style={{ color: "white", fontSize: 18, fontWeight: '500', }}>Orders: </Text>
        <Text style={{ color: "white", fontSize: 18, fontWeight: '500', marginTop: 1 }}></Text>
    </View>
    <Text style={{ color: "white", fontSize: 16, fontWeight: '400', paddingHorizontal: 20 , marginBottom: 20}}>{dataFOrmatset}</Text>
    </View>
</View>
<View style={styles.container}>
             <View style={styles.inputContainer}>
                 <TextInput
                     style={styles.inputField}
                     name="password"
                     placeholder="Search"
                     autoCapitalize="none"
                     autoCorrect={false}
                     textContentType="newPassword"
                     enablesReturnKeyAutomatically

                 />

             </View>
         </View>
<Text style={{ paddingHorizontal: 20, paddingVertical: 20, fontSize: 18 }}>Orders</Text>

    {paymentapi?.Detail?.map((payout) => {
        return (
            <>
             <TouchableOpacity   onPress={() =>
                  navigation.push("PaymentsDetails", {
                    payout,
                    token,
                  })
                }>
                <View style={{ backgroundColor: '#F6F6F6', width: "90%", marginLeft: 20, borderRadius: 10, borderWidth: 1, borderColor: '#DFDFDF' ,flexDirection:'row',justifyContent:'space-between'}}>
               
    <Pressable
        onPress={() => navigation.navigate("PaymentsDetails")}
    style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
        <Text style={{ paddingVertical: 20, fontSize: 18, paddingHorizontal: 5 ,fontWeight:'900'}}>#{payout?.OrderNumber}</Text>
       
    </Pressable>


   

    <View style={{flexDirection:'row',paddingVertical: 20,justifyContent:'space-between'}}>
        <Text style={{fontSize:18,fontWeight:'900',marginRight:10}}>€{payout?.ItemSubTotal}</Text>
        <View style={{marginRight:10}}>
            <Image
                style={{ position: 'relative' }}
                source={require("../assets/down.jpeg")}
            />
            <Image
                style={{ position: 'absolute', top: '20%', left: '30%' }}
                source={require("../assets/cdown.jpeg")}
            />
        </View>
    </View>
    
</View>
</TouchableOpacity>
            </>
        )
    })}

</ScrollView>
<Footer/>
    </>

   
  )
}

export default DailyPayment

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
        marginTop: 10
    },
    inputContainer: {
       
        width: '100%',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#d7d7d7'
    },
    inputField: {
        padding: 12,
        paddingHorizontal:20,
        fontSize: 18,
        width: '90%'
    }
})