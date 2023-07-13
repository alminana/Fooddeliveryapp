import React, {useState, useReducer,useEffect }from "react";
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native'
import * as Location from 'expo-location';
import { useNavigation } from "../utils";

const screenwidth = Dimensions.get('screen').width


export const LandingScreen = () => {

    const { navigate } = useNavigation();

    const [errMsg, setErrorMsg ]= useState("")
    const [address, setAddress] = useState<Location.LocationGeocodedAddress>()
    const [displayAddress, setDisplayAddress] = useState("Waiting for Current Location ")

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if ( status != 'granted') {
                setErrorMsg('Permission to access is not granted')
            }

            let location: any = await Location.getCurrentPositionAsync({});
            const { coords } = location

            if (coords) {
                const {latitude, longitude} = coords;

                let addressResponse: any = await Location.reverseGeocodeAsync({latitude, longitude})

                for(let item of addressResponse){
                    setAddress(item)
                    let currentAddress = `${item.name},${item.street}, ${item.postalCode}, ${item.country}`;
                    setDisplayAddress(currentAddress);

                    if (currentAddress.length > 0) {
                        setTimeout(() => {
                          navigate("homeStack");
                        }, 2000);
                      }
            

                    return;
                }
            }else{
                //notify user something went wrong location
            }
        })();
        
    },[])


    return(
        <View style={styles.container} >
          <View style={styles.navigation}>
                <Text>Navigation</Text>
          </View>
          <View style={styles.body}>
            <Image source={require('../images/delivery_icon.png')} style={styles.deliveryicon}/>
            <View style={styles.addressContainer}>
                <Text style={styles.addressTitle}>Your Delivery Address</Text>
            </View>
            <Text style={styles.addressText}> {displayAddress} </Text>
          </View>
          <View style={styles.footer}>
           
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
       
    },
    navigation:{
        flex:2,
    
    },
    body:{
        flex:9,
        justifyContent:'center',
        alignItems:'center',
  
    },
    deliveryicon:{
        width:120,
        height:120,
    },
    addressContainer:{
        width:screenwidth - 100,
        borderBottomColor:'red',
        borderBottomWidth:0.5,
        padding: 5,
        marginBottom:10,
        alignItems:'center',
    },
    addressTitle:{
        fontSize:22,
        fontWeight:'700',
        color:'#7d7d7d7d',
    },
    addressText:{
        fontSize:20,
        fontWeight:'200',
        color:'#4f4f4f',
    },
    
    footer:{
        flex:1,
      
    }
})


