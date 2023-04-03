import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert, Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import moment from "moment/moment";
import Footer from "./Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderDetails = ({ route }) => {
    const navigation = useNavigation();
    const [unprice, setfUnprice] = useState(0);
    const [counter, setCounter] = useState(0);
    const [currentTime, setcurrentTime] = useState("");
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [openside, setOpenSide] = useState(true)


    const [language, setlanguage] = useState("")
    const OpenSidebar = () => {
        console.log("----->okay", openside);
        if (openside == false) {
          setOpenSide(true);
        } else {
          setOpenSide(false);
        }
      };
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

    const [active, setactive] = useState(0)


    const HandleActive = (e, i) => {

        setactive(i)
        console.log("Active", i)
    }



    const OpenSidebar1 = () => {
        console.log("----->okay", open1);
        if (open1 == false) {
            setOpen1(true);
        } else {
            setOpen1(false);
        }
    };
    const OpenSidebar2 = () => {
        console.log("----->okay", open2);
        if (open2 == false) {
            setOpen2(true);
        } else {
            setOpen2(false);
        }
    };
    const OpenSidebar3 = () => {
        console.log("----->okay", open3);
        if (open3 == false) {
            setOpen3(true);
        } else {
            setOpen3(false);
        }
    };
    const OpenSidebar4 = () => {
        console.log("----->okay", open4);
        if (open4 == false) {
            setOpen4(true);
        } else {
            setOpen4(false);
        }
    };
    const objecttyleVild = {
        flexDirection: "row",
        backgroundColor: "white",
        width: 50,
        height: 40,
        borderRadius: 10,
        paddingTop: 5,
        paddingLeft: 11,
    }
    const objecttyleVild2 = {
        flexDirection: "row",
        backgroundColor: "blue",
        color: "white",
        width: 50,
        height: 40,
        borderRadius: 10,
        paddingTop: 5,
        paddingLeft: 11,
    }
    // console.log(route.params.obj.OrderId, 'joshua')
    let data = route.params.obj;
    let datatoken = route.params.token;
    console.log(datatoken)
    let unitPrice;
    let Ingredient;

    console.log(moment(route.params.obj.OrderPlaceTime).format("h:mm a"), "timw");

    const TotalPrie = () => {
        const UnitPrice = data.Scales?.map((items) => {
            console.log(items.UnitPrice);
            let interg = items.Ingredients?.map((item) => {
                //   let interged = item.IngredientsType?.map((ruf) =>{
                //     console.log(ruf.Name)
                //   })
                let sum = item.IngredientsType.reduce((accumulator, object) => {
                    return accumulator + object.UnitPrice;
                }, 0);
                console.log(sum);
                Ingredient = sum;
                unitPrice = items.UnitPrice;
            });
        });

        // let sum = items.Ingredient.IngredientType.reduce((accumulator, object) => {
        //     return accumulator + object.UnitPrice;

        // }, 0);
        //   console.log(sum)
        // Ingredient = sum
        // unitPrice = items.UnitPrice

        // console.log(agminSum)
    };

    let ResorderId = data.OrderId
    TotalPrie();
    // console.log(Ingredient, 'Ingredient')
    // console.log(unitPrice, 'unitPrice')
    const totlavalues = unitPrice + Ingredient;
    console.log(totlavalues);

    useEffect(() => {
        var hours = new Date().getHours();
        var minutes = new Date().getMinutes();
        var sec = new Date().getSeconds();
        setcurrentTime(hours + ":" + minutes + sec);
    });

    //   setInterval(() => {

    //   }, );
    console.log(Number(data.ETATime) + Number(active))
    let sumTime = Number(data.ETATime) + Number(active)


    const HandleTimeupdateAndAccept = (e, id, time) => {
        console.log(id, time, data.ETATime)
        const date = new Date();
        fetch(
            `https://delivigo-api.herokuapp.com/api/v5/restaurant/order/process`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${datatoken}`, // SET HEADER IN TOKEN

                },

                body: JSON.stringify({
                    GuID: id,
                    ETATime: Number(sumTime),
                    Message: data.Notes,
                    OrderAcceptTime: date,
                    status: 30,
                }),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data, " data");

                // setIncomming(data?.result)

                // HandleInCommingOrder();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const HandleTimeupdateAndReject = (e, id, time) => {
        console.log(id, time, data.ETATime)
        const date = new Date();
        fetch(
            `https://delivigo-api.herokuapp.com/api/v5/restaurant/order/process`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${datatoken}`, // SET HEADER IN TOKEN
                },

                body: JSON.stringify({
                    GuID: id,
                    ETATime: Number(sumTime),
                    Message: data.Notes,
                    OrderAcceptTime: date,
                    status: 25,
                }),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data, " data");
                const alertmessage = data.ResultMessages?.map((message) => {
                    // console.log(message.MessageType)
                    // Alert.alert(message.Message)
                    if (message.MessageType === "success") {
                        Alert.alert(message.Message)


                        // localStorage.setItem("admin", JSON.stringify(data.result)); // // saving admin in localStorage
                        navigation.navigate('Incoming')
                    }
                    else if (message.MessageType === "danger") {
                        Alert.alert(message.Message)

                    }
                })
                navigation.navigate('Incoming')
                // setIncomming(data?.result)

                // HandleInCommingOrder();
            })
            .catch((err) => {
                console.log(err);
            });
    }



    return (
        <>
         <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "55%",
                    marginLeft: 20,
                    marginTop: 30,
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate("Incoming")}
                >
                    <Image
                        style={{ marginTop: 10 }}
                        source={require("../assets/back.png")}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 23, fontWeight: "700" }}>
                    #{data.OrderNumber}
                </Text>
            </View>
            <View
                style={{
                    width: "100%",
                    height: 0.5,
                    backgroundColor: "#ACACAC",
                    marginTop: 15,
                }}
            ></View>
        <ScrollView>
           

            <View
                style={{
                    backgroundColor: "#D3D3D3",
                    width: "90%",
                    marginLeft: 20,
                    marginTop: 25,
                    padding: 5,
                    borderRadius: 15,
                }}
            >
                <View
                    style={{
                        width: "90%",
                        marginLeft: 20,
                        marginTop: 10,
                        padding: 1,
                        borderRadius: 15,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >

                    <Text style={{ fontSize: 20, fontWeight: "900", paddingLeft: 1 }}>
                        #{data.OrderNumber}
                    </Text>
                    <View style={{ marginTop: 10 }}>
                        {data.IsDelivery === true ? (
                            <View style={{ flexDirection: 'row', width: 85, justifyContent: 'space-between' }}>
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
                            {data.IsSchedule === true ? (
                                <View style={{ marginLeft: 10 }}>
                                    <Image
                                        style={{ marginTop: 2, marginLeft: 5 }}
                                        source={require("../assets/clock.png")}
                                    />
                                    <Text
                                        style={{
                                            color: "#CCA829",
                                            fontSize: 16,
                                            fontWeight: "800",
                                            marginLeft: 25,
                                            marginTop: -20,
                                        }}
                                    >
                                         {language === 'english' ? "Schedule": "Ajasta"}
                                    </Text>
                                </View>
                            ) : null}
                        </View>
                    </View>
                    {/* <View
              style={{
                flexDirection: "row",
                width: "100%",
                marginLeft: 160,
                marginTop: 20,
              }}
            >
              <Image style={{}} source={require("../assets/pickup.png")} />
              <Text
                style={{
                  color: "#2973CC",
                  fontSize: 18,
                  fontWeight: "800",
                  marginLeft: 5,
                  marginTop: -4,
                }}
              >
                Express
              </Text>
            </View> */}
                </View>
                {/* <View style={{ backgroundColor: '#599521', width: '90%', height: 90, marginLeft: 20, borderBottomEndRadius: 35, borderBottomLeftRadius: 35, marginTop: -20, position: 'relative', top: 0, zIndex: 0 }}>
                     <Text style={{ marginLeft: 150, marginTop: 40, color: 'white', fontSize: 23, fontWeight: '800' }}>Ready</Text>
                 </View> */}
                <Text
                    style={{
                        fontSize: 18,
                        marginLeft: 20,
                        marginTop: 0,
                        fontWeight: "600",
                        paddingBottom: 40,
                    }}
                >
                    {data.FullName}
                </Text>
            </View>

            <Text style={{ fontSize: 22, fontWeight: "900", padding: 30 }}>
            {language === 'english' ? "Ready in": "Valmiina sisään"}
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "90%",
                    marginTop: -20,
                }}
            >
                <Text style={{ fontSize: 18, paddingLeft: 30 }}>
                {language === 'english' ? "Pickup estimate time": "Arvioitu noutoaika"}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: "#EAF1FA",
                        width: 75,
                        height: 40,
                        borderRadius: 10,
                        paddingTop: 2,
                        paddingLeft: 10,
                        marginLeft: 80,
                    }}
                >
                    <Text
                        style={{
                            color: "#2973CC",
                            fontSize: 20,
                            fontWeight: "800",
                            marginTop: 3,
                        }}
                    >
                        {/* {Number(data.ETATime) + Number(active)} */}
                        {sumTime}

                    </Text>
                    <Text
                        style={{
                            color: "#2973CC",
                            fontSize: 16,
                            fontWeight: "400",
                            marginTop: 5,
                        }}
                    >
                        {" "}
                        min
                    </Text>
                </View>
            </View>
            <Text
                style={{
                    paddingLeft: 30,
                    paddingTop: 10,
                    fontSize: 19,
                    color: "#898989",
                }}
            >
                {language === 'english' ? "Details": "Yksityiskohdat"}
            </Text>

            <View style={{ paddingTop: 20, paddingLeft: 10 }}>
                <Text style={{ fontSize: 20, paddingLeft: 30 }}>
                    {`\u2022`} {language === 'english' ? "Place Time": "Paikka Aika"}{" "}
                </Text>

                <Text style={{ fontSize: 15, paddingLeft: 45, color: "#898989" }}>
                    {" "}
                    {route.params.obj.OrderPlaceTime
                        ? moment(route.params.obj.OrderPlaceTime).format("h:mm a")
                        : null}
                </Text>
            </View>
            <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                <Text style={{ fontSize: 20, paddingLeft: 30 }}>
                    {`\u2022`} {language === 'english' ? "Accepted": "Hyväksytty"}{" "}
                </Text>
                <Text style={{ fontSize: 15, paddingLeft: 45, color: "#898989" }}>
                    {route.params.obj.OrderCompleteTime
                        ? moment(route.params.obj.OrderCompleteTime).format("h:mm a")
                        : null}
                </Text>
            </View>
            <View
                style={{
                    paddingTop: 15,
                    paddingLeft: 10,
                    backgroundColor: "#EAF1FA",
                    paddingBottom: 15,
                    marginTop: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        paddingLeft: 30,
                        color: "#2973CC",
                        fontWeight: "700",
                    }}
                >
                    {`\u2022`} {language === 'english' ? "Rider arrived": "Ratsastaja saapui "}{" "}
                </Text>
                <Text
                    style={{
                        fontSize: 15,
                        paddingLeft: 45,
                        color: "#2973CC",
                        fontWeight: "500",
                    }}
                >
                    {" "}
                    {route.params.obj.RiderTime
                        ? moment(route.params.obj.RiderTime).format("h:mm a")
                        : null}
                </Text>
            </View>
            <Text style={{ fontSize: 22, fontWeight: "900", padding: 30 }}>
            {language === 'english' ? "Add on time": "Lisää ajoissa "}
            </Text>

            <View
                style={{
                    backgroundColor: "#EAF1FA",
                    width: "85%",
                    borderRadius: 10,
                    paddingTop: 5,
                    paddingLeft: 5,
                    marginLeft: 30,
                }}
            >
                <View style={{ flexDirection: "row", padding: 20 }}>
                    <Text style={{ color: "#2973CC", fontSize: 28, fontWeight: "800" }}>
                        {active === -1 ? 0 : active}
                    </Text>
                    <Text
                        style={{
                            color: "#2973CC",
                            fontSize: 25,
                            fontWeight: "400",
                            marginTop: 2,
                        }}
                    >
                        {" "}
                        minutes
                    </Text>
                </View>

                {/* <Text style={{ color: '#2973CC', fontSize: 15, fontWeight: '800', marginTop: -15, paddingLeft: 20 }}>({currentTime})</Text> */}

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "95%",
                        paddingLeft: 20,
                        paddingTop: 10,
                        paddingBottom: 20,
                    }}
                >
                    <Pressable
                        // onPress={() => {
                        //   {
                        //     OpenSidebar();
                        //   }
                        //   setCounter(counter + 5);
                        //   console.log(counter);
                        // }}
                        onPress={(e) => HandleActive(e, 5)}
                    // style={{backgroundColor:"red"}}
                    >
                        <View
                            style={active === 5 ? objecttyleVild2 : objecttyleVild}
                        // style={{
                        //   flexDirection: "row",
                        //   backgroundColor: "white",
                        //   width: 55,
                        //   height: 40,
                        //   borderRadius: 10,
                        //   paddingTop: 5,
                        //   paddingLeft: 12,
                        // }}
                        >
                            <Text
                                style={{ color: "#2973CC", fontSize: 20, fontWeight: "800" }}
                            >
                                +5
                            </Text>
                        </View>

                        {open == true && (
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#2973CC",
                                    width: 55,
                                    height: 40,
                                    borderRadius: 10,
                                    paddingTop: 5,
                                    paddingLeft: 12,
                                    position: "absolute",
                                    top: 0,
                                }}
                            >
                                <Text
                                    style={{ color: "white", fontSize: 20, fontWeight: "800" }}
                                >
                                    +5
                                </Text>
                            </View>
                        )}
                    </Pressable>

                    <Pressable
                        // onPress={() => {
                        //   {
                        //     OpenSidebar1();
                        //   }
                        //   setCounter(counter + 10);
                        //   console.log(counter);
                        // }}
                        onPress={(e) => HandleActive(e, 10)}
                    >

                        <View
                            style={active === 10 ? objecttyleVild2 : objecttyleVild}
                        // style={{
                        //   flexDirection: "row",
                        //   backgroundColor: "white",
                        //   width: 55,
                        //   height: 40,
                        //   borderRadius: 10,
                        //   paddingTop: 5,
                        //   paddingLeft: 12,
                        // }}
                        >
                            <Text
                                style={{ color: "#2973CC", fontSize: 20, fontWeight: "800" }}
                            >
                                +10
                            </Text>
                        </View>
                        {open1 == true && (
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#2973CC",
                                    width: 55,
                                    height: 40,
                                    borderRadius: 10,
                                    paddingTop: 5,
                                    paddingLeft: 12,
                                    position: "absolute",
                                    top: 0,
                                }}
                            >
                                <Text
                                    style={{ color: "white", fontSize: 20, fontWeight: "800" }}
                                >
                                    +10
                                </Text>
                            </View>
                        )}


                    </Pressable>

                    <Pressable
                        // onPress={() => {
                        //   {
                        //     OpenSidebar2();
                        //   }
                        //   setCounter(counter + 15);
                        //   console.log(counter);
                        // }}
                        onPress={(e) => HandleActive(e, 15)}
                    >
                        <View
                            style={active === 15 ? objecttyleVild2 : objecttyleVild}
                        // style={{
                        //   flexDirection: "row",
                        //   backgroundColor: "white",
                        //   width: 55,
                        //   height: 40,
                        //   borderRadius: 10,
                        //   paddingTop: 5,
                        //   paddingLeft: 12,
                        // }}
                        >
                            <Text
                                style={{ color: "#2973CC", fontSize: 20, fontWeight: "800" }}
                            >
                                +15
                            </Text>
                        </View>
                        {open2 == true && (
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#2973CC",
                                    width: 55,
                                    height: 40,
                                    borderRadius: 10,
                                    paddingTop: 5,
                                    paddingLeft: 12,
                                    position: "absolute",
                                    top: 0,
                                }}
                            >
                                <Text
                                    style={{ color: "white", fontSize: 20, fontWeight: "800" }}
                                >
                                    +15
                                </Text>
                            </View>
                        )}

                    </Pressable>

                    <Pressable
                        // onPress={() => {
                        //   {
                        //     OpenSidebar3();
                        //   }
                        //   setCounter(counter + 20);
                        //   console.log(counter);
                        // }}
                        onPress={(e) => HandleActive(e, 20)}
                    >
                        <View
                            style={active === 20 ? objecttyleVild2 : objecttyleVild}
                        // style={{
                        //   flexDirection: "row",
                        //   backgroundColor: "white",
                        //   width: 55,
                        //   height: 40,
                        //   borderRadius: 10,
                        //   paddingTop: 5,
                        //   paddingLeft: 12,
                        // }}
                        >
                            <Text
                                style={{ color: "#2973CC", fontSize: 20, fontWeight: "800" }}
                            >
                                +20
                            </Text>
                        </View>
                        {open3 == true && (
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#2973CC",
                                    width: 55,
                                    height: 40,
                                    borderRadius: 10,
                                    paddingTop: 5,
                                    paddingLeft: 12,
                                    position: "absolute",
                                    top: 0,
                                }}
                            >
                                <Text
                                    style={{ color: "white", fontSize: 20, fontWeight: "800" }}
                                >
                                    +20
                                </Text>
                            </View>
                        )}

                    </Pressable>

                    <Pressable
                        onPress={(e) => HandleActive(e, 25)}
                    // onPress={() => {
                    //   {
                    //     OpenSidebar4();
                    //   }
                    //   setCounter(counter + 25);
                    //   console.log(counter);
                    // }}
                    >
                        <View
                            style={active === 25 ? objecttyleVild2 : objecttyleVild}
                        // style={{
                        //   flexDirection: "row",
                        //   backgroundColor: "white",
                        //   width: 55,
                        //   height: 40,
                        //   borderRadius: 10,
                        //   paddingTop: 5,
                        //   paddingLeft: 12,
                        // }}
                        >
                            <Text
                                style={{ color: "#2973CC", fontSize: 20, fontWeight: "800" }}
                            >
                                +25
                            </Text>
                        </View>
                        {open4 == true && (
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#2973CC",
                                    width: 55,
                                    height: 40,
                                    borderRadius: 10,
                                    paddingTop: 5,
                                    paddingLeft: 12,
                                    position: "absolute",
                                    top: 0,
                                }}
                            >
                                <Text
                                    style={{ color: "white", fontSize: 20, fontWeight: "800" }}
                                >
                                    +25
                                </Text>
                            </View>
                        )}

                    </Pressable>
                </View>
            </View>

          
        <TouchableOpacity
        onPress={() => { OpenSidebar() }}
          style={{
            backgroundColor: "#F5F5F5",
            width: "85%",
            marginLeft: 30,
            marginTop: 25,
            padding: 5,
            borderRadius: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 10,
            // borderWidth:3
            borderColor:'grey',
            borderWidth:1
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "95%",
              marginTop: 20,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginLeft: 10,
                marginTop: -10,
                fontWeight: "500",
                paddingBottom: 10,
              }}
            >
              Order List
            </Text>
  
            <Image style={{}} source={require("../assets/dropdown.png")} />
          </View>
        </TouchableOpacity>

            {data.Scales?.map((item) => {
                return (
                    <View>
                         {openside == true &&
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
                                      marginLeft: 20,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 17,
                                        fontWeight: "700",
                                        marginTop: 10,
                                        width: 200,
                                      }}
                                    >
                                      {item?.Quantity
                                        ? item?.Quantity
                                        : "not found"}{" "}
                                      x {item?.Name ? item?.Name : "not found"}
                                    </Text>

                                    <Text
                                      style={{
                                        fontSize: 22,
                                        fontWeight: "400",
                                        marginTop: 10,
                                        fontWeight: "700",
                                      }}
                                    >
                                      {" "}
                                      €{" "}
                                      {item?.UnitPrice ? item?.UnitPrice : null}
                                    </Text>
                                  </View>

                            {/* <View style={{ backgroundColor: '#F5F5F5', width: '90%', marginLeft: 20, marginTop: 15, padding: 20, borderRadius: 15 }}> */}
                            {item?.Ingredients?.map((ele) => {
                                return (
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
                                                marginTop: 15,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 20,
                                                    fontWeight: "500",
                                                    paddingTop: 5,
                                                }}
                                            >
                                                {" "}
                                                {ele?.Name ? ele?.Name : "not found"}
                                            </Text>
                                        </View>
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
                                                            {element.Quantity ? element.Quantity : "0"}
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 17,
                                                                fontWeight: "400",
                                                                marginLeft: 5,
                                                                marginTop: 3,
                                                            }}
                                                        >
                                                            {element.Name ? element.Name : "not found"}
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
                                                            {element.UnitPrice ? element.UnitPrice : null}
                                                        </Text>
                                                    </View>
                                                </View>
                                            );
                                        })}
                                    </View>
                                );
                            })}
                            {/* {item?.Ingredients?.map((ele) => {
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
                                          paddingTop: 5,
                                        }}
                                      >
                                        {ele?.Name ? ele?.Name : "not found"}
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
                                              {element.Quantity?element.Quantity:"0"}
                                            </Text>
                                            <Text
                                              style={{
                                                fontSize: 17,
                                                fontWeight: "400",
                                                marginLeft: 5,
                                                marginTop: 3,
                                              }}
                                            >
                                              {element.Name?element.Name:"not found"}
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
                                           {element.UnitPrice?"+€":null}{element.UnitPrice?element.UnitPrice:null}
                                            </Text>
                                          </View>
                                        </View>
                                        )
                                      })}
                                    
  
  
                                    </View>
                                  );
                                })} */}
                            {/* {item.Ingredient.IngredientType.map((ele) => {
                                      return (
                                          <View>
                                              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                                                  <Text style={{ fontSize: 20, fontWeight: '500', paddingTop: 5 }}>{item.Ingredient.Name}</Text>
  
                                              </View>
                                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                                  <View style={{ flexDirection: 'row' }}>
                                                      <Text style={{ width: 23, height: 23, backgroundColor: '#2973CC', borderRadius: 100, paddingLeft: 7, fontSize: 15, color: 'white', marginTop: 4 }}>{ele.Quantity}</Text>
                                                      <Text style={{ fontSize: 17, fontWeight: '400', marginLeft: 5, marginTop: 3 }}>{ele.Name}</Text>
  
                                                  </View>
                                                  <View>
                                                      <Text style={{ fontSize: 15, fontWeight: '400', color: '#898989', paddingTop: 5 }}>+€ {ele.UnitPrice}</Text>
                                                  </View>
                                              </View>
                                          </View>
                                      )
                                  })} */}

                            {/* </View> */}


                            <View style={{ marginTop: 20 }}></View>
                        </View>
            }
                    </View>
                );
            })}

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "95%",
                    padding: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: "700",
                        marginLeft: 10,
                        marginTop: 10,
                    }}
                >
                   {language === 'english' ? "Total": "Kaikki yhteensä"}
                </Text>
            </View>
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
                        {language === 'english' ? "Total": "Kaikki yhteensä"}
                    </Text>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "400",
                            paddingTop: 5,
                            width: "80%",
                            lineHeight: 25,
                            fontWeight: "800",
                            marginBottom:50,
                        }}
                    >
                        +€{data.ItemSubTotal}
                    </Text>
                </View>
            </View>


        </ScrollView>
            <Footer />
        </>
    );
};

export default OrderDetails;

const styles = StyleSheet.create({});
