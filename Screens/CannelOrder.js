import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    ScrollView,
    FlatList,
    ActivityIndicator,
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
const OrderComplete = (props) => {
    const navigation = useNavigation();
    const [token, settoken] = useState(null); // token
    const [toggleState, setToggleState] = useState(1); // toggle
    const [cannelorder, setcannelorder] = useState([]); // set incomming apis
    const [orderComplete80, setOrderComplete80] = useState([]); // set incomming apis
    let myToken = props?.token // *Recvied Token props
    console.log(myToken, 'mycannel')
   // start new code 
const [currentPage, setCurrentPage] = useState(1); // current page
const [DATA, setDATA] = useState([]); // get all incomming  order data
const [DATAlength, setDATAlength] = useState(1); // total length of  incomming order
const PAGE_SIZE = 10; //   10 data size each page
 const totalPages = Math.ceil(DATAlength / PAGE_SIZE); // logical
const [isLoading, setisLoading] = useState(false); // current page
 
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

          settoken(value);
        } catch (e) {
          // error reading value
        }
      };
      useEffect(() => {
        getData();
      });


//       const HandleOrderCannel = () => {
//         console.log("----rung----");
//         if(token)
//         {
//           fetch(
//             `https://delivigo-oy-api.herokuapp.com/api/v5/restaurant/orders?status=25&PageNo=1`,
//             {
//               method: "GET",
//               headers: {
//                 Authorization: `Bearer ${token}`, // SET HEADER IN TOKEN
//               },
//             }
//           )
//             .then((res) => res.json())
//             .then((data) => {
//               setcannelorder(data?.result);
//               // setIncomingCount(data?.Count);
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         }

//       };
// console.log(cannelorder, 'orderCannel')



// useEffect(() => {
//   HandleOrderCannel();

    
//   }, [token]);


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

    const fetchData = async () => {
    
      setisLoading(true)
      if(myToken)
      {
        const response = await fetch(
  
          `https://delivigo-oy-api.herokuapp.com/api/v5/restaurant/orders?status=25&PageNo=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${myToken}`
            },
          }
        );
        const newData = await response.json();
        setDATA(newData?.result);
        setDATAlength(newData?.Count);
        props.setCannelCount(newData?.Count)
      }
  
      
    };
    useEffect(() => {
        setisLoading(true)
        fetchData();
        setTimeout(() => {
        setisLoading(false) 
          
        }, 2000);
      
      
      }, [myToken]);
    useEffect(() => {
      setisLoading(true)
      fetchData();
      setTimeout(() => {
      setisLoading(false) 
        
      }, 2000);
    
    
    }, [currentPage]);

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
      fetchData()
    };
    const renderItem = ({ item, index }) => {
      console.log('joshua lazar.......')
       return (
       
            <ScrollView>
<View style={{ marginTop: 20 }}>
                  
<View>
                                     <TouchableOpacity
                // onPress={() => navigation.navigate("CancelORderDetails")}
                onPress={() =>
                    navigation.push("CancelORderDetails", {
                     item,
                     myToken,
                    })
                  }
                   


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
                          #{item?.OrderNumber}
                        </Text>
                        <View style={{ marginTop: 20 }}>
                  {item.IsDelivery === true ? (
                    <View
                      style={{
                        flexDirection: "row",
                        width: 85,
                        justifyContent: "space-between",
                        marginRight: 20,
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
                        {language === "english" ? "Delivery" : "Toimitus"}
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
                          marginRight: 20,
                        }}
                      >
                        {language === "english" ? "Pickup" : "Nouto"}
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
                   
                    {item.IsSchedule === true ? (
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
                          {language === "english" ? "Schedule" : "Ajasta"}
                        </Text>
                        {/* <Image
                          style={{ marginTop: -5, width: 60, height: 60 }}
                          source={require("../assets/phone.png")}
                        /> */}
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
                                              
                        {item?.FullName ? item.FullName : "not found"}
                    </Text>
                    <Text
                        style={{
                            fontSize: 15,
                            marginLeft: 20,
                            color: "#898989",
                            marginTop: 2,
                        }}
                    >
                        {item?.Mobile?item.Mobile:'not found'}
                    </Text>

                    <Text
                        style={{
                            fontSize: 15,
                            marginLeft: 20,
                            marginTop: 5,

                        }}
                    >
                        {/* July 2, 2022, at 2:00 pm */}
                       

                       { moment(item?.OrderPlaceTime).format("DD-MM-YYYY --- hh-mm a")}
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
                                € {item?.ItemSubTotal?item.ItemSubTotal:'not found'}
                            </Text>
                        </View>
                    </View>

                <View style={{ marginTop: 20 }}></View>

                </TouchableOpacity>
                            </View>

        
            </View>
          
        </ScrollView>
       );
     };
    const renderPaginationControls = () => {
      const pages = [];
  
      for (let i = 1; i <= totalPages; i++) {
        
        pages.push(
          <View>
            
             
     <TouchableOpacity
            key={i}
            onPress={() => handlePageChange(i)}
            style={{ padding: 10 }}
          >
          <Text style={{
            height:20,
            width:20,
            color:"white",
            display:"flex",
            backgroundColor: "#2973CC",
             textAlign:"center"
             }}>{i}</Text>
          </TouchableOpacity>
          </View>
       
        );
      }
  
      return <View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>{pages}</View>;
    };
  
    const startItemIndex = (currentPage - 1) * PAGE_SIZE;
    const endItemIndex = startItemIndex + PAGE_SIZE;
    return (

<View>
{DATA.length > 0 ? <View>

  {isLoading ?  <View><ActivityIndicator size="large" /></View> : <View>
<FlatList
  // data={DATA.slice(startItemIndex, endItemIndex)}
  data={DATA}
  renderItem={renderItem}
  keyExtractor={(item ) => item.id}
/>
{renderPaginationControls()}
  </View>}
</View> : <View><ActivityIndicator size="large" /></View>}


</View>

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