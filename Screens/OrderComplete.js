import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Pressable,
    Animated,
    Button,
    Modal, TextInput
} from 'react-native'

import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import moment from 'moment';

import Footer from './Footer';
const OrderComplete = () => {
    const navigation = useNavigation();
    const [token, settoken] = useState(null); // token
    const [toggleState, setToggleState] = useState(1); // toggle
    const [orderComplete, setOrderComplete] = useState([]); // set incomming apis
    const [orderComplete80, setOrderComplete80] = useState([]); // set incomming apis
    const toggleTab = (index) => {
    };
    const [language, setlanguage] = useState("")
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

      const HandleOrderCompelete70 = () => {
        console.log("----rung----");
        fetch(
          `https://delivigo-api.herokuapp.com/api/v5/restaurant/orders?status=70&PageNo=1`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // SET HEADER IN TOKEN
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setOrderComplete(data?.result);
            // setIncomingCount(data?.Count);
          })
          .catch((err) => {
            console.log(err);
          });
      };
console.log(orderComplete, 'orderComplete')

const HandleOrderCompelete80 = () => {
    console.log("----rung----");
    fetch(
      `https://delivigo-api.herokuapp.com/api/v5/restaurant/orders?status=80&PageNo=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // SET HEADER IN TOKEN
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setOrderComplete80(data?.result);
        // setIncomingCount(data?.Count);
      })
      .catch((err) => {
        console.log(err);
      });
  };
console.log(orderComplete,orderComplete80, 'orderComplete')
const spreadResult = [...orderComplete, ...orderComplete80];
console.log(spreadResult, 'orderComplete');
useEffect(() => {
    HandleOrderCompelete70();
    HandleOrderCompelete80();
    
  }, [token]);


    const checkedStyleBorder = {
        backgroundColor: "rgba(41, 115, 204, 1)",
        width: 130,
        height: 4,
        // marginLeft: 30,
        marginTop: 13,
    };
    const checkedStylestyleSimple = {
        color: "rgba(41, 115, 204, 1)",
        fontSize: 20,
        fontWeight: "400",
        marginLeft: 5,
    };

    const checkedStylestyleCheck = {
        color: "rgba(161, 182, 198, 1)s",
        fontSize: 20,
        fontWeight: "400",
        marginLeft: 5,
    };
    const checkedStylestyleCheckcircleCheck = {
        width: 30,
        height: 30,
        backgroundColor: "#2973CC",
        borderRadius: 100,
        // justifyContent:'center',
        // alignItems:'center',
        textAlign: "center",
        fontSize: 14,
        color: "white",
        marginTop: 4,
        paddingTop: 4,
    };
    const checkedStylestyleCheckcirclesimple = {
        width: 30,
        height: 30,
        backgroundColor: "#A1B6C6",
        borderRadius: 100,
        textAlign: "center",

        paddingTop: 4,
        // paddingLeft:11,
        fontSize: 14,
        color: "white",
        marginTop: 4,
    };
    return (
        <ScrollView>
            <View
                style={{
                    backgroundColor: "#EAF1FA",
                    width: "100%",
                    borderBottomEndRadius: 35,
                    borderBottomLeftRadius: 35,
                    zIndex: -1000,
                }}
            >


            </View>

            {spreadResult?.map((obj) => {
                return (
                    <View>
                         <View style={{ marginTop: 20 }}>
                <Pressable 
                 onPress={() => navigation.navigate("CompleteOrderDetail")}>
                <View
                    style={{
                        borderWidth: 2,
                        width: "90%",
                        marginLeft: 20,
                        borderRadius: 20,
                        borderColor: "#DFDFDF",
                        zIndex: 100000,
                        backgroundColor: "white",
                    }}
                >
                    <View
                    
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "90%",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "900",
                                paddingLeft: 20,
                                paddingTop: 20,
                                // borderWidth:1
                            }}
                        >
                            #{obj?.OrderNumber?obj?.OrderNumber:"not found"}
                        </Text>
                        <View style={{ marginTop: 20 }}>
                              {obj.IsDelivery === true ? (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    width: 85,
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Image
                                    style={{ marginTop: 7 }}
                                    source={require("../assets/bike.png")}
                                  />
                                  <Text
                                    style={{
                                      color: "#2973CC",
                                      fontSize: 16,
                                      fontWeight: "800",
                                      // marginLeft: 5,
                                    }}
                                  >
                                  {language === 'english' ? "Delivery": "Toimitus"}

                                  </Text>
                                </View>
                              ) : (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    marginLeft: 15,
                                  }}
                                >
                                  <Image
                                    style={{}}
                                    source={require("../assets/pickup.png")}
                                  />
                                  <Text
                                    style={{
                                      color: "#2973CC",
                                      fontSize: 16,
                                      fontWeight: "800",
                                      marginLeft: 5,
                                    }}
                                  >
                                                                             {language === 'english' ? "Pickup": "Nouto"}

                                  </Text>
                                </View>
                              )}

                              <View
                                style={{
                                  flexDirection: "row",
                                  width: "100%",
                                  marginRight: 40,
                                  marginTop: 5,
                                }}
                              >
                                {obj.IsSchedule === true ? (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                    }}
                                  >
                                    <Image
                                      style={{ marginTop: 2 }}
                                      source={require("../assets/clock.png")}
                                    />
                                    <Text
                                      style={{
                                        color: "#CCA829",
                                        fontSize: 16,
                                        fontWeight: "800",
                                        marginLeft: 5,
                                      }}
                                    >
                                                                          {language === 'english' ? "Schedule": "Ajasta"}

                                    </Text>
                                  </View>
                                ) : null}
                              </View>
                        </View>
                    </View>
                    <Text
                        style={{
                            fontSize: 18,
                            marginLeft: 20,
                            marginTop: 10,
                        }}
                    >
                        {obj?.FullName?obj?.FullName:"not found"}
                    </Text>
                    {/* <Text
                        style={{
                            fontSize: 15,
                            marginLeft: 20,
                            color: "#898989",
                            marginTop: 2,
                        }}
                    >
                        +332 8329 8923
                    </Text> */}

                    <Text
                        style={{
                            fontSize: 15,
                            marginLeft: 20,
                            marginTop: 5,

                        }}
                    >
                        { moment(obj.OrderCompleteTime).format("DD-MM-YYYY --- hh-mm a")}
                    </Text>


                    <View
                        style={{
                            backgroundColor: "#F5F5F5",
                            width: "90%",
                            marginLeft: 20,
                            marginTop: 15,
                            padding: 20,
                            borderRadius: 15,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        ></View>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 25,
                                    fontWeight: "400",
                                    paddingTop: 5,
                                    width: "80%",
                                    lineHeight: 25,
                                    fontWeight: "800",
                                }}
                            >
                                Total
                            </Text>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "400",
                                    paddingTop: 5,
                                    width: "80%",
                                    lineHeight: 25,
                                    fontWeight: "800",
                                }}
                            >
                                €Backend
                            </Text>
                        </View>
                    </View>

                <View style={{ marginTop: 20 }}></View>
                </View>

        </Pressable>
        
            </View>
                    </View>
                )
            })}
           
        {/* <Footer/> */}
        </ScrollView>

    )
}

export default OrderComplete

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
        marginTop: 20
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
        padding: 10,
        fontSize: 18,
        width: '90%',
        paddingLeft: 30,


    }
})