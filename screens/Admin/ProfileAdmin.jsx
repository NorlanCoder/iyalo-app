import { useState } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, ActivityIndicator, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo, Fontisto, Foundation, FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker'
import { apiURL } from '../../api/api';
import { useNavigation } from '@react-navigation/native';

export default function ProfileAdmin(){
    const dispatch = useDispatch();
    const {width} = useWindowDimensions()
    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated)
    const token = useSelector((state) => state.userReducer.token)
    const myuser = useSelector((state) => state.userReducer)
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const hideDialog = () => setVisible(false);

    const getlogoutFavorite = async () => {

        await fetch(apiURL + 'logout', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + myuser.token
            }
        })
        .then(response => response.json())
        .then(res => {
            dispatch({type: 'LOGOUT', payload: null});
        })
        .catch( (e) => {
            console.log(e);
        })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0.2,
        });
        setVisible(false);
    
        if (result.canceled) {
            return;
        }
    
        if (result.assets && result.assets.length > 0) {
            setLoading(true);
    
            const dataToSend = new FormData();
            dataToSend.append('image', {
                name: result.assets[0].fileName,
                uri: result.assets[0].uri,
                type: 'image/jpeg',
            });
    
            console.log('form data', dataToSend);
    
            fetch(apiURL + 'update_image', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + token,
                },
                body: dataToSend,
            })
            // .then(response => {
            //     console.log('response ',response.json())
            //     if (!response.ok) {
            //         throw new Error('Network response was not ok');
            //     }
            //     console.log('response ',response.json())
            //     return response.json();
                
            // })
            .then(res => {
                console.log("resultat ",res);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
        }
    };

    const takeImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0.2,
        });
        setVisible(false);
    
        if (result.canceled) {
            return;
        }
    
        if (result.assets && result.assets.length > 0) {
            setLoading(true);
    
            const dataToSend = new FormData();
            dataToSend.append('image', {
                name: result.assets[0].fileName,
                uri: result.assets[0].uri,
                type: 'image/jpeg',
            });
    
            console.log('form data', dataToSend);
    
            fetch(apiURL + 'update_image', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + token,
                },
                body: dataToSend,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(res => {
                console.log(res);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
        }
    };

    return(
        <SafeAreaView className="flex-1 bg-slate-100 px-4">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, paddingBottom: 50, justifyContent: 'center'}}>
                <View className="w-full h-56 justify-center items-center mt-10" >
                    <View style={{borderWidth: 0.7, borderColor: "#6E6F84"}} className="h-28 w-28 rounded-full justify-center items-center">
                        <Image source={require('../../assets/png-clipart.png')} className="h-24 w-24 rounded-full" />

                        <TouchableOpacity onPress={() => {setVisible(true)}} className="h-8 w-8 bg-primary/40 rounded-full absolute bottom-0 right-0 items-center justify-center">
                            {
                                loading?
                                    <ActivityIndicator size={"small"} color={"#000000"} />
                                    :
                                <Entypo name="edit" size={20} color="#000"/>
                            }
                        </TouchableOpacity>
                    </View>

                    <View className="justify-center items-center m-5">
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] p-1">{myuser.user.name}</Text>
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="text-[16px] p-1">{myuser.user.email}</Text>
                    </View>
                </View>

                <View className="bg-white rounded-md my-2">
                    <TouchableOpacity onPress={() =>{navigation.navigate('InfoProfile')}} className="flex-row justify-between mx-3 my-3 w-full">
                        <View className="flex-row justify-center items-center">
                            <View className="h-10 w-10 bg-slate-300 rounded-full items-center justify-center mr-3">
                                <FontAwesome name="user" size={20} color="#000000"/>
                            </View>
                            
                            <View className="gap-1">
                                <Text className="font-['PoppinsRegular'] font-bold text-[18px]">Infos personnelles</Text>
                                <Text className="font-['PoppinsRegular'] text-[13px]">Consulter vos informations personnelles</Text>
                            </View>
                            
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() =>{navigation.navigate('SecurityAdmin')}} className="flex-row justify-between mx-3 my-3 w-full">
                        <View className="flex-row justify-center items-center">
                            <View className="h-10 w-10 bg-slate-300 rounded-full items-center justify-center mr-3">
                                <Fontisto name="locked" size={20} color="#000000"/>
                            </View>
                            
                            <View className="gap-1">
                                <Text className="font-['PoppinsRegular'] font-bold text-[18px]">Sécurité</Text>
                                <Text className="font-['PoppinsRegular'] text-[13px]">Changer votre mot de passe</Text>
                            </View>
                            
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() =>{}} className="flex-row justify-between mx-3 my-3 w-full">
                        <View className="flex-row justify-center items-center">
                            <View className="h-10 w-10 bg-slate-300 rounded-full items-center justify-center mr-3">
                                <Fontisto name="bell" size={20} color="#000000"/>
                            </View>
                            
                            <View className="gap-1">
                                <Text className="font-['PoppinsRegular'] font-bold text-[18px]">Notifications</Text>
                                <Text className="font-['PoppinsRegular'] text-[13px]">Modifier vos préférences pour la notification</Text>
                            </View>
                            
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="bg-white rounded-md my-2">
                    <TouchableOpacity onPress={() =>{}} className="flex-row justify-between mx-3 my-3 w-full">
                        <View className="flex-row justify-center items-center">
                            <View className="h-10 w-10 bg-slate-300 rounded-full items-center justify-center mr-3">
                                <Foundation name="info" size={20} color="#000000"/>
                            </View>
                            
                            <View className="gap-1">
                                <Text className="font-['PoppinsRegular'] font-bold text-[18px]">Aide et support</Text>
                                <Text className="font-['PoppinsRegular'] text-[13px]">Contacter le support technique</Text>
                            </View>
                            
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() =>{getlogoutFavorite()}} className="flex-row justify-between mx-3 my-3 w-full">
                        <View className="flex-row justify-center items-center">
                            <View className="h-10 w-10 bg-slate-300 rounded-full items-center justify-center mr-3">
                                <MaterialIcons name="logout" size={20} color="#000000"/>
                            </View>
                            
                            <View className="gap-1">
                                <Text className="font-['PoppinsRegular'] font-bold text-[18px] text-red-500">Deconnexion</Text>
                                <Text className="font-['PoppinsRegular'] text-[13px]">Déconnecter votre compte</Text>
                            </View>
                            
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Choisir une image</Dialog.Title>
                <Dialog.Content>
                    <View style={{height: 120, flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => {takeImage()}}  style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            {/* <Icon name='camera' type='ant-design' size={30} color="black"/> */}
                            <Image className="h-14 w-14 self-center opacity-80" source={require("../../assets/camera.png")}/>
                            <Text style={{marginTop: 10, fontFamily: 'PoppinsRegular'}} >Appareil photo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() =>{pickImage()}} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Image className="h-14 w-14 self-center opacity-80" source={require('../../assets/image-gallery.png')}/>
                            {/* <MaterialIcons name="photo-library" size={30} color="black" /> */}
                            <Text style={{marginTop: 10, fontFamily: 'PoppinsRegular'}}>Gallerie</Text>

                        </TouchableOpacity>

                        {/* <TouchableOpacity onPress={() => supPhot()} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Image className="h-14 w-14 self-center opacity-80" source={require("../../assets/delete.png")}/>
                            <Text style={{marginTop: 10, fontFamily: 'PoppinsRegular'}} >Supprimer</Text>
                        </TouchableOpacity> */}
                    </View>
                </Dialog.Content>
            </Dialog>
        </SafeAreaView>
    )
}