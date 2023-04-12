import React, { useState, useEffect } from 'react';
import {
  FlatList, View, Text, Button,TouchableOpacity,ActivityIndicator,
  Pressable, Image
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";




const PAGE_SIZE = 10;



const  ReadyList = (props) => {
  const navigation = useNavigation();

  // new code 
  const PAGE_SIZE = 10; // number of items to display per page

  const [currentPage, setCurrentPage] = useState(1);
  const [DATA, setDATA] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [DATAlength, setDATAlength] = useState(1);

  const totalPages = Math.ceil(DATAlength / PAGE_SIZE);
  // const totalPages = DATAlength / PAGE_SIZE

 // *Recvied Token props
  console.log(props.props?.token, 'read')

  let myToken = props?.props?.token;


  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [token, settoken] = useState(null); // token
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

  const fetchData = async () => {
    setisLoading(true)
    if(myToken)
    {
      const response = await fetch(

        `https://delivigo-oy-api.herokuapp.com/api/v5/restaurant/orders?status=40&PageNo=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${myToken}`
          },
        }
      );
      const newData = await response.json();
      setDATA(newData?.result);
      setDATAlength(newData?.Count);
      props.setIncomingCount(newData?.Count)
    }

    
  };

  useEffect(() => {
    setisLoading(true)
    fetchData();
    setTimeout(() => {
    setisLoading(false) 
      
    }, 2000);
  
  
  }, [currentPage]);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

  };
  

  console.log(page)

let num ;
  const renderItem = ({ item, index }) => {
    num = Number(item.DeliveryDistance / 1000).toFixed(2);
    return (
      <View>
        <Pressable
          // onPress={() => navigation.navigate("ReadyOrderDetail")}
          onPress={() =>
            navigation.push("ReadyOrderDetail", {
              item
            })
          }
        >
          <View>
            <View
              style={{
                borderWidth: 2,
                width: "90%",
                marginLeft: 20,
                marginTop: 25,
                borderRadius: 20,
                borderColor: "#DFDFDF",
                zIndex: 100000,
                backgroundColor: "white",
                // marginRight:20
              }}
            >
              {/* <Text>{index}</Text> */}
             
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "900", padding: 25 }}
                >
                  #{item?.OrderNumber ? item?.OrderNumber : "not found"}
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
                style={{ fontSize: 18, marginLeft: 30, marginTop: -20 }}
              >
                {item?.FullName ? item?.FullName : "not found"}
              </Text>

              {item.IsDelivery === true ? (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 25,
                      marginTop: 10,
                    }}
                  >
                    <Image
                      style={{ marginTop: 5, width: 40, height: 40 }}
                      source={require("../assets/cycle.png")}
                    />
                    <Text
                      style={{ fontSize: 17, padding: 5, marginTop: 5 }}
                    >
                      {item?.DriveName ? item?.DriveName : "not found"}
                    </Text>
                  </View>
                </>
              ) : null}
              <View>
                {item.IsDelivery === false ? null : (
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 30,
                      marginTop: 5,
                      justifyContent: "space-between",
                      width: "85%",
                      marginBottom: 20,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        style={{ marginTop: 5, width: 40, height: 40 }}
                        source={require("../assets/location.png")}
                      />
                      <Text
                        style={{ fontSize: 17, padding: 5, marginTop: 5 }}
                      >
                        Delivery {item.DeliveryDistance ? num : null} km
                      </Text>
                    </View>

                    <Image
                      style={{ marginTop: -5, width: 60, height: 60 }}
                      source={require("../assets/phone.png")}
                    />
                  </View>
                )}
              </View>
            </View>

            <Pressable onPress={(e) => HandleOrderitemy(e, obj)}>
              {item.IsDelivery === false ? (
                <>
                  <View
                    style={{
                      backgroundColor: "rgba(89, 149, 33, 1)",
                      width: "90%",
                      height: 90,
                      marginLeft: 20,
                      borderBottomEndRadius: 35,
                      borderBottomLeftRadius: 35,
                      position: "relative",
                      top: -20,
                    }}
                  >
                    <Text
                      style={{
                        // marginLeft: 150,
                        marginTop: 40,
                        color: "white",
                        fontSize: 23,
                        fontWeight: "800",
                        textAlign: "center",
                      }}
                    >
                      {item.IsDelivery === false ? "Pickedup" : null}
                    </Text>
                  </View>
                </>
              ) : null}
            </Pressable>
          </View>
        </Pressable>
      </View>
    )
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
  );
};



export default ReadyList;