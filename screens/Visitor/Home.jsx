import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, TouchableOpacity, Pressable, SafeAreaView, FlatList, ActivityIndicator} from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AirbnbRating } from '@rneui/themed';
import { Dialog } from 'react-native-paper';
import { CATEGORY } from '../../utils/data/categoriedata';
import CategoryComponent from '../../components/Visitor/CategoryComponent';
import PropertyHomeComponent from '../../components/Visitor/PropertyHomeComponent';
import React, {useState, useEffect} from 'react'
import { apiURL } from '../../api/api';
import { DATAMAP, FAVORIS } from '../../store/reducers/actionName';

const Home = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const [itemId, setItemId] = useState(0);

    const hideDialog = () => setVisible(false);

    const {width} = useWindowDimensions()

    const location = useSelector((state) => state.appReducer.location)
    const favorite = useSelector((state) => state.appReducer.favoris)
    const user = useSelector((state) => state.userReducer.user)
    const myuser = useSelector((state) => state.userReducer)
    const app = useSelector((state) => state.appReducer)

    const [categorie, setCategorie] = useState([]);
    const [firstCatItem, setFirstCatItem] = useState([]);
    const [secondCatItem, setSecondCatItem] = useState([]);
    const [alaUne, setAlaUne] = useState([]);
    const [adress, setAdress] = useState("");
    const [country, setCountry] = useState("");
    const [loadCategorie, setLoadCategorie] = useState(true);
    const [loadAlaUne, setLoadAlaUne] = useState(true);
    const [note, setNote] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

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

    const getFavorite = async () => {

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
            if(res.status===200) {
                var justId = []
                res.data.map(item => {justId.push(item.id)})
                dispatch({type: FAVORIS, payload: res.data})
            }
        })
        .catch( (e) => {
            console.log(e);
            console.log('errru')
        })
    }

    const setFavorite = async (id) => {
        // console.log(user)
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
            if(res.status === 200 || res.status === 201){
                getFavorite()
            }
            console.log(res)
        })
        .catch((e) => {
            console.log(e);
            // setLoadAlaUne(false)
        })
    }

    useEffect(() => {
        getCategorie();
        getAlaUne();
        // getFavorite();
        // console.log('sss');
    }, [])

    useEffect(() => {
        if(categorie.length > 0){
            getFirstCat()
        }
    }, [categorie])

    useEffect(() =>{
        if(myuser.isAuthenticated) {
            fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat='+Number(location.latitude)+'&lon='+Number(location.longitude)+'&addressdetails=1')
            .then(response => response.json())
            .then(res => {
                console.log(res)
                if(res.display_name){
                    setAdress((res.display_name).substring(0,30))
                    setCountry((res.address.country).substring(0,30))
                    // console.log(adress)
                }
            })
            .catch(e => {
                console.log('open street map', e)
            })
        }
    },[myuser])

    useEffect(()=>{
        if(user.id) {
            getFavorite()
        }
    },[user])

    const rendercategory = ({ item }) => (
        <TouchableOpacity key={item.id} onPress={() => {navigation.navigate('PropertyListCat', {item: item})}}>
            <CategoryComponent item={item} name={item.label} id={item.id} />
        </TouchableOpacity>
    );

    const renderproperty = ({ item }) => (
        <TouchableOpacity key={item.id} onPress={() => {navigation.navigate('Details', {item: item}, {setFavorite: setFavorite} )}}>
            <PropertyHomeComponent item={item} listfav={app.favoris} setFavorite={setFavorite} setVisible={setVisible} setItemId={setItemId} name={item.nom} id={item.id_} />
        </TouchableOpacity>
    );

    const addNote = async () => {
        if(note == ""){
            return
        }

        if(comment == ""){
            return
        }

        setLoading(true)

        await fetch(apiURL + `note/${itemId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + myuser.token
            },
            body: JSON.stringify({
                note: note,
                comment: comment
            })
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            if(res.status === 200){
                setVisible(false)
                setNote("")
                setComment("")
                setLoading(false)
                alert('Success', 'Votre note a bien été ajoutée')
                getAlaUne()
                getFirstCat()
            }
        })
        .catch( (e) => {
            console.log(e);
            setLoading(false)
        })
    }

    return (
        <SafeAreaView className="flex-1 bg-slate-100">
            {/* En tête */}
            <View className="flex flex-row justify-between items-center px-3 mb-3 mt-10" style={{width: width}}>
                <View className="">
                    {
                        country==='' ? 
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-secondary text-lg">-</Text>
                        :
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-secondary text-lg">{country}</Text>

                    }
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
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-black text-lg">Nouveau</Text>
                        </View>
                        {/* <View className="flex flex-row gap-x-1">
                            <TouchableOpacity onPress={() =>{}} className=" p-1 px-0 rounded-full flex flex-row items-center justify-center">
                                <Text className="text-secondary font-bold">Tout voir</Text>
                                <Feather name="chevron-right" size={15} color="#555"/>
                            </TouchableOpacity>
                        </View> */}
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
                                    <TouchableOpacity onPress={() => {navigation.navigate('PropertyListCat', {item: categorie[0]})}} className=" p-1 px-0 rounded-full flex flex-row items-center justify-center">
                                        <Text className="text-secondary font-bold">Tout voir</Text>
                                        <Feather name="chevron-right" size={15} color="#555"/>

                                    </TouchableOpacity>
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
                                    <TouchableOpacity onPress={() => {navigation.navigate('PropertyListCat', {item: categorie[1]})}} className=" p-1 px-0 rounded-full flex flex-row items-center justify-center">
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
            
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Ajouter une note</Dialog.Title>
                <Dialog.Content>
                    <View className="my-3">
                        <Text numberOfLines={1} className="text-[#000] font-['PoppinsRegular'] text-[14px] mb-1">Noter cette propiété</Text>

                        <AirbnbRating 
                            count={5}
                            size={35} 
                            defaultRating={note} 
                            showRating={false}
                            onFinishRating={value => setNote(value)}
                        />
                    </View>

                    <View className="my-3">
                        <Text numberOfLines={1} className="text-[#000] font-['MuktaMalar'] text-[14px] mb-1">Donnez un avis</Text>

                        <View className="border-[1px] h-12 border-[#bdbdbe48] rounded-lg justify-center">
                            <TextInput
                                placeholder={"laisser un commentaire"}
                                placeholderTextColor={'gray'}
                                autoCapitalize="sentences"
                                textContentType="name"
                                keyboardType='default'
                                value={comment}
                                onChangeText={(value) => setComment(value)}
                                className="bg-[#FDFDFD] h-full rounded-lg px-2 font-['PoppinsRegular']"
                            />
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => {addNote()}} className="bg-primary h-12 m-3 mx-0 rounded-lg justify-center items-center">
                        {
                            loading?
                            <ActivityIndicator size={"small"} color={"#000"}/>
                            :
                            <Text style={{fontFamily: 'PoppinsRegular'}} className=" text-[16px] ">Ajouter</Text>
                        }
                        {/* <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Valider</Text> */}
                    </TouchableOpacity>
                </Dialog.Content>
            </Dialog>
        </SafeAreaView>
    )
}

export default Home