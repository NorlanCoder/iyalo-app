import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, Image, ScrollView, TouchableOpacity, Pressable, SafeAreaView, FlatList, ActivityIndicator} from 'react-native'
import { Feather, MaterialIcons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { Button, Dialog, Portal, PaperProvider, Provider, Modal as PaperModal } from 'react-native-paper';
import { API_KEY_SECRETE_TEST, apiURL, baseURL, fedapayBASEURL_TEST } from '../../api/api';
import moment from 'moment'
import 'moment/locale/fr'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
moment.locale('fr')

export default function Details(props){
    const navigation = useNavigation();
    const myuser = useSelector((state) => state.userReducer)
    // console.log(myuser)

    const [visible, setVisible] = useState(false);
    const [visiblePayment, setVisiblePayment] = useState(false);
    const [calendar, setCalendar] = useState([]);
    const [day, setDay] = useState('');
    const [heure, setHeure] = useState('');
    const [paiementLink, setPaiementLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [init, setInit] = useState({});
    const hideDialog = () => {setVisible(false); setDay(''); setHeure(''); setPaiementLink('');};
    const hidePayment = () => {setVisiblePayment(false); setDay(''); setHeure(''); setPaiementLink('');};


    const item = props.route.params.item

    const getcalendar = (id) => {
        fetch(`${apiURL}properties/${id}/calendar`)
        .then(response => response.json())
        .then(res => {
            
            if(res.message === 'Success'){
                setCalendar(res.data.data)
            }
        })
        .catch( (e) => {
            console.log(e);
        })

    }

    const doTransaction = async () => {
        // console.log(selectedHour);
        // console.log(item);
        setLoading(true);
        await fetch(fedapayBASEURL_TEST + "transactions", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + API_KEY_SECRETE_TEST,
          },
          body: JSON.stringify({
            description: "Transaction de " + myuser.user.name,
            amount: item.visite_price || 100,
            currency: {
              iso: "XOF",
            },
            callback_url: `${apiURL}visit/fedapay`,
            customer: {
              firstname: myuser.user.name,
              lastname: myuser.user.name,
              email: myuser.user.email,
              // phone_number : {
              //     number : "+22964000001",
              //     country : "bj"
              // }
    
            },
            custom_metadata: {
                day: day,
                hour: heure,
                amount: item.visite_price,
                type: 'Visite',
                reference: '',
                property_id: item.id,
                user_id: myuser.user.id
            },
          }),
        })
        .then((response) => response.json())
        .then((res) => {
            console.log("FedaPay response >>>11>>>", res);
            // generateToken(res["v1/transaction"].id)
            setInit(res["v1/transaction"]);
            // setPaiementLink(res.url);
        })
        .catch((e) => {
            console.log(e);
            // setLoading(false);
            showMessage({
                message: "Erreur",
                description: "Une erreur est survenue",
                type: "danger",
            });
        });
    };

    const saveInDB = async () => {
        // console.log(selectedHour);
        // console.log(item);
        setLoading(true);
        await fetch(apiURL + "visit/callback", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + myuser.token,
            },
            body: JSON.stringify({
                id: init.id,
                day: day,
                hour: heure,
                amount: item.visite_price,
                type: 'Visite',
                reference: init.reference,
                property_id: item.id,
                user_id: myuser.user.id
            })
        })
        .then((response) => response.json())
        .then((res) => {
            console.log("Save 11>>>", res);
            // generateToken(res["v1/transaction"].id)
            // setInit(res["v1/transaction"]);
            // setPaiementLink(res.url);
        })
        .catch((e) => {
            console.log(e);
            // setLoading(false);
            // showMessage({
            //     message: "Erreur",
            //     description: "Une erreur est survenue",
            //     type: "danger",
            // });
        });
    };

    const generateToken = async (id) => {
        // setPayer(true)

        await fetch(fedapayBASEURL_TEST + "transactions/" + id + "/token", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + API_KEY_SECRETE_TEST,
          },
          body: JSON.stringify({
            description: "Transaction de " + myuser.user.name,
            amount: item.visite_price || 100,
            currency: {
              iso: "XOF",
            },
            callback_url: `{${apiURL}visit/fedapay}`,
            customer: {
              firstname: myuser.user.name,
              lastname: myuser.user.name,
              email: myuser.user.email,
            },
            transaction: {
              custom_metadata: {
                day: day,
                hour: heure,
                amount: item.visite_price,
                type: 'Visite',
                reference: init.reference,
                property_id: item.id,
                user_id: myuser.user.id
              },
            },
          }),
        })
          .then((response) => response.json())
          .then((res) => {
            console.log(res)
            setPaiementLink(res.url);
            setLoading(false)
            setVisible(false)
            setVisiblePayment(true)
          })
          .catch((e) => {
            console.log(e);
            setLoading(false);
            // setPayer(false)
            // showMessage({
            //   message: "Erreur",
            //   description: "Une erreur est survenue",
            //   type: "danger",
            // });
          });
    };

    const choiceDate = (day, hour) => {
        setDay(day)
        setHeure(hour)
    }

    useEffect(() => {
        if (init.id) {
            generateToken(init.id);
        }
    }, [init]);

    const onNavigationStateChange = ({ url }) => {
        console.log(url)
        if (url.includes("approved")) {
          
            hidePayment();

            saveInDB()
            console.log('approved')
          
        } else if (url.includes("declined")) {
            hidePayment();
            // showMessage({
            //     message: "Décliné",
            //     description: "Paiement décliné",
            //     type: "info",
            // });
            console.log('declined')

        } else if (url.includes("canceled")) {
          
            hidePayment();
            // showMessage({
            //     message: "Refusé",
            //     description: "Vous avez refusé ce paiement",
            //     type: "danger",
            // });
            console.log('canceled')

        }
    }

    const CalendarItem = ({item, index,day}) => {

        return(
            <TouchableOpacity className={`${item.day==day ? 'bg-secondary':'bg-slate-50'} mx-3 my-2 rounded-xl p-3 shadow-lg shadow-gray-500 flex-row justify-between`} onPress={()=>choiceDate(item.day, `${item.hour.start} - ${item.hour.end}`)}>
                <View className="flex flex-row justify-between items-center w-full">
                    <View className="flex-row items-center gap-x-2">
                        <Feather name='calendar' size={22} color={`${item.day==day ? '#fff':'#000'}`} />
                        <Text style={{fontFamily: 'KeepCalm'}} className={`${item.day==day ? 'text-white':'text-black'}`}>{item.day}</Text>
                    </View>
                    <View className="flex-row gap-x-3">
                        <View className="flex-row items-center gap-x-2">
                            <Feather name='clock' size={22} color={`${item.day==day ? '#fff':'#000'}`} />
                            <Text style={{fontFamily: 'KeepCalm'}} className={`text-green-400`}>{item.hour.start}</Text>
                            <Text style={{fontFamily: 'KeepCalm'}}> - </Text>
                            <Text style={{fontFamily: 'KeepCalm'}} className={`${item.day==day ? 'text-white':'text-secondary'}`}>{item.hour.end}</Text>
                        </View>
                    </View>
                </View>
                
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        getcalendar(item.id)
    },[item]);

    // console.log(props.route.params)

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
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

                <View className="px-4 pt-4 flex flex-row items-center">
                    <Text>Frais de location</Text>
                    <View className="h-8 w-28 mx-2 items-center justify-center rounded-lg bg-secondary">
                        <Text adjustsFontSizeToFit style={{fontFamily: 'PoppinsRegular', color: "#FFFFFF"}} className="text-[16px] ">{item.price} {item.device}</Text>
                    </View>
                    <Text>par</Text>
                    <View className="h-8 w-auto px-2 ml-2 items-center justify-center rounded-lg bg-secondary">
                        <Text adjustsFontSizeToFit style={{fontFamily: 'PoppinsRegular', color: "#FFFFFF"}} className="text-[16px] ">{item.frequency=='daily' && 'Jour'}{item.frequency=='monthly' && 'Mois'}{item.frequency=='yearly' && 'An'}</Text>
                    </View>
                </View>
                <View className="flex flex-row items-center px-4 pt-2 ">
                    <Text>Frais de visite</Text>
                    <View className="h-8 w-28 ml-2 items-center justify-center rounded-lg bg-secondary">
                        <Text adjustsFontSizeToFit style={{fontFamily: 'PoppinsRegular', color: "#FFFFFF"}} className="text-[16px] ">{item.visite_price} {item.device}</Text>
                    </View>
                    
                </View>

                <View className="flex flex-row px-4 mt-3 py-4 border-t border-b border-t-black/10 border-b-black/10">
                    <Pressable className="flex flex-row items-center mr-3">
                        <MaterialCommunityIcons name="bed" size={17} color="black" />
                        <Text className="pl-1 text-base text-secondary font-bold" style={{fontFamily: 'KeepCalm'}}>{item.room}</Text>
                    </Pressable>

                    <Pressable className="flex flex-row items-center mr-3">
                        <MaterialCommunityIcons name="bathtub-outline" size={17} color="black" />
                        <Text className="pl-1 text-base text-secondary font-bold" style={{fontFamily: 'KeepCalm'}}>{item.bathroom}</Text>
                    </Pressable>

                    <Pressable className="flex flex-row items-center mr-3">
                        <MaterialCommunityIcons name="pool" size={17} color="black" />
                        <Text className="pl-1 text-base text-secondary font-bold" style={{fontFamily: 'KeepCalm'}}>{item.swingpool}</Text>
                    </Pressable>
                </View>

                <TouchableOpacity onPress={() => {setVisible(true)}} className="h-auto py-2 w-auto px-4 bg-secondary m-4  rounded-lg justify-center items-center">
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[#FFFFFF] text-[18px] ">Visiter</Text>   
                </TouchableOpacity>

                <View className="px-4  pt-4 border-t border-t-black/10 flex flex-col">
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

                
            </ScrollView>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title style={{color: '#6C5248'}}>Disponibilité</Dialog.Title>
                <Dialog.Content>
                    {/* <WebView style={{flex:1}} source={{ uri: 'https://expo.dev' }} /> */}
                    <View className="">
                        {
                            calendar.map((item, index) => <CalendarItem item={item} day={day} index={index} key={index} /> )
                        }
                    </View>
                    
                    <View className="my-2 border-b border-b-slate-100"></View>

                    <View className="my-3">
                        <Text className="text-lg"><Text className="font-bold ">Rendez-vous</Text>: {day ? day : '-'}</Text>
                        <Text className="text-lg"><Text className="font-bold ">Tranche horaire</Text>: {heure ? heure : '-'}</Text>
                    </View>

                    { day!=='' && heure!=='' ?
                        <TouchableOpacity onPress={()=>doTransaction()} className="bg-secondary rounded-md py-3 flex flex-row justify-center">
                            {
                                loading ? 
                                    <ActivityIndicator size={30} color="#fff"/>
                                :
                                    <Text className="text-white text-lg">Confirmer la visite</Text>
                            }
                        </TouchableOpacity>
                        :
                        <View className="bg-secondary/50 rounded-md py-3 flex flex-row justify-center">
                            
                            <Text className="text-white text-lg">Confirmer la visite</Text>
                            
                        </View>
                    }
                </Dialog.Content>
            </Dialog>

            <Dialog visible={visiblePayment} onDismiss={hidePayment} style={{flex: 1}}>
                <WebView 
                    style={{flex:1}}
                    originWhitelist={["*"]}
                    source={{ uri: paiementLink}} 
                    onNavigationStateChange={onNavigationStateChange}
                    onMessage={(event) => {
                        switch (event.nativeEvent.type) {
                          case "test":
                            break;
                          default:
                        }
                    }}
                />
            </Dialog>
        </SafeAreaView>
    )
}