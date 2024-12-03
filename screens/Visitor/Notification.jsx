import { useEffect, useState } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, ActivityIndicator, RefreshControl, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import NotificationComponent from '../../components/Visitor/NotificationComponent';
import { NOTIFICATION } from '../../store/reducers/actionName';
import { useSelector } from 'react-redux';
import RequestAuth from '../Auth/RequestAuth';
import { apiURL } from '../../api/api';
import { DisplayLoading } from '../../components/DisplayLoading';

export default function Notification(){
    const dispatch = useDispatch();
    const {width} = useWindowDimensions()

    const navigation = useNavigation();

    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated)
    const user = useSelector((state) => state.userReducer.user)
    const myuser = useSelector((state) => state.userReducer)
    const notifications = useSelector((state) => state.userReducer.notifications)

    const [loading, setLoading] = useState(false)
    const [data, setDate] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    const getNotification = async () => {
        setLoading(true)
        await fetch(apiURL + 'history', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + myuser.token
            }
        })
        .then(response => response.json())
        .then(res => {
            console.log('liste notification', res.data)
            dispatch({type: NOTIFICATION, payload: res.data});
            setLoading(false)
        })
        .catch( (e) => {
            console.log(e);
            setLoading(false)
        })
    }

    useEffect(() => {
        getNotification()
    }, [isAuthenticated])

    const onRefresh = () => {
        try{
            if(isAuthenticated){
                getNotification();
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

    const renderItem = ({item}) => {
        console.log(item)
        return(
            <TouchableOpacity onPress={() => {}} >
                <NotificationComponent item={item} />
            </TouchableOpacity>
        )
    }

    return(
        <SafeAreaView className="flex-1 bg-slate-100 px-3">
            <View className="flex flex-row justify-between items-center mt-8">
                <View className="flex-row justify-center items-center">
                    <TouchableOpacity onPress={() =>{navigation.goBack()}} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center mr-3" style={{ height: 40, width: 40,}}>
                        <MaterialIcons name="keyboard-arrow-left" size={20} color="#000"/>
                    </TouchableOpacity>
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Notifications</Text>
                </View>

                <View className="flex flex-row gap-x-1">
                    {/* <TouchableOpacity onPress={() =>{}} className="h-full w-full rounded-xl items-center justify-center" style={{ height: 40, width: 40,}}>
                        <Entypo name="dots-three-vertical" size={22} color="#000"/>
                    </TouchableOpacity> */}
                </View>
            </View>

            {
                isAuthenticated ?

                    loading ?
                    <DisplayLoading/>
                    :
                    <FlatList
                        data={notifications}
                        renderItem={renderItem}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                        ListEmptyComponent={
                            <View className="w-[100vw] h-[80vh] flex justify-center items-center" style={{ justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontFamily: 'KeepCalm'}} className>Aucune notification</Text>
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