import { useEffect, useState } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList, ActivityIndicator, RefreshControl} from 'react-native'
import { Feather, MaterialIcons, Entypo, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, {FadeIn} from 'react-native-reanimated';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import RequestAuth from '../Auth/RequestAuth';
import { apiURL } from '../../api/api';
import { DisplayLoading } from '../../components/DisplayLoading';

export default function Transaction(){

    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated)
    const user = useSelector((state) => state.userReducer.user)
    const myuser = useSelector((state) => state.userReducer)

    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);


    const getVisite = async () => {
        setLoading(true)
        await fetch(apiURL + 'visit/list', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + myuser.token
            }
        })
        .then(response => response.json())
        .then(res => {
            // console.log(res)
            if(res.status === 200){
                // console.log(res)
                setData(res.data.data)
                setLoading(false)
            }else{
                setLoading(false)
            }
        })
        .catch( (e) => {
            console.log(e);
            setLoading(false)
        })
    }

    const setSignal = async (id) => {
        setLoading(true)
        await fetch(apiURL + 'visit/'+id+'/signal', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + myuser.token
            },
            body: JSON.stringify({
                describ: "Je n'ai pas pu faire ma visite"
            })
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            if(res.status === 200){
                // console.log(res)
                getVisite()
                setLoading(false)
            }else{
                setLoading(false)
            }
        })
        .catch( (e) => {
            console.log(e);
            setLoading(false)
        })
    }

    const hasVisite = async (id) => {
        setLoading(true)
        await fetch(apiURL + 'visit/'+id+'/confirm_client', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + myuser.token
            }
        })
        .then(response => response.json())
        .then(res => {
            if(res.status === 200){
                console.log(res)
                getVisite()
                setLoading(false)
            }else{
                setLoading(false)
            }
        })
        .catch( (e) => {
            console.log(e);
            setLoading(false)
        })
    }
    
    const onRefresh = () => {
        try{
            getVisite();
        }catch(error){
            setRefreshing(false);
        }finally{
            setRefreshing(false);
        }
    }

    useEffect(()=>{
        getVisite()
    },[])

    const renderItem = ({item}) => {
        return (
            <View className="bg-white rounded-xl mt-5">
                {/* {console.log(item)} */}
                <View className="flex-row justify-between my-2">
                    <View style={{flex: 0.2}} className=" w-full justify-center items-center">
                        <MaterialCommunityIcons name="chart-line-variant" size={24} color="red" />
                    </View>

                    <View style={{flex: 0.5}} className="  w-full justify-center">
                        <Text style={{fontFamily: 'PoppinsRegular', color: "#000"}} className="text-[16px]">Visite - Transaction</Text>
                        <View className="flex-row items-center gap-x-2">
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[16px] text-gray-400">{item.date_visite}</Text>
                            <TouchableOpacity className={`w-3 h-3 rounded-full mb-1 ${item.visited?'bg-green-600':item.confirm_client||item.confirm_owner ? 'bg-orange-400':'bg-red-600'}`}></TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flex: 0.3}} className="w-full justify-center items-end p-2 pt-0 self-start">
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[16px] py-1 text-secondary font-bold">{item.amount} fcfa</Text>
                    </View>
                </View>
                    
                {
                    item.visited || item.confirm_client || item.is_refund || item.describ==="Je n'ai pas pu faire ma visite" ?
                    null
                    :
                    <View className="mt-3 border-t border-t-slate-200 px-2 py-3 flex flex-row gap-x-2">
                    <TouchableOpacity onPress={()=>setSignal(item.id)} className="flex-1 rounded-lg py-3 bg-red-500 flex flex-row justify-center">
                        <Text className="text-white">Signaler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>hasVisite(item.id)} className="flex-1 rounded-lg py-3 bg-green-600 flex flex-row justify-center">
                        <Text className="text-white">J'ai visité</Text>
                    </TouchableOpacity>
                </View>
                }

            </View>
        )
    }

    return(
        <SafeAreaView className="flex-1 bg-slate-100">

            {
                isAuthenticated ?
                    <>
                        <Header novisible={true} title={"Historiques visites"} getVisite={getVisite} refresh={true} right="1"/>

                        {
                            loading?
                            <DisplayLoading />
                            :
                            <View className="flex-1 px-1 w-screen">
                                <FlatList
                                    data={data}
                                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                                    // ListHeaderComponent={HeaderListComponent}
                                    horizontal={false}
                                    renderItem={renderItem}
                                    keyExtractor={(item, index) => item.id}
                                    ListEmptyComponent={
                                        <View className="w-[100vw] h-[80vh] flex justify-center items-center" style={{ justifyContent: 'center', alignItems: 'center'}}>
                                            <FontAwesome6 name="house-crack" size={100} color="#6C5248" />
                                            <Text style={{fontFamily: 'KeepCalm'}} className="mt-5">Aucune visite trouvée</Text>
                                        </View>
                                    }
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{paddingBottom: 100, justifyContent: 'center'}}
                                />
                            </View>
                        }
                    </>
                :

                    <RequestAuth/>

            }

            
        </SafeAreaView>
    )
}