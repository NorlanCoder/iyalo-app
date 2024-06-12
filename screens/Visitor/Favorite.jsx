import { useState } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
import Animated, {FadeIn} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CATEGORY } from '../../utils/data/categoriedata';
import { ROOM } from '../../utils/data/roomdata';
import { BATH } from '../../utils/data/bathdata';
import CategoryComponent from '../../components/Visitor/CategoryComponent';
import RangeSlider from '../../components/RangeSliderComponent';

export default function Favoris(){

    const rendercategory = ({ item }) => (
        <TouchableOpacity key={item.id} onPress={() => {}}>
            <CategoryComponent name={item.nom} id={item.id_} />
        </TouchableOpacity>
    );

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <Animated.View entering={FadeIn.delay(400)} className="flex flex-row justify-between items-center mt-8 px-3">
                <View className="flex-row justify-center items-center">
                    <TouchableOpacity onPress={() =>{}} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center mr-3" style={{ height: 40, width: 40,}}>
                        <MaterialIcons name="keyboard-arrow-left" size={20} color="#000"/>
                    </TouchableOpacity>
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Favoris</Text>
                </View>
            </Animated.View>

            {/* <View className='flex flex-col my-2 mt-4'>
                <FlatList
                    data={CATEGORY}
                    renderItem={rendercategory}
                    horizontal={true}
                    keyExtractor={(item, index) => item.id}
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled
                />
            </View> */}

            <View className="my-2">
                <View className="bg-white h-32 m-3 rounded-xl flex-row">
                    <View style={{flex: 0.4}} className="justify-center items-center p-2">
                        <Image className="h-28 w-36 rounded-xl" source={require("../../assets/IMG-20230904-WA0019.jpg")}/>
                    </View>

                    <View style={{flex: 0.6}} className="p-2 gap-2 justify-center">
                        

                        <View>
                            <View className="flex-row items-center">
                                <Feather name='map-pin' color={"gray"} size={20}/>
                                <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[16px] text-gray-500 "> Cotonou</Text>
                            </View>
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Villa DoRego</Text>
                        </View>
                        

                        <View>
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] text-primary/70 ">XOF 100000 <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[14px] text-gray-400"> /jour</Text></Text>
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Meublé</Text>
                        </View>
                        
                    </View>
                </View>
            </View>
            
        </SafeAreaView>
    )
}