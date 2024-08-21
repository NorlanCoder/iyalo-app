import { View, Text, TouchableOpacity, useWindowDimensions, Image, Pressable, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { Octicons , Entypo, MaterialCommunityIcons, Ionicons, Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react'
import { Menu, MenuProvider, MenuOptions, MenuTrigger, } from "react-native-popup-menu";
import { getPreciseDistance } from 'geolib';
import { useSelector } from 'react-redux';
import { baseURL } from '../../api/api';
import { Edit, Delete, Activate, ListVisite, Add } from '../CustomContent';
import { ModalPopup } from '../Admin/ModalPopup';
import { apiURL } from '../../api/api';
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from 'moment'
import 'moment/locale/fr'

moment.locale('fr')

const PropertyListByCatComponent = ({item, setFavorite, changeState}) => {
    const {width} = useWindowDimensions()

    const location = useSelector((state) => state.appReducer.location)

    return (
        <View className="bg-white mb-2 p-2 rounded-xl shadow-sm" style={{width: width - 20 }}>

            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row justify-start gap-x-2 items-center ">
                    <Image source={item.user.image_url !== null? {uri: baseURL+item.user.image_url} : require('../../assets/png-clipart.png')} style={{width: 30, height: 30}}  className="rounded-full" />
                    <Text style={{fontFamily: 'KeepCalm'}}>{item.user.name}</Text>
                </View>
                <TouchableOpacity className="bg-primary p-2 rounded-xl">
                    <Entypo name="dots-three-vertical" size={18} color="black" />
                </TouchableOpacity>
            </View>

            <View className="mt-1 relative">
                <Image source={{uri: baseURL + item.cover_url}} style={{width: '100%', height: width / 2.3}}  className="rounded-xl" />
                <View className="absolute top-0 w-full flex flex-row justify-between items-center p-2">
                    <TouchableOpacity className="bg-black/40 p-[8px] py-0 rounded-full flex flex-row items-center">
                        <Octicons name="star-fill" size={15} color="yellow" />
                        <Text className="pl-1 text-white font-bold text-lg" style={{fontFamily: 'PoppinsRegular'}}>{item.note.length}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setFavorite(item.id)}} className="bg-black/40 p-[6px] rounded-full">
                        <Octicons name="heart" size={18} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <View className="flex flex-row justify-between items-start p-1">
                    <View>
                        <Text style={{fontFamily: 'KeepCalm'}} className="">{item.label}</Text>
                        <View className="flex flex-row items-center gap-x-1">
                            <Octicons name="location" size={16} color="black" />
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="">{item.city} - {item.district}</Text>
                        </View>
                    </View>
                    <View>
                        <Text className="text-primary text-[18px] font-bold" style={{fontFamily: 'KeepCalm'}}>{item.price} {item.device}</Text>
                    </View>
                </View>

                <View className="w-full border-b border-b-slate-200 my-1"></View>

                <View className="flex-row justify-between items-center">
                    <View className="flex flex-row p-1">
    
                        <Pressable className="flex flex-row items-center mr-3">
                            <MaterialCommunityIcons name="bed" size={17} color="black" />
                            <Text className="pl-1 text-base text-primary font-bold" style={{fontFamily: 'KeepCalm'}}>{item.room}</Text>
                        </Pressable>

                        <Pressable className="flex flex-row items-center mr-3">
                            <MaterialCommunityIcons name="bathtub-outline" size={17} color="black" />
                            <Text className="pl-1 text-base text-primary font-bold" style={{fontFamily: 'KeepCalm'}}>{item.bathroom}</Text>
                        </Pressable>

                        <Pressable className="flex flex-row items-center mr-3">
                            <MaterialCommunityIcons name="pool" size={17} color="black" />
                            <Text className="pl-1 text-base text-primary font-bold" style={{fontFamily: 'KeepCalm'}}>{item.swingpool}</Text>
                        </Pressable>
                    </View>

                    <View className="flex flex-row items-center mr-3">
                        <MaterialCommunityIcons name="map-marker-distance" size={17} color="black" />
                        <Text className="pl-1 text-base text-primary font-bold" style={{fontFamily: 'KeepCalm'}}>
                            {
                                (location.latitude != null && location.longitude != null && item.lat != 0 && item.long != 0) ?
                                (getPreciseDistance(
                                { latitude: Number(item.lat), longitude: Number(item.long) },
                                { latitude: Number(location.latitude), longitude: Number(location.longitude) }
                                ) / 1000).toFixed(2)+' Km'
                                :
                                "..." 
                            }
                        </Text>
                    </View> 
                </View>    
            </View>
        </View>
    )
}

export default PropertyListByCatComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginVertical: 100,
        marginHorizontal: 100,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#7F8487",
    },
});