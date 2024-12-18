import { useState } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, {FadeIn} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InfosComponent from '../../components/Visitor/InfosConponent';
import { useSelector } from 'react-redux';

export default function Infos(){
    const navigation = useNavigation();
    const myuser = useSelector((state) => state.userReducer)

    // console.log(myuser.user)

    return(

        <SafeAreaView className="flex-1 bg-slate-100">
            <Animated.View entering={FadeIn.delay(400)} className="flex flex-row justify-between items-center mt-8 px-3">
                <View className="flex-row justify-center items-center">
                    <TouchableOpacity onPress={() =>{navigation.goBack()}} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center mr-3" style={{ height: 40, width: 40,}}>
                        <MaterialIcons name="keyboard-arrow-left" size={20} color="#000"/>
                    </TouchableOpacity>
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Infos personnelles</Text>
                </View>

                <TouchableOpacity onPress={() =>{navigation.navigate('EditProfil')}} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center" style={{ height: 40, width: 40,}}>
                    <MaterialIcons name="edit" size={20} color="#000"/>
                </TouchableOpacity>
            </Animated.View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, paddingBottom: 50, paddingTop: 10}}>
                <InfosComponent title={"Nom"} name={myuser.user.name} />

                {/* <InfosComponent title={"Prénom"} name={myuser.user.name} /> */}

                <InfosComponent title={"Email"} name={myuser.user.email} />

                <InfosComponent title={"Téléphone"} name={myuser.user.phone} />
            </ScrollView>
        </SafeAreaView>
    )
}