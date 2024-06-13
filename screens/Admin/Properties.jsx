import { useState } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, {FadeIn} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import PropertyResultComponent from '../../components/Visitor/PropertyResultComponent';
import { CATEGORY } from '../../utils/data/categoriedata';

export default function Properties(){
    const navigation = useNavigation()

    const {width} = useWindowDimensions()

    const renderproperty = ({ item }) => (
        <TouchableOpacity className="flex flex-col items-center" key={item.id} onPress={() => {}}>
            <PropertyResultComponent name={item.nom} id={item.id_} />
        </TouchableOpacity>
    );

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <Header title={"Propriétés"} 
                right= {
                    <TouchableOpacity onPress={() =>{navigation.navigate('AddProperties')}} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center" style={{ height: 40, width: 40,}}>
                        <MaterialIcons name="add" size={20} color="#000"/>
                    </TouchableOpacity>
                }
            />

            <View className=" px-1 w-screen mt-2">
                <FlatList
                    data={CATEGORY}
                    // ListHeaderComponent={HeaderListComponent}
                    horizontal={false}
                    renderItem={renderproperty}
                    keyExtractor={(item, index) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingVertical: 10, paddingBottom: 80, justifyContent: 'center'}}
                />

            </View>
        </SafeAreaView>
    )
}