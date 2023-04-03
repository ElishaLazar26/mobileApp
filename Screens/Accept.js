import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyTime from "./myTime";

const Accept = (props) => {
  
  const navigation = useNavigation();
  const [Accept, setAccept] = useState([]);
  const [token, settoken] = useState(null);
  const [TimerLocal, setTimerLocal] = useState(null);
  const [time, setTime] = useState(1800); // 1800 seconds = 30 minutes
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

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

  // console.log(token, 'token')
  const HandleAcceptOrder = () => {
    console.log("----rung----");
    fetch(
      `https://delivigo-api.herokuapp.com/api/v5/restaurant/orders?status=30&PageNo=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.token}`, // SET HEADER IN TOKEN
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setAccept(data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    HandleAcceptOrder();
  }, []);

  let notes;
  //  console.log(notes)
  const HandleOrderReady = (e, obj) => {
    console.log(obj.OrderId, "Handle ready");
    // console.log(obj.Scales.map(note) => ( note))
    const notes = obj.Scales?.map((note) => note.Notes);
    console.log(notes);
    fetch(
      `https://delivigo-api.herokuapp.com/api/v5/restaurant/order/process`,
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

  AsyncStorage.setItem(
    "timer",
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  );

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("timer");
      console.log(value, "joshua timer");
      setTimerLocal(value);
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  });

  console.log(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`, "timing");
  console.log(TimerLocal, "TimerLocal-TimerLocal");
  // console.log(Accept,' Accept')
  return (
    <ScrollView>
      {props.AcceptApi?.map((obj) => {
        console.log(obj.ETATime, "ETATime");
        num = Number(obj.DeliveryDistance / 1000).toFixed(2);
        numTimer = Number(obj.ETATime * 60);
        return (
          <View>
            <Pressable
              // onPress={() => navigation.navigate("AcceptOrderDetail")}
              onPress={() =>
                navigation.push("AcceptOrderDetail", {
                  obj,
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
                    {obj.OrderNumber ? obj.OrderNumber : "not found"}
                  </Text>
                  <View style={{ marginTop: 20 }}>
                    {obj.IsDelivery === true ? (
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
                <Text style={{ fontSize: 18, marginLeft: 20, marginTop: -10 }}>
                  {obj.FullName ? obj.FullName : "not found"}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: 20,
                    color: "#898989",
                    marginTop: 5,
                  }}
                >
                  {obj.Mobile ? obj.Mobile : "not found"}
                </Text>

                {obj.Scales?.map((ele) => {
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
                      {obj.ETATime}
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
              <Pressable onPress={(e) => HandleOrderReady(e, obj)}>
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
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Accept;

const styles = StyleSheet.create({});
