import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import NotificationComponent from '../../components/Visitor/NotificationComponent';

export default function Notification(){
    const {width} = useWindowDimensions()

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <View className="flex flex-row justify-between items-center mt-8 px-3">
                <View className="flex-row justify-center items-center">
                    <TouchableOpacity onPress={() =>{}} className="h-full w-full items-center justify-center" style={{ height: 40, width: 40,}}>
                        <MaterialIcons name="keyboard-arrow-left" size={20} color="#000"/>
                    </TouchableOpacity>
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Notifications</Text>
                </View>

                <View className="flex flex-row gap-x-1">
                    <TouchableOpacity onPress={() =>{}} className="h-full w-full rounded-xl items-center justify-center" style={{ height: 40, width: 40,}}>
                        <Entypo name="dots-three-vertical" size={22} color="#000"/>
                    </TouchableOpacity>
                </View>
            </View>

            <NotificationComponent/>

            <NotificationComponent/>
        </SafeAreaView>
    )
}