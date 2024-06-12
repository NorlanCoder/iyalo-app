import {  StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable, SafeAreaView, FlatList, Dimensions} from 'react-native'
import { Feather, MaterialIcons, FontAwesome, FontAwesome5, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import TextInputWithdrawComponent from '../../components/Admin/TextInputWithdrawComponent';
import { Dialog } from 'react-native-paper';
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const data = []

const HomeAdmin = () => {
    const navigation = useNavigation()

    const [selected, setSelected] = useState("proprietes")
    const [visible, setVisible] = useState(false);

    const hideDialog = () => setVisible(false);

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <View className="h-16 w-full items-center justify-between p-2 flex flex-row mt-10">
                <TouchableOpacity onPress={() => {setSelected('proprietes')}} style={{elevation: 4, borderWidth: 0.7, backgroundColor: selected === "proprietes" ? "#00ddb3": "#FFFFFF", borderColor: selected === "proprietes" ? "#00ddb3": "#00ddb3",}} className="h-10 w-28 items-center justify-center rounded-lg">
                    <Text style={{fontFamily: 'PoppinsRegular', color: selected === "proprietes" ? "#000000": "#6C5248"}} className="text-[16px] ">Propriétés</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {setSelected('visites')}} style={{elevation: 4, borderWidth: 0.7, backgroundColor: selected === "visites" ? "#00ddb3": "#FFFFFF", borderColor: selected === "visites" ? "#00ddb3": "#00ddb3",}} className="h-10 w-28 items-center justify-center rounded-lg">
                    <Text style={{fontFamily: 'PoppinsRegular', color: selected === "visites" ? "#000000": "#6C5248"}} className="text-[16px] ">Visites</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {setSelected('portefeuille')}} style={{elevation: 4, borderWidth: 0.7, backgroundColor: selected === "portefeuille" ? "#00ddb3": "#FFFFFF", borderColor: selected === "portefeuille" ? "#00ddb3": "#00ddb3",}} className="h-10 w-28 items-center justify-center rounded-lg">
                    <Text style={{fontFamily: 'PoppinsRegular', color: selected === "portefeuille" ? "#000000": "#6C5248"}} className="text-[16px] ">Portefeuille</Text>
                </TouchableOpacity>
            </View>

            {
                selected === "proprietes"?
                <View className="flex-1">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={{fontFamily: 'PoppinsRegular', fontWeight: "700"}} className="text-center text-[18px] p-5">Garantissez une gestion efficace de {"\n"} vos immobilier.</Text>

                        <TouchableOpacity onPress={() => {navigation.navigate('Properties')}} style={{elevation: 5}} className="bg-white h-24 m-3 rounded-md flex flex-row items-center">
                            <View style={{flex: 0.15}} className="h-24 w-16 justify-center items-center">
                                <FontAwesome name='building' color={"#00ddb3"} size={20}/>
                            </View>

                            <View style={{flex: 0.85}} className="h-24 w-16 justify-center">
                                <Text style={{fontFamily: 'PoppinsRegular', fontWeight: "600"}} className="text-[16px] ">Nombre total de {"\n"}propriétés répertoriées</Text>
                            </View>

                            <View style={{flex: 0.2}} className="h-24 w-16 justify-center items-center">
                                <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[22px] text-2xl text-primary font-bold">{100}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {navigation.navigate('Annonces')}} style={{elevation: 5}} className="bg-white h-24 m-3 rounded-md flex flex-row items-center">
                            <View style={{flex: 0.15}} className="h-24 w-16 justify-center items-center">
                                <Entypo name='megaphone' color={"#00ddb3"} size={20}/>
                            </View>

                            <View style={{flex: 0.85}} className="h-24 w-16 justify-center">
                                <Text style={{fontFamily: 'PoppinsRegular', fontWeight: "600"}} className="text-[16px] ">Nombre total {"\n"} d'annonces ajoutées</Text>
                            </View>

                            <View style={{flex: 0.2}} className="h-24 w-16 justify-center items-center">
                                <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[22px] text-2xl text-primary font-bold">{20}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {navigation.navigate('Visites')}} style={{elevation: 5}} className="bg-white h-24 m-3 rounded-md flex flex-row items-center">
                            <View style={{flex: 0.15}} className="h-24 w-16 justify-center items-center">
                                <FontAwesome5 name='building' color={"#00ddb3"} size={20} />
                            </View>

                            <View style={{flex: 0.85}} className="h-24 w-16 justify-center">
                                <Text style={{fontFamily: 'PoppinsRegular', fontWeight: "600"}} className="text-[16px] ">Nombre de {"\n"}visites actives</Text>
                            </View>

                            <View style={{flex: 0.2}} className="h-24 w-16 justify-center items-center">
                                <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[22px] text-2xl text-primary font-bold">{10}</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{elevation: 5}} className="bg-white h-24 m-3 rounded-md flex flex-row items-center">
                            <View style={{flex: 0.15}} className="h-24 w-16 justify-center items-center">
                                <MaterialCommunityIcons name='clipboard-text-play-outline' color={"#00ddb3"} size={20}/>
                            </View>

                            <View style={{flex: 0.85}} className="h-24 w-16 justify-center">
                                <Text style={{fontFamily: 'PoppinsRegular', fontWeight: "600"}} className="text-[16px] ">Nombre de {"\n"}visites en cours </Text>
                            </View>

                            <View style={{flex: 0.2}} className="h-24 w-16 justify-center items-center">
                                <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[22px] text-2xl text-primary font-bold">{20}</Text>
                            </View>
                        </View>

                        <View style={{elevation: 5}} className="bg-white h-24 m-3 rounded-md flex flex-row items-center">
                            <View style={{flex: 0.15}} className="h-24 w-16 justify-center items-center">
                                <MaterialCommunityIcons name='chart-line' color={"#00ddb3"} size={20}/>
                            </View>

                            <View style={{flex: 0.85}} className="h-24 w-16 justify-center">
                                <Text style={{fontFamily: 'PoppinsRegular', fontWeight: "600"}} className="text-[16px] ">Taux d'occupation global </Text>
                            </View>

                            <View style={{flex: 0.2}} className="h-24 w-16 justify-center items-center">
                                <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[22px] text-2xl text-primary font-bold">{40}%</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                :selected === "visites"?
                <View className="flex-1">
                    <Text style={{fontFamily: 'PoppinsRegular', fontWeight: "700"}} className="text-center text-[18px] p-5">Garantissez une gestion efficace de {"\n"} vos immobilier.</Text>

                    <View style={{width: width*0.95, height: "100%", borderRadius: 15, alignSelf: 'center', marginBottom: 15, padding: 5}}>
                        <View style={styles.wrapper}>
                            <View style={styles.table}>
                                <View style={styles.table_head}>
                                    <View style={{ width: '10%'}}>
                                        <Text style={styles.table_head_captions}>N°</Text>
                                    </View>
                                    <View style={{ width: '20%'}}>
                                        <Text style={styles.table_head_captions}>Type</Text>
                                    </View>
                                    <View style={{ width: '25%'}}>
                                        <Text style={styles.table_head_captions}>Locataire</Text>
                                    </View>
                                    <View style={{ width: '25%'}}>
                                        <Text style={styles.table_head_captions}>Date</Text>
                                    </View>
                                    <View style={{ width: '25%'}}>
                                        <Text style={styles.table_head_captions}>Statut</Text>
                                    </View>
                                </View>

                                {
                                    data.map((item, index) => {
                                        return(
                                            <View key={index} style={styles.table_body_single_row}>
                                                <View style={{ width: '10%', height: 25, justifyContent: 'center'}}>
                                                    <Text style={[styles.table_data, {color: "#AD5526", fontSize: 16}]}>{item.id} </Text>
                                                </View>
                                                <View style={{ width: '20%', backgroundColor: '#EFEFEF', height: 25, justifyContent: 'center'}}>
                                                    <Text style={styles.table_data}>Villa</Text>
                                                </View>
                                                <View style={{ width: '25%', height: 25, justifyContent: 'center'}}>
                                                    <Text numberOfLines={2} style={styles.table_data}> {item.user.nom} {item.user.prenom} </Text>
                                                </View>
                                                <View style={{ width: '25%', backgroundColor: '#EFEFEF', height: 25, justifyContent: 'center'}}>
                                                    <Text style={styles.table_data}>{moment(item.created_at).format('LL')}</Text>
                                                </View>
                                                <View style={{ width: '25%', height: 25, justifyContent: 'center'}}>
                                                    <Text style={styles.table_data}>{item.visited ? "Déjà visité" : "En attente"} </Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                </View>
                :selected === "portefeuille" ?
                <View className="flex-1">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="bg-primary/60 h-48 m-3 rounded-3xl items-center">
                            <View className="m-5 px-3">
                                <Text className="text-center text-[16px] font-['PoppinsRegular'] text-secondary ">Balance du portefeuille</Text>
                                <Text className="text-center text-[34px] font-['PoppinsRegular'] font-bold">50 000 <Text className="text-center text-[18px] font-['PoppinsRegular'] font-bold">XOF</Text></Text>
                            </View>

                            <TouchableOpacity onPress={() => {setVisible(true)}} style={{elevation: 4, borderWidth: 0.7, backgroundColor:"#FFFFFF", borderColor: "#00ddb3",}} className="h-11 px-5 items-center justify-center rounded-lg m-4">
                                <Text style={{fontFamily: 'PoppinsRegular', color: "#6C5248"}} className="text-[20px] ">Retirer</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="mx-3">
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
                        </View>
                    </ScrollView>
                </View>
                :null
            }

            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Effectuer un retrait</Dialog.Title>
                <Dialog.Content>
                    <TextInputWithdrawComponent title={"Montant"} placeholder={"montant"} devise={"XOF"} />
                    <TextInputWithdrawComponent title={"Numéro"} placeholder={"numéro"}/>

                    <TouchableOpacity onPress={() => {setVisible(false)}} className="bg-primary h-14 m-3 rounded-lg justify-center items-center">
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Valider</Text>
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