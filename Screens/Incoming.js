import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Animated,
  Button,
  Modal,
  Switch
} from "react-native";
import React, { useEffect, useState } from "react";
// import  axios from "axios"
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Accept from "./Accept";
import Ready from "./Ready";
import Footer from "./Footer";



// import { Audio } from 'expo-av';
// let soundObject = new Audio.Sound();
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

const Incoming = () => {
  // console.log('props', props.route.params.Language);

  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation();
  const [token, settoken] = useState(null); // token
  const [incomming, setIncomming] = useState([]); // set incomming apis
  const [toggleState, setToggleState] = useState(1); // toggle
  const [AcceptApi, setAcceptApi] = useState([]); // set accept apis
  const [ReadyApi, setReadyApi] = useState([]); // set accept apis
  const [IncomingCount, setIncomingCount] = useState(null); // set  incoming  apis
  const [AceptCount, setAcepetCount] = useState(null); // set accept apis
  const [ReadyCount, setReadyCount] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [profile, setProfile] = useState('');
  const [page, setPage] = useState(0)
  const [language, setlanguage] = useState("")
const [skip, setskip] = useState()


  


  //  GET LANGUAGE FROM LOCAL 
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



  
 
  const [text, setText] = useState({

    LiveOrder: 'Live Order',
    LiveOrderalternate: 'Avoimet tilaukset',
  
    Incoming:'Incoming',
    Incomingaltenate:'Tilaukset',
  
    Accept:'Accept',
    Acceptalternate:'Hyväksytyt',
  
    Ready:'Ready',
    Readyaltenate:'Valmiit',
  
    Delivery:'Delivery',
    Deliveryalternate:'Toimitus',
  
    Pickup:'Pickup',
    Pickupaltenate:'Nouto',
  
  
    Schedule:'Schedule',
    Schedulealternate:'Ajasta',
  
    Reject:'Reject',
    Rejectalternate:'Hylkää',
  
    CustomTime:'Custom time',
    CustomTimealtenate:'Muuta aikaa',
  
  
  })




  const toggleSwitch = () => {

    setIsEnabled(previousState => !previousState)

    if (isEnabled === true) {
      console.log('apis off-line')
      fetch(
        `https://delivigo-api.herokuapp.com/api/v5/offline`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // SET HEADER IN TOKEN
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setIsEnabled(false)
        })
        .catch((err) => {
          console.log(err);
        });

    }
    else if (isEnabled === false) {
      console.log('apis on-line')
      fetch(
        `https://delivigo-api.herokuapp.com/api/v5/online`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // SET HEADER IN TOKEN
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setIsEnabled(true)
        })
        .catch((err) => {
          console.log(err);
        });

    }


  };
  console.log(isEnabled, 'default status')
  // set accept apis


  // get token from local
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
//   const loadAudio = async () => {
//     try {
//       await soundObject.loadAsync(require('../assets/audio.mp3'));
//     } catch (error) {
//       console.error("Failed to load audio: ", error);
//     }
//   }
  
//  const playAudio = async () => {
//     try {
//       await soundObject.playAsync();
//     } catch (error) {
//       console.error("Failed to play audio: ", error);
//     }
//   }
  
//   const stopAudio = async () => {
//     if (soundObject._loaded) {
//       try {
//         await soundObject.stopAsync();
//       } catch (error) {
//         console.error("Failed to stop audio: ", error);
//       }
//     } else {
//       console.error("Audio is not loaded yet");
//     }
//   }
  const toggleTab = (index) => {
    setToggleState(index);
  };
  // console.log(toggleState);

  // incomming apis Calling ..........
  // const playSound = async () => {
  //   console.log('Loading Sound');
  //   const { sound } = await Audio.Sound.createAsync( require('../assets/audio.mp3')
  //   );
  //   // setSound(sound);

  //   console.log('Playing Sound');
  //   await sound.playAsync();
  // }




//  InComming Orders
  const HandleInCommingOrder = () => {
    // console.log("----rung----");
    fetch(
      `https://delivigo-api.herokuapp.com/api/v5/restaurant/orders?status=10&PageNo=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // SET HEADER IN TOKEN
        },
      }
    )
      .then((res) => res.json())
      .then(async (data) => {
        console.log('data--->', data);
        if (data?.HasError) {
          console.log('Something went wrong');
        } else {
        try {
         
        } catch (error) {
          console.log('error', error);
        }
        setIncomming(data?.result);
        setIncomingCount(data?.Count);
      }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // profile 
  const HandleInProfile = () => {
    // console.log("----rung----");
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
        setProfile(data.result)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // playSound();
    // loadAudio();
    HandleInCommingOrder();
    HandleAcceptOrder();
    HandleAcceptReady()
    HandleInProfile()
  }, [token]);

  // acepet apis calling ....
  const HandleAcceptOrder = () => {
    // let query = `?skip=${skip}&Limit=${Limit}`
    // console.log("----rung----");
    fetch(
      `https://delivigo-api.herokuapp.com/api/v5/restaurant/orders?status=30&PageNo=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // SET HEADER IN TOKEN
        },
      }
    )

      .then((res) => res.json())
      .then((data) => {
        console.log('HandleAcceptOrder', data);
 
        setAcceptApi(data?.result);
        setAcepetCount(data?.Count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ready apis calling ....
  const HandleAcceptReady = () => {
    console.log("----rung----");
    fetch(
      `https://delivigo-api.herokuapp.com/api/v5/restaurant/orders?status=40&PageNo=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // SET HEADER IN TOKEN
        },
      } 
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setReadyApi(data?.result);
        setReadyCount(data?.Count);
      })
      .catch((err) => {
        console.log(err);
      });
      
  };

  // console.log(Ready, "Ready");


  const checkedStyleBorder = {
    backgroundColor: "#2973CC",
    width: 110,
    height: 4,
    // marginLeft: 30,
    marginTop: 13,
  };
  const checkedStylestyleSimple = {
    color: "#A1B6C6",
    fontSize: 18,
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: "500",
    marginLeft: 5,
  };

  const checkedStylestyleCheck = {
    color: "#2973CC",
    fontSize: 18,
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: "500",
    marginLeft: 5,
  };
  const checkedStylestyleCheckcircleCheck = {
    width: 25,
    height: 25,
    backgroundColor: "#2973CC",
    borderRadius: 100,
    // justifyContent:'center',
    // alignItems:'center',
    textAlign: "center",
    fontSize: 14,
    color: "white",
    marginTop: 4,
    paddingTop: 2,
  };
  const checkedStylestyleCheckcirclesimple = {
    width: 25,
    height: 25,
    backgroundColor: "#A1B6C6",
    borderRadius: 100,
    textAlign: "center",
    paddingTop: 2,
    fontSize: 14,
    color: "white",
    marginTop: 4,
  };

  const HnadleAccept = async (e, obj) => {
    // stopAudio()
    const date = new Date();
    // console.log(typeof obj.OrderId, "HnadleAccept-HnadleAccept");

    const { OrderId, ETATime, note } = obj;
    // console.log(OrderId, typeof ETATime, note);

    fetch(
      `https://delivigo-api.herokuapp.com/api/v5/restaurant/order/process`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
        HandleAcceptOrder()
        console.log(data, "data");
        setIncomming(data?.result)
        setIncomming([])
        HandleInCommingOrder();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (profile.IsOnline) {
      setIsEnabled(profile?.IsOnline)
    }
  }, [])



  return (
    <>
    
      <View
        style={{
          backgroundColor: "#EAF1FA",
          width: "100%",
          borderBottomEndRadius: 35,
          borderBottomLeftRadius: 35,
          zIndex: -1000,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
            marginLeft: 20,
            marginTop: 30,
          }}
        >
          <TouchableOpacity

            onPress={() => navigation.navigate("NotUse")}
          >

            <Image style={{}} source={require("../assets/footerorder.png")} />
            <Text style={{ color: 'grey' }}>  {language === 'english' ? " Schedule": "Ajasta" }</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>{language === 'english' ? " Live Order": "Avoimet tilaukset"}</Text>
          <View style={{ marginTop: -5 }}>
            <Switch
              trackColor={{ false: '#767577', true: 'rgba(97, 210, 129, 1)' }}
              thumbColor={isEnabled ? 'white' : 'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "85%",
            marginLeft: 25,
            marginTop: 20,
          }}
        >
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text
             
                style={
                  toggleState === 1
                    ? checkedStylestyleCheckcircleCheck
                    : checkedStylestyleCheckcirclesimple
                }
              >
                {IncomingCount}
              </Text>
              <Text
                onPress={() => toggleTab(1)}
                style={
                  toggleState === 1
                    ? checkedStylestyleCheck
                    : checkedStylestyleSimple
                }
              >
               {language === 'english' ? "Incoming": "Tilaukset"}
              </Text>
            </View>
            <View
              style={toggleState === 1 ? checkedStyleBorder : null}
            ></View>
          </View>

          <View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={
                  toggleState === 2
                    ? checkedStylestyleCheckcircleCheck
                    : checkedStylestyleCheckcirclesimple
                }
  
              >
                {AceptCount}
              </Text>
              <Text
                onPress={() => toggleTab(2)}
                style={
                  toggleState === 2
                    ? checkedStylestyleCheck
                    : checkedStylestyleSimple
                }
              >
              {language === 'english' ? "Accept": "Hyväksytyt"}
              </Text>
            </View>
            <View
              style={toggleState === 2 ? checkedStyleBorder : null}
            ></View>
          </View>

          <View>
            <View style={{ flexDirection: "row" }}>
              <Text
               
                style={
                  toggleState === 3
                    ? checkedStylestyleCheckcircleCheck
                    : checkedStylestyleCheckcirclesimple
                }
              >
                {ReadyCount}
              </Text>
              <Text
                onPress={() => toggleTab(3)}
                style={
                  toggleState === 3
                    ? checkedStylestyleCheck
                    : checkedStylestyleSimple
                }
              >
                {language === 'english' ? "Ready": "Valmiit"}
              </Text>
            </View>
            <View
              style={toggleState === 3 ? checkedStyleBorder : null}
            ></View>
          </View>
        </View>
      </View>

      <ScrollView>
      {toggleState === 1 ? (
          <>
            <View style={styles.container}>
              {incomming.length > 0  ? <>
                {incomming?.map((obj) => {
                // Incomming  order intergration.......
                return (
                  <Pressable
                    onPress={() =>
                      navigation.push("OrderDetails", {
                        obj,
                        token,
                      }
                      )
                    }
                  >
                    <View
                      onPress={() =>
                        navigation.push("OrderDetails", {
                          obj,
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
                            >#
                              {obj?.OrderNumber
                                ? obj?.OrderNumber
                                : "not found"}
                            </Text>
                            <View style={{ marginTop: 20 }}>
                              {obj.IsDelivery === true ? (
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
                                  {language === 'english' ? "Delivery": "Toimitus"}
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
                          <Text
                            style={{
                              fontSize: 18,
                              marginLeft: 20,
                              marginTop: 10,
                            }}
                          >
                            {obj?.FullName ? obj?.FullName : "not found"}
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              marginLeft: 20,
                              color: "#898989",
                              marginTop: 1,
                            }}
                          >
                            {obj?.Mobile ? obj?.Mobile : "not found"}
                          </Text>

                          <View>
                            {obj.Scales.map((item, index) => {
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

                                  {/* <Text style={{ color: "red" }}>
                                    {item?.Notes ? item?.Notes : null}
                                  </Text> */}
                                  <View style={{
                                    backgroundColor: "#F5F5F5",
                                    width: "90%",
                                    marginLeft: 20,
                                    marginTop: 25,
                                    padding: 20,
                                    borderRadius: 15,
                                  }}>
                                    {item?.Notes.length > 0 ? (
                                      <Text style={{ color: "red", fontSize: 17 }}>
                                        {item?.Notes}
                                      </Text>
                                    ) : null}
                                  </View>

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

                                        {ele?.IngredientsType?.map(
                                          (element) => {
                                            return (
                                              <View
                                                style={{
                                                  flexDirection: "row",
                                                  justifyContent:
                                                    "space-between",
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
                                                      backgroundColor:
                                                        "#2973CC",
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
                                                    {element.UnitPrice
                                                      ? "+€"
                                                      : null}
                                                    {element.UnitPrice
                                                      ? element.UnitPrice
                                                      : null}
                                                  </Text>
                                                </View>
                                              </View>
                                            );
                                          }
                                        )}
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
                              {language === 'english' ? "Reject": "Hylkää"}

                            </Text>
                            <Text
                              onPress={() =>
                                navigation.navigate("ReadyOrderDetail")
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
                              {language === 'english' ? "Customer Time": "Hylkää"}
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
                                {obj?.ETATime ? obj?.ETATime : "NOT FOUND "}
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
                          onPress={(e) => HnadleAccept(e, obj)}
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
                );
              })}
              </>  : <><Text>No Orders</Text></>}

            </View>
          </>
        ) : null}

        {/* {toggleState === 2 ? (
          <>
          {AcceptApi.length > 0 ? <>         
            <Accept AcceptApi={AcceptApi} token={token} />
          </> :  <><Text>NO ORDERS</Text></>} 
         
          </>
        ) : null} */}
        {/* {toggleState === 3 ? (
          <>
            <Ready ReadyApi={ReadyApi} />
          
          </>
        ) : null} */}

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
                  fontWeight: '900'
                }}
              >
                Choose a reason for rejection
              </Text>

              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 15,
                  textAlign: "center",
                  fontWeight: '400',
                  color: 'rgba(137, 137, 137, 1)'
                }}
              >
                The reason will be set to the customer
              </Text>
              <View style={{ marginTop: 20, width: '100%' }}>
                <Text style={{ backgroundColor: 'rgba(223, 223, 223, 1)', padding: 15, textAlign: 'center', borderRadius: 20 }}>We are busy</Text>

              </View>
              <View style={{ marginTop: 20, width: '100%' }}>
                <Text style={{ backgroundColor: 'rgba(223, 223, 223, 1)', padding: 15, textAlign: 'center', borderRadius: 20 }}>We are closing soon</Text>

              </View>
              <View style={{ marginTop: 20, width: '100%' }}>
                <Text style={{ backgroundColor: 'rgba(223, 223, 223, 1)', padding: 15, textAlign: 'center', borderRadius: 20 }}>We don’t have time</Text>

              </View>
              <View style={{ marginTop: 20, width: '100%' }}>
                <Text style={{ backgroundColor: 'rgba(223, 223, 223, 1)', padding: 15, textAlign: 'center', borderRadius: 20 }}>We don’t have a product</Text>

              </View>
              <View style={{ marginTop: 20, width: '100%' }}>
                <Text style={{ backgroundColor: 'rgba(223, 223, 223, 1)', padding: 15, textAlign: 'center', borderRadius: 20 }}>Comment</Text>

              </View>

              <View style={{ marginTop: 50, width: '100%' }}>
                <Text style={{ backgroundColor: 'rgba(41, 115, 204, 1)', padding: 15, textAlign: 'center', borderRadius: 20, color: 'white' }}>submit</Text>

              </View>






            </View>
          </ModalPoup>
        </View>

      </ScrollView>
      <Footer />
    </>
  );
};

export default Incoming;

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
