import { View, Text, RefreshControl, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { DisplayLoading } from '../../components/DisplayLoading'
import Header from '../../components/Header'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { apiURL } from '../../api/api'
import { useSelector } from 'react-redux'

const DisponibiliteList = (props) => {

    const token = useSelector((state) => state.userReducer.token)

    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [data, setData] = useState([])

    const getCalendar = async () => {
        setLoading(true)
        await fetch(apiURL + 'properties/'+props.route.params.id+'/calendar', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(res => {
            // console.log('=======================1', res)
            if(res.message === "Success"){
                setData(res.data.data)
                setLoading(false)
            }else{
                setLoading(false)
            }
        })
    }

    const removeCalendar = async (id) => {
        setLoading(true)
        await fetch(apiURL + 'announcer/property/'+id+'/delete_calendar', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(res => {
            // console.log('=======================1', res)
            if(res.message === "Success"){
                getCalendar()
            }else{
                setLoading(false)
            }
        })
    }

    const onRefresh = () => {
        try{
            setRefreshing(true);
            getCalendar();
        }catch(error){
            setRefreshing(false);
        }finally{
            setRefreshing(false);
        }
    }

    useEffect(()=>{
        getCalendar()
    },[])

    const renderItem = ({item, index}) => {

        return(
            <View className={`bg-white mx-3 my-2 rounded-xl p-3 shadow-lg shadow-gray-500 flex-row justify-between`}>
                <View className="flex flex-row justify-between items-center w-full">
                    <View className="flex-row items-center gap-x-2">
                        <Feather name='calendar' size={22} />
                        <Text style={{fontFamily: 'KeepCalm'}}>{item.day}</Text>
                    </View>
                    <View className="flex-row gap-x-3">
                        <View className="flex-row items-center gap-x-2">
                            <Feather name='clock' size={22} />
                            <Text style={{fontFamily: 'KeepCalm'}} className="text-green-400">{item.hour.start}</Text>
                            <Text style={{fontFamily: 'KeepCalm'}}> - </Text>
                            <Text style={{fontFamily: 'KeepCalm'}} className="text-secondary">{item.hour.end}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>removeCalendar(item.id)} className="p-2 rounded-full bg-red-500/10">
                            <Feather name="trash" size={18} color={"red"}/>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        )
    }
    

    return (
        <SafeAreaView className="flex-1">
            <Header title={"Disponibilités"} />
            {
                loading?
                <DisplayLoading/>
                :
                <FlatList
                    data={data}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={()=> {
                        return (
                            <View className="flex-1 h-[85vh] justify-center items-center">
                                <Feather name="file-text" size={150} color={"#6C5248"} />
                                <Text style={{fontFamily: 'KeepCalm'}}>Aucune disponibilité trouvée</Text>
                            </View>
                        )
                    }}
                />
            }

        </SafeAreaView>
    )
}

export default DisponibiliteList