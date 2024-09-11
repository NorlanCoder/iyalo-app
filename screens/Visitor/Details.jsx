import React, { useState, useRef, useEffect } from 'react'
import {  StyleSheet, Text, View, Modal, Image, ScrollView, TouchableOpacity, Animated, ActivityIndicator, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo, Ionicons, FontAwesome, Fontisto, Octicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { Button, Dialog, Portal, PaperProvider, Provider, Modal as PaperModal } from 'react-native-paper';
import { baseURL, API_KEY_SECRETE, API_KEY_SECRETE_TEST, fedapayBASEURL, fedapayBASEURL_TEST, apiURL } from '../../api/api';
import { useSelector } from 'react-redux';
import { ModalPopup } from '../../components/Admin/ModalPopup';
import moment from 'moment'
import 'moment/locale/fr'
moment.locale('fr')

const generateTimeSlots = (start, end) => {
    const timeSlots = [];
    let current = parseInt(start.split(':')[0], 10); // Conversion de l'heure de début en entier
    const endHour = parseInt(end.split(':')[0], 10); // Conversion de l'heure de fin en entier
    
    // Créer des plages horaires par tranches de 1 heure
    while (current <= endHour) {
        const hour = current < 10 ? `0${current}:00` : `${current}:00`;
        timeSlots.push(hour);
        current++;
    }
    
    return timeSlots;
};

export default function Details(props){
    const navigation = useNavigation();

    const user = useSelector((state) => state.userReducer.user)
    const myuser = useSelector((state) => state.userReducer)

    console.log(props.route.params.item)

    const item = props.route.params.item

    const [urlPayment, setUrlPayment] = useState("");
    const [loading, setLoading] = useState(false);
    const [init, setInit] = useState({});
    const [showWebview, setShowWebview] = useState(false);
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState([])
    const [selectedDay, setSelectedDay] = useState();
    const [selectedHour, setSelectedHour] = useState();

    const hideModal = () => setShowWebview(false);const scaleValue = useRef(new Animated.Value(0)).current;

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        toggleModal();
    }, [visible]);

    const toggleModal = () => {
        if (visible) {
            setVisible(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setVisible(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    const getCalendar = async () => {
        console.log(item.id)
        await fetch(apiURL + "properties/"+item.id+"/calendar", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + myuser.token
            }
        })
        .then(response => response.json())
        .then(res => {
            console.log('  ',res.data.data)
            setData(res.data.data)
        })
        .catch( (e) => {
            console.log(e);
            // setLoadCategorie(false)
        })
    }

    useEffect(() => {
        getCalendar()
    }, [item])

    const close = () => {
        setModalVisible(!modalVisible)
    }

    const selectedDayData = data.find(item => item.day === selectedDay);

    const availableHours = selectedDayData
    ? generateTimeSlots(selectedDayData.hour.start, selectedDayData.hour.end)
    : [];

    const doTransaction = async () => {
        setLoading(true)
        await fetch(fedapayBASEURL_TEST+"transactions", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + API_KEY_SECRETE_TEST
            },
            body: JSON.stringify({
                description : "Transaction de " + user.name,
                amount : item.price || 100,
                currency : {
                    iso : "XOF"
                },
                callback_url : apiURL + "visit/callback",
                custom_metadata: {
                    user_id: user.id,
                    property_id: item.id,
                    day: selectedDay,
                    hour: selectedDay,
                },
                customer : {
                    firstname : user.name,
                    // lastname : user.prenom,
                    email : user.email,
                    transaction: {}
                },
            })
        })
        .then(response => response.json())
        .then(res => {
            console.log('FedaPay response >>>11>>>', res["v1/transaction"])
            // generateToken(res["v1/transaction"].id)
            setInit(res["v1/transaction"])
        })
        .catch(e => {
            console.log(e)
            setLoading(false);
            // showMessage({
            //     message: "Erreur",
            //     description: "Une erreur est survenue",
            //     type: "danger",
            // });
        })
    }

    const generateToken = async (id) => {
        await fetch(fedapayBASEURL_TEST+ "transactions/" + id + "/token" , {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + API_KEY_SECRETE_TEST
            },
            body: JSON.stringify({
                description : "Transaction de " + user.name,
                amount : item.price || 100,
                currency : {
                    iso : "XOF"
                },
                callback_url : apiURL + "visit/callback",
                custom_metadata: {
                    user_id: user.id,
                    property_id: item.id,
                    day: selectedDay,
                    hour: selectedDay,
                },
                customer : {
                    firstname : user.name,
                    // lastname : user.prenom,
                    email : user.email,
                    transaction: {}
                }
            })
        })
        .then(response => response.json())
        .then(res => {
            console.log('FedaPay transaction token generated >>>>>>', res)
            setUrlPayment(res.url)
            // sendPayment(res.token)
        
            if(res.url){
                setShowWebview(true)
                setLoading(false)
            }
        })
        .catch(e => {
            console.log(e)
            setLoading(false);
            // showMessage({
            //     message: "Erreur",
            //     description: "Une erreur est survenue",
            //     type: "danger",
            // });
        })
    }

    useEffect(() => {
        if(init.id){
            generateToken(init.id)
        }
    },[init])

    // const doReservation = () => {
    //     setLoading(true)
    //     fetch(apiURL + 'visite/create', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             // ContentType: 'multipart/form-data',
    //             'Content-Type': 'application/json',
    //             Authorization: 'Bearer ' + user.token
    //         },
    //         body: JSON.stringify({
    //             propriete_id: props.route.params.data.id,
    //             ref_paiement: init.reference,
    //             montant: props.route.params.data.price,
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(res => {
    //         // console.log(token)
    //         console.log('>>>>>>>>>>>>>>>>>>>', res)
    //         if(res.status === 200){
    //             setLoading(false);
    //             // showMessage({
    //             //     message: "Succès",
    //             //     description: res.message,
    //             //     type: "success",
    //             // });
    //             navigation.goBack();
    //         }else{
    //             setLoading(false);
    //             // showMessage({
    //             //     message: "Erreur",
    //             //     description: res.message,
    //             //     type: "danger",
    //             // });
    //         }
    //     })
    //     .catch(e => {
    //         console.log(e)
    //         setLoading(false);
    //         // showMessage({
    //         //     message: "Erreur",
    //         //     description: "Erreur de connexion",
    //         //     type: "danger",
    //         // });
    //     })
    // }

    function onNavigationStateChange({ url }) {
        console.log(">>>", url);
    
        if(url.includes('approved')){
            setLoading(false)
            hideModal()
            navigation.goBack();
            // showMessage({
            //     message: "Succès",
            //     description: "Paiement éffectué avec succès",
            //     type: "success",
            // });
            // doReservation();
        }else if(url.includes('declined')){
            setLoading(false)
            hideModal()
            // showMessage({
            //     message: "Décliné",
            //     description: "Paiement décliné avec succès",
            //     type: "info",
            // });
        }else if(url.includes('canceled')){
            setLoading(false)
            hideModal()
            // showMessage({
            //     message: "Refusé",
            //     description: "Vous avez refusé ce paiement",
            //     type: "danger",
            // });
        }else{
    
        }
    }

    return(
        <Provider className="flex-1 bg-slate-100">
            <ScrollView className="" showsVerticalScrollIndicator={false}>
                <View className="flex flex-row justify-between relative">
                    <Image source={{uri: baseURL + item.cover_url}} className=" h-80 w-screen " />
                    <View className="flex-row mt-10 items-center w-full px-4 absolute top-0 left-0  z-50">
                            <TouchableOpacity onPress={() =>{navigation.goBack()}} className="h-full w-full bg-gray-300/25 rounded-xl items-center justify-center mr-3 " style={{ height: 40, width: 40,}}>
                                <MaterialIcons name="keyboard-arrow-left" size={20} color="#fff"/>
                            </TouchableOpacity>
                        </View>
                    <View className="absolute top-0 left-0 bg-black/40 h-full w-full"></View>
                    <View className="absolute bottom-3 left-2 rounded-full flex flex-col justify-end h-full p-2">
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="text-[13px] text-white">{item.label}</Text>
                        <View className="rounded-full bg-terre/60 px-3 py-3 justify-center items-center">
                            <Text numberOfLines={2} style={{fontFamily: 'PoppinsRegular'}} className="text-[13px] text-white">{item.city} - {item.district}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {}} className="absolute bottom-10 right-2 flex items-center justify-center rounded-full">
                        <Octicons name="heart" size={18} color="white" />
                    </TouchableOpacity>
                </View>

                {/* <View className="px-4 pt-4 flex flex-row justify-between items-center">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-lg text-terre3">{item.price} {item.device}</Text>

                    <TouchableOpacity disabled={true} onPress={() => {}} className="h-10 w-24 items-center justify-center rounded-full bg-primary">
                        <Text style={{fontFamily: 'PoppinsRegular', color: "#53535E"}} className="text-[14px] ">Modifier</Text>
                    </TouchableOpacity>
                </View> */}

                <View className="px-4 pt-4 flex flex-row items-center">
                    <View className="h-8 w-28 items-center justify-center rounded-lg bg-secondary">
                        <Text adjustsFontSizeToFit style={{fontFamily: 'PoppinsRegular', color: "#FFFFFF"}} className="text-[16px] ">{item.price} {item.device}</Text>
                    </View>
                    <Text style={{fontFamily: 'PoppinsRegular', color: "#3D405B"}} className="text-[16px] ml-5">Devise : {item.device}</Text>
                </View>

                <View className="px-4 mt-4 pt-4 border-t border-t-black/10 flex flex-col">
                    <View className="flex flex-row justify-between items-center my-1">
                        <Text style={{fontFamily: 'PoppinsRegular', color: "#3D405B"}} className="text-[12px]">Publier le {moment(item.created_at).format('LL')} </Text>
                        <View style={{backgroundColor: "#FFFFFF"}} className="h-9 items-center justify-center rounded-lg px-5 border border-secondary/60">
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[14px] text-secondary ">{item.city} - {item.district}</Text>
                        </View>
                    </View>
                    
                    <View className="flex flex-row justify-between items-center my-1">
                        <Text style={{fontFamily: 'PoppinsRegular', color: "#3D405B"}} className="text-[12px]">Catégorie</Text>
                        <View style={{borderWidth: 0.7, backgroundColor: "#FFFFFF"}} className="h-9 items-center justify-center rounded-lg px-5 border border-secondary/60">
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[14px] text-secondary">{item.category.label}</Text>
                        </View>
                    </View>
                </View>

                {/* <View className="px-4 mt-4 pt-4 border-t border-t-black/10 flex flex-col">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-xl mb-4 text-mygray">Equipements</Text>
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-semibold text-[13px] text-justify text-dark">2 Chambres, 1 salle de bain</Text>
                </View> */}

                <View className="px-4 mt-4 pt-4 border-t border-t-black/10 flex flex-col">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-xl mb-4 text-mygray">Description</Text>
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-semibold text-[13px] text-justify text-dark">{item.description}</Text>
                </View>

                <View className="px-4 mt-4 pt-4 border-t border-t-black/10 flex flex-col">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-xl mb-4 text-mygray">Conditions</Text>
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-semibold text-[13px] text-justify text-dark">{item.conditions}</Text>
                </View>

                <View className="px-4 border-t border-t-black/10 mb-4 pt-4 flex flex-col">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-xl mb-4">Photos</Text>

                    <FlatList
                        data={item.media}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => {
                            return(
                                <TouchableOpacity onPress={() => {}} className="h-24 w-24 bg-slate-800 mr-2">
                                    <Image source={{uri: baseURL + item}} className="h-24 w-24" />
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={item => item}
                        />
                </View>

                {/* <View className="px-4 border-t border-t-black/10 mb-4 pt-4 flex flex-col">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-xl mb-4">Photos</Text>

                    <View className="flex-row">
                        <TouchableOpacity onPress={() => {}} className="h-24 w-24 bg-slate-800 mr-2">
                            <Image source={require('../../assets/IMG-20230904-WA0019.jpg')} className="h-24 w-24" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} className="h-24 w-24 bg-slate-800 mr-2">
                            <Image source={require('../../assets/IMG-20230904-WA0019.jpg')} className="h-24 w-24" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} className="h-24 w-24 bg-slate-800 mr-2">
                            <Image source={require('../../assets/IMG-20230904-WA0019.jpg')} className="h-24 w-24" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} className="h-24 w-24 bg-slate-800 mr-2">
                            <Image source={require('../../assets/IMG-20230904-WA0019.jpg')} className="h-24 w-24" />
                        </TouchableOpacity>
                    </View>
                    
                </View> */}

                <View className="px-4 border-t border-t-black/10 mb-4 pt-4 flex flex-col">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-xl mb-4">Annonceur</Text>
                    <View className="flex flex-row items-center gap-x-5">
                        <Image source={item.user.image_url !== null? {uri: baseURL+item.user.image_url} : require('../../assets/png-clipart.png')} className='rounded-full h-10 w-10' />
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-semibold text-lg mb-2">{item.user.name}</Text>
                    </View>
                    <View className="flex flex-row items-center mt-4 pl-4 gap-x-5">
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-lg">Tel:</Text>
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-semibold text-[15px]">{item.user.phone}</Text>
                    </View>
                    <View className="flex flex-row items-center my-4 pl-4 gap-x-5">
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-lg">Email:</Text>
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-semibold text-[15px]">{item.user.email}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => {setModalVisible(true)}} className="h-12 w-52 bg-primary m-4 self-center rounded-lg justify-center items-center">
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[#FFFFFF] text-[18px] ">Réserver</Text>   
                </TouchableOpacity>
            </ScrollView>

            <ModalPopup visible={modalVisible}>
                <View className="">
                    <View className="h-12 w-full m-1 p-2 flex-row items-center justify-between">
                        <Text className="font-['PoppinsRegular'] text-[16px] my-1">Programer une visite</Text>

                        <TouchableOpacity onPress={() =>{close()}}>
                            <View className="h-9 w-9 bg-slate-300 rounded-full items-center justify-center">
                                <Ionicons name="close" size={20} color="#000"/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="flex flex-row justify-between">
                        <View style={{flex: 1, padding: 5}}>
                            <Text className="font-['KeepCalm'] text-[16px] my-1">Jour</Text>
                            <Picker
                                selectedValue={selectedDay}
                                onValueChange={(itemValue) => setSelectedDay(itemValue)}
                                style={{borderWidth: 4}}
                            >
                                <Picker.Item label="Choisissez un jour" value="" />
                                {data.map(item => (
                                    <Picker.Item key={item.id} label={item.day} value={item.day} />
                                ))}
                            </Picker>
                        </View>

                        {selectedDayData && (
                            <View style={{flex: 1, padding: 5}}>
                                <Text className="font-['KeepCalm'] text-[16px] my-1">Heure</Text>
                                <Picker
                                    selectedValue={selectedHour}
                                    onValueChange={(itemValue) => setSelectedHour(itemValue)}
                                >
                                    {availableHours.map((hour, index) => (
                                    <Picker.Item key={index} label={hour} value={hour} />
                                    ))}
                                </Picker>
                            </View>
                        )}
                        

                        {/* <View style={{flex: 1, padding: 5}}>
                            <Text className="font-['KeepCalm'] text-[16px] my-1">Heure</Text>
                            <TouchableOpacity className="flex flex-row items-center px-2 border border-gray-500 rounded-lg h-11">
                                <TouchableOpacity
                                    // onPress={showTimepicker}
                                    className="flex flex-row justify-between items-center"
                                >
                                    <Entypo name="clock" size={25} color="#00ddb3"/>
                                    <Text adjustsFontSizeToFit numberOfLines={1} className="font-['KeepCalm'] text-[16px] mx-2">{moment(date).format('HH:mm')}</Text>
                                </TouchableOpacity>
                                
                            </TouchableOpacity>
                        </View> */}
                        
                    </View>

                    <TouchableOpacity onPress={() => {doTransaction(), setModalVisible(false)}} className="h-12 w-52 bg-primary m-4 self-center rounded-lg justify-center items-center">
                        {
                            loading? 
                            <ActivityIndicator size={20} color="#fff" />
                            :
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[#FFFFFF] text-[16px] ">Ajouter</Text>
                        }
                    </TouchableOpacity>
                </View>
            </ModalPopup>

            <Portal>
                <Modal visible={showWebview} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                <TouchableOpacity onPress={() => {hideModal()}} className="bg-red w-12 h-12 justify-center rounded-full bg-white/50 m-4">
                    <Icon type='ant-design' name='close' color={"red"}/>
                </TouchableOpacity>
                {showWebview && urlPayment && (
                    <WebView
                        style={styles.webview}
                        originWhitelist={["*"]}
                        source={{ uri: urlPayment }}
                        onNavigationStateChange={onNavigationStateChange}
                        onMessage={(event) => {
                        switch (event.nativeEvent.type) {
                            case "test":
                                console.log("hello");
                                break;
                            default:
                                console.log(event.nativeEvent.type);
                            }
                        }}
                    />
                    )}
                </Modal>
            </Portal>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    app: {
        marginHorizontal: "auto",
        maxWidth: 500,
        paddingTop: 50
    },
    code: {
        fontFamily: "PoppinsRegular"
    },
    webview: {
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100%"
    },
    containerStyle: {
        backgroundColor: 'white', 
        padding: 20,
        height: "100%",
        width: "100%"
    }
});