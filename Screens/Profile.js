import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import Footer from './Footer';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Profile = () => {
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


    //   const [text, setText] = useState({

    //     Profile: 'Profile',
    //     Profilealternate: 'Profiili' ,


    //     RestaurantPerformance:'Restaurant Performance',
    //     RestaurantPerformancealternate:'Ravintolan tiedot',

    //     Totalorder:'Total Orders',
    //     Totalorderalternate:'Tilauksia yhteensä',


    //     Averagerating:'Average rating',
    //     Averageratingalternate:'Arvioiden keskiarvo',

    //     Details:'Details',
    //     Detailsalternate:'Lisätietoja',

    //     Name:'Name*',
    //     Namealtenate:'Nimi*',

    //     RestaurantAddress:'Restaurant Address*',
    //     RestaurantAddressalternate:'Ravintolan osoite*',

    //     ContactNumber:'Contact Number*',
    //     ContactNumberalternate:'Puhelinnumero*',

    //     BusinessID:'Business ID*',
    //     BusinessIDaltenate:'Y-tunnus*',












    //   })
    const navigation = useNavigation();

    // const [open, setOpen] = useState(false)
    // const OpenSidebar = () => {
    //     console.log("----->okay", open);
    //     if (open == false) {
    //       setOpen(true)
    //     } else {
    //       setOpen(false)

    //     }
    //   }
    return (
        <>
            <View style={{ marginTop: 40, marginLeft: 20, flexDirection: 'row', justifyContent: 'space-between', width: "50%" }}>

                <Pressable
                // onPress={() => navigation.navigate("NotUse")}
                >
                    <Text> icon lagna</Text>
                    {/* <Image style={{}} source={require('../assets/bar.png')} /> */}
                </Pressable>
                <Text style={{ fontSize: 19, fontWeight: "700" }}> {language === 'english' ? "Profile" : "Profiili"}</Text>

            </View>
            <View style={{ width: '100%', height: 0.5, backgroundColor: 'rgba(172, 172, 172, 1)', marginTop: 20 }}></View>
            <ScrollView>
                <SafeAreaView>


                    <View style={{ position: 'relative' }}>
                        <Image style={{ width: "90%", height: 170, marginTop: 20, marginLeft: 20, borderRadius: 15, }} source={require('../assets/ProfilePic.png')} />

                        {/* <TouchableOpacity onPress={() => { OpenSidebar() }}>
                <Text style={{ backgroundColor: 'white', position: 'absolute', left: '70%', top: '-40%', color: 'rgba(41, 115, 204, 1)', padding: 8, borderRadius: 10, width: 50, textAlign: 'center', fontWeight: '600',marginTop:-50,marginLeft:30 }}>Edit</Text>
                </TouchableOpacity> */}
                    </View>

                    <View style={{ width: "90%", height: 130, marginTop: 20, marginLeft: 20, borderRadius: 15, borderWidth: 2, backgroundColor: 'rgba(246, 246, 246, 1)', borderColor: '#d7d7d7' }}>
                        <Text style={{ fontSize: 18, fontWeight: '900', padding: 15 }}> {language === 'english' ? "Restaurant Performance" : "Ravintolan tiedot"}</Text>

                        <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '90%', marginLeft: 20 }}>
                            <View>
                                <Text style={{ color: 'rgba(137, 137, 137, 1)', fontSize: 15, fontWeight: '400' }}>{language === 'english' ? "Total Orders" : "Tilauksia yhteensä"}</Text>
                                <Text style={{ fontSize: 18, fontWeight: '900', }}>200</Text>

                            </View>
                            <View>
                                <Text style={{ color: 'rgba(137, 137, 137, 1)', fontSize: 15, fontWeight: '400' }}>{language === 'english' ? "Average rating" : "Arvioiden keskiarvo"}</Text>
                                <Text style={{ fontSize: 18, fontWeight: '900', }}>4.7</Text>

                            </View>
                        </View>
                    </View>

                    <Text style={{ fontSize: 20, fontWeight: '800', marginTop: 30, marginLeft: 20 }}>
                        {/* {props.route.params.Language ? text.Details : text.Detailsalternate} */}
                        {language === 'english' ? "Details" : "Lisätietoja"}
                    </Text>
                    <View>
                        <Text style={{ fontWeight: '400', fontSize: 23, marginTop: 40, color: 'black', marginLeft: 20 }}>
                            {/* {props.route.params.Language ? text.Name : text.Namealtenate} */}
                            {language === 'english' ? "Name" : "Nimi"}
                        </Text>
                        <View style={styles.container}>
                            <View style={{
                                backgroundColor: 'rgba(246, 246, 246, 1)',
                                width: '100%',
                                borderRadius: 30,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderWidth: 2,
                                borderColor: '#d7d7d7'
                            }}>
                                <TextInput
                                    style={{
                                        padding: 15,
                                        fontSize: 20,
                                        width: '90%'
                                    }}
                                    name="password"
                                    placeholder="First name"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    textContentType="newPassword"
                                    enablesReturnKeyAutomatically

                                />

                            </View>
                            <View style={{
                                backgroundColor: 'rgba(246, 246, 246, 1)',
                                width: '100%',
                                borderRadius: 30,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderWidth: 2,
                                borderColor: '#d7d7d7',
                                marginTop: 10
                            }}>
                                <TextInput
                                    style={{
                                        padding: 15,
                                        fontSize: 20,
                                        width: '90%'
                                    }}
                                    name="password"
                                    placeholder="Second name"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    textContentType="newPassword"
                                    enablesReturnKeyAutomatically

                                />

                            </View>
                        </View>


                    </View>
                    <View>
                        <Text style={{ fontWeight: '400', fontSize: 23, marginTop: 20, color: 'black', marginLeft: 20 }}>
                            {/* {props.route.params.Language ? text.RestaurantAddress : text.RestaurantAddressalternate} */}
                            {language === 'english' ? "Restaurant Address*" : "Ravintolan osoite*"}

                        </Text>
                        <View style={styles.container}>
                            <View style={{
                                backgroundColor: 'rgba(246, 246, 246, 1)',
                                width: '100%',
                                borderRadius: 30,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderWidth: 2,
                                borderColor: '#d7d7d7'
                            }}>
                                <TextInput
                                    style={{
                                        padding: 15,
                                        fontSize: 20,
                                        width: '90%'
                                    }}
                                    name="password"
                                    placeholder="Address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    textContentType="newPassword"
                                    enablesReturnKeyAutomatically

                                />

                            </View>

                        </View>


                    </View>
                    <View>
                        <Text style={{ fontWeight: '400', fontSize: 23, marginTop: 20, color: 'black', marginLeft: 20 }}>
                            {/* {props.route.params.Language ? text.ContactNumber : text.ContactNumberalternate} */}
                            {language === 'english' ? "Contact Number*" : "Puhelinnumero*"}

                        </Text>
                        <View style={styles.container}>
                            <View style={{
                                backgroundColor: 'rgba(246, 246, 246, 1)',
                                width: '100%',
                                borderRadius: 30,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderWidth: 2,
                                borderColor: '#d7d7d7'
                            }}>
                                <TextInput
                                    style={{
                                        padding: 15,
                                        fontSize: 20,
                                        width: '90%'
                                    }}
                                    name="password"
                                    placeholder="0434 3433934"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    textContentType="newPassword"
                                    enablesReturnKeyAutomatically

                                />

                            </View>

                        </View>

                    </View>

                    <View>
                        <Text style={{ fontWeight: '400', fontSize: 23, marginTop: 20, color: 'black', marginLeft: 20 }}>E-mail*</Text>
                        <View style={styles.container}>
                            <View style={{
                                backgroundColor: 'rgba(246, 246, 246, 1)',
                                width: '100%',
                                borderRadius: 30,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderWidth: 2,
                                borderColor: '#d7d7d7'
                            }}>
                                <TextInput
                                    style={{
                                        padding: 15,
                                        fontSize: 20,
                                        width: '90%'
                                    }}
                                    name="password"
                                    placeholder="email"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    textContentType="newPassword"
                                    enablesReturnKeyAutomatically

                                />

                            </View>

                        </View>


                    </View>
                    <View>
                        <Text style={{ fontWeight: '400', fontSize: 23, marginTop: 20, color: 'black', marginLeft: 20 }}>
                            {/* {props.route.params.Language ? text.BusinessID : text.BusinessIDaltenate} */}
                            {language === 'english' ? "Contact Number*" : "Puhelinnumero*"}

                        </Text>
                        <View style={styles.container}>
                            <View style={{
                                backgroundColor: 'rgba(246, 246, 246, 1)',
                                width: '100%',
                                borderRadius: 30,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderWidth: 2,
                                borderColor: '#d7d7d7'
                            }}>
                                <TextInput
                                    style={{
                                        padding: 15,
                                        fontSize: 20,
                                        width: '90%'
                                    }}
                                    name="password"
                                    placeholder="ID"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    textContentType="newPassword"
                                    enablesReturnKeyAutomatically

                                />

                            </View>

                        </View>


                    </View>
                    {/* {open == true && */}
                    {/* <Text style={{ backgroundColor: 'black', color: 'white', padding: 20, borderRadius: 25, textAlign: 'center', fontWeight: '600',width:200,marginTop:20,marginLeft:100, }}>Update</Text> */}
                    {/* } */}









                </SafeAreaView>
            </ScrollView>
                    <Footer />
        </>
    )
}

export default Profile
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
        padding: 15,
        fontSize: 20,
        width: '90%'
    }
})