import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, ScrollView,TouchableOpacity, Pressable } from 'react-native'
import React , { useState, useEffect } from 'react'
import { useNavigation } from "@react-navigation/native";
import Footer from './Footer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from 'react-native-paper';

const Profile = () => {
    const navigation = useNavigation();
    

    const [open, setOpen] = useState(false)
    const [token, settoken] = useState(null); // token 
    const [profile, setprofile] = useState([]); // set incomming apis 
    const OpenSidebar = () => {
        console.log("----->okay", open);
        if (open == false) {
          setOpen(true)
        } else {
          setOpen(false)
    
        }
      }


      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem("token");
          console.log(value, "joshua token kinzo");
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
        fetch(
          `https://delivigo-api.herokuapp.com/api/v5/restaurant/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // SET HEADER IN TOKEN
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setprofile(data?.result);
            // setIncomingCount(data?.Count);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      useEffect(() => {
        HandleInCommingOrder();
       
      }, [token]);
      console.log(profile,'profile')


      const HandleLogut = () => {
        AsyncStorage.clear();
        navigation.replace('Splash')
      }
    return (
        <ScrollView>
          
            <SafeAreaView>
                <View style={{ marginTop: 40, marginLeft: 20, flexDirection: 'row', justifyContent: 'space-between', width: "50%" }}>

                    <Pressable
                    onPress={() => navigation.navigate("NotUse")}
                    >
                    <Image style={{}} source={require('../assets/bar.png')} />
                    </Pressable>
                    <Text style={{ fontSize: 19, fontWeight: "700" }}>Profile</Text>

                </View>
                <View style={{ width: '100%', height: 0.5, backgroundColor: 'rgba(172, 172, 172, 1)', marginTop: 20 }}></View>

                <View style={{ position: 'relative' }}>
                    <Image style={{ width: "90%", height: 170, marginTop: 20, marginLeft: 20, borderRadius: 15, }} source={{ uri: profile.ImageUrl }} />

                    <TouchableOpacity onPress={() => { OpenSidebar() }}>
                    <Text style={{ backgroundColor: 'white', position: 'absolute', left: '70%', top: '-40%', color: 'rgba(41, 115, 204, 1)', padding: 8, borderRadius: 10, width: 50, textAlign: 'center', fontWeight: '600',marginTop:-50,marginLeft:30 }}>Edit</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: "90%", height: 130, marginTop: 20, marginLeft: 20, borderRadius: 15, borderWidth: 2, backgroundColor: 'rgba(246, 246, 246, 1)', borderColor: '#d7d7d7' }}>
                    <Text style={{ fontSize: 18, fontWeight: '900', padding: 15 }}>Restaurant Performance</Text>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '65%', marginLeft: 20 }}>
                        <View>
                            <Text style={{ color: 'rgba(137, 137, 137, 1)', fontSize: 18, fontWeight: '400', }}>Total Orders</Text>
                            <Text style={{ fontSize: 18, fontWeight: '900', }}>{profile?.OrderCount?profile.OrderCount:"not found"}</Text>

                        </View>
                        <View>
                            <Text style={{ color: 'rgba(137, 137, 137, 1)', fontSize: 18, fontWeight: '400' }}>Average rating</Text>
                            <Text style={{ fontSize: 18, fontWeight: '900', }}>{profile?.CRRating?profile.CRRating:"not found"}</Text>

                        </View>
                    </View>
                </View>

                <Text style={{ fontSize: 20, fontWeight: '800', marginTop: 30, marginLeft: 20 }}>Details</Text>
                <View>
                    <Text style={{ fontWeight: '400', fontSize: 23, marginTop: 40, color: 'black', marginLeft: 20 }}>Name*</Text>
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
                                value={profile?.Name?profile?.Name:"NOT FOUND"}
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
                    <Text style={{ fontWeight: '400', fontSize: 23, marginTop: 20, color: 'black', marginLeft: 20 }}>Restaurant Address*</Text>
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
                                value={profile?.FullAddress?profile?.FullAddress:"NOT FOUND"}
                                autoCapitalize="none"
                                autoCorrect={false}
                                textContentType="newPassword"
                                enablesReturnKeyAutomatically

                            />

                        </View>

                    </View>


                </View>
                <View>
                    <Text style={{ fontWeight: '400', fontSize: 23, marginTop: 20, color: 'black', marginLeft: 20 }}>Contact Number*</Text>
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
                                value={profile?.PhoneNumber?profile?.PhoneNumber:"NOT FOUND"}
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
                                value={profile?.Email?profile?.Email:"NOT FOUND"}
                                textContentType="newPassword"
                                enablesReturnKeyAutomatically

                            />

                        </View>

                    </View>


                </View>
                <View>
                    <Text style={{ fontWeight: '400', fontSize: 23, marginTop: 20, color: 'black', marginLeft: 20 }}>Business ID*</Text>
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
                                value={profile?.BusinessId?profile?.BusinessId:"NOT FOUND"}

                            />

                        </View>

                    </View>


                </View>
                <View>
                  <Button onPress={HandleLogut}>Logout</Button>
                </View>
                {open == true &&
                <Text style={{ backgroundColor: 'black', color: 'white', padding: 20, borderRadius: 25, textAlign: 'center', fontWeight: '600',width:200,marginTop:20,marginLeft:100, }}>Update</Text>
                }
            
            
           

           

<Footer/>



            </SafeAreaView>
        </ScrollView>
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