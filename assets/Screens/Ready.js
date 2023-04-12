import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Pressable,
  FlatList
} from "react-native";
import React, { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyList from "./MyList";
import ReadyList from "./ReadyList";

const Ready = (props) => {
  const navigation = useNavigation();
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
  
  // console.log(props.ReadyApi, "ReadyApi");
  let num;

  console.log(num, "ddds");
  // const renderItem = () => {
    return (
     
      <ReadyList props={props}/>
    

    
    );

};

export default Ready;

const styles = StyleSheet.create({});
