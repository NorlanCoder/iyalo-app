import { useEffect, useState } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
import Animated, {FadeIn} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CATEGORY } from '../../utils/data/categoriedata';
import { ROOM } from '../../utils/data/roomdata';
import { BATH } from '../../utils/data/bathdata';
import CategoryComponent from '../../components/Visitor/CategoryComponent';
import { useSelector } from 'react-redux';
import RequestAuth from '../Auth/RequestAuth';


export default function Favoris(){

    const rendercategory = ({ item }) => (
        <TouchableOpacity key={item.id} onPress={() => {}}>
            <CategoryComponent name={item.nom} id={item.id_} />
        </TouchableOpacity>
    );

    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated)
    const user = useSelector((state) => state.userReducer.user)

    const [fav, setFav] = useState([])

    const getFavorite = async () => {
        await fetch(apiURL + 'list/favoris/' + user.id, {
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
            setFav(res.data)
            // setLoadAlaUne(false)
        })
        .catch( (e) => {
            console.log(e);
            // setLoadAlaUne(false)
        })
    }

    useEffect(() => {
        if(isAuthenticated){
            getFavorite()
        }
    }, [isAuthenticated])

    const renderItem = ({item}) => {
        return(
            <TouchableOpacity className="bg-white h-32 m-3 rounded-xl flex-row">
                <View  className="justify-center items-center p-2">
                    <Image className="h-28 w-28 rounded-xl" source={require("../../assets/IMG-20230904-WA0019.jpg")}/>
                </View>

                <View style={{flex: 0.6}} className="p-2 gap-2 justify-center">
                    
                    <View>
                        <View className="flex flex-row items-center">
                            <Feather name='map-pin' color={"gray"} size={20}/>
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[16px] text-gray-500 "> Cotonou</Text>
                        </View>
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Villa DoRego</Text>
                    </View>
                    

                    <View>
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] text-primary/70 ">XOF 100000 <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[14px] text-gray-400"> /jour</Text></Text>
                        {/* <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Meublé</Text> */}
                    </View>
                    
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <Animated.View entering={FadeIn.delay(400)} className="flex flex-row justify-between items-center mt-10 px-3">
                <View className="flex-row justify-center items-center">
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[20px] ">{isAuthenticated ? 'Favoris' : ''}</Text>
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

            {
                isAuthenticated ?
                    <View className="my-2">
                        <FlatList
                            data={fav}
                            renderItem={renderItem}
                            // horizontal={true}
                            keyExtractor={(item, index) => item.id}
                            showsHorizontalScrollIndicator={false}
                            nestedScrollEnabled
                        />
                    </View>
                :
                    <RequestAuth/>

            }
        </SafeAreaView>
    )
}