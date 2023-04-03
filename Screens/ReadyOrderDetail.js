import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Footer from "./Footer";
const ReadyOrderDetail = ({ route }) => {
  const navigation = useNavigation();
  const [openside, setOpenSide] = useState(true)

  const OpenSidebar = () => {
    console.log("----->okay", openside);
    if (openside == false) {
      setOpenSide(true);
    } else {
      setOpenSide(false);
    }
  };
  let data = route.params.read;
  let num ; 
  num = Number(data.DeliveryDistance / 1000).toFixed(2);
  return (
    <>
      <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "55%",
            marginLeft: 20,
            marginTop: 30,
            paddingBottom:20,
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
        
          }}
        ></View>
    <ScrollView>


      <View
        style={{
          backgroundColor: "#F5F5F5",
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
            marginTop: 0,
            padding: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "900", paddingTop: 20 }}>
            {" "}
            #{data.OrderNumber}
          </Text>

          <View style={{ marginTop: 10 }}>
            {data.IsDelivery === true ? (
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
                  {data.IsDelivery === false ? "Pickedup" : null}
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
                    Schedule
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
        <View
          style={{
            width: "90%",
            marginLeft: 20,
            marginTop: 10,
            padding: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              marginLeft: 0,
              marginTop: -20,
              fontWeight: "600",
              paddingBottom: 10,
            }}
          >
            {" "}
            {data.FullName}
          </Text>
        </View>
      </View>

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
      <View>
        {data.IsDelivery === false ? (
          <View
            style={{
              backgroundColor: "#599521",
              width: "90%",
              height: 90,
              marginLeft: 20,
              borderBottomEndRadius: 35,
              borderBottomLeftRadius: 35,
              marginTop: -20,
              position: "absolute",
              top: 150,
              zIndex: 0,
            }}
          >
            <Text
              style={{
                marginLeft: 150,
                marginTop: 40,
                color: "white",
                fontSize: 23,
                fontWeight: "800",
              }}
            >
              {data.IsDelivery === false ? "Pickedup" : null}
            </Text>
          </View>
        ) : null}

        <View
          style={{
            width: "90%",
            marginLeft: 20,
            marginTop: 25,
            borderRadius: 20,
            zIndex: 100000,
            backgroundColor: "white",
            backgroundColor: "#F5F5F5",
            paddingBottom: 20,
          }}
        >
          {/* <View style={{ width: '90%', marginLeft: 20, marginTop: 30, padding: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                        <Image
                            style={{ marginTop: 10 }}
                            source={require('../assets/location.png')}
                        />
                        <Text style={{ fontSize: 17, fontWeight: '400', padding: 10, marginLeft: -130 }}>Delivery 3.4 km</Text>
                        <Image
                            style={{ marginTop: 20, width: 60, height: 60 }}
                            source={require('../assets/phone.png')}
                        />
                    </View> */}
          <View style={{ marginLeft: 20, marginTop: 0, padding: 1 }}>
            <Image
              style={{ marginTop: -40 }}
              source={require("../assets/cycle.png")}
            />
            <Text
              style={{
                fontSize: 17,
                fontWeight: "400",
                marginLeft: 40,
                marginTop: -25,
              }}
            >
              Harry will
            </Text>
          </View>
          {data.IsDelivery === false ? 
                      null  :  <View
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
                        <Text style={{ fontSize: 17, padding: 5, marginTop: 5 }}>
                          Delivery {data.DeliveryDistance ? num : null} km
                        </Text>
                      </View>
  
       
                    </View>  }
        </View>
      </View>
      {/*  */}

      <Text
        style={{ fontSize: 22, fontWeight: "900", padding: 30, marginTop: 70 }}
      >
        Ready in
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
          Pickup estimate time
        </Text>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#EAF1FA",
            width: 75,
            height: 30,
            borderRadius: 10,
            paddingTop: 2,
            paddingLeft: 10,
            marginLeft: 80,
          }}
        >
          <Text style={{ color: "#2973CC", fontSize: 20, fontWeight: "800" }}>
            {data.ETATime}
          </Text>
          <Text
            style={{
              color: "#2973CC",
              fontSize: 15,
              fontWeight: "300",
              marginTop: 3,
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
        Detail
      </Text>

      <View style={{ paddingTop: 20, paddingLeft: 10 }}>
        <Text style={{ fontSize: 20, paddingLeft: 30 }}>
          {`\u2022`} Created{" "}
        </Text>
        <Text style={{ fontSize: 15, paddingLeft: 45, color: "#898989" }}>
          {" "}
          3:51 PM
        </Text>
      </View>
      <View style={{ paddingTop: 10, paddingLeft: 10 }}>
        <Text style={{ fontSize: 20, paddingLeft: 30 }}>
          {`\u2022`} Accepted{" "}
        </Text>
        <Text style={{ fontSize: 15, paddingLeft: 45, color: "#898989" }}>
          {" "}
          4:00 PM
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
          {`\u2022`} Rider arrived{" "}
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
          4:15 PM
        </Text>
      </View>
      {/* <Text style={{ fontSize: 22, fontWeight: '900', padding: 30 }}>
                Add on time
            </Text> */}

      {/* <View style={{ backgroundColor: "#EAF1FA", width: '85%', borderRadius: 10, paddingTop: 5, paddingLeft: 5, marginLeft: 30 }}>

                <View style={{ flexDirection: 'row', padding: 20 }}>
                    <Text style={{ color: '#2973CC', fontSize: 28, fontWeight: '800' }}>20</Text>
                    <Text style={{ color: '#2973CC', fontSize: 25, fontWeight: '400', marginTop: 2 }}> minutes</Text>
                </View>
                <Text style={{ color: '#2973CC', fontSize: 15, fontWeight: '800', marginTop: -15, paddingLeft: 20 }}>(4:15 PM)</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', paddingLeft: 20, paddingTop: 10, paddingBottom: 20 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: "white", width: 50, height: 40, borderRadius: 10, paddingTop: 5, paddingLeft: 12, }}>
                        <Text style={{ color: '#2973CC', fontSize: 20, fontWeight: '800' }}>+5</Text>
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: "white", width: 50, height: 40, borderRadius: 10, paddingTop: 5, paddingLeft: 12, }}>
                        <Text style={{ color: '#2973CC', fontSize: 20, fontWeight: '800' }}>+10</Text>
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
            marginBottom:50

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
            +€{data.ItemSubTotal}
          </Text>
        </View>
      </View>

      {/* <View style={{ width: '100%', height: 0.5, backgroundColor: '#ACACAC', marginTop: 30 }}></View> */}
      {/* <View style={{ paddingBottom: 30 }}></View> */}
    </ScrollView>
      <Footer />
    </>
  );
};

export default ReadyOrderDetail;

const styles = StyleSheet.create({});
