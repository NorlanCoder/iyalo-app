import { View, Text, TouchableOpacity, useWindowDimensions, Image, Pressable, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { Octicons , Entypo, MaterialCommunityIcons, Ionicons, Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react'
import { Menu, MenuProvider, MenuOptions, MenuTrigger, } from "react-native-popup-menu";
import { getPreciseDistance } from 'geolib';
import { useSelector } from 'react-redux';
import { baseURL } from '../../api/api';
import { Edit, Delete, Activate, ListVisite, Add } from '../CustomContent';
import { ModalPopup } from '../Admin/ModalPopup';
import { apiURL } from '../../api/api';
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from 'moment'
import 'moment/locale/fr'

moment.locale('fr')

const Divider = () => <View style={styles.divider} />;

const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const PropertyResultComponent = ({item, setFavorite, changeState}) => {
    const navigation = useNavigation();

    const token = useSelector((state) => state.userReducer.token)
    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated)

    const {width} = useWindowDimensions()

    const location = useSelector((state) => state.appReducer.location)

    let val = false

    if(item.status == 1){
        val = true
    }else{
        val = false
    }

    const [visible, setVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateDebut, setDateDebut] = useState(new Date())  
    const [loading, setLoading] = useState(false);
    const [itemId, setItemId] = useState(0);
    const [jours, setJours] = useState([]);

    const onChange = (event, selectedDate) => {
        // console.log(moment(selectedDate).format("Do MMM YYYY"), moment(selectedDate).format("LT"))
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'ios' ? 'spinner' : 'default');
        setShow(false);
        setDate(currentDate);
        setDateDebut(currentDate)
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
        setShow(true)
    };
    const showTimepicker = () => {
        showMode('time');
        setShow(true)
    };

    const close = () => {
        setVisible(!visible)
    }

    const addDay = (jour) => {
        setJours(prevJour => 
            prevJour.includes(jour)
            ? prevJour.filter(d => d !== jour)
            : [...prevJour, jour]
        );
    };

    const addVisite = (id) => {
        setLoading(true)
        fetch(apiURL+'announcer/property/'+itemId+'/add_calendar', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                day: `${moment(date).format("Do MMM YYYY")}`,
                hour: `${moment(date).format("LT")}`,
            })
        })
        .then(response => response.json())
        .then(res => {
            // console.log(token)
            console.log('>>>>>>>>>>>>>>>>>>>', res)
            if(res.status === 200){
                setLoading(false);
                close()
                console.log('>>>>>>>>>1>>>>>>>>>>', res.message)
                // showMessage({
                //     message: "Succès",
                //     description: res.message,
                //     type: "success",
                // });
            }else{
                setLoading(false);
                close()
                console.log('>>>>>>>>>2>>>>>>>>>>', res)
                // showMessage({
                //     message: "Erreur",
                //     description: res.message,
                //     type: "danger",
                // });
            }

            if(res.message === "Unauthenticated."){
                // dispatch({ type: DECONNEXION, value: true});
                // dispatch({ type: DECONNEXIONDATA, value: true});
                // dispatch({type: SWITCHAUTHSCREEN, value: "Login"})
            }
        })
        .catch(e => {
            console.log(e)
            setLoading(false);
            close()
            // console.log('>>>>>>>>>3>>>>>>>>>>', res.messag)
            // showMessage({
            //     message: "Erreur",
            //     description: "Erreur de connexion",
            //     type: "danger",
            // });
        })
    }

    return (
        <View className="bg-white mb-2 p-2 rounded-xl shadow-sm" style={{width: width - 20 }}>

            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row justify-start gap-x-2 items-center ">
                    <Image source={require('../../assets/png-clipart.png')} style={{width: 30, height: 30}}  className="rounded-full" />
                    <Text style={{fontFamily: 'KeepCalm'}}>{item.user.name}</Text>
                </View>
                <Menu>
                    <MenuTrigger
                        customStyles={{
                            triggerWrapper: {
                                height: 33, width: 33, backgroundColor: "#00ddb3", padding: 1, justifyContent: "center", alignItems: "center", alignContent: "center", borderRadius: 10
                            },
                        }}
                    >
                        <Entypo name="dots-three-vertical" size={18} color="black" />
                    </MenuTrigger>
                    
                    <MenuOptions
                        customStyles={{
                            optionsContainer: {
                                borderRadius: 10,
                            },
                        }}
                    >
                        {/* <Divider />
                            <Explore text="Consulter la propriété" onPress={()=> navigation.push('DetailsProprietes',{data: item})} iconName="block" /> */}
                        <Activate text="Activé/Désactivé" onPress={()=> {changeState(item.id)}} iconName="switch" val={val} />
                        <Divider />
                        <Add text="Disponibilité" onPress={()=> {setVisible(true), setItemId(item.id)}} iconName="plus"/>
                        <Divider />
                        <ListVisite text="Liste des visites" onPress={()=> {navigation.push('VisiteByProperty',{item: item})}} iconName="list" />
                        <Divider />
                        <Edit text="Modifier" 
                            onPress={() => {navigation.navigate('UpdatePropertie', {item: item} )}}
                            iconName="edit" />
                        <Divider />
                        <Delete text="Supprimer" onPress={()=> {}} iconName="delete" />
                    </MenuOptions>
                </Menu>
                {/* <TouchableOpacity className="bg-primary p-2 rounded-xl">
                    <Entypo name="dots-three-vertical" size={18} color="black" />
                </TouchableOpacity> */}
            </View>

            <View className="mt-1 relative">
                <Image source={{uri: baseURL + item.cover_url}} style={{width: '100%', height: width / 2.3}}  className="rounded-xl" />
                <View className="absolute top-0 w-full flex flex-row justify-between items-center p-2">
                    <TouchableOpacity onPress={()=> {navigation.push('RatingByProperty',{item: item})}} className="bg-black/40 p-[8px] py-0 rounded-full flex flex-row items-center">
                        <Octicons name="star-fill" size={15} color="yellow" />
                        <Text className="pl-1 text-white font-bold text-lg" style={{fontFamily: 'PoppinsRegular'}}>{item.note.length}</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() =>{setFavorite(item.id)}} className="bg-black/40 p-[6px] rounded-full">
                        <Octicons name="heart" size={18} color="white" />
                    </TouchableOpacity> */}
                </View>
            </View>

            <View>
                <View className="flex flex-row justify-between items-start p-1">
                    <View>
                        <Text style={{fontFamily: 'KeepCalm'}} className="">{item.label}</Text>
                        <View className="flex flex-row items-center gap-x-1">
                            <Octicons name="location" size={16} color="black" />
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="">{item.city} - {item.district}</Text>
                        </View>
                    </View>
                    <View>
                        <Text className="text-primary text-[18px] font-bold" style={{fontFamily: 'KeepCalm'}}>{item.price} {item.device}</Text>
                    </View>
                </View>

                <View className="w-full border-b border-b-slate-200 my-1"></View>

                <View className="flex-row justify-between items-center">
                    <View className="flex flex-row p-1">
    
                        <Pressable className="flex flex-row items-center mr-3">
                            <MaterialCommunityIcons name="bed" size={17} color="black" />
                            <Text className="pl-1 text-base text-primary font-bold" style={{fontFamily: 'KeepCalm'}}>{item.room}</Text>
                        </Pressable>

                        <Pressable className="flex flex-row items-center mr-3">
                            <MaterialCommunityIcons name="bathtub-outline" size={17} color="black" />
                            <Text className="pl-1 text-base text-primary font-bold" style={{fontFamily: 'KeepCalm'}}>{item.bathroom}</Text>
                        </Pressable>

                        <Pressable className="flex flex-row items-center mr-3">
                            <MaterialCommunityIcons name="pool" size={17} color="black" />
                            <Text className="pl-1 text-base text-primary font-bold" style={{fontFamily: 'KeepCalm'}}>{item.swingpool}</Text>
                        </Pressable>
                    </View>

                    <View className="flex flex-row items-center mr-3">
                        <MaterialCommunityIcons name="map-marker-distance" size={17} color="black" />
                        <Text className="pl-1 text-base text-primary font-bold" style={{fontFamily: 'KeepCalm'}}>
                            {
                                (location.latitude != null && location.longitude != null && item.lat != 0 && item.long != 0) ?
                                (getPreciseDistance(
                                { latitude: Number(item.lat), longitude: Number(item.long) },
                                { latitude: Number(location.latitude), longitude: Number(location.longitude) }
                                ) / 1000).toFixed(2)+' Km'
                                :
                                "..." 
                            }
                        </Text>
                    </View> 
                </View> 
            </View>
            
            <ModalPopup visible={visible}>
                <View className="">
                    <View className="h-12 w-full m-1 p-2 flex-row items-center justify-between">
                        <Text className="font-['PoppinsRegular'] text-[16px] my-1">Disponibilité</Text>

                        <TouchableOpacity onPress={() =>{close()}}>
                            <View className="h-9 w-9 bg-slate-300 rounded-full items-center justify-center">
                                <Ionicons name="close" size={20} color="#000"/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    <Text className="font-['KeepCalm'] text-[16px] my-1">Jour(s)</Text>
                    <View className="flex flex-row flex-wrap">
                        {daysOfWeek.map(jour => (
                            <TouchableOpacity 
                                key={jour} 
                                onPress={() => addDay(jour)} 
                                className={`${jours.includes(jour)? "flex bg-primary/80 m-1 justify-center items-center p-2 rounded-md" : "flex bg-slate-200 m-1 justify-center items-center p-2 rounded-md"}`}
                            >
                            <Text className={`${jours.includes(jour)? "font-['KeepCalm'] text-[16px] my-1 text-white": "font-['KeepCalm'] text-[16px] my-1 text-black"}`} >{jour}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View className="flex flex-row justify-between">
                        <View style={{flex: 1, padding: 5}}>
                            <Text className="font-['KeepCalm'] text-[16px] my-1">Date de début</Text>
                            <TouchableOpacity onPress={showDatepicker} className="flex flex-row items-center px-2 border border-gray-500 rounded-lg h-11">
                                <TouchableOpacity
                                    onPress={showDatepicker}
                                    className="flex flex-row justify-between items-center"
                                >
                                    <Fontisto name="date" size={25} color="#00ddb3"/>
                                    <Text adjustsFontSizeToFit numberOfLines={1} className="font-['KeepCalm'] text-[16px] mx-2">{moment(date).format('Do MMM YYYY')}</Text>
                                </TouchableOpacity>
                                {show && (
                                    <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display={Platform.OS === 'ios' ? 'default' : 'default'}
                                    onChange={onChange}
                                    // style={Platform.OS === 'ios' ? {justifyContent: 'center', alignItems: 'flex-start', width: 320, height: 260, display: 'flex', marginLeft: -370, marginTop: 70} : null}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>

                        <View style={{flex: 1, padding: 5}}>
                            <Text className="font-['KeepCalm'] text-[16px] my-1">Heure</Text>
                            <TouchableOpacity onPress={showTimepicker} className="flex flex-row items-center px-2 border border-gray-500 rounded-lg h-11">
                                <TouchableOpacity
                                    onPress={showTimepicker}
                                    className="flex flex-row justify-between items-center"
                                >
                                    <Entypo name="clock" size={25} color="#00ddb3"/>
                                    <Text adjustsFontSizeToFit numberOfLines={1} className="font-['KeepCalm'] text-[16px] mx-2">{moment(date).format('HH:mm')}</Text>
                                </TouchableOpacity>
                                {show && (
                                    <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display={Platform.OS === 'ios' ? 'default' : 'default'}
                                    onChange={onChange}
                                    // style={Platform.OS === 'ios' ? {justifyContent: 'center', alignItems: 'flex-start', width: 320, height: 260, display: 'flex', marginLeft: -370, marginTop: 70} : null}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                        
                    </View>

                    <TouchableOpacity onPress={() => {addVisite(itemId)}} className="h-12 w-52 bg-primary m-4 self-center rounded-lg justify-center items-center">
                        {
                            loading? 
                            <ActivityIndicator size={20} color="#fff" />
                            :
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[#FFFFFF] text-[16px] ">Ajouter</Text>
                        }
                    </TouchableOpacity>
                </View>
            </ModalPopup>
        </View>
    )
}

export default PropertyResultComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginVertical: 100,
        marginHorizontal: 100,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#7F8487",
    },
});