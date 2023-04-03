import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import Footer from "./Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Payments = () => {
  const navigation = useNavigation();

  const [token, settoken] = useState(null); // token
  const [paymentapi, setpaymentapi] = useState([]); // set incomming apis
  const [paymentapiMonthly, setpaymentapiMonthly] = useState([]); // set incomming apis
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
  const HandleInCommingOrder = () => {
    console.log("----rung----");
    fetch(`https://delivigo-api.herokuapp.com/api/v5/restaurant/payout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // SET HEADER IN TOKEN
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setpaymentapi(data?.result);

        // setIncomingCount(data?.Count)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    HandleInCommingOrder();
  }, [token]);
  console.log(
    paymentapi.Monthly ? paymentapi.Monthly[0].Sum : "not found",
    "paymentapi"
  );

  const TopMonth = paymentapi.Monthly ? paymentapi.Monthly[0] : "not found"
  console.log(TopMonth)
  return (
    <>
     <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "60%",
          marginLeft: 20,
          marginTop: 40,
        }}
      >
        <Image
          style={{ marginTop: 10 }}
          source={require("../assets/bar.png")}
        />
        <Text style={{ fontSize: 23, fontWeight: "400", paddingTop: 5 }}>
          Payments
        </Text>
        {/* <Image
                    style={{ marginTop: 10 }}
                    source={require("../assets/bill.png")}
                /> */}
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
          backgroundColor: "rgba(41, 115, 204, 1)",
          width: "90%",
          marginLeft: 20,
          borderRadius: 10,
          marginTop: 40,
        }}
        >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "95%",
 
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "900",
              paddingHorizontal: 20,
              fontSize: 40,
              paddingVertical: 20,
            }}
          >
            €{paymentapi.Monthly ? paymentapi.Monthly[0].Sum : "not found"}
          </Text>
          <View style={{}}>
            <Image
              style={{ width: 100, height: 100, marginTop: 20 }}
              source={require("../assets/paymenting.png")}
            />
            <View style={{ position: "absolute", left: "35%", top: "30%" }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "800",
                  marginTop: 10,
                }}
              >
                {paymentapi?.TotalDays ? paymentapi?.TotalDays : null}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "500",
                  marginTop: -9,
                }}
              >
                Days
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            marginTop: -30,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
            Orders:{" "}
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "500",
              marginTop: 1,
            }}
          >
            {paymentapi?.Orders ? paymentapi?.Orders : null}
          </Text>
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "400",
            paddingHorizontal: 20,
          }}
        >
          This is {paymentapi?.TotalDays ? paymentapi?.TotalDays : null} days
          earning you have
        </Text>
        <TouchableOpacity onPress={() =>
                      navigation.push("Paymentsyear", {
                        month:TopMonth,
                        token,
                      })
                    }>
          <View>
            <Text style={{color:'white', paddingHorizontal: 20,textDecorationLine:'underline'}}>Details</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Text
            style={{
              color: "white",
              fontSize: 17,
              fontWeight: "600",
              paddingHorizontal: 20,
              marginBottom: 20,
              textDecorationLine: "underline",
            }}
          ></Text>
        </View>
      </View>
      <Text
        onPress={() => navigation.navigate("Paymentsyear")}
        style={{ paddingHorizontal: 20, paddingVertical: 20, fontSize: 18 }}
      >
        2022 payouts
      </Text>

      {console.log(paymentapi.Monthly, "ddd ")}
      {paymentapi?.Monthly?.slice(1).map((month) => {
        return (
          <>
            <TouchableOpacity
            onPress={() =>
              navigation.push("Paymentsyear", {
                month,
                token,
              })
            }
              style={{
                backgroundColor: "#F6F6F6",
                width: "90%",
                marginLeft: 20,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#DFDFDF",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom:10
              }}
            >
             
            

                <View style={{ flexDirection: "row", paddingHorizontal: 10,justifyContent:'space-between' }}>
                 
                  <Text
                    style={{
                      paddingVertical: 20,
                      fontSize: 18,
                      paddingHorizontal: 5,
           
                    }}
                  >
                    {/* {paymentapiMonthly?.Date ? paymentapiMonthly?.Date : null} */}
                  </Text>

                  {/* <Text style={{ paddingVertical: 20, fontSize: 18 }}>to</Text> */}
                  <Text
                    style={{
                      paddingVertical: 20,
                      fontSize: 18,
                      paddingHorizontal: 2,
                   

                    }}
                  >
                    {" "}
                    {moment(month?.Date).format("MMMM")}
                  </Text>
                </View>
               
                
                {/* border */}
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 20,
                    justifyContent: "space-between",
               
                 

                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "900", marginRight: 10 }}>€{month?.Sum ? month?.Sum : null}</Text>
                  <View style={{ marginRight: 10 }}>
                    <Image
                      style={{ position: "relative" }}
                      source={require("../assets/down.jpeg")}
                    />
                    <Image
                      style={{ position: "absolute", top: "20%", left: "30%" }}
                      source={require("../assets/cdown.jpeg")}
                    />
                  </View>
                </View>

           
            </TouchableOpacity>

          </>
        );
      })}

    </ScrollView>
      <Footer />
    </>
   
  );
};

export default Payments;

const styles = StyleSheet.create({});
