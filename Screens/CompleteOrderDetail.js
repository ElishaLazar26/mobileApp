import { StyleSheet, Text, View, Image, ScrollView,TouchableOpacity } from 'react-native'
import React , { useState } from 'react'
import Footer from './Footer'
import { useNavigation } from "@react-navigation/native";

const CompleteOrderDetail = () => {
//   console.log('props', props.route.params.Language);

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
                <Text style={{ fontSize: 23, fontWeight: '700' }}>#892333</Text>
            </View>
            <View style={{ width: '100%', height: 0.5, backgroundColor: '#ACACAC', marginTop: 15 }}></View>

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
                            #892333
                        </Text>
                        <View style={{ marginTop: 20 }}>

                            <View
                                style={{
                                    flexDirection: "row",
                                    width: 70,
                                    justifyContent: "space-between",
                                }}
                            >
                                <Image
                                    style={{ marginTop: 4 }}
                                    source={require("../assets/pickup.png")}
                                />
                                <Text
                                    style={{
                                        color: "rgba(41, 115, 204, 1)",
                                        fontSize: 16,
                                        fontWeight: "800",
                                        // marginLeft: 5,
                                    }}
                                >
                                    Delivery
                                </Text>
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
                        jack will
                    </Text>
                    <Text
                        style={{
                            fontSize: 15,
                            marginLeft: 20,
                            color: "#898989",
                            marginTop: 2,
                        }}
                    >
                        +332 8329 8923
                    </Text>

                    <Text
                        style={{
                            fontSize: 15,
                            marginLeft: 20,
                            marginTop: 5,

                        }}
                    >
                        July 2, 2022, at 2:00 pm
                    </Text>


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
                                €90.00
                            </Text>
                        </View>
                    </View>

                <View style={{ marginTop: 20 }}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', padding: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: '700', marginLeft: 10, marginTop: 10 }}>1  x  Large Pizza</Text>
                    <Text style={{ fontSize: 18, fontWeight: '700', marginLeft: 10, marginTop: 10 }}>€20.00</Text>
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
                </View>

                <View style={{ backgroundColor: '#F5F5F5', width: '90%', marginLeft: 20, marginTop: 25, padding: 20, borderRadius: 15 }}>
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

                </View>

                {/*  */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', padding: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', marginLeft: 10, marginTop: 10 }}>1  x  Burger</Text>
                    <Text style={{ fontSize: 18, fontWeight: '700', marginLeft: 10, marginTop: 10 }}>€20.00</Text>
                </View>

                <View style={{ backgroundColor: '#F5F5F5', width: '90%', marginLeft: 20, marginTop: 15, padding: 20, borderRadius: 15 }}>
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
                </View>

                <View style={{ backgroundColor: '#F5F5F5', width: '90%', marginLeft: 20, marginTop: 25, padding: 20, borderRadius: 15 }}>
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

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', padding: 10 }}>
                    <Text style={{ fontSize: 22, fontWeight: '700', marginLeft: 10, marginTop: 10 }}>Total</Text>
                </View>
                <View style={{ backgroundColor: '#F5F5F5', width: '90%', marginLeft: 20, marginTop: 15, padding: 20, borderRadius: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Text style={{ fontSize: 15, fontWeight: '400', paddingTop: 5, lineHeight: 25, color: '#898989' }}>Tax</Text>
                        <Text style={{ fontSize: 15, fontWeight: '400', paddingTop: 5, lineHeight: 25, color: '#898989' }}>+€2.00</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Text style={{ fontSize: 25, fontWeight: '400', paddingTop: 5, width: "80%", lineHeight: 25, fontWeight: '800' }}>Total</Text>
                        <Text style={{ fontSize: 20, fontWeight: '400', paddingTop: 5, width: "80%", lineHeight: 25, fontWeight: '800' }}>+€2.00</Text>
                    </View>
                </View>
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