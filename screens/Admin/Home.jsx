import {  StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable, SafeAreaView, FlatList, Dimensions, RefreshControl} from 'react-native'
import { Feather, MaterialIcons, FontAwesome, FontAwesome5, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import TextInputWithdrawComponent from '../../components/Admin/TextInputWithdrawComponent';
import { Dialog } from 'react-native-paper';
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { DisplayLoading } from '../../components/DisplayLoading';
import { WITHDRAW } from '../../store/reducers/actionName';
import { apiURL } from '../../api/api';
import moment from 'moment';
import Toast from 'react-native-toast-message';

const {width, height} = Dimensions.get('window');

const data = []

const HomeAdmin = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const token = useSelector((state) => state.userReducer.token)
    const global = useSelector((state) => state.appReducer.bilan)
    const withdraw = useSelector((state) => state.appReducer.withdraw)

    const [selected, setSelected] = useState("proprietes")
    const [visible, setVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [montant, setMontant] = useState(0);
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const onRefresh = () => {
        try{
            setRefreshing(true);
            getWithdrawHistory();
        }catch(error){
            setRefreshing(false);
        }finally{
            setRefreshing(false);
        }
    }

    const getWithdrawHistory = async () => {
        
        await fetch(apiURL + 'announcer/withdraw', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(res => {
            console.log('=======================1', res)
            if(res.status === 200){
                dispatch({type: WITHDRAW, payload: {
                    wallet: res.wallet,
                    data: res.data.data,
                    next: res.data.next_page_url
                }});
                
            }else{
                console.log('error', res)
            }
        })
        .catch( (e) => {
            console.log(e);
        })
    }

    const makeWithdraw = async () => {
        setLoading(false)
        await fetch(apiURL + 'announcer/withdraw/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({amount: montant, phone: phone})
        })
        .then(response => response.json())
        .then(res => {
            // console.log('=======================1', res)
            if(res.status === 200){
                getWithdrawHistory()
                setVisible(false)
                setLoading(false)
            }else{
                console.log('error', res)
                setLoading(false)
            }
        })
        .catch( (e) => {
            console.log(e);
        })
    }

    const sendWithdraw = () => {
        if(montant<=0) {
            setError('')
            setError('Le montant ne peut être nul ou négatif')
            return;
        }
        else {
            if(montant>withdraw.wallet) {
                setError('')
                setError('Le montant ne peut être supérieur à votre solde')
                return;
            }
            else if(email=='') {
                setError('Numéro de téléphone obligatoire')
                return;
            }
            else {
                makeWithdraw()
            }
        }
    }

    const getNextWithdrawHistory = async () => {
        
        await fetch(withdraw.next, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(res => {
            // console.log('=======================1', res)
            if(res.status === 200){
                dispatch({type: WITHDRAW, payload: {
                    wallet: res.wallet,
                    data: res.data.data,
                    next: res.data.next_page_url
                }});
                
            }else{
                console.log('error', res)
            }
        })
        .catch( (e) => {
            console.log(e);
        })
    }

    // const getBilanGlobal = async () => {
        
    //     await fetch(apiURL + 'announcer/withdraw/bilan', {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(res => {
    //         console.log('=======================1', res)
    //         if(res.status === 200){
    //             setProperty(res.properties)
    //             setVisit(res.visits)
    //             setAllCash(res.all_cash)
    //             setWallet(res.wallet)
                
    //         }else{
    //             console.log('error', res)
    //         }
    //     })
    //     .catch( (e) => {
    //         console.log(e);
    //     })
    // }

    useEffect(()=>{
        Toast.show({
            type: 'info',
            text1: 'Image de profile',
            text2: 'Image changé avec succès'
        })
    },[])


    const hideDialog = () => setVisible(false);

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            {/* {console.log(global)} */}
            <View className="h-16 w-full items-center justify-center gap-x-3 p-2 flex flex-row mt-10">
                <TouchableOpacity onPress={() => {setSelected('proprietes')}} style={{elevation: 4, borderWidth: 2, backgroundColor: selected === "proprietes" ? "#6C5248": "#FFFFFF", borderColor: "#6C5248"}} className="h-10 w-28 items-center justify-center rounded-lg">
                    <Text style={{fontFamily: 'PoppinsRegular', color: selected === "proprietes" ? "#FFF": "#6C5248"}} className="text-[16px] ">Propriétés</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {setSelected('portefeuille')}} style={{elevation: 4, borderWidth: 2, backgroundColor: selected === "portefeuille" ? "#6C5248": "#FFFFFF", borderColor:  "#6C5248"}} className="h-10 w-28 items-center justify-center rounded-lg">
                    <Text style={{fontFamily: 'PoppinsRegular', color: selected === "portefeuille" ? "#FFF": "#6C5248"}} className="text-[16px] ">Portefeuille</Text>
                </TouchableOpacity>
            </View>

            {
                selected === "proprietes"?
                <View className="flex-1">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={{fontFamily: 'PoppinsRegular', fontWeight: "700"}} className="text-center text-[18px] p-5">Garantissez une gestion efficace de {"\n"} vos immobilier.</Text>

                        <TouchableOpacity onPress={() => {navigation.navigate('Properties')}} style={{elevation: 5}} className="bg-white h-24 m-3 rounded-md flex flex-row items-center">
                            <View style={{flex: 0.15}} className="h-24 w-16 justify-center items-center">
                                <FontAwesome name='building' color={"#6C5248"} size={20}/>
                            </View>

                            <View style={{flex: 0.85}} className="h-24 w-16 justify-center">
                                <Text style={{fontFamily: 'PoppinsRegular', fontWeight: "600"}} className="text-[16px] ">Nombre total de {"\n"}propriétés répertoriées</Text>
                            </View>

                            <View style={{flex: 0.2}} className="h-24 w-16 justify-center items-center">
                                <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[22px] text-2xl text-secondary font-bold">{global.properties}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {navigation.navigate('Visites')}} style={{elevation: 5}} className="bg-white h-24 m-3 rounded-md flex flex-row items-center">
                            <View style={{flex: 0.15}} className="h-24 w-16 justify-center items-center">
                                <FontAwesome name='building' color={"#6C5248"} size={20}/>
                            </View>

                            <View style={{flex: 0.85}} className="h-24 w-16 justify-center">
                                <Text style={{fontFamily: 'PoppinsRegular', fontWeight: "600"}} className="text-[16px] ">Historique de visites</Text>
                            </View>

                            <View style={{flex: 0.2}} className="h-24 w-16 justify-center items-center">
                                <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[22px] text-2xl text-secondary font-bold">{global.visits}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{elevation: 5}} className="bg-white h-24 m-3 rounded-md flex flex-row items-center">
                            <View style={{flex: 0.15}} className="h-24 w-16 justify-center items-center">
                                <MaterialCommunityIcons name='clipboard-text-play-outline' color={"#6C5248"} size={20}/>
                            </View>

                            <View style={{flex: 0.6}} className="h-24 w-16 justify-center">
                                <Text style={{fontFamily: 'PoppinsRegular', fontWeight: "600"}} className="text-[16px] ">Chiffres d'affaires</Text>
                            </View>

                            <View style={{flex: 0.4}} className="h-24 w-16 justify-center items-center">
                                <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[18px] text-secondary font-bold">{global.all_cash} fcfa</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{elevation: 5}} className="bg-white h-24 m-3 rounded-md flex flex-row items-center">
                            <View style={{flex: 0.15}} className="h-24 w-16 justify-center items-center">
                                <MaterialCommunityIcons name='clipboard-text-play-outline' color={"#6C5248"} size={20}/>
                            </View>

                            <View style={{flex: 0.6}} className="h-24 w-16 justify-center">
                                <Text style={{fontFamily: 'PoppinsRegular', fontWeight: "600"}} className="text-[16px] ">Solde actuel</Text>
                            </View>

                            <View style={{flex: 0.4}} className="h-24 w-16 justify-center items-center">
                                <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[18px] text-secondary font-bold">{global.wallet} fcfa</Text>
                            </View>
                        </View>


                        {/* <View style={{elevation: 5}} className="bg-white h-24 m-3 rounded-md flex flex-row items-center">
                            <View style={{flex: 0.15}} className="h-24 w-16 justify-center items-center">
                                <MaterialCommunityIcons name='chart-line' color={"#00ddb3"} size={20}/>
                            </View>

                            <View style={{flex: 0.85}} className="h-24 w-16 justify-center">
                                <Text style={{fontFamily: 'PoppinsRegular', fontWeight: "600"}} className="text-[16px] ">Taux d'occupation global </Text>
                            </View>

                            <View style={{flex: 0.2}} className="h-24 w-16 justify-center items-center">
                                <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[22px] text-2xl text-primary font-bold">{40}%</Text>
                            </View>
                        </View> */}
                    </ScrollView>
                </View>
                :selected === "portefeuille" ?
                <View className="flex-1 px-3">
                    <View showsVerticalScrollIndicator={false}>
                        <View className="bg-primary/60 h-48 my-3 rounded-3xl flex-col items-center justify-center ">
                            <View className="m-5 mb-0 px-3 flex-col items-center justify-center">
                                <Text className="text-center text-[16px] font-['PoppinsRegular'] text-secondary ">Balance du portefeuille</Text>
                                <Text className="text-center text-[34px] font-['PoppinsRegular'] font-bold">{withdraw.wallet} <Text className="text-center text-[18px] font-['PoppinsRegular'] font-bold">fcfa</Text></Text>
                            </View>

                            <TouchableOpacity onPress={() => {setVisible(true)}} style={{elevation: 4, borderWidth: 0.7, backgroundColor:"#FFFFFF", borderColor: "#00ddb3",}} className="h-11 px-5 items-center justify-center rounded-lg m-4 mt-3">
                                <Text style={{fontFamily: 'PoppinsRegular', color: "#6C5248"}} className="text-[18px] ">Retirer</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="mx-3">
                            <Text style={{fontFamily: 'PoppinsRegular', fontWeight: "700"}} className="text-[18px] py-5">Historique</Text>
                        </View>

                        {
                            loading?
                            <DisplayLoading/>
                            :
                            <FlatList
                                data={withdraw.data}
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                                renderItem={(item) => (

                                    <View className="bg-white h-16 rounded-xl flex-row justify-between my-2" key={item.index}>
                                        <View style={{flex: 0.2}} className="h-full w-full justify-center items-center">
                                            <MaterialCommunityIcons name='chart-line-variant' color={"red"} size={30}/>
                                        </View>

                                        <View style={{flex: 0.5}} className=" h-full w-full justify-center">
                                            <Text style={{fontFamily: 'PoppinsRegular', color: "#000"}} className="text-[16px]">Sortie</Text>
                                            <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[16px] text-gray-400">{moment(item.item.created_at).format('LL')}</Text>
                                        </View>

                                        <View style={{flex: 0.3}} className="h-full w-full flex flex-col justify-center items-end p-2">
                                            <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[16px] text-secondary font-bold ">-{item.item.amount} XOF</Text>
                                            <Text style={{fontFamily: 'PoppinsRegular'}} className={`text-[16px] ${item.item.is_refund ? 'text-green-600' : 'text-orange-400'}`}>{item.item.is_refund ? 'Effectué' : 'En cours'}</Text>
                                        </View>
                                    </View>
                                    
                                )}
                                keyExtractor={(item, index) => item.id}
                                showsVerticalScrollIndicator={false}
                                onEndReachedThreshold = {0.5}
                                onEndReached={() => {
                                    if(withdraw.next !== ''){
                                        getNextWithdrawHistory()
                                    }
                                }}
                                ListEmptyComponent={()=> {
                                    return (
                                        <View className="flex-1 h-[45vh] justify-center items-center">
                                            <Feather name="file-text" size={50} color={"#6C5248"} />
                                            <Text style={{fontFamily: 'KeepCalm'}}>Aucune historique dsponible</Text>
                                        </View>
                                    )
                                }}
                            />
                        }

                        {/* <View className="mx-3">
                            <Text style={{fontFamily: 'PoppinsRegular', fontWeight: "700"}} className="text-[18px] py-5">Historique</Text>

                            <View className="bg-white h-16 rounded-xl flex-row justify-between my-2">
                                <View style={{flex: 0.2}} className="h-full w-full justify-center items-center">
                                    <MaterialCommunityIcons name='chart-line-variant' color={"green"} size={30}/>
                                </View>

                                <View style={{flex: 0.5}} className=" h-full w-full justify-center">
                                    <Text style={{fontFamily: 'PoppinsRegular', color: "#000"}} className="text-[16px]">Entrée</Text>
                                    <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[16px] text-gray-400">12 Juin 2024</Text>
                                </View>

                                <View style={{flex: 0.3}} className="h-full w-full justify-center items-end p-2">
                                    <Text style={{fontFamily: 'PoppinsRegular', color: "#000"}} className="text-[16px] py-1">+50 000 XOF</Text>
                                </View>
                            </View>

                            <View className="bg-white h-16 rounded-xl flex-row justify-between my-2">
                                <View style={{flex: 0.2}} className="h-full w-full justify-center items-center">
                                    <MaterialCommunityIcons name='chart-line-variant' color={"red"} size={30}/>
                                </View>

                                <View style={{flex: 0.5}} className=" h-full w-full justify-center">
                                    <Text style={{fontFamily: 'PoppinsRegular', color: "#000"}} className="text-[16px]">Retrait</Text>
                                    <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[16px] text-gray-400">10 Juin 2024</Text>
                                </View>

                                <View style={{flex: 0.3}} className="h-full w-full justify-center items-end p-2">
                                    <Text style={{fontFamily: 'PoppinsRegular', color: "#000"}} className="text-[16px] py-1">-16 000 XOF</Text>
                                </View>
                            </View>

                            <View className="bg-white h-16 rounded-xl flex-row justify-between my-2">
                                <View style={{flex: 0.2}} className="h-full w-full justify-center items-center">
                                    <MaterialCommunityIcons name='chart-line-variant' color={"green"} size={30}/>
                                </View>

                                <View style={{flex: 0.5}} className=" h-full w-full justify-center">
                                    <Text style={{fontFamily: 'PoppinsRegular', color: "#000"}} className="text-[16px]">Entrée</Text>
                                    <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[16px] text-gray-400">09 Juin 2024</Text>
                                </View>

                                <View style={{flex: 0.3}} className="h-full w-full justify-center items-end p-2">
                                    <Text style={{fontFamily: 'PoppinsRegular', color: "#000"}} className="text-[16px] py-1">+16 000 XOF</Text>
                                </View>
                            </View>
                        </View> */}
                    </View>
                </View>
                :null
            }

            <Dialog visible={visible} onDismiss={hideDialog} style={{backgroundColor: '#FFF', borderRadius: 10}}>
                <Dialog.Title style={{textAlign: 'center'}}>Effectuer un retrait</Dialog.Title>
                <Dialog.Content>
                    <Text className="text-red-500 italic">{error}</Text>
                    <TextInputWithdrawComponent title={"Montant"} data={montant} setData={setMontant} placeholder={"Montant à retirer"} devise={"XOF"} />
                    <TextInputWithdrawComponent title={"Numéro"} data={phone} setData={setPhone} placeholder={"+229 01 xx xx xx xx"} />

                    <TouchableOpacity onPress={() => { sendWithdraw() }} className="bg-secondary h-12 m-3 mt-4 rounded-lg justify-center items-center">
                        { loading ?
                            <ActivityIndicator size={30} color="#fff" />
                            :
                            <Text style={{fontFamily: 'PoppinsRegular'}} className=" text-[16px] text-white">Valider</Text>
                        }
                    </TouchableOpacity>
                </Dialog.Content>
            </Dialog>
        </SafeAreaView>
    )
}

export default HomeAdmin;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    wrapper: {
    //   justifyContent: 'center',
      alignItems: 'center',
      flex: 1,    
    },
    table_head: {
      flexDirection: 'row', 
    //   borderBottomWidth: 1, 
    //   borderColor: '#ddd', 
      padding: 7,
    //   backgroundColor: '#FF7622',
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5
    },
    table_head_captions:{
      fontSize: 13,
      color: '#6C5248',
      fontFamily: "PoppinsRegular",
      textAlign: 'center'
    },
  
    table_body_single_row:{
      backgroundColor: '#fff',
      flexDirection: 'row', 
    //   borderBottomWidth: 1, 
    //   borderColor: '#ddd', 
    //   padding: 7,
      // borderBottomRightRadius: 5,
    },
    table_data:{  
      fontSize: 11,
      textAlign: 'center',
    },
    table: {
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 1,
      backgroundColor: '#fff',
    },
});