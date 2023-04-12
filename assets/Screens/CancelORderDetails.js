import { StyleSheet, Text, View, Image, ScrollView,TouchableOpacity } from 'react-native'
import React , { useState, useEffect } from 'react'
import Footer from './Footer'
import { useNavigation } from "@react-navigation/native";

const CompleteOrderDetail = ({route}) => {
    const [language, setlanguage] = useState("")
    const [openside, setOpenSide] = useState(true)
//   console.log('props', props.route.params.Language);
let data = route?.params?.item;
console.log(data, "ddd")
    const navigation = useNavigation();
    const [open, setOpen] = useState(false)

    const OpenSidebar = () => {
        console.log("----->okay", open);
        if (open == false) {
          setOpen(true)
        } else {
          setOpen(false)
    
        }
      }
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
  
    return (
      
        <ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '55%', marginLeft: 20, marginTop: 50 }}>
           
            <TouchableOpacity 
                     onPress={() => navigation.navigate("OrderHistory")}

          >
          <Image
            style={{ marginTop: 10 }}
            source={require("../assets/back.png")}
          />
          </TouchableOpacity>
                <Text style={{ fontSize: 23, fontWeight: '700' }}>    #{data.OrderNumber}</Text>
            </View>
            <View style={{ width: '100%', height: 0.5, backgroundColor: '#ACACAC', marginTop: 15 }}></View>

          
            <View style={{ borderWidth: 2, width: '90%', marginLeft: 20, marginTop: 25, borderRadius: 20, borderColor: '#DFDFDF', zIndex: 100000, backgroundColor: 'white' }}>
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
                    </View>
                    <Text
                        style={{
                            fontSize: 18,
                            marginLeft: 20,
                            marginTop: 10,
                        }}
                    >
                        {data?.FullName}
                    </Text>
                    <Text
                        style={{
                            fontSize: 15,
                            marginLeft: 20,
                            color: "#898989",
                            marginTop: 2,
                        }}
                    >
                      {data?.Mobile}
                    </Text>

                    <Text
                        style={{
                            fontSize: 15,
                            marginLeft: 20,
                            marginTop: 5,

                        }}
                    >
                        {/* July 2, 2022, at 2:00 pm */}
                        not sure  time 
                    </Text>



                <View style={{ marginTop: 20 }}>
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
                </View>

                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', padding: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: '700', marginLeft: 10, marginTop: 10 }}>1  x  Large Pizza</Text>
                    <Text style={{ fontSize: 18, fontWeight: '700', marginLeft: 10, marginTop: 10 }}>€20.00</Text>
                </View> */}

                {/* <View style={{ backgroundColor: '#F5F5F5', width: '90%', marginLeft: 20, marginTop: 15, padding: 20, borderRadius: 15 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 20, fontWeight: '500', paddingTop: 5 }}>Base</Text>
                        <Text style={{ fontSize: 15, fontWeight: '500', paddingTop: 5, color: '#898989', paddingTop: 20 }}>+€2.00</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: 23, height: 23, backgroundColor: '#2973CC', borderRadius: 100, paddingLeft: 7, fontSize: 15, color: 'white', marginTop: 4 }}>1</Text>
                        <Text style={{ fontSize: 17, fontWeight: '400', marginLeft: 5, marginTop: 3 }}>Chicken</Text>

                    </View>
                </View> */}

                {/* <View style={{ backgroundColor: '#F5F5F5', width: '90%', marginLeft: 20, marginTop: 25, padding: 20, borderRadius: 15 }}>
                    <Text style={{ fontSize: 20, fontWeight: '500', paddingTop: 5 }}>Proteins</Text>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={{ width: 23, height: 23, backgroundColor: '#2973CC', borderRadius: 100, paddingLeft: 7, fontSize: 15, color: 'white', marginTop: 4 }}>1</Text>

                        <View style={{ flexDirection: "row", justifyContent: 'space-between', width: '90%' }}>
                            <Text style={{ fontSize: 17, fontWeight: '400', marginTop: 3, marginLeft: 5 }}>Minced pork spring rolls</Text>
                            <Text style={{ fontSize: 15, fontWeight: '500', marginTop: -15, color: '#898989', paddingTop: 20 }}>+€2.00</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={{ width: 23, height: 23, backgroundColor: '#2973CC', borderRadius: 100, paddingLeft: 7, fontSize: 15, color: 'white', marginTop: 4 }}>1</Text>
                        <Text style={{ fontSize: 17, fontWeight: '400', marginLeft: 5, marginTop: 3 }}>11-spiced pork</Text>

                    </View>

                </View> */}

                {/*  */}
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', padding: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', marginLeft: 10, marginTop: 10 }}>1  x  Burger</Text>
                    <Text style={{ fontSize: 18, fontWeight: '700', marginLeft: 10, marginTop: 10 }}>€20.00</Text>
                </View> */}

                {/* <View style={{ backgroundColor: '#F5F5F5', width: '90%', marginLeft: 20, marginTop: 15, padding: 20, borderRadius: 15 }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 15, fontWeight: '400', paddingTop: 5, width: "80%", lineHeight: 25 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    </View>

                </View> */}
                {/* <View style={{ backgroundColor: '#F5F5F5', width: '90%', marginLeft: 20, marginTop: 15, padding: 20, borderRadius: 15 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 20, fontWeight: '500', paddingTop: 5 }}>Base</Text>
                        <Text style={{ fontSize: 15, fontWeight: '500', paddingTop: 5, color: '#898989', paddingTop: 20 }}>+€2.00</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: 23, height: 23, backgroundColor: '#2973CC', borderRadius: 100, paddingLeft: 7, fontSize: 15, color: 'white', marginTop: 4 }}>1</Text>
                        <Text style={{ fontSize: 17, fontWeight: '400', marginLeft: 5, marginTop: 3 }}>Chicken</Text>

                    </View>
                </View> */}

                {/* <View style={{ backgroundColor: '#F5F5F5', width: '90%', marginLeft: 20, marginTop: 25, padding: 20, borderRadius: 15 }}>
                    <Text style={{ fontSize: 20, fontWeight: '500', paddingTop: 5 }}>Proteins</Text>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={{ width: 23, height: 23, backgroundColor: '#2973CC', borderRadius: 100, paddingLeft: 7, fontSize: 15, color: 'white', marginTop: 4 }}>1</Text>

                        <View style={{ flexDirection: "row", justifyContent: 'space-between', width: '90%' }}>
                            <Text style={{ fontSize: 17, fontWeight: '400', marginTop: 3, marginLeft: 5 }}>Minced pork spring rolls</Text>
                            <Text style={{ fontSize: 15, fontWeight: '500', marginTop: -15, color: '#898989', paddingTop: 20 }}>+€2.00</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={{ width: 23, height: 23, backgroundColor: '#2973CC', borderRadius: 100, paddingLeft: 7, fontSize: 15, color: 'white', marginTop: 4 }}>1</Text>
                        <Text style={{ fontSize: 17, fontWeight: '400', marginLeft: 5, marginTop: 3 }}>11-spiced pork</Text>

                    </View>

                </View> */}

                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', padding: 10 }}>
                    <Text style={{ fontSize: 22, fontWeight: '700', marginLeft: 10, marginTop: 10 }}>Total</Text>
                </View> */}
                {/* <View style={{ backgroundColor: '#F5F5F5', width: '90%', marginLeft: 20, marginTop: 15, padding: 20, borderRadius: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Text style={{ fontSize: 15, fontWeight: '400', paddingTop: 5, lineHeight: 25, color: '#898989' }}>Tax</Text>
                        <Text style={{ fontSize: 15, fontWeight: '400', paddingTop: 5, lineHeight: 25, color: '#898989' }}>+€2.00</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Text style={{ fontSize: 25, fontWeight: '400', paddingTop: 5, width: "80%", lineHeight: 25, fontWeight: '800' }}>Total</Text>
                        <Text style={{ fontSize: 20, fontWeight: '400', paddingTop: 5, width: "80%", lineHeight: 25, fontWeight: '800' }}>+€2.00</Text>
                    </View>
                </View> */}
                <View style={{ marginTop: 20 }}></View>
            </View>
{/* } */}
  
            {/* <View style={{ width: '100%', height: 0.5, backgroundColor: '#ACACAC', marginTop: 30 }}></View> */}
            {/* <View style={{ paddingBottom: 30 }}></View> */}
            <Footer/>
        </ScrollView>
    )
}

export default CompleteOrderDetail

const styles = StyleSheet.create({})