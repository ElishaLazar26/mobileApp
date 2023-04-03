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
import { useNavigation } from "@react-navigation/native";
import OrderComplete from './OrderComplete';
import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useEffect, useState } from "react";
import Footer from './Footer';


const OrderHistory = () => {
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
   
    const navigation = useNavigation();

    const [toggleState, setToggleState] = useState(1); // toggle
    const toggleTab = (index) => {
        setToggleState(index);
      };
    const checkedStyleBorder = {
        backgroundColor: "#2973CC",
        width: 110,
        height: 4,
        // marginLeft: 30,
        marginTop: 13,
      };
      const checkedStylestyleSimple = {
        color: "#A1B6C6",
        fontSize: 18,
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: "500",
        marginLeft: 5,
      };
    
      const checkedStylestyleCheck = {
        color: "#2973CC",
        fontSize: 18,
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: "500",
        marginLeft: 5,
      };
      const checkedStylestyleCheckcircleCheck = {
        width: 25,
        height: 25,
        backgroundColor: "#2973CC",
        borderRadius: 100,
        textAlign: "center",
        fontSize: 14,
        color: "white",
        marginTop: 4,
        paddingTop: 2,
      };
      const checkedStylestyleCheckcirclesimple = {
        width: 25,
        height: 25,
        backgroundColor: "#A1B6C6",
        borderRadius: 100,
        textAlign: "center",
        paddingTop: 2,
        fontSize: 14,
        color: "white",
        marginTop: 4,
      };
    

    return (
        
        <>
        <View
                style={{
                    backgroundColor: "#EAF1FA",
                    width: "100%",
                    borderBottomEndRadius: 35,
                    borderBottomLeftRadius: 35,
                    zIndex: -1000,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "90%",
                        marginLeft: 20,
                        marginTop: 30,
                    }}
                >
                    <TouchableOpacity>
                        <Image style={{}} source={require("../assets/bar.png")} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 23, fontWeight: "500" }}>
                     
                        {language === 'english' ? "Orders History": "Tilaushistoria"}
                        </Text>
                    <Image
                        style={styles.stretch}
                        source={require("../assets/celcender.png")}
                    />
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "80%",
                        marginLeft: 40,
                        marginTop: 20,

                    }}
                >
                    <View>
                        <View style={{ flexDirection: "row" }}>
                            <Text
                                onPress={() => toggleTab(1)}
                                style={
                                    toggleState === 1
                                      ? checkedStylestyleCheck
                                      : checkedStylestyleSimple
                                  }
                    
                                >
                             {language === 'english' ? "Cancel Orders": "Hylätyt tilaukset"}
                        
                            </Text>
                        </View>
                        <View
                          style={toggleState === 1 ? checkedStyleBorder : null}
                            // style={toggleState === 1 ? checkedStyleBorder : null}
                        ></View>
                    </View>

                    <View>
                        <View style={{ flexDirection: "row" }}>

                            <Text
                                onPress={() => toggleTab(2)}
                                style={
                                  toggleState === 2
                                    ? checkedStylestyleCheck
                                    : checkedStylestyleSimple
                                }
                                // onPress={() => navigation.navigate("OrderComplete",{Language:text.english})}
                                // style={
                                //     toggleState === 2
                                //         ? checkedStylestyleCheck
                                //         : checkedStylestyleSimple
                                // }
                            // style={{
                            //   color: "#A1B6C6",
                            //   fontSize: 20,
                            //   fontWeight: "500",
                            //   marginLeft: 5,
                            // }}
                            >
                             {language === 'english' ? "Complete Orders": "Valmiit tilaukset"}

                            
                            </Text>
                        </View>
                        <View
                            style={toggleState === 2 ? checkedStyleBorder : null}></View>
                    </View>

                </View>
            </View>
        
        <ScrollView>
            

            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputField}
                        name="password"
                        placeholder="Search"
                        autoCapitalize="none"
                        textContentType="newPassword"
                        enablesReturnKeyAutomatically

                    />
                </View>
            </View>
            {toggleState === 1 ? <>
                <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                onPress={() => navigation.navigate("CancelORderDetails")}


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
                            #892333
                        </Text>
                        <View style={{ marginTop: 20 }}>

                            <View
                                style={{
                                    flexDirection: "row",
                                    width: 70,
                                    justifyContent: "space-between",
                                }}
                            >
                                <Image
                                    style={{ marginTop: 4 }}
                                    source={require("../assets/pickupred.png")}
                                />
                                <Text
                                    style={{
                                        color: "rgba(238, 84, 94, 1)",
                                        fontSize: 16,
                                        fontWeight: "800",
                                        // marginLeft: 5,
                                    }}
                                >
                                       {language === 'english' ? "Pickup": "Nouto"}
                                    {/* {props.route.params.Language ? text.Pickup : text.Pickupaltenate} */}
                                </Text>
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
                        jack will
                    </Text>
                    <Text
                        style={{
                            fontSize: 15,
                            marginLeft: 20,
                            color: "#898989",
                            marginTop: 2,
                        }}
                    >
                        +332 8329 8923
                    </Text>

                    <Text
                        style={{
                            fontSize: 15,
                            marginLeft: 20,
                            marginTop: 5,

                        }}
                    >
                        July 2, 2022, at 2:00 pm
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
                         {language === 'english' ? "Total": "Total"}

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
                                €90.00
                            </Text>
                        </View>
                    </View>

                <View style={{ marginTop: 20 }}></View>

                </TouchableOpacity>

        
            </View>
            </> : null}
            {toggleState === 2 ? <><OrderComplete/></> : null}
  
        </ScrollView>
            <Footer/>
        </>
    )
}

export default OrderHistory

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