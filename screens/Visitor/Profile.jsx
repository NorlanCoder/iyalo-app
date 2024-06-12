import { useState } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo, Fontisto, Foundation, FontAwesome } from '@expo/vector-icons';

export default function Profile(){
    const {width} = useWindowDimensions()

    return(
        <SafeAreaView className="flex-1 bg-slate-100 px-4">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, paddingBottom: 50, justifyContent: 'center'}}>
                <View className="w-full h-56 justify-center items-center mt-10" >
                    <View style={{borderWidth: 0.7, borderColor: "#6E6F84"}} className="h-28 w-28 rounded-full justify-center items-center">
                        <Image source={require('../../assets/png-clipart.png')} className="h-24 w-24 rounded-full" />

                        <TouchableOpacity onPress={() => {}} className="h-8 w-8 bg-primary/40 rounded-full absolute bottom-0 right-0 items-center justify-center">
                            <Entypo name="edit" size={20} color="#000"/>
                        </TouchableOpacity>
                    </View>

                    <View className="justify-center items-center m-5">
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] p-1">John Doe</Text>
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="text-[16px] p-1">johndoe@gmail.com</Text>
                    </View>
                </View>

                <View className="bg-white rounded-md my-2">
                    <TouchableOpacity onPress={() =>{}} className="flex-row justify-between mx-3 my-3 w-full">
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

                    <TouchableOpacity onPress={() =>{}} className="flex-row justify-between mx-3 my-3 w-full">
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
        </SafeAreaView>
    )
}