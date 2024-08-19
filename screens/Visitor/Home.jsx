import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, TouchableOpacity, Pressable, SafeAreaView, FlatList, ActivityIndicator} from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { CATEGORY } from '../../utils/data/categoriedata';
import CategoryComponent from '../../components/Visitor/CategoryComponent';
import PropertyHomeComponent from '../../components/Visitor/PropertyHomeComponent';
import React, {useState, useEffect} from 'react'
import { apiURL } from '../../api/api';
import { DATAMAP } from '../../store/reducers/actionName';

const Home = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {width} = useWindowDimensions()

    const location = useSelector((state) => state.appReducer.location)
    const user = useSelector((state) => state.userReducer.user)
    const myuser = useSelector((state) => state.userReducer)

    const [categorie, setCategorie] = useState([]);
    const [firstCatItem, setFirstCatItem] = useState([]);
    const [secondCatItem, setSecondCatItem] = useState([]);
    const [alaUne, setAlaUne] = useState([]);
    const [adress, setAdress] = useState("");
    const [loadCategorie, setLoadCategorie] = useState(true);
    const [loadAlaUne, setLoadAlaUne] = useState(true);

    const getCategorie = async () => {
        await fetch(apiURL + 'list/category/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: 'Bearer ' + user.token
            }
        })
        .then(response => response.json())
        .then(res => {
        //   console.log('  ',res.data[0])
          setCategorie(res.data)
          setLoadCategorie(false)
        })
        .catch( (e) => {
            console.log(e);
        })
    }

    const getAlaUne = async () => {
        await fetch(apiURL + 'list/last/properties', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: 'Bearer ' + user.token
            }
        })
        .then(response => response.json())
        .then(res => {
            // console.log('  ',res.data[0])
            setAlaUne(res.data)
            dispatch({type: DATAMAP, payload: res.data});
            setLoadAlaUne(false)
        })
        .catch( (e) => {
            console.log(e);
            setLoadAlaUne(false)
        })
    }

    const getFirstCat = async () => {
        await fetch(apiURL + 'list/category/property/' + categorie[0].id, {
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
            setFirstCatItem(res.data)
            // setLoadAlaUne(false)
            getSecondCat()
        })
        .catch( (e) => {
            console.log(e);
            // setLoadAlaUne(false)
        })
    }

    const getSecondCat = async () => {
        await fetch(apiURL + 'list/category/property/' + categorie[1].id, {
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
            setSecondCatItem(res.data)
            // setLoadAlaUne(false)
        })
        .catch( (e) => {
            console.log(e);
            // setLoadAlaUne(false)
        })
    }

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
            
        })
        .catch( (e) => {
            console.log(e);
            // setLoadAlaUne(false)
        })
    }

    useEffect(() => {
        getCategorie();
        getAlaUne();
        // console.log('sss');
    }, [])

    useEffect(() => {
        if(categorie.length > 0){
            getFirstCat()
        }
    }, [categorie])

    useEffect(() =>{
        fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat='+Number(location.latitude)+'&lon='+Number(location.longitude)+'&addressdetails=1')
        .then(response => response.json())
        .then(res => {
            if(res.display_name){
                setAdress(res.display_name)
            }
        })
        .catch(e => {
            console.log('open street map', e)
        })
    },[])

    const rendercategory = ({ item }) => (
        <TouchableOpacity key={item.id} onPress={() => {navigation.navigate('PropertyListCat', {item: item})}}>
            <CategoryComponent item={item} name={item.label} id={item.id} />
        </TouchableOpacity>
    );

    const renderproperty = ({ item }) => (
        <TouchableOpacity key={item.id} onPress={() => {navigation.navigate('Details', {item: item})}}>
            <PropertyHomeComponent item={item} setFavorite={setFavorite} name={item.nom} id={item.id_} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-slate-100">
            {/* En tête */}
            <View className="flex flex-row justify-between items-center px-3 mb-3 mt-10" style={{width: width}}>
                <View className="">
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-primary text-lg">Bénin</Text>
                    {
                        adress === ""?
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold">--</Text>
                        :
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold">{adress}</Text>
                    }
                    
                </View>
                <View className="flex flex-row gap-x-1">
                    <TouchableOpacity onPress={() =>{navigation.navigate('Search')}} className="h-full w-full bg-secondary rounded-xl items-center justify-center" style={{ height: 40, width: 40,}}>
                        <Feather name="search" size={22} color="#fff"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>{navigation.navigate('Notification')}} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center" style={{ height: 40, width: 40,}}>
                        <Feather name="bell" size={22} color="#000"/>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100, paddingTop: 10}} style={{width: width}}>
                <View className=" px-1 w-screen">
                    
                    {/* PUB */}
                    <View className='p-4 mx-1 rounded-xl bg-black flex flex-col mb-2'>
                        <View className="flex flex-row gap-x-1 items-center">
                            <Text className="text-white font-bold text-base" style={{fontFamily: 'KeepCalm'}}>Démenagement - Ménage</Text>
                            <MaterialIcons name="cleaning-services" size={15} color="#fff" />
                        </View>
                        <View className="">
                            
                            <Pressable onPress={() =>{}} className="rounded-full w-auto">
                                <Text className="text-white my-1 font-thin text-sm" style={{fontFamily: 'PoppinsRegular'}}>
                                    Besoin d'un ménage impeccable ou d'un déménagement sans stress ? Contactez nos experts dès maintenant !
                                </Text>
                                <Text className="text-primary font-bold">Tout voir</Text>
                            </Pressable>
                        </View>
                        
                    </View>

                    {/* Category List */}
                    {
                        loadCategorie ?
                        <View className="py-3">
                            <ActivityIndicator size={40} color="#6C5248" />
                        </View>
                        :
                        <View className='flex flex-col my-2'>
                            <FlatList
                                data={categorie}
                                renderItem={rendercategory}
                                horizontal={true}
                                
                                keyExtractor={(item, index) => item.id}
                                showsHorizontalScrollIndicator={false}
                                nestedScrollEnabled
                            />
                        </View>
                    }
                    

                    {/* A la Une */}
                    <View className="flex flex-row justify-between items-center my-2 mx-2">
                        <View className="">
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-black text-lg">A la une</Text>
                        </View>
                        <View className="flex flex-row gap-x-1">
                            <TouchableOpacity onPress={() =>{}} className=" p-1 px-0 rounded-full flex flex-row items-center justify-center">
                                <Text className="text-secondary font-bold">Tout voir</Text>
                                <Feather name="chevron-right" size={15} color="#555"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className='flex flex-col'>
                        {
                            loadAlaUne?
                            <View className="py-3">
                                <ActivityIndicator size={40} color="#6C5248" />
                            </View>
                            :
                            <FlatList
                                data={alaUne}
                                renderItem={renderproperty}
                                horizontal={true}
                                keyExtractor={(item, index) => item.id}
                                showsHorizontalScrollIndicator={false}
                                nestedScrollEnabled
                            />
                        }
                        
                    </View>

                    <View className="w-full border-b border-b-slate-200 my-4"></View>
                    
                    {/* Category 1 */}
                    {
                        categorie.length > 0?
                        <View>
                            <View className="flex flex-row justify-between items-center my-2 mx-2">
                                <View className="">
                                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-black text-lg">{categorie[0].label}</Text>
                                </View>
                                <View className="flex flex-row gap-x-1">
                                    {/* <TouchableOpacity onPress={() =>{}} className=" p-1 px-0 rounded-full flex flex-row items-center justify-center">
                                        <Text className="text-secondary font-bold">Tout voir</Text>
                                        <Feather name="chevron-right" size={15} color="#555"/>

                                    </TouchableOpacity> */}
                                </View>
                            </View>
                            <View className='flex flex-col'>
                                <FlatList
                                    data={firstCatItem}
                                    renderItem={renderproperty}
                                    horizontal={true}
                                    keyExtractor={(item, index) => item.id}
                                    showsHorizontalScrollIndicator={false}
                                    nestedScrollEnabled
                                />
                            </View>

                            <View className="w-full border-b border-b-slate-200 my-4"></View>
                        </View>
                        :
                        null
                    }

                    {/* Category 2 */}
                    {
                        categorie.length > 0?
                        <View>
                            <View className="flex flex-row justify-between items-center my-2 mx-2">
                                <View className="">
                                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-black text-lg">{categorie[1].label}</Text>
                                </View>
                                <View className="flex flex-row gap-x-1">
                                    <TouchableOpacity onPress={() =>{}} className=" p-1 px-0 rounded-full flex flex-row items-center justify-center">
                                        <Text className="text-secondary font-bold">Tout voir</Text>
                                        <Feather name="chevron-right" size={15} color="#555"/>

                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View className='flex flex-col'>
                                <FlatList
                                    data={secondCatItem}
                                    renderItem={renderproperty}
                                    horizontal={true}
                                    keyExtractor={(item, index) => item.id}
                                    showsHorizontalScrollIndicator={false}
                                    nestedScrollEnabled
                                />
                            </View>
                        </View>
                        :
                        null
                    }
                    
                
                </View>
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default Home