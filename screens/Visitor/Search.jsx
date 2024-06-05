import { useState } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, {FadeIn} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RangeSlider from 'rn-range-slider';
import { CATEGORY } from '../../utils/data/categoriedata';
import { ROOM } from '../../utils/data/roomdata';
import { BATH } from '../../utils/data/bathdata';
import CategoryComponent from '../../components/Visitor/CategoryComponent';

export default function Search(){
    const navigation = useNavigation();
    const inset = useSafeAreaInsets();
    const [select, setSelect] = useState('Résidentiel')

    const rendercategory = ({ item }) => (
        <TouchableOpacity key={item.id} onPress={() => {}}>
            <CategoryComponent name={item.nom} id={item.id_} />
        </TouchableOpacity>
    );

    const renderroom = ({ item }) => (
        <TouchableOpacity key={item.id} onPress={() => {}}>
            <CategoryComponent name={item.nbr} id={item.id_} />
        </TouchableOpacity>
    );

    const renderbath = ({ item }) => (
        <TouchableOpacity key={item.id} onPress={() => {}}>
            <CategoryComponent name={item.nbr} id={item.id_} />
        </TouchableOpacity>
    );

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <Animated.View entering={FadeIn.delay(400)} className="flex flex-row justify-between items-center mt-8 px-3">
                <View className="flex-row justify-center items-center">
                    <TouchableOpacity onPress={() =>{navigation.goBack()}} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center mr-3" style={{ height: 40, width: 40,}}>
                        <MaterialIcons name="keyboard-arrow-left" size={20} color="#000"/>
                    </TouchableOpacity>
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Recherche</Text>
                </View>
            </Animated.View>

            <View className="px-3 mt-2">
                {/* <View className="bg-white h-12 flex-row rounded-xl my-2">
                    <TouchableOpacity onPress={() => {setSelect('Résidentiel')}} style={{flex: 0.5, backgroundColor: select === "Résidentiel"? "#00ddb3": null}} className="rounded-2xl justify-center items-center">
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Résidentiel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {setSelect('Commercial')}} style={{flex: 0.5, backgroundColor: select === "Commercial"? "#00ddb3": null}} className="rounded-2xl justify-center items-center">
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Commercial</Text>
                    </TouchableOpacity>
                </View> */}

                <View className="bg-white rounded-xl my-2 py-2">
                    <View className="my-2">
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] p-2">Catégorie</Text>
                        <FlatList
                            data={CATEGORY}
                            renderItem={rendercategory}
                            horizontal={true}
                            keyExtractor={(item, index) => item.id}
                            showsHorizontalScrollIndicator={false}
                            nestedScrollEnabled
                        />
                    </View>
                    
                    <View className="my-2">
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] p-2">Nbre chambre(s)</Text>
                        <FlatList
                            data={ROOM}
                            renderItem={renderroom}
                            horizontal={true}
                            keyExtractor={(item, index) => item.id}
                            showsHorizontalScrollIndicator={false}
                            nestedScrollEnabled
                        />
                    </View>

                    <View className="my-2">
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] p-2">Nbre de douche(s)</Text>
                        <FlatList
                            data={BATH}
                            renderItem={renderbath}
                            horizontal={true}
                            keyExtractor={(item, index) => item.id}
                            showsHorizontalScrollIndicator={false}
                            nestedScrollEnabled
                        />
                    </View>
                    
                </View>

                <View className="bg-white rounded-xl my-2 py-2">
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] p-2">Intervalle de prix</Text>

                    
                </View>

                <View className="h-12 flex-row rounded-xl my-2 justify-between">
                    <TouchableOpacity onPress={() => {}} style={{flex: 0.45, backgroundColor: "#FFFFFF"}} className="rounded-2xl justify-center items-center">
                        <Text adjustsFontSizeToFit={true} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Enregistrer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {}} style={{flex: 0.5, backgroundColor: "#00ddb3"}} className="rounded-2xl justify-center items-center">
                        <Text adjustsFontSizeToFit={true} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Voir résultats</Text>
                    </TouchableOpacity>
                </View>
            </View>

            
        </SafeAreaView>
    )
}