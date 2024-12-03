import { useEffect, useState } from 'react';
import {  StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity, Platform, Pressable, SafeAreaView, FlatList, RefreshControl} from 'react-native'
import { Feather, MaterialIcons, Entypo, Ionicons, FontAwesome, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dialog } from 'react-native-paper';
import { apiURL } from '../../api/api';
import moment from 'moment'
import 'moment/locale/fr'
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { ModalPopup } from '../../components/Admin/ModalPopup';
import { DisplayLoading } from '../../components/DisplayLoading';
import { useSelector } from 'react-redux';

moment.locale('fr')

export default function Visites(){
    const navigation = useNavigation();
    const token = useSelector((state) => state.userReducer.token)


    const [nextPage, setNextPage] = useState(null)
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getVisites = async () => {
        setLoading(true)
        await fetch(apiURL + 'announcer/property/all_visits ', {
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
                // setPrevPage(res.data.prev_page_url)
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
        await fetch(apiURL + 'announcer/property/'+id+'/confirm_owner', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(res => {
            // console.log('Visite marquée=========================1', res)
            if(res.status === 200){
                setLoading(false);
                getVisites();
            }else{
                setLoading(false)
            }
        })
    }

    const renderItem = ({item, index}) => {

        return(
            <View className={`bg-white mx-3 my-2 rounded-xl p-3 shadow-lg shadow-gray-500`}>
                <View className="flex gap-2">

                    <View className="flex flex-row justify-between items-center">
                        <View className="flex-row items-center gap-x-1">
                            <Feather name='file-text' size={22} />
                            <Text style={{fontFamily: 'KeepCalm'}}>#VIS-{item.id}-{index+1}</Text>
                        </View>

                        <TouchableOpacity onPress={() => {markVisite(item.id)}} className={`rounded-xl ${item.visited? "bg-green-500/10" : (item.confirm_client || item.confirm_owner) ? "bg-yellow-500/10" :"bg-red-500/10"} justify-center items-center h-9 w-9`}>
                            <MaterialCommunityIcons name="checkbox-marked-outline" size={18} color={item.visited? "green" : (item.confirm_client || item.confirm_owner) ? 'orange' : "red"}/>
                        </TouchableOpacity>
                    </View>

                    <View className="flex flex-row justify-between items-center">
                        <Text style={{fontFamily: 'KeepCalm'}}>Type: {item.type}</Text>
                    </View>
                    

                    <Text style={{fontFamily: 'KeepCalm'}} className="text-secondary">Date visite: <Text style={{fontFamily: 'Poppins'}} className="text-black">{moment(item.date_visite).format('LL')}</Text></Text>
                    <Text style={{fontFamily: 'KeepCalm'}} className="text-secondary">Statut: <Text style={{fontFamily: 'Poppins'}} className={`${item.visited? "text-green-500" : (item.confirm_client || item.confirm_owner) ? "text-yellow-500" :"text-red-500"} `}>{item.visited ? "Déjà visité" : ""} {item.confirm_client || item.confirm_owner ? '' : 'En attente'}</Text></Text>

                    {/* <View className="px-3 rounded-xl bg-red-400/50 justify-center items-center">
                        <Text style={{fontFamily: 'KeepCalm'}}>{item.visited? "Déjà visité" : "En attente de visite"}</Text>
                    </View> */}
                </View>
            </View>
        )
    }
   

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <Header title={"Liste visites"} 
                // right= {
                //     <TouchableOpacity onPress={() =>{setVisible(true)}} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center" style={{ height: 40, width: 40,}}>
                //         <MaterialIcons name="add" size={20} color="#000"/>
                //     </TouchableOpacity>
                // }
            />

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
                    ListEmptyComponent={()=> {
                        return (
                            <View className="flex-1 h-[85vh] justify-center items-center">
                                <Feather name="file-text" size={150} color={"#6C5248"} />
                                <Text style={{fontFamily: 'KeepCalm'}}>Aucune visite trouvée</Text>
                            </View>
                        )
                    }}
                />
            }
            
        </SafeAreaView>
    )
}
