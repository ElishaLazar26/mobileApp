import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Pressable,
  FlatList
} from "react-native";
import React, { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyList from "./MyList";
import ReadyList from "./ReadyList";

const Ready = (props) => {
  const navigation = useNavigation();
  const [language, setlanguage] = useState("");







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
  // console.log(props.ReadyApi, "ReadyApi");
  let num;

  console.log(num, "ddds");
  // const renderItem = () => {
    return (
      // <ScrollView>
      //   {/* <View style={{ backgroundColor: '#EAF1FA', width: '100%', height: 150, borderBottomEndRadius: 35, borderBottomLeftRadius: 35, zIndex: -1000 }}>
      //               <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginLeft: 20, marginTop: 50 }}>
      //                   <Image
      //                       style={{}}
      //                       source={require('../assets/bar.png')}
      //                   />
      //                   <Text style={{ fontSize: 23, fontWeight: '500' }}>Live Orders</Text>
      //                   <Image
      //                       style={styles.stretch}
      //                       source={require('../assets/notification.png')}
      //                   />
      //               </View>
    
      //               <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '85%', marginLeft: 25, marginTop: 25 }}>
    
      //                   <View style={{ flexDirection: 'row' }}>
      //                       <Text style={{ width: 23, height: 23, backgroundColor: '#A1B6C6', borderRadius: 100, paddingLeft: 7, fontSize: 17, color: 'white', marginTop: 4 }}>2</Text>
      //                       <Text 
      //                       onPress={() => navigation.navigate('Incoming')}
      //                       style={{ color: '#A1B6C6', fontSize: 20, fontWeight: '500', marginLeft: 5 }}>Incoming</Text>
    
      //                   </View>
    
      //                   <View style={{ flexDirection: 'row' }}>
      //                       <Text style={{ width: 23, height: 23, backgroundColor: '#A1B6C6', borderRadius: 100, paddingLeft: 7, fontSize: 17, color: 'white', marginTop: 4 }}>4</Text>
      //                       <Text 
      //                       onPress={() => navigation.navigate('Accept')}
      //                       style={{ color: '#A1B6C6', fontSize: 20, fontWeight: '500', marginLeft: 5 }}>Accept</Text>
    
      //                   </View>
    
      //                   <View style={{ flexDirection: 'row' }}>
      //                       <Text style={{ width: 23, height: 23, backgroundColor: '#2973CC', borderRadius: 100, paddingLeft: 7, fontSize: 17, color: 'white', marginTop: 4 }}>5</Text>
      //                       <Text 
      //                        onPress={() => navigation.navigate('Ready')}
      //                       style={{ color: '#2973CC', fontSize: 20, fontWeight: '500', marginLeft: 5 }}>Ready</Text>
    
      //                   </View>
      //               </View>
      //               <View style={{ backgroundColor: '#2973CC', width: 80, height: 4, marginLeft: 310, marginTop: 13 }}></View>
    
      //           </View> */}
  
      //   {props.ReadyApi?.map((read) => {
      //     num = Number(read.DeliveryDistance / 1000).toFixed(2);
      //     // console.log(typeof (read.DeliveryDistance))
      //     return (
      //       <View>
      //         <Pressable
      //           // onPress={() => navigation.navigate("ReadyOrderDetail")}
      //           onPress={() =>
      //             navigation.push("ReadyOrderDetail", {
      //               read,
      //             })
      //           }
      //         >
      //           <View>
      //             <View
      //               style={{
      //                 borderWidth: 2,
      //                 width: "90%",
      //                 marginLeft: 20,
      //                 marginTop: 25,
      //                 borderRadius: 20,
      //                 borderColor: "#DFDFDF",
      //                 zIndex: 100000,
      //                 backgroundColor: "white",
      //                 // marginRight:20
      //               }}
      //             >
      //               <View
      //                 style={{
      //                   flexDirection: "row",
      //                   justifyContent: "space-between",
      //                 }}
      //               >
      //                 <Text
      //                   style={{ fontSize: 20, fontWeight: "900", padding: 25 }}
      //                 >
      //                   #{read?.OrderNumber ? read?.OrderNumber : "not found"}
      //                 </Text>
      //                 <View style={{ marginTop: 20 }}>
      //                   {read.IsDelivery === true ? (
      //                     <View
      //                       style={{
      //                         flexDirection: "row",
      //                         width: 85,
      //                         justifyContent: "space-between",
      //                         marginRight: 20,
      //                       }}
      //                     >
      //                       <Image
      //                         style={{ marginTop: 7 }}
      //                         source={require("../assets/bike.png")}
      //                       />
      //                       <Text
      //                         style={{
      //                           color: "#2973CC",
      //                           fontSize: 16,
      //                           fontWeight: "800",
      //                           // marginLeft: 5,
      //                         }}
      //                       >
      //                         {language === "english" ? "Delivery" : "Toimitus"}
      //                       </Text>
      //                     </View>
      //                   ) : (
      //                     <View
      //                       style={{
      //                         flexDirection: "row",
      //                         width: "100%",
      //                         marginLeft: 15,
      //                       }}
      //                     >
      //                       <Image
      //                         style={{}}
      //                         source={require("../assets/pickup.png")}
      //                       />
      //                       <Text
      //                         style={{
      //                           color: "#2973CC",
      //                           fontSize: 16,
      //                           fontWeight: "800",
      //                           marginLeft: 5,
      //                           marginRight: 20,
      //                         }}
      //                       >
      //                         {language === "english" ? "Pickup" : "Nouto"}
      //                       </Text>
      //                     </View>
      //                   )}
  
      //                   <View
      //                     style={{
      //                       flexDirection: "row",
      //                       width: "100%",
      //                       marginRight: 40,
      //                       marginTop: 5,
      //                     }}
      //                   >
      //                     {read.IsSchedule === true ? (
      //                       <View
      //                         style={{
      //                           flexDirection: "row",
      //                         }}
      //                       >
      //                         <Image
      //                           style={{ marginTop: 2 }}
      //                           source={require("../assets/clock.png")}
      //                         />
      //                         <Text
      //                           style={{
      //                             color: "#CCA829",
      //                             fontSize: 16,
      //                             fontWeight: "800",
      //                             marginLeft: 5,
      //                           }}
      //                         >
      //                           {language === "english" ? "Schedule" : "Ajasta"}
      //                         </Text>
      //                         <Image
      //                           style={{ marginTop: -5, width: 60, height: 60 }}
      //                           source={require("../assets/phone.png")}
      //                         />
      //                       </View>
      //                     ) : null}
      //                   </View>
      //                 </View>
      //               </View>
      //               <Text
      //                 style={{ fontSize: 18, marginLeft: 30, marginTop: -20 }}
      //               >
      //                 {read?.FullName ? read?.FullName : "not found"}
      //               </Text>
  
      //               {read.IsDelivery === true ? (
      //                 <>
      //                   <View
      //                     style={{
      //                       flexDirection: "row",
      //                       marginLeft: 25,
      //                       marginTop: 10,
      //                     }}
      //                   >
      //                     <Image
      //                       style={{ marginTop: 5, width: 40, height: 40 }}
      //                       source={require("../assets/cycle.png")}
      //                     />
      //                     <Text
      //                       style={{ fontSize: 17, padding: 5, marginTop: 5 }}
      //                     >
      //                       Harry will
      //                     </Text>
      //                   </View>
      //                 </>
      //               ) : null}
      //               <View>
      //                 {read.IsDelivery === false ? null : (
      //                   <View
      //                     style={{
      //                       flexDirection: "row",
      //                       marginLeft: 30,
      //                       marginTop: 5,
      //                       justifyContent: "space-between",
      //                       width: "85%",
      //                       marginBottom: 20,
      //                     }}
      //                   >
      //                     <View style={{ flexDirection: "row" }}>
      //                       <Image
      //                         style={{ marginTop: 5, width: 40, height: 40 }}
      //                         source={require("../assets/location.png")}
      //                       />
      //                       <Text
      //                         style={{ fontSize: 17, padding: 5, marginTop: 5 }}
      //                       >
      //                         Delivery {read.DeliveryDistance ? num : null} km
      //                       </Text>
      //                     </View>
  
      //                     <Image
      //                       style={{ marginTop: -5, width: 60, height: 60 }}
      //                       source={require("../assets/phone.png")}
      //                     />
      //                   </View>
      //                 )}
      //               </View>
      //             </View>
  
      //             <Pressable onPress={(e) => HandleOrderReady(e, obj)}>
      //               {read.IsDelivery === false ? (
      //                 <>
      //                   <View
      //                     style={{
      //                       backgroundColor: "rgba(89, 149, 33, 1)",
      //                       width: "90%",
      //                       height: 90,
      //                       marginLeft: 20,
      //                       borderBottomEndRadius: 35,
      //                       borderBottomLeftRadius: 35,
      //                       position: "relative",
      //                       top: -20,
      //                     }}
      //                   >
      //                     <Text
      //                       style={{
      //                         // marginLeft: 150,
      //                         marginTop: 40,
      //                         color: "white",
      //                         fontSize: 23,
      //                         fontWeight: "800",
      //                         textAlign: "center",
      //                       }}
      //                     >
      //                       {read.IsDelivery === false ? "Pickedup" : null}
      //                     </Text>
      //                   </View>
      //                 </>
      //               ) : null}
      //             </Pressable>
      //           </View>
      //         </Pressable>
      //       </View>
      //     );
      //   })}
      // </ScrollView>
      <ReadyList/>
      // <MyList/>

    
    );
  // }
  // return (
  //   <View>
  //     <FlatList
  //       data={props.ReadyApi}
  //       renderItem={renderItem}
  //     />
  //   </View>
  // )
};

export default Ready;

const styles = StyleSheet.create({});
