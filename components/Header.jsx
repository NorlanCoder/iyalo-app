import { useState } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, {FadeIn} from 'react-native-reanimated';

export default function Header(props){
    const navigation = useNavigation()

    return(
        <Animated.View entering={FadeIn.delay(400)} className="flex flex-row justify-between items-center mt-8 px-3">
            <View className="flex-row justify-center items-center">
                <TouchableOpacity onPress={() =>{navigation.goBack()}} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center mr-3" style={{ height: 40, width: 40,}}>
                    <MaterialIcons name="keyboard-arrow-left" size={20} color="#000"/>
                </TouchableOpacity>
                <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">{props.title}</Text>
            </View>

            <View className="bg-gray-900">
                {props.right}
            </View>
        </Animated.View>
    )
}