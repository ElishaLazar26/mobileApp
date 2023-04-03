import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PaymentsDetails = ({ route }) => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [token, settoken] = useState(null); // token
  const [incomming, setIncommingOrder] = useState([]); // set incomming apis
  const OpenSidebar = () => {
    // console.log("----->okay", open);
    if (open == false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  let data = route.params?.payout;
  // console.log(data?.GuID, 'nin')
  console.log(data?.TotalPrice, 'dd')
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
  const HandleInCommingOrder = () => {
    // console.log("----rung----");
    fetch(
      `https://delivigo-api.herokuapp.com/api/v5/restaurant/order/by/id?orderId=${data?.GuID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // SET HEADER IN TOKEN
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setIncommingOrder(data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    HandleInCommingOrder();
  }, [token]);


console.log(token, 'token')
  return (

    <>
         <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "55%",
          marginLeft: 20,
          marginTop: 50,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("DailyPayment")}>
          <Image
            style={{ marginTop: 10 }}
            source={require("../assets/back.png")}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 23, fontWeight: "700" }}>
          #{data?.OrderNumber}
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
 

      {/* <View style={{ backgroundColor: '#F5F5F5', width: '90%', marginLeft: 20, marginTop: 25, padding: 5, borderRadius: 15 }}>
                <View style={{ width: '90%', marginLeft: 20, marginTop: 0, padding: 1, flexDirection: 'row', justifyContent: "space-between",paddingBottom:10 }}>
                    <Text style={{ fontSize: 20, fontWeight: '900', paddingTop: 20, }}>#892333</Text>



                    <View style={{ flexDirection: 'row', width: '100%', marginLeft: 160, marginTop: 20 }}>

                        <Image
                            style={{}}
                            source={require('../assets/pickup.png')}
                        />
                        <Text style={{ color: '#2973CC', fontSize: 16, fontWeight: '800', marginLeft: 5 }}>Express</Text>
                    </View>




                </View>
                <View style={{ width: '90%', marginLeft: 20, marginTop: 10, padding: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 18, marginLeft: 0, marginTop: -20, fontWeight: '600', paddingBottom: 10 }}>JACK WILL</Text>




                    <View style={{ flexDirection: 'row', width: '100%', marginLeft: 140, marginTop: -20 }}>

                        <Image
                            style={{}}
                            source={require('../assets/clock.png')}
                        />
                        <Text style={{ color: '#CCA829', fontSize: 16, fontWeight: '800', marginLeft: 5 }}>Schedule</Text>
                    </View>




                </View>






            </View> */}

      {/*  */}
      {/* <View style={{ backgroundColor: '#F5F5F5', width: '90%', marginLeft: 20, marginTop: 25, padding: 5, borderRadius: 15 }}>
                <View style={{ width: '90%', marginLeft: 20, marginTop: 10, padding: 1,  flexDirection: 'row', justifyContent: "space-between"}}>
                <Image
                            style={{marginTop:10}}
                            source={require('../assets/location.png')}
                        />
                    <Text style={{ fontSize: 23, fontWeight: '600', padding:10,marginLeft:-90 }}>Delivery 3.4 km</Text>
                    <Image
                            style={{}}
                            source={require('../assets/phone.png')}
                        />
                    </View>
              </View> */}
      {/* <View>
               

                <View style={{ width: '90%', marginLeft: 20, marginTop: 25, borderRadius: 20, zIndex: 100000, backgroundColor: 'white', backgroundColor: '#F5F5F5',paddingBottom:20 }}>




                    <View style={{ width: '90%', marginLeft: 20, marginTop: 30, padding: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                        <Image
                            style={{ marginTop: 10 }}
                            source={require('../assets/location.png')}
                        />
                        <Text style={{ fontSize: 23, fontWeight: '400', padding: 10, marginLeft: -90 }}>Delivery 3.4 km</Text>
                        <Image
                            style={{}}
                            source={require('../assets/phone.png')}
                        />
                    </View>
                </View>
                <View style={{ backgroundColor: '#599521', width: '90%', height: 90, marginLeft: 20, borderBottomEndRadius: 35, borderBottomLeftRadius: 35, marginTop: -20, position: 'relative', top: 0, zIndex: 0 }}>
                    <Text style={{ marginLeft: 150, marginTop: 40, color: 'white', fontSize: 23, fontWeight: '800' }}>Ready</Text>
                </View>

            </View> */}
      {/*  */}

      {/* <Text style={{ fontSize: 22, fontWeight: '900', padding: 30 ,marginTop:50 }}>
                Ready in
            </Text>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', width: '90%', marginTop: -20 }}>
                <Text style={{ fontSize: 18, paddingLeft: 30 }}>Pickup estimate time</Text>
                <View style={{ flexDirection: 'row', backgroundColor: "#EAF1FA", width: 75, height: 30, borderRadius: 10, paddingTop: 2, paddingLeft: 10, marginLeft: 80 }}>
                    <Text style={{ color: '#2973CC', fontSize: 20, fontWeight: '800' }}>15</Text>
                    <Text style={{ color: '#2973CC', fontSize: 15, fontWeight: '300', marginTop: 3 }}> min</Text>
                </View>
            </View>
            <Text style={{ paddingLeft: 30, paddingTop: 10, fontSize: 19, color: '#898989' }}>Detail</Text>

            <View style={{ paddingTop: 20, paddingLeft: 10 }}>
                <Text style={{ fontSize: 20, paddingLeft: 30 }}>{`\u2022`}  Created </Text>
                <Text style={{ fontSize: 15, paddingLeft: 45, color: '#898989' }}> 3:51 PM</Text>
            </View>
            <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                <Text style={{ fontSize: 20, paddingLeft: 30 }}>{`\u2022`} Accepted </Text>
                <Text style={{ fontSize: 15, paddingLeft: 45, color: '#898989' }}> 4:00 PM</Text>
            </View>
            <View style={{ paddingTop: 15, paddingLeft: 10,backgroundColor:'#EAF1FA',paddingBottom:15 ,marginTop:10}}>
                <Text style={{ fontSize: 20, paddingLeft: 30,color:'#2973CC',fontWeight:'700' }}>{`\u2022`}  Rider arrived </Text>
                <Text style={{ fontSize: 15, paddingLeft: 45, color: '#2973CC',fontWeight:'500'  }}> 4:15 PM</Text>
            </View>
            <Text style={{ fontSize: 22, fontWeight: '900', padding: 30 }}>
                Add on time
            </Text>

            <View style={{ backgroundColor: "#EAF1FA", width: '85%', borderRadius: 10, paddingTop: 5, paddingLeft: 5, marginLeft: 30 }}>

                <View style={{ flexDirection: 'row', padding: 20 }}>
                    <Text style={{ color: '#2973CC', fontSize: 28, fontWeight: '800' }}>20</Text>
                    <Text style={{ color: '#2973CC', fontSize: 25, fontWeight: '400', marginTop: 2 }}> minutes</Text>
                </View>
                <Text style={{ color: '#2973CC', fontSize: 15, fontWeight: '800', marginTop: -15, paddingLeft: 20 }}>(4:15 PM)</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', paddingLeft: 20, paddingTop: 10, paddingBottom: 20 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: "white", width: 50, height: 40, borderRadius: 10, paddingTop: 5, paddingLeft: 12, }}>
                        <Text style={{ color: '#2973CC', fontSize: 20, fontWeight: '800' }}>+5</Text>
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: '#2973CC', width: 55, height: 40, borderRadius: 10, paddingTop: 5, paddingLeft: 12, }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>+10</Text>
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: "white", width: 50, height: 40, borderRadius: 10, paddingTop: 5, paddingLeft: 12, }}>
                        <Text style={{ color: '#2973CC', fontSize: 20, fontWeight: '800' }}>+15</Text>
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: "white", width: 50, height: 40, borderRadius: 10, paddingTop: 5, paddingLeft: 12, }}>
                        <Text style={{ color: '#2973CC', fontSize: 20, fontWeight: '800' }}>+20</Text>
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: "white", width: 50, height: 40, borderRadius: 10, paddingTop: 5, paddingLeft: 12, }}>
                        <Text style={{ color: '#2973CC', fontSize: 20, fontWeight: '800' }}>+25</Text>
                    </View>
                </View>
            </View> */}

      {/* <TouchableOpacity 
            onPress={() => { OpenSidebar() }}
            style={{ backgroundColor: '#F5F5F5', width: '85%', marginLeft: 30, marginTop: 25, padding: 5, borderRadius: 15, flexDirection: 'row', justifyContent: "space-between", paddingBottom: 10 }}>
                <View style={{ flexDirection: 'row', width: '95%', marginTop: 20, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 20, marginLeft: 10, marginTop: -10, fontWeight: '500', paddingBottom: 10 }}>Order List</Text>

                    <Image
                        style={{}}
                        source={require('../assets/dropdown.png')}
                    />

                </View>

            </TouchableOpacity> */}

      {/* {open == true && */}
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
          }}
        >
          <Text
            onPress={() => navigation.navigate("Incoming")}
            style={{ fontSize: 20, fontWeight: "900", padding: 20 }}
          >
            #{data?.OrderNumber}
            {/* {obj.OrderNumber ? obj.OrderNumber : "not found"} */}
          </Text>
          <View style={{ marginTop: 10 }}>
            {data?.IsDelivery === true ? (
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
                  Delivery
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
                <Image style={{}} source={require("../assets/pickup.png")} />
                <Text
                  style={{
                    color: "#2973CC",
                    fontSize: 16,
                    fontWeight: "800",
                    marginLeft: 5,
                  }}
                >
                  Pickup
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
              {data?.IsSchedule === true ? (
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
                    Schedule
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>

      {incomming.length > 0 ? <>
      
        {incomming?.map((obj) => {
        return (
          <>
          {obj.Scales?.map((item) => {
            console.log(item?.Ingredient.IngredientType)
            return (
              <>
                   <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', padding: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: '700', marginLeft: 10, marginTop: 10 }}>{item?.Quantity}  x {item?.Name}</Text>
                    <Text style={{ fontSize: 18, fontWeight: '700', marginLeft: 10, marginTop: 10 }}>€{item?.UnitPrice}</Text>
                </View>
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
          <Text style={{ fontSize: 20, fontWeight: "500", paddingTop: 5 }}>
            {item?.Name}
          </Text>
          {item?.Ingredient.IngredientType?.map((ele) => {
            return (
              <>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
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
              {ele?.Quantity}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "400",
                  marginTop: 3,
                  marginLeft: 5,
                }}
              >
               {ele?.Name}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  marginTop: -15,
                  color: "#898989",
                  paddingTop: 20,
                }}
              >
                +€{ele?.UnitPrice}
              </Text>
            </View>
          </View>
              </>
            )
          })}



        </View>
              

                {/* {item?.Ingredient?.map((ele) => {
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
                })} */}
              </>
            )
          })}
          </>
        )
      })}
      </> : null  }



                {/* <View style={{ backgroundColor: '#F5F5F5', width: '90%', marginLeft: 20, marginTop: 15, padding: 20, borderRadius: 15 }}>
                //     <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                //         <Text style={{ fontSize: 20, fontWeight: '500', paddingTop: 5 }}>Base</Text>
                //         <Text style={{ fontSize: 15, fontWeight: '500', paddingTop: 5, color: '#898989', paddingTop: 20 }}>+€2.00</Text>
                //     </View>
                //     <View style={{ flexDirection: 'row' }}>
                //         <Text style={{ width: 23, height: 23, backgroundColor: '#2973CC', borderRadius: 100, paddingLeft: 7, fontSize: 15, color: 'white', marginTop: 4 }}>1</Text>
                //         <Text style={{ fontSize: 17, fontWeight: '400', marginLeft: 5, marginTop: 3 }}>Chicken</Text>

                //     </View>
            </View>  */}




        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "95%",
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            1 x Burger
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            €20.00
          </Text>
        </View> */}

        {/* <View style={{ backgroundColor: '#F5F5F5', width: '90%', marginLeft: 20, marginTop: 15, padding: 20, borderRadius: 15 }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 15, fontWeight: '400', paddingTop: 5, width: "80%", lineHeight: 25 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    </View>

                </View>
                <View style={{ backgroundColor: '#F5F5F5', width: '90%', marginLeft: 20, marginTop: 15, padding: 20, borderRadius: 15 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 20, fontWeight: '500', paddingTop: 5 }}>Base</Text>
                        <Text style={{ fontSize: 15, fontWeight: '500', paddingTop: 5, color: '#898989', paddingTop: 20 }}>+€2.00</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: 23, height: 23, backgroundColor: '#2973CC', borderRadius: 100, paddingLeft: 7, fontSize: 15, color: 'white', marginTop: 4 }}>1</Text>
                        <Text style={{ fontSize: 17, fontWeight: '400', marginLeft: 5, marginTop: 3 }}>Chicken</Text>

                    </View>
                </View> */}

        {/* <View
          style={{
            backgroundColor: "#F5F5F5",
            width: "90%",
            marginLeft: 20,
            marginTop: 25,
            padding: 20,
            borderRadius: 15,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "500", paddingTop: 5 }}>
            Proteins
          </Text>

          <View style={{ flexDirection: "row", marginTop: 5 }}>
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
              1
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "400",
                  marginTop: 3,
                  marginLeft: 5,
                }}
              >
                Minced pork spring rolls
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  marginTop: -15,
                  color: "#898989",
                  paddingTop: 20,
                }}
              >
                +€2.00
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 5 }}>
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
              1
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "400",
                marginLeft: 5,
                marginTop: 3,
              }}
            >
              11-spiced pork
            </Text>
          </View>
        </View> */}


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
          >
            {/* <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                paddingTop: 5,
                lineHeight: 25,
                color: "#898989",
              }}
            >
              Tax
            </Text> */}
            {/* <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                paddingTop: 5,
                lineHeight: 25,
                color: "#898989",
              }}
            >
              +€2.00
            </Text> */}
          </View>

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
              +€{data?.TotalPrice}
            </Text>
          </View>
        </View>


        <View style={{ marginTop: 20 }}></View>
      </View>
      {/* } */}

      {/* <View style={{ width: '100%', height: 0.5, backgroundColor: '#ACACAC', marginTop: 30 }}></View> */}
      {/* <View style={{ paddingBottom: 30 }}></View> */}
    </ScrollView>
      <Footer />
    </>
  );
};

export default PaymentsDetails;

const styles = StyleSheet.create({});
