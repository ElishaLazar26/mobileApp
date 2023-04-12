import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};



const IncommingList = (props) => {


  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  let myToken = props.token // *Recvied Token props




// start new code 
const [currentPage, setCurrentPage] = useState(1); // current page
const [DATA, setDATA] = useState([]); // get all incomming  order data
const [DATAlength, setDATAlength] = useState(1); // total length of  incomming order
const PAGE_SIZE = 10; //   10 data size each page
 const totalPages = Math.ceil(DATAlength / PAGE_SIZE); // logical
const [isLoading, setisLoading] = useState(false); // current page
 

// props?.setIncomingCount(DATAlength)
//  *---------- Language
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


  // *-------Fetching Data ------- *
  const fetchData = async () => {
    
    setisLoading(true)
    if(myToken)
    {
      const response = await fetch(

        `https://delivigo-api.herokuapp.com/api/v5/restaurant/orders?status=10&PageNo=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${myToken}`
          },
        }
      );
      const newData = await response.json();
      setDATA(newData?.result);
      setDATAlength(newData?.Count);

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
    fetchData()
  };

  const HnadleAccept = async (e, obj) => {
    // stopAudio()
   
    const date = new Date();

    const { OrderId, ETATime, note } = obj;


    fetch(
      `https://delivigo-api.herokuapp.com/api/v5/restaurant/order/process`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },

        body: JSON.stringify({
          GuID: OrderId,
          ETATime: Number(ETATime),
          Message: note,
          OrderAcceptTime: date,
          status: 30,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        data.ResultMessages?.map((message) => {
       
          if (message.MessageType === "success") {
          
            Alert.alert(message.Message);
            fetchData();
            // navigation.navigate("Accept");
          } else if (message.MessageType === "danger") {
            Alert.alert(message.Message);
          }
        });

      
      
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const renderItem = ({ item, index }) => {
   console.log('joshua lazar.......')
    return (
    
      <View>
        {isLoading? <View><ActivityIndicator size="large" /></View> : 
        <View>
           <Pressable
          onPress={() =>
            navigation.push("OrderDetails", {
              item,
              myToken,
            })
          }
        >
          <View
            onPress={() =>
              navigation.push("OrderDetails", {
                item,
              })
            }
          >
            <View style={{ marginTop: 20 }}>
              <View
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
                    #{item?.OrderNumber ? item?.OrderNumber : "not found"}
                  </Text>
                  <View style={{ marginTop: 20 }}>
                    {item.IsDelivery === true ? (
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
                          {language === "english" ? "Delivery" : "Toimitus"}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          marginLeft: 0,
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
                  {item?.FullName ? item?.FullName : "not found"}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 20,
                    color: "#898989",
                    marginTop: 1,
                  }}
                >
                  {item?.Mobile ? item?.Mobile : "not found"}
                </Text>

                <View>
                  {item.Scales.map((item, index) => {
                    // Incomming sale  order intergration.......
                    return (
                      <View>
                        <View
                          style={{
                            width: "95%",
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
                              fontSize: 17,
                              fontWeight: "700",
                              marginTop: 10,
                              width: 200,
                            }}
                          >
                            {item?.Quantity ? item?.Quantity : "not found"} x{" "}
                            {item?.Name ? item?.Name : "not found"}
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
                            € {item?.UnitPrice ? item?.UnitPrice : null}
                          </Text>
                        </View>

                        {/* <Text style={{ color: "red" }}>
                                    {item?.Notes ? item?.Notes : null}
                                  </Text> */}

                        {item?.Notes.length > 0 ? (
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
                            <Text style={{ color: "red", fontSize: 17 }}>
                              {item?.Notes}
                            </Text>
                          </View>
                        ) : null}

                        {item?.Ingredients?.map((ele) => {
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
                                {/* elisha lazar */}
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
                                        {element.Quantity
                                          ? element.Quantity
                                          : "0"}

                                        {/* king */}
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
                      </View>
                    );
                  })}
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 30,
                    marginTop: 20,
                    paddingBottom: 20,
                  }}
                >
                  <Text
                    onPress={() => setVisible(true)}
                    style={{
                      color: "#EE545E",
                      fontSize: 15,
                      textDecorationLine: "underline",
                      padding: 5,
                      marginTop: 5,
                    }}
                  >
                    {language === "english" ? "Reject" : "Hylkää"}
                  </Text>
                  <Text
                          onPress={() =>
                            navigation.push("OrderDetails", {
                              item,
                              myToken,
                            })
                          }
                    style={{
                      color: "#2973CC",
                      fontSize: 15,
                      textDecorationLine: "underline",
                      padding: 5,
                      marginTop: 5,
                      marginLeft: 10,
                    }}
                  >
                    {language === "english" ? "Custom Time" : "Hylkää"}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: "#EAF1FA",
                      width: 80,
                      height: 50,
                      borderRadius: 10,
                      paddingTop: 5,
                      paddingLeft: 10,
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
                      {item?.ETATime ? item?.ETATime : "NOT FOUND "}
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
              <Pressable
                // onPress={() => navigation.navigate('Accept')}
                onPress={(e) => HnadleAccept(e, item)}
              >
                <View
                  style={{
                    backgroundColor: "#2973CC",
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
                      textAlign: "center",
                      color: "white",
                      fontSize: 23,
                      fontWeight: "800",
                    }}
                  >
                    Accept
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </Pressable>

        <View>
          <ModalPoup visible={visible}>
            <View
              style={{
                alignItems: "center",
                backgroundColor: "white",
                width: "90%",
                marginVertical: 10,
                marginHorizontal: 20,
              }}
            >
              <View style={styles.header}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Image
                    source={require("../assets/x.png")}
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  marginVertical: 30,
                  fontSize: 25,
                  textAlign: "center",
                  fontWeight: "900",
                }}
              >
                Choose a reason for rejection
              </Text>

              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 15,
                  textAlign: "center",
                  fontWeight: "400",
                  color: "rgba(137, 137, 137, 1)",
                }}
              >
                The reason will be set to the customer
              </Text>
              <View style={{ marginTop: 20, width: "100%" }}>
                <Text
                  style={{
                    backgroundColor: "rgba(223, 223, 223, 1)",
                    padding: 15,
                    textAlign: "center",
                    borderRadius: 20,
                  }}
                >
                  We are busy
                </Text>
              </View>
              <View style={{ marginTop: 20, width: "100%" }}>
                <Text
                  style={{
                    backgroundColor: "rgba(223, 223, 223, 1)",
                    padding: 15,
                    textAlign: "center",
                    borderRadius: 20,
                  }}
                >
                  We are closing soon
                </Text>
              </View>
              <View style={{ marginTop: 20, width: "100%" }}>
                <Text
                  style={{
                    backgroundColor: "rgba(223, 223, 223, 1)",
                    padding: 15,
                    textAlign: "center",
                    borderRadius: 20,
                  }}
                >
                  We don’t have time
                </Text>
              </View>
              <View style={{ marginTop: 20, width: "100%" }}>
                <Text
                  style={{
                    backgroundColor: "rgba(223, 223, 223, 1)",
                    padding: 15,
                    textAlign: "center",
                    borderRadius: 20,
                  }}
                >
                  We don’t have a product
                </Text>
              </View>
              <View style={{ marginTop: 20, width: "100%" }}>
                <Text
                  style={{
                    backgroundColor: "rgba(223, 223, 223, 1)",
                    padding: 15,
                    textAlign: "center",
                    borderRadius: 20,
                  }}
                >
                  Comment
                </Text>
              </View>

              <View style={{ marginTop: 50, width: "100%" }}>
                <Text
                  style={{
                    backgroundColor: "rgba(41, 115, 204, 1)",
                    padding: 15,
                    textAlign: "center",
                    borderRadius: 20,
                    color: "white",
                  }}
                >
                  submit
                </Text>
              </View>
            </View>
          </ModalPoup>
        </View>
        </View>
        
        }
       
      </View>
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
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default IncommingList;
