import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList, RefreshControl} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NotificationComponent from '../../components/Visitor/NotificationComponent';
import { DisplayLoading } from '../../components/DisplayLoading';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiURL } from '../../api/api';

export default function NotificationAdmin(){
    const {width} = useWindowDimensions()
    const navigation = useNavigation();

    const token = useSelector((state) => state.userReducer.token)
    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated)

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [prevPage, setPrevPage] = useState(null)
    const [nextPage, setNextPage] = useState(null)
    const [refreshing, setRefreshing] = useState(false);

    const getNotification = async () => {
        setLoading(true)
        await fetch(apiURL + 'history', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(res => {
            // console.log('Les notifications=========================1', res)
            if(res.status === 200){
                // console.log('Les propriétes=========================2', res.data.data[5].images[0].path.substr(res.data.data[5].images[0].path.lastIndexOf('/') + 1))
                // setPrevPage(res.data.prev_page_url)
                // setNextPage(res.data.next_page_url)
                setData(res.data)
                setLoading(false)
            }else{
                setLoading(false)
            }
        })
    }

    const getAllNotification = async () => {
        await fetch(nextPage, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(res => {
            if(res.status === 200){
                // setPrevPage(res.data.prev_page_url)
                // setNextPage(res.data.next_page_url)
                setData([...data, res.data])
                setLoading(false)
            }else{
                setLoading(false)
            }

        })
    }

    useEffect(() =>{
        getNotification();
    },[])

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

    return(
        <SafeAreaView className="flex-1 bg-slate-100 px-4">
            <View className="flex flex-row justify-center items-center mt-12 px-3">
                {/* <View className="flex-row justify-center items-center">
                    <TouchableOpacity onPress={() =>{navigation.goBack()}} className="h-full w-full items-center justify-center" style={{ height: 40, width: 40,}}>
                        <MaterialIcons name="keyboard-arrow-left" size={20} color="#000"/>
                    </TouchableOpacity>
                    
                </View> */}
                <Text style={{fontFamily: 'KeepCalm'}} className="text-[18px] ">Notifications</Text>
                
            </View>

            {
                loading?
                <DisplayLoading/>
                :
                <FlatList
                    data={data}
                    refreshControl={<RefreshControl  refreshing={refreshing} onRefresh={onRefresh}/>}
                    renderItem={NotificationComponent}
                    keyExtractor={(item, index) => item.id}
                    showsVerticalScrollIndicator={false}
                    // contentContainerStyle={{paddingVertical: 10, paddingBottom: 80, justifyContent: 'center'}}
                    onEndReachedThreshold = {0.5}
                    onEndReached={() => {
                        if(nextPage !== null){
                            getAllNotification()
                        }
                    }}
                    ListEmptyComponent={()=> {
                        return (
                            <View className="flex-1 h-[85vh] justify-center items-center">
                                <Feather name="file-text" size={150} color={"#6C5248"} />
                                <Text style={{fontFamily: 'KeepCalm'}}>Aucune notification trouvée</Text>
                            </View>
                        )
                    }}
                />
            }
            
        </SafeAreaView>
    )
}