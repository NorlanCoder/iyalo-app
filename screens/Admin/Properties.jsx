import { useState, useEffect } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Animated, {FadeIn} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { apiURL } from '../../api/api';
import PropertyResultComponent from '../../components/Visitor/PropertyResultComponent';
import { CATEGORY } from '../../utils/data/categoriedata';

export default function Properties(){
    const navigation = useNavigation()
    const dispatch = useDispatch();

    const token = useSelector((state) => state.userReducer.token)
    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated)

    const {width} = useWindowDimensions()

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [prevPage, setPrevPage] = useState(null)
    const [nextPage, setNextPage] = useState(null)
    const [refreshing, setRefreshing] = useState(false);

    const getProperties = async () => {
        setLoading(true)
        await fetch(apiURL + 'announcer/property', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(res => {
            console.log('Les propriétes=========================1', res)
            if(res.status === 200){
                // console.log('Les propriétes=========================2', res.data.data[5].images[0].path.substr(res.data.data[5].images[0].path.lastIndexOf('/') + 1))
                // setPrevPage(res.data.prev_page_url)
                // setNextPage(res.data.next_page_url)
                // setData(res.data.data)
                setLoading(false)
            }else{
                setLoading(false)
            }

            if(res.message === "Unauthenticated."){
                // dispatch({ type: DECONNEXION, value: true});
                // dispatch({ type: DECONNEXIONDATA, value: true});
                // dispatch({type: SWITCHAUTHSCREEN, value: "Login"})
            }
        })
    }

    useEffect(() =>{
        getProperties();
    },[])

    const onRefresh = () => {
        try{
        if(isAuthenticated){
            getProperties();
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

    const renderproperty = ({ item }) => (
        <TouchableOpacity className="flex flex-col items-center" key={item.id} onPress={() => {}}>
            {/* <PropertyResultComponent name={item.nom} id={item.id_} /> */}
        </TouchableOpacity>
    );

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <Header title={"Propriétés"} 
                right= {
                    <TouchableOpacity onPress={() =>{navigation.navigate('AddProperties')}} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center" style={{ height: 40, width: 40,}}>
                        <MaterialIcons name="add" size={20} color="#000"/>
                    </TouchableOpacity>
                }
            />

            <View className=" px-1 w-screen mt-2">
                <FlatList
                    data={data}
                    // ListHeaderComponent={HeaderListComponent}
                    horizontal={false}
                    renderItem={renderproperty}
                    keyExtractor={(item, index) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingVertical: 10, paddingBottom: 80, justifyContent: 'center'}}
                />

            </View>
        </SafeAreaView>
    )
}