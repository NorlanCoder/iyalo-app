import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CATEGORY } from '../../utils/data/categoriedata';
import CategoryComponent from '../../components/Visitor/CategoryComponent';
import PropertyHomeComponent from '../../components/Visitor/PropertyHomeComponent';
import React from 'react'

const Home = () => {
    // const navigation = useNavigation();


    const {width} = useWindowDimensions()

    const rendercategory = ({ item }) => (
        <TouchableOpacity key={item.id} onPress={() => {}}>
            <CategoryComponent name={item.nom} id={item.id_} />
        </TouchableOpacity>
    );

    const renderproperty = ({ item }) => (
        <TouchableOpacity onPress={() => {}}>
            <PropertyHomeComponent name={item.nom} id={item.id_} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-slate-100">
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, paddingBottom: 50}} style={{width: width}}>
                {/* En tête */}
                <View className="absolute top-10 flex flex-row justify-between items-center px-4" style={{width: width}}>
                    <View className="">
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-primary text-lg">Bénin</Text>
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold">Abomey-Calavi</Text>
                    </View>
                    <View className="flex flex-row gap-x-1">
                        <TouchableOpacity onPress={() =>{ }} className="h-full w-full bg-secondary rounded-xl items-center justify-center" style={{ height: 40, width: 40,}}>
                            <Feather name="search" size={22} color="#fff"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>{ }} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center" style={{ height: 40, width: 40,}}>
                            <Feather name="bell" size={22} color="#000"/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="absolute top-24 px-4 w-screen">
                    
                    {/* PUB */}
                    <View className='p-4 rounded-xl bg-black flex flex-col mb-2'>
                        <View className="flex flex-row gap-x-1 items-center">
                            <Text className="text-white font-bold text-base" style={{fontFamily: 'KeepCalm'}}>Démenagement - Ménage</Text>
                            <MaterialIcons name="cleaning-services" size={15} color="#fff" />
                        </View>
                        <View className="">
                            
                            <Pressable onPress={() =>{}} className="rounded-full w-auto">
                                <Text className="text-white my-1 font-thin text-sm" style={{fontFamily: 'PoppinsRegular'}}>
                                    Besoin d'un ménage impeccable ou d'un déménagement sans stress ? Contactez nos experts dès maintenant !
                                </Text>
                                <Text className="text-primary font-bold">Tout voir</Text>
                            </Pressable>
                        </View>
                        
                    </View>

                    {/* Category List */}
                    <View className='flex flex-col my-2'>
                        <FlatList
                            data={CATEGORY}
                            renderItem={rendercategory}
                            horizontal={true}
                            keyExtractor={(item, index) => item.id}
                            showsHorizontalScrollIndicator={false}
                            nestedScrollEnabled
                        />
                    </View>

                    {/* A la Une */}
                    <View className="flex flex-row justify-between items-center my-2">
                        <View className="">
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-black text-lg">A la une</Text>
                        </View>
                        <View className="flex flex-row gap-x-1">
                            <TouchableOpacity onPress={() =>{}} className=" p-1 rounded-full flex flex-row items-center justify-center">
                                <Text className="text-secondary font-bold">Tout voir</Text>
                                <Feather name="chevron-right" size={15} color="#555"/>

                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className='flex flex-col'>
                        <FlatList
                            data={CATEGORY}
                            renderItem={renderproperty}
                            horizontal={true}
                            keyExtractor={(item, index) => item.id}
                            showsHorizontalScrollIndicator={false}
                            nestedScrollEnabled
                        />
                    </View>

                    <View className="w-full border-b border-b-slate-200 my-4"></View>

                    {/* Category 1 */}
                    <View className="flex flex-row justify-between items-center my-2">
                        <View className="">
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-black text-lg">Appartement</Text>
                        </View>
                        <View className="flex flex-row gap-x-1">
                            <TouchableOpacity onPress={() =>{}} className=" p-1 rounded-full flex flex-row items-center justify-center">
                                <Text className="text-secondary font-bold">Tout voir</Text>
                                <Feather name="chevron-right" size={15} color="#555"/>

                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className='flex flex-col'>
                        <FlatList
                            data={CATEGORY}
                            renderItem={renderproperty}
                            horizontal={true}
                            keyExtractor={(item, index) => item.id}
                            showsHorizontalScrollIndicator={false}
                            nestedScrollEnabled
                        />
                    </View>

                    <View className="w-full border-b border-b-slate-200 my-4"></View>

                    {/* Category 2 */}
                    <View className="flex flex-row justify-between items-center my-2">
                        <View className="">
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-black text-lg">Bureau</Text>
                        </View>
                        <View className="flex flex-row gap-x-1">
                            <TouchableOpacity onPress={() =>{}} className=" p-1 rounded-full flex flex-row items-center justify-center">
                                <Text className="text-secondary font-bold">Tout voir</Text>
                                <Feather name="chevron-right" size={15} color="#555"/>

                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className='flex flex-col'>
                        <FlatList
                            data={CATEGORY}
                            renderItem={renderproperty}
                            horizontal={true}
                            keyExtractor={(item, index) => item.id}
                            showsHorizontalScrollIndicator={false}
                            nestedScrollEnabled
                        />
                    </View>
                
                </View>
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default Home