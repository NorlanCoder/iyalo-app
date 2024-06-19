import { useState } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, {FadeIn} from 'react-native-reanimated';
import Header from '../../components/Header';

export default function Transaction(){

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <Header title={"Visite - Transtions"} />

            <ScrollView showsVerticalScrollIndicator={false} className="mx-3">
                <View className="bg-white h-16 rounded-xl flex-row justify-between my-2">
                    <View style={{flex: 0.2}} className="h-full w-full justify-center items-center">
                        <MaterialCommunityIcons name="home-map-marker" size={24} color="black" />
                    </View>

                    <View style={{flex: 0.5}} className=" h-full w-full justify-center">
                        <Text style={{fontFamily: 'PoppinsRegular', color: "#000"}} className="text-[16px]">Visite - Transaction</Text>
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[16px] text-gray-400">10 Juin 2024</Text>
                    </View>

                    <View style={{flex: 0.3}} className="h-full w-full justify-center items-end p-2">
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[16px] py-1 text-secondary font-bold">50 000 XOF</Text>
                    </View>
                </View>

                <View className="bg-white h-16 rounded-xl flex-row justify-between my-2">
                    <View style={{flex: 0.2}} className="h-full w-full justify-center items-center">
                        <MaterialCommunityIcons name="home-map-marker" size={24} color="black" />
                    </View>

                    <View style={{flex: 0.5}} className=" h-full w-full justify-center">
                        <Text style={{fontFamily: 'PoppinsRegular', color: "#000"}} className="text-[16px]">Visite - Transaction</Text>
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[16px] text-gray-400">08 Juin 2024</Text>
                    </View>

                    <View style={{flex: 0.3}} className="h-full w-full justify-center items-end p-2">
                        <Text style={{fontFamily: 'PoppinsRegular',}} className="text-[16px] py-1 text-secondary font-bold">30 000 XOF</Text>
                    </View>
                </View>

                <View className="bg-white h-16 rounded-xl flex-row justify-between my-2">
                    <View style={{flex: 0.2}} className="h-full w-full justify-center items-center">
                        <MaterialCommunityIcons name="home-map-marker" size={24} color="black" />
                    </View>

                    <View style={{flex: 0.5}} className=" h-full w-full justify-center">
                        <Text style={{fontFamily: 'PoppinsRegular', color: "#000"}} className="text-[16px]">Visite - Transaction</Text>
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[16px] text-gray-400">07 Juin 2024</Text>
                    </View>

                    <View style={{flex: 0.3}} className="h-full w-full justify-center items-end p-2">
                        <Text style={{fontFamily: 'PoppinsRegular',}} className="text-[16px] py-1 text-secondary font-bold">25 000 XOF</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}