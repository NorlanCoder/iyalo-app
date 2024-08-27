import { useEffect, useState } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList, RefreshControl, ActivityIndicator} from 'react-native'
import { Feather, MaterialIcons, Entypo, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, {FadeIn} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CATEGORY } from '../../utils/data/categoriedata';
import { ROOM } from '../../utils/data/roomdata';
import { BATH } from '../../utils/data/bathdata';
import CategoryComponent from '../../components/Visitor/CategoryComponent';
import { useSelector } from 'react-redux';
import RequestAuth from '../Auth/RequestAuth';
import { apiURL, baseURL } from '../../api/api';


export default function Favoris(){
    const navigation = useNavigation();
    const rendercategory = ({ item }) => (
        <TouchableOpacity key={item.id} onPress={() => {}}>
            <CategoryComponent name={item.nom} id={item.id_} />
        </TouchableOpacity>
    );

    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated)
    const user = useSelector((state) => state.userReducer.user)
    const myuser = useSelector((state) => state.userReducer)


    const [fav, setFav] = useState([])
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    const setFavorite = async (id) => {
        console.log(user)
        await fetch(apiURL + 'toggle/favoris/' + user.id + '/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + myuser.token
            }
        })
        .then(response => response.json())
        .then(res => {
            onRefresh();
        })
        .catch( (e) => {
            console.log(e);
            // setLoadAlaUne(false)
        })
    }

    const onRefresh = () => {
        try{
            if(isAuthenticated){
                getFavorite();
            }else{
                setRefreshing(false);
                setLoading(false)
            }
        }catch(error){
            setRefreshing(false);
        }finally{
            setRefreshing(false);
        }
    }


    const getFavorite = async () => {
        setLoading(true)
        await fetch(apiURL + 'list/favoris/' + user.id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + myuser.token
            }
        })
        .then(response => response.json())
        .then(res => {
            console.log('liste favoris', res)
            setFav(res.data)
            setLoading(false)
        })
        .catch( (e) => {
            console.log(e);
            setLoading(false)
        })
    }

    useEffect(() => {
        getFavorite()
    }, [isAuthenticated])


    const renderItem = ({item}) => {
        console.log(item)
        return(
            <TouchableOpacity onPress={() => {navigation.navigate('Details', {item: item})}} className="bg-white h-32 m-3 rounded-xl flex-row">
                <View  className="justify-center items-center p-2">
                    <Image className="h-28 w-28 rounded-xl" source={{uri: baseURL + item.cover_url}}/>
                </View>

                <View className="p-2 gap-2 justify-center w-[65%]">
                    
                    <View className="">
                        <View className="flex flex-row items-center justify-between">
                            <View className="flex flex-row items-center">
                                <Feather name='map-pin' color={"gray"} size={20}/>
                                <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[16px] text-gray-500 "> {item.district}</Text>
                            </View>
                            <TouchableOpacity onPress={() => {setFavorite(item.id)}} className="bg-black/40 p-[6px] rounded-full">
                                <Octicons name="heart" size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[16px] ">{item.label}</Text>
                    </View>
                    

                    <View>
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] text-primary/70 ">XOF {item.price} <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[14px] text-gray-400"> / {item.frequency === "monthly"? "Mois": item.frequency === "daily"? "Jour": "Année"}</Text></Text>
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

                    loading ?
                    <View className="py-3 w-full h-full flex items-center justify-center">
                        <ActivityIndicator size={50} color="#6C5248" />
                    </View>
                    :
                    <FlatList
                        data={fav}
                        renderItem={renderItem}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                        ListEmptyComponent={
                            <View className="w-[100vw] h-[80vh] flex justify-center items-center" style={{ justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontFamily: 'KeepCalm'}} className>Aucun Favoris</Text>
                            </View>
                        }
                        keyExtractor={(item, index) => item.id}
                        showsHorizontalScrollIndicator={false}
                        nestedScrollEnabled
                    />
                :
                    <RequestAuth/>

            }
        </SafeAreaView>
    )
}