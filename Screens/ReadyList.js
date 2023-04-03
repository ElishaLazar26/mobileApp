import React, { useState, useEffect } from 'react';
import {
  FlatList, View, Text, Button,
  Pressable, Image
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";




const PAGE_SIZE = 10;



const ReadyList = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [token, settoken] = useState(null); // token
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      console.log(value, "joshua token");
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
    const response = await fetch(`https://delivigo-api.herokuapp.com/api/v5/restaurant/orders?status=40&PageNo=${page}`, {


      headers: {
        Authorization: `Bearer ${token}`, // SET HEADER IN TOKEN
      },

    });
    const newData = await response.json();
    setData([...data, ...newData.result]);
    setPage(page);

  };

  console.log(data, 'd')

  useEffect(() => {
    fetchData();
    setPage(page);

  }, [page]);



  const handleLoadMore = () => {
  setPage(page+1);

  };
  

  console.log(page)


  const renderItem = ({ item, index }) => {
    num = Number(item.DeliveryDistance / 1000).toFixed(2);
    return (
      <View>
        <Pressable
          // onPress={() => navigation.navigate("ReadyOrderDetail")}
          onPress={() =>
            navigation.push("ReadyOrderDetail", {
              item,
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
                        <Image
                          style={{ marginTop: -5, width: 60, height: 60 }}
                          source={require("../assets/phone.png")}
                        />
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
                      Harry will
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



  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id} renderItem={renderItem}
      //       onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={<Button title="Load More" onPress={handleLoadMore} />}
    />
  );
};



export default ReadyList;