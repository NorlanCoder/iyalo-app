import { useState, useEffect } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, RefreshControl, Image, TouchableOpacity, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment'
import 'moment/locale/fr'
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import { apiURL } from '../../api/api';
import { DisplayLoading } from '../../components/DisplayLoading';

moment.locale('fr')

export default function VisiteByProperty(props){
    console.log(props.route.params.item.id)

    const token = useSelector((state) => state.userReducer.token)
    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated)

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [prevPage, setPrevPage] = useState(null)
    const [nextPage, setNextPage] = useState(null)
    const [refreshing, setRefreshing] = useState(false);

    const getVisites = async () => {
        setLoading(true)
        await fetch(apiURL + 'announcer/property/'+props.route.params.item.id+'/visits', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(res => {
            console.log('Les visites=========================1', res)
            if(res.status === 200){
                // console.log('Les propriétes=========================2', res.data.data[5].images[0].path.substr(res.data.data[5].images[0].path.lastIndexOf('/') + 1))
                setPrevPage(res.data.prev_page_url)
                setNextPage(res.data.next_page_url)
                setData(res.data.data)
                setLoading(false)
            }else{
                setLoading(false)
            }
        })
    }

    const getAllNextVisite = async () => {
        // setShowContent(false)
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
                setPrevPage(res.data.prev_page_url)
                setNextPage(res.data.next_page_url)
                setData([...data, res.data.data])
                setLoading(false)
            }else{
                setLoading(false)
            }

            // if(res.message === "Unauthenticated."){
            //     dispatch({ type: DECONNEXION, value: true});
            //     dispatch({ type: DECONNEXIONDATA, value: true});
            //     // dispatch({type: SWITCHAUTHSCREEN, value: "Login"})
            // }
        })
    }

    useEffect(() =>{
        getVisites();
    },[])

    const onRefresh = () => {
        try{
        if(isAuthenticated){
            getVisites();
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

    const markVisite = async (id) => {
        setLoading(true)
        await fetch(apiURL + 'announcer/property/'+id+'/action_visit', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(res => {
            console.log('Visite marquée=========================1', res)
            if(res.status === 200){
                setLoading(false);
                getVisites();
            }else{
                setLoading(false)
            }
        })
    }

    const renderItem = ({item}) => {

        return(
            <View className={`bg-white mx-3 my-2 rounded-xl p-3 shadow-lg shadow-gray-500`}>
                <View className="flex gap-2">
                    <View className="flex flex-row justify-between items-center">
                        <Text style={{fontFamily: 'KeepCalm'}}>Type: {item.type}</Text>

                        <TouchableOpacity onPress={() => {markVisite(item.id)}} className={`rounded-xl ${item.visited? "bg-green-500/10" : "bg-red-500/10"} justify-center items-center h-9 w-9`}>
                            <MaterialCommunityIcons name="checkbox-marked-outline" size={20} color={item.visited? "green" : "red"}/>
                        </TouchableOpacity>
                    </View>
                    

                    <Text style={{fontFamily: 'KeepCalm'}}>Date visite: {moment(item.date_visite).format('LL')}</Text>
                    <Text style={{fontFamily: 'KeepCalm'}}>Statut: {item.visited? "Déjà visité" : "En attente de visite"}</Text>

                    {/* <View className="px-3 rounded-xl bg-red-400/50 justify-center items-center">
                        <Text style={{fontFamily: 'KeepCalm'}}>{item.visited? "Déjà visité" : "En attente de visite"}</Text>
                    </View> */}
                </View>
            </View>
        )
    }

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <Header title={"Liste des visites"} />

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
                    // contentContainerStyle={{paddingVertical: 10, paddingBottom: 80, justifyContent: 'center'}}
                    onEndReachedThreshold = {0.5}
                    onEndReached={() => {
                        if(nextPage !== null){
                            getAllNextVisite()
                        }
                    }}
                />
            }
        </SafeAreaView>
    )
}