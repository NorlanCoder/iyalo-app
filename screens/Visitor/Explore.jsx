import { StyleSheet, View, Text, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Dimensions, TextInputProps, ScrollView, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from "react-native-maps";
import { useSelector } from 'react-redux';
import RequestAuth from '../Auth/RequestAuth';
import { apiURL, baseURL } from "../../api/api";
import { useNavigation } from "@react-navigation/native";

export default function Explore(){

    const location = useSelector((state) => state.appReducer.location)
    const navigation = useNavigation()
    const _map = useRef(null);
    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated)
    const dataMap = useSelector((state) => state.appReducer.dataMap)
    const [data, setData] = useState([])

    // console.log('jdsovidjsoi iodjfvmifd ',dataMap)

    const getProperty = async () => {
        console.log('exécute')
        await fetch(apiURL + 'map_properties', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: 'Bearer ' + user.token
            }
        })
        .then(response => response.json())
        .then(res => {
            console.log("ok ",res.data)
            setData(res.data)
            
        })
        .catch( (e) => {
            console.log(e);
            // setLoadAlaUne(false)
        })
    }

    useEffect(() => {
        getProperty()
    },[])

    return(
        <View className="flex-1">
            {
                isAuthenticated ?
                    <MapView className="flex-1"
                        ref={_map}
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation={true} 
                        followsUserLocation={true}
                        initialRegion={{
                            latitude: Number(location.latitude),
                            longitude: Number(location.longitude),
                            latitudeDelta: 0.04864195044303443,
                            longitudeDelta: 0.040142817690068,
                        }}
                    >
                        {
                            dataMap.map((marker, index) => (
                                <TouchableOpacity onPress={()=>console.log('ddhdh')} key={index}>
                                    <Marker onPress={()=>navigation.navigate('Details',{item: marker})} key={index} coordinate={{latitude: Number(marker.lat), longitude: Number(marker.long)}}>
                                        <View className="items-center justify-center h-12 w-12 rounded-full bg-slate-300" >
                                            <Image
                                                source={marker.cover_url?  {uri: baseURL+marker.cover_url} : require('../../assets/png-clipart.png')}
                                                className="h-10 w-10 rounded-full"
                                                resizeMode="cover"
                                            />
                                        </View>

                                        <Callout
                                            alphaHitTest
                                            // onPress={()=> [open(), loadDetailGoodToo(marker.id), setIsLoading(true)]}
                                            // style={styles.bubble}
                                            className="bg-white w-44 h-full"
                                        >
                                            <View style={{ backgroundColor: '#fff', height: 75}}>
                                                <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular', }}>{marker.label}</Text>
                                                <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular', }}>{marker.description}</Text>
                                                {/* <View style={{alignSelf: 'flex-end'}}> */}
                                                    {/* <Text style={{fontFamily: 'PoppinsRegular',  fontStyle: "italic", position: 'absolute', bottom: 2, right: 10}}>voir détails...</Text> */}
                                                {/* </View>  */}
                                            </View>
                                        </Callout>
                                    </Marker>
                                </TouchableOpacity>
                            ))
                        }
                    </MapView>
                :

                <RequestAuth />
            }

        </View>
    )
}