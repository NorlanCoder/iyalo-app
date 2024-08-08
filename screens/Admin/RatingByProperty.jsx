import { useState, useEffect } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, RefreshControl, Image, TouchableOpacity, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { AirbnbRating } from '@rneui/themed';
import moment from "moment";
import 'moment/locale/fr'
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import { apiURL } from '../../api/api';

moment.locale('fr')

export default function RatingByProperty(props){
    console.log(props.route.params.item.id)

    const token = useSelector((state) => state.userReducer.token)
    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated)

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [prevPage, setPrevPage] = useState(null)
    const [nextPage, setNextPage] = useState(null)
    const [refreshing, setRefreshing] = useState(false);

    const getRating = async () => {
        setLoading(true)
        await fetch(apiURL + 'announcer/property/'+props.route.params.item.id+'/notes', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(res => {
            console.log('Les visites=========================1', res.data.data)
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

    const getAllNextRating = async () => {
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
        getRating();
    },[])

    const onRefresh = () => {
        try{
        if(isAuthenticated){
            getRating();
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

        return(
            <View className="flex mx-3 my-1 p-2 rounded-xl border border-gray-500/30">
                <View className="flex flex-row justify-between items-center">
                    <AirbnbRating isDisabled={true} size={15} defaultRating={item.note} showRating={false} />

                    <Text numberOfLines={1} className=" text-gray-500 italic mt-2 font-['KeepCalm'] ">{moment(item.created_at).fromNow()}</Text>
                </View>

                <Text numberOfLines={2} className="text-gray-500 mt-2 font-['KeepCalm']">{item.comment}</Text>
            </View>
        )
    }

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <Header title={"Notes"} />

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
                        getAllNextRating()
                    }
                }}
            />
        </SafeAreaView>
    )
}