
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,FlatList,Button, Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Accept = (props) => {



  const [page, setPage] = useState(1);

  const navigation = useNavigation();


  // new code
  const PAGE_SIZE = 10; 
  const [currentPage, setCurrentPage] = useState(1);
  const [DATA, setDATA] = useState([]);
  const [DATAlength, setDATAlength] = useState(1);
  const [isLoading, setisLoading] = useState(false);

  const totalPages = Math.ceil(DATAlength / PAGE_SIZE);
 
  let myToken = props.token // *Recvied Token props
console.log(myToken,'acept token')

  const [Accept, setAccept] = useState([]);
  const [token, settoken] = useState(null);
  const [TimerLocal, setTimerLocal] = useState(null);
  const [time, setTime] = useState(1800); // 1800 seconds = 30 minutes


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
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  // console.log(token, 'token')




  const fetchData = async () => {
    if(myToken)
    {
      setisLoading(true)   
      const response = await fetch(
        `https://delivigo-oy-api.herokuapp.com/api/v5/restaurant/orders?status=30&PageNo=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${myToken}`, // SET HEADER IN TOKEN
          },
        }
      );
      const newData = await response.json();
      setisLoading(false)
      setDATA(newData.result);
      setDATAlength(newData.Count)
      // props.setAcepetCount(newData?.Count)
    }
  };

  const fetchData2 = async (newPage) => {
    console.log('api .... calling...............')
    console.log(`https://delivigo-oy-api.herokuapp.com/api/v5/restaurant/orders?status=30&PageNo=${newPage}`, 'check api')
    setisLoading(true)
    
    const response = await fetch(
      `https://delivigo-oy-api.herokuapp.com/api/v5/restaurant/orders?status=30&PageNo=${newPage}`,
      {
        headers: {
          Authorization: `Bearer ${myToken}`, // SET HEADER IN TOKEN
        },
      }
    );
    const newData = await response.json();
    setisLoading(false)
    console.log('api .... againg..................')
    console.log(`https://delivigo-oy-api.herokuapp.com/api/v5/restaurant/orders?status=30&PageNo=${newPage}`, 'check api')
    setDATA(newData.result);
    
    setDATAlength(newData.Count)
   
 
  };


// console.log(DATA)
useEffect(() => {
  setisLoading(true)
  fetchData();
  setTimeout(() => {
  setisLoading(false) 
    
  }, 2000);


}, [currentPage]);

  console.log()
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    console.log(newPage)
    fetchData();
  };

  let notes;
  //  console.log(notes)
  
  const HandleOrderReady = (e, obj) => {
    console.log(obj.OrderId, "Handle ready");
    // console.log(obj.Scales.map(note) => ( note))
    const notes = obj.Scales?.map((note) => note.Notes);
    console.log(notes);
    fetch(
      `https://delivigo-oy-api.herokuapp.com/api/v5/restaurant/order/process`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },

        body: JSON.stringify({
          GuID: obj.OrderId,
          ETATime: Number(obj.ETATime),
          Message: notes,
          OrderAcceptTime: obj.OrderAcceptTime,
          status: 40,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, " data");
        // setIncomming(data?.result)

        HandleInCommingOrder();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let num;
  let numTimer;

 



  const renderItem = ({ item, index }) => {
    num = Number(item.DeliveryDistance / 1000).toFixed(2);
    numTimer = Number(item.ETATime * 60);
    return (
        <View>
          {isLoading ? <View><ActivityIndicator size="large" /></View> : <View>
          <Pressable
          // onPress={() => navigation.navigate("AcceptOrderDetail")}
          onPress={() =>
            navigation.push("AcceptOrderDetail", {
              item,
            })
          }
        >
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
                onPress={() => navigation.navigate("Incoming")}
                style={{ fontSize: 20, fontWeight: "900", padding: 20 }}
              >#
                {item.OrderNumber ? item.OrderNumber : "not found"}
              </Text>
              <View style={{ marginTop: 20 }}>
                {item.IsDelivery === true ? (
                  <View
                    style={{
                      flexDirection: "row",
                      width: 85,
                      marginRight:20,
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
                      marginLeft: 0,
                      marginRight:20,
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
                        {language === 'english' ? "Schedule": "Ajasta"}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
            <Text style={{ fontSize: 18, marginLeft: 20, marginTop: -10 }}>
              {item.FullName ? item.FullName : "not found"}
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginLeft: 20,
                color: "#898989",
                marginTop: 5,
              }}
            >
              {item.Mobile ? item.Mobile : "not found"}
            </Text>

            {item.Scales?.map((ele) => {
              // notes = ele.Notes

              return (
                <View>
                  <View
                    style={{
                      width: "90%",
                      borderStyle: "dashed",
                      borderWidth: 1,
                      borderColor: "#DFDFDF",
                      marginLeft: 10,
                      marginTop: 20,
                    }}
                  ></View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "90%",
                      marginLeft: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "700",
                        marginLeft: 10,
                        marginTop: 10,
                        width:200
                      }}
                    >
                      {ele?.Quantity} x {ele?.Name ? ele?.Name : "not found"}
                    </Text>


                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "400",
                        marginTop: 5,
                        fontWeight: "700",
                      }}
                    >
                      {" "}
                      €{" "}
                      {ele?.UnitPrice ? ele?.UnitPrice : null}
                    </Text>
                  </View>

                  {ele?.Ingredients?.map((ele) => {
                    return (
                      <View
                        style={{
                          backgroundColor: "#F5F5F5",
                          width: "90%",
                          marginLeft: 20,
                          marginTop: 25,
                          padding: 20,
                          borderRadius: 15,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "500",
                            // paddingTop: 5,
                          }}
                        >
                          {ele?.Name ? ele?.Name : "not found"}
                        </Text>
                        {/* <View>
                            <Text> </Text>
                          </View> */}
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "500",
                            // paddingTop: 5,
                          }}
                        >
                          {/* {ele.Ingredient.Name?ele.Ingredient.Name:"not found"} */}
                        </Text>

                        {ele?.IngredientsType?.map((element) => {
                          return (
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  marginTop: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    width: 23,
                                    height: 23,
                                    backgroundColor: "#2973CC",
                                    borderRadius: 100,
                                    paddingLeft: 7,
                                    fontSize: 15,
                                    color: "white",
                                    marginTop: 4,
                                  }}
                                >
                                  {element.Quantity
                                    ? element.Quantity
                                    : "0"}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    fontWeight: "400",
                                    marginLeft: 5,
                                    marginTop: 3,
                                  }}
                                >
                                  {element.Name
                                    ? element.Name
                                    : "not found"}
                                </Text>
                              </View>
                              <View>
                                <Text
                                  style={{
                                    fontSize: 15,
                                    fontWeight: "400",
                                    color: "#898989",
                                    paddingTop: 5,
                                  }}
                                >
                                  {element.UnitPrice ? "+€" : null}
                                  {element.UnitPrice
                                    ? element.UnitPrice
                                    : null}
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    );
                  })}

                  {/* <View style={{ backgroundColor: '#F5F5F5', width: '90%', marginLeft: 20, marginTop: 25, padding: 20, borderRadius: 15 }}> */}
                  {/* <Text style={{ fontSize: 20, fontWeight: '500', paddingTop: 5 }}> */}
                  {/* {ele.Ingredient.Name?ele.Ingredient.Name:"not found"} */}
                  {/* </Text> */}
                  {/* {ele.Ingredient?.IngredientType?.map((item) => {
                                  return (
                                      <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                      <Text style={{ width: 23, height: 23, backgroundColor: '#2973CC', borderRadius: 100, paddingLeft: 7, fontSize: 15, color: 'white', marginTop: 4 }}>{item?.Quantity}</Text>
                                      <Text style={{ fontSize: 17, fontWeight: '400', marginLeft: 5, marginTop: 3 }}>{item?.Name?item?.Name:"not found"}</Text>
      
                                  </View>
                                  )
                              })} */}

                  {/* </View> */}
                </View>
              );
            })}

            <View
              style={{
                flexDirection: "row",
                marginLeft: 30,
                marginTop: 20,
                paddingBottom: 20,
              }}
            >
              <Image
                style={{ marginTop: 5 }}
                source={require("../assets/location.png")}
              />
              <Text style={{ fontSize: 15, padding: 5, marginTop: 5 }}>
                Delivery {num} km
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#EAF1FA",
                  width: 80,
                  height: 50,
                  borderRadius: 10,
                  paddingTop: 5,
                  paddingLeft: 5,
                  marginLeft: 40,
                }}
              >
                <Text
                  style={{
                    color: "#2973CC",
                    fontSize: 25,
                    fontWeight: "800",
                  }}
                >
                  {item.ETATime}
                </Text>
                <Text
                  style={{
                    color: "#2973CC",
                    fontSize: 16,
                    fontWeight: "300",
                    marginTop: 7,
                  }}
                >
                  {" "}
                  min
                </Text>
              </View>
            </View>
          </View>

          {/* ready bottn */}
          <Pressable onPress={(e) => HandleOrderReady(e, item)}>
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
                  marginTop: 40,
                  textAlign: "center",
                  color: "white",
                  fontSize: 23,
                  fontWeight: "800",
                }}
              >
                {language === 'english' ? "Ready": "Valmis"}
              </Text>
            </View>
          </Pressable>
        </Pressable>
            </View>}
  
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

export default Accept;

const styles = StyleSheet.create({});
