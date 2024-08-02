import { useState } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo, Fontisto, Foundation, FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import RequestAuth from '../Auth/RequestAuth';
import { apiURL } from '../../api/api';

export default function Profile(props){
    const {width} = useWindowDimensions()
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated)
    const myuser = useSelector((state) => state.userReducer)

    const getlogoutFavorite = async () => {

        await fetch(apiURL + 'logout', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + myuser.token
            }
        })
        .then(response => response.json())
        .then(res => {
            dispatch({type: 'LOGOUT', payload: null});
        })
        .catch( (e) => {
            console.log(e);
        })
    }

    // console.log(isAuthenticated)

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            {
                isAuthenticated ?
                <ScrollView className="px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, paddingBottom: 50, justifyContent: 'center'}}>
                    <View className="w-full h-56 justify-center items-center mt-2" >
                        <View style={{borderWidth: 0.7, borderColor: "#6E6F84"}} className="h-28 w-28 rounded-full justify-center items-center">
                            <Image source={require('../../assets/png-clipart.png')} className="h-24 w-24 rounded-full" />

                            <TouchableOpacity onPress={() => {props.navigation.navigate('InfoProfil')}} className="h-8 w-8 bg-primary/40 rounded-full absolute bottom-0 right-0 items-center justify-center">
                                <Entypo name="edit" size={20} color="#000"/>
                            </TouchableOpacity>
                        </View>

                        <View className="justify-center items-center m-5">
                            <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] p-1">{myuser.user.name}</Text>
                            <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="text-[16px] p-1">{myuser.user.email}</Text>
                        </View>
                    </View>

                    <View className="bg-white rounded-md mb-2">
                        <TouchableOpacity onPress={() =>{props.navigation.navigate('InfoProfil')}} className="flex-row justify-between mx-3 my-3 w-full">
                            <View className="flex-row justify-center items-center">
                                <View className="h-10 w-10 bg-slate-300 rounded-full items-center justify-center mr-3">
                                    <FontAwesome name="user" size={20} color="#000000"/>
                                </View>
                                
                                <View className="gap-1">
                                    <Text className="font-['PoppinsRegular'] font-bold text-[18px]">Infos personnelles</Text>
                                    <Text className="font-['PoppinsRegular'] text-[13px]">Consulter vos informations personnelles</Text>
                                </View>
                                
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() =>{}} className="flex-row justify-between mx-3 my-3 w-full">
                            <View className="flex-row justify-center items-center">
                                <View className="h-10 w-10 bg-slate-300 rounded-full items-center justify-center mr-3">
                                    <Fontisto name="locked" size={20} color="#000000"/>
                                </View>
                                
                                <View className="gap-1">
                                    <Text className="font-['PoppinsRegular'] font-bold text-[18px]">Sécurité</Text>
                                    <Text className="font-['PoppinsRegular'] text-[13px]">Changer votre mot de passe</Text>
                                </View>
                                
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() =>{}} className="flex-row justify-between mx-3 my-3 w-full">
                            <View className="flex-row justify-center items-center">
                                <View className="h-10 w-10 bg-slate-300 rounded-full items-center justify-center mr-3">
                                    <Fontisto name="bell" size={20} color="#000000"/>
                                </View>
                                
                                <View className="gap-1">
                                    <Text className="font-['PoppinsRegular'] font-bold text-[18px]">Notifications</Text>
                                    <Text className="font-['PoppinsRegular'] text-[13px]">Modifier vos préférences pour la notification</Text>
                                </View>
                                
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() =>{}} className="flex-row justify-between mx-3 my-3 w-full">
                            <View className="flex-row justify-center items-center">
                                <View className="h-10 w-10 bg-slate-300 rounded-full items-center justify-center mr-3">
                                    <Fontisto name="star" size={20} color="yellow"/>
                                </View>
                                
                                <View className="gap-1">
                                    <Text className="font-['PoppinsRegular'] font-bold text-[18px]">Devenir annonceur</Text>
                                    <Text className="font-['PoppinsRegular'] text-[13px]">Cliquer ici pour devenir annonceur</Text>
                                </View>
                                
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="bg-white rounded-md my-2">
                        <TouchableOpacity onPress={() =>{}} className="flex-row justify-between mx-3 my-3 w-full">
                            <View className="flex-row justify-center items-center">
                                <View className="h-10 w-10 bg-slate-300 rounded-full items-center justify-center mr-3">
                                    <Foundation name="info" size={20} color="#000000"/>
                                </View>
                                
                                <View className="gap-1">
                                    <Text className="font-['PoppinsRegular'] font-bold text-[18px]">Aide et support</Text>
                                    <Text className="font-['PoppinsRegular'] text-[13px]">Contacter le support technique</Text>
                                </View>
                                
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() =>{getlogoutFavorite()}} className="flex-row justify-between mx-3 my-3 w-full">
                            <View className="flex-row justify-center items-center">
                                <View className="h-10 w-10 bg-slate-300 rounded-full items-center justify-center mr-3">
                                    <MaterialIcons name="logout" size={20} color="#000000"/>
                                </View>
                                
                                <View className="gap-1">
                                    <Text className="font-['PoppinsRegular'] font-bold text-[18px] text-red-500">Deconnexion</Text>
                                    <Text className="font-['PoppinsRegular'] text-[13px]">Déconnecter votre compte</Text>
                                </View>
                                
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                :

                <RequestAuth/>

            }
            
        </SafeAreaView>
    )
}