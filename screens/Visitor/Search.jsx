import { useState, useEffect } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, {FadeIn} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CATEGORY } from '../../utils/data/categoriedata';
import { ROOM } from '../../utils/data/roomdata';
import { BATH, POOL } from '../../utils/data/bathdata';
import CategoryComponent from '../../components/Visitor/CategoryComponent';
import RangeSlider from '../../components/RangeSliderComponent';
import { apiURL } from '../../api/api';
import PropertyResultComponent from '../../components/Visitor/PropertyResultComponent';
import { MenuProvider } from 'react-native-popup-menu';
import PropertyResultComponentVisitor from '../../components/Visitor/PropertyResultComponentVisitor';

export default function Search(){
    const navigation = useNavigation();
    const inset = useSafeAreaInsets();
    const [categorie, setCategorie] = useState([]);
    const [cat, setCat] = useState("");
    const [room, setRoom] = useState(0);
    const [bath, setBath] = useState(0);
    const [pool, setPool] = useState(0);
    const [min, setMin] = useState(5000);
    const [max, setMax] = useState(100000);
    const [term, setTerm] = useState("");
    const [step, setStep] = useState(0);
    const [data, setData] = useState([]);

    const back = () => {
        if(step == 0){
            navigation.goBack()
        }else{
            setStep(step - 1)
        }
    }

    const getCategorie = async () => {
        await fetch(apiURL + 'list/category/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: 'Bearer ' + user.token
            }
        })
        .then(response => response.json())
        .then(res => {
            // console.log(res)
            setCategorie(res.data)
            //   setLoadCategorie(false)
        })
        .catch( (e) => {
            console.log(e);
        })
    }

    const getSearchedData = async () => {
        // if(cat == ""){
        //     console.log(cat,"cat")
        //     return
        // }

        // if(room == ""){
        //     console.log(room,"room")

        //     return
        // }

        // if(bath == ""){
        //     console.log(bath,"bath")
            
        //     return
        // }

        // if(pool == ""){
        //     console.log(pool,"pool")

        //     return
        // }

        // if(min == ""){
        //     console.log(min,"min")

        //     return
        // }

        // if(max == ""){
        //     console.log(max,"max")

        //     return
        // }

        setStep(step + 1)

        await fetch(apiURL + `properties?bathroom=${bath}&category_id=${cat}&max_price=${max}&min_price=${min}&room=${room}&search=${term}&swingpool=${pool}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: 'Bearer ' + user.token
            }
        })
        .then(response => response.json())
        .then(res => {
            // console.log(res)
            setData(res.data.data)
        })
        .catch( (e) => {
            console.log(e);
            // setLoadAlaUne(false)
        })
    }


    useEffect(() => {
        getCategorie();
    }, [])

    const rendercategory = ({ item }) => {
        const bgStyle = (cat === item.id) ? 'bg-primary rounded-full py-2 px-4 ml-1 mr-2 flex justify-center items-center' : 'bg-slate-300 rounded-full py-2 px-4 mr-2 flex justify-center items-center'

        return(
            <TouchableOpacity key={item.id} onPress={() => {setCat(item.id)}}>
                <View className={bgStyle}>
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="pt-1">{item.label}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    const renderroom = ({ item }) => {
        const bgStyle = (room === item.id_ )? 'bg-primary rounded-full py-2 px-4 ml-1 mr-2 flex justify-center items-center' : 'bg-slate-300 rounded-full py-2 px-4 mr-2 flex justify-center items-center'

        return(
            <TouchableOpacity key={item.id} onPress={() => {setRoom(item.id_);}}>
                <View className={bgStyle}>
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="pt-1">{item.nbr}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    const renderbath = ({ item }) => {
        const bgStyle = (bath === item.id_) ? 'bg-primary rounded-full py-2 px-4 ml-1 mr-2 flex justify-center items-center' : 'bg-slate-300 rounded-full py-2 px-4 mr-2 flex justify-center items-center'

        return(
            <TouchableOpacity key={item.id} onPress={() => {setBath(item.id_)}}>
                <View className={bgStyle}>
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="pt-1">{item.nbr}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    const renderpool = ({ item }) => {
        const bgStyle = pool === item.id_ ? 'bg-primary rounded-full py-2 px-4 ml-1 mr-2 flex justify-center items-center' : 'bg-slate-300 rounded-full py-2 px-4 mr-2 flex justify-center items-center'

        return(
            <TouchableOpacity key={item.id} onPress={() => {setPool(item.id_)}}>
                <View className={bgStyle}>
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="pt-1">{item.nbr}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    const renderproperty = ({ item }) => (
        <TouchableOpacity className="flex flex-col items-center" key={item.id} onPress={() => {navigation.navigate('Details', {item: item})}}>
            <>
                <PropertyResultComponentVisitor item={item} name={item.nom} id={item.id_} />
            </>
        </TouchableOpacity>
    );

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <Animated.View entering={FadeIn.delay(400)} className="flex flex-row justify-between items-center mt-8 px-3">
                <View className="flex-row justify-center items-center">
                    <TouchableOpacity onPress={() =>{back()}} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center mr-3" style={{ height: 40, width: 40,}}>
                        <MaterialIcons name="keyboard-arrow-left" size={20} color="#000"/>
                    </TouchableOpacity>
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Recherche</Text>
                </View>
            </Animated.View>

            {
                step == 0?
                <ScrollView className="px-3 mt-2" showsVerticalScrollIndicator={false}>
                    <View className="bg-white rounded-xl my-2 py-2">
                        <View className="my-2">
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] p-2">Catégorie</Text>
                            <FlatList
                                data={categorie}
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

                        <View className="my-2">
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] p-2">Nbre de piscine(s)</Text>
                            <FlatList
                                data={POOL}
                                renderItem={renderpool}
                                horizontal={true}
                                keyExtractor={(item, index) => item.id}
                                showsHorizontalScrollIndicator={false}
                                nestedScrollEnabled
                            />
                        </View>
                        
                    </View>

                    <View className="bg-white rounded-xl my-2 py-2">
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] p-2">Intervalle de prix</Text>

                        <RangeSlider from={5000} to={100000} devise={"XOF"} setMin={setMin} setMax={setMax} />
                    </View>

                    <View className="bg-white rounded-xl my-2 py-2">
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] p-2">Recherche par nom</Text>

                        <View className="border-[1px] h-12 border-[#bdbdbe48] rounded-lg justify-center mx-3">
                            <TextInput
                                placeholder={"EX: Villa palma"}
                                placeholderTextColor={'gray'}
                                autoCapitalize="sentences"
                                textContentType="name"
                                keyboardType='default'
                                value={term}
                                onChangeText={(value) => setTerm(value)}
                                className="bg-[#FDFDFD] h-full rounded-lg px-2 font-['PoppinsRegular']"
                            />
                        </View>
                    </View>

                    <View className="h-12 flex-row rounded-xl my-2 justify-center">
                        <TouchableOpacity onPress={() => {getSearchedData()}} style={{backgroundColor: "#6C5248"}} className="rounded-2xl justify-center items-center p-2 px-5">
                            <Text adjustsFontSizeToFit={true} style={{fontFamily: 'PoppinsRegular'}} className="text-[16px] text-white">Voir résultats</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                :step == 1?
                    <View className="px-1 w-screen mt-2">

                        <FlatList
                            data={data}
                            // ListHeaderComponent={HeaderListComponent}
                            ListEmptyComponent={
                                <View className="w-[100vw] h-[80vh] flex justify-center items-center" style={{ justifyContent: 'center', alignItems: 'center'}}>
                                    <FontAwesome6 name="house-crack" size={100} color="#6C5248" />
                                    <Text style={{fontFamily: 'KeepCalm'}} className="mt-5">Aucune propriété trouvée</Text>
                                </View>
                            }
                            horizontal={false}
                            renderItem={renderproperty}
                            keyExtractor={(item, index) => item.id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingBottom: 100, justifyContent: 'center'}}
                        />

                    </View>
                :
                null
            }
        </SafeAreaView>
    )
}