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
  Switch,
  ActivityIndicator,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
// import  axios from "axios"
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Accept from "./Accept";
import Ready from "./Ready";
import Footer from "./Footer";
import IncommingList from "./IncommingList";



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

  const [token, settoken] = useState(""); // token
  const [toggleState, setToggleState] = useState(1); // toggle
  const [AcceptApi, setAcceptApi] = useState([]); // set accept apis
  const [ReadyApi, setReadyApi] = useState([]); // set accept apis
  const [IncomingCount, setIncomingCount] = useState(0); // set  incoming  apis
  const [AceptCount, setAcepetCount] = useState(0); // set accept apis
  const [ReadyCount, setReadyCount] = useState(0);
  const [isEnabled, setIsEnabled] = useState(null);
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
    console.log(e)
    }
  };
  useEffect(() => {
    getDatalanguage();
  });


// GET TOKEN 
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("token");

    settoken(value);
  } catch (e) {
   console.log(e)
  }
};
useEffect(() => {
  getData();
});
console.log(token,'getprofiles')

  const GetResturantProfil = () => {
    if(token)
    {
      fetch(`https://delivigo-oy-api.herokuapp.com/api/v5/restaurant/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // SET HEADER IN TOKEN
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.result.IsOnline);
          if(data.result.IsOnline === true)
          {
            setIsEnabled(true);
          }
          else if(data.result.IsOnline === false)
          {
            setIsEnabled(false);
          }
       
        })
        .catch((err) => {
          console.log(err);
        });
    }


  };
 



  const fetchData = async () => {
    

      const response = await fetch(

        `https://delivigo-oy-api.herokuapp.com/api/v5/restaurant/orders?status=10&PageNo=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      const newData = await response.json();
      console.log(newData,'xxxx')
     setIncomingCount(newData?.Count)


    
  };


  const fetchData2 = async () => {
    
 
    if(token)
    {
      const response = await fetch(

        `https://delivigo-oy-api.herokuapp.com/api/v5/restaurant/orders?status=30&PageNo=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      const newData = await response.json();
      
      setAcepetCount(newData?.Count)
    }

    
  };
  const fetchData3 = async () => {
    
 
    if(token)
    {
      const response = await fetch(

        `https://delivigo-oy-api.herokuapp.com/api/v5/restaurant/orders?status=40&PageNo=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      const newData = await response.json();
      
      setReadyCount(newData?.Count)
    }

    
  };

 useEffect(() => {
    GetResturantProfil();
    fetchData()
    fetchData2()
    fetchData3()
    
  }, [token]);
  console.log(isEnabled ,'check result')
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);

  console.log(isEnabled, 'toggleSwitch')
    if (isEnabled === false) {
      fetch(`https://delivigo-oy-api.herokuapp.com/api/v5/online`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // SET HEADER IN TOKEN
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const alertmessage = data.ResultMessages?.map((message) => {
            // console.log(message.MessageType)
            // Alert.alert(message.Message)
            if (message.MessageType === "success") {
              GetResturantProfil()
              Alert.alert(message.Message);
            } else if (message.MessageType === "danger") {
              Alert.alert(message.Message);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (isEnabled === true) {
      fetch(`https://delivigo-oy-api.herokuapp.com/api/v5/offline`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // SET HEADER IN TOKEN
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const alertmessage = data.ResultMessages?.map((message) => {
            // console.log(message.MessageType)
            // Alert.alert(message.Message)
            if (message.MessageType === "success") {
              Alert.alert(message.Message);
            } else if (message.MessageType === "danger") {
              Alert.alert(message.Message);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

   
  };
 

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
  console.log(toggleState);

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


useEffect(() => {
  // playSound();
  // loadAudio();

  HandleInProfile()
}, [token]);

  // profile 
  const HandleInProfile = () => {
    // console.log("----rung----");
    fetch(
      `https://delivigo-oy-api.herokuapp.com/api/v5/restaurant/profile`,
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
      `https://delivigo-oy-api.herokuapp.com/api/v5/restaurant/order/process`,
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
        // setIncomming(data?.result)
        // setIncomming([])
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

            // onPress={() => navigation.navigate("NotUse")}
          >

            <Image style={{}} source={require("../assets/footerorder.png")} />
            <Text style={{ color: 'grey' }}>  {language === 'english' ? " Schedule": "Ajasta" }</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>{language === 'english' ? " Live Order": "Avoimet tilaukset"}</Text>
          <View style={{ marginTop: -5 }}>
<Switch
              trackColor={{ false: "#767577", true: "rgba(97, 210, 129, 1)" }}
              thumbColor={isEnabled ? "white" : "white"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            /></View>
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
          
            {token ? <View><IncommingList   token={token}/></View> : <View><ActivityIndicator size="large" /></View>}
          </>
        ) : null}


        {toggleState === 2 ? (
          <>
         
            <Accept   token={token} />
         
         
          </>
        ) : null}
        {toggleState === 3 ? (
          <>
            <Ready  token={token} />
          
          </>
        ) : null}

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
