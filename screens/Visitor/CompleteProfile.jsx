import { useState } from 'react';
import {  Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Dialog, } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Animated, {FadeIn} from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import EditInfoTextInputComponent from '../../components/Visitor/EditInfoTextImputComponent';
import { apiURL } from '../../api/api';

export default function CompleteProfile(){
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const myuser = useSelector((state) => state.userReducer)

    // console.log(myuser.token)

    const [adresse, setAdresse] = useState("");
    const [logo, setLogo] = useState(null);
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState("");
    const [message, setMessage] = useState(null);
    const [visible, setVisible] = useState(false);

    const hideDialog = () => setVisible(false);
    
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
            setLogo(result.assets[0])
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
            setLogo(result.assets[0])
        }
    };

    const pickDocument = async() => {
        const documentResult = await DocumentPicker.getDocumentAsync({
            type: '*/*',
            copyToCacheDirectory: false,
        });

        if(documentResult.assets && documentResult.assets.length > 0) {
            console.log(documentResult.assets[0]);

            setDocument(documentResult.assets[0]);
        }
    }

    const complete = async () => {
        if(adresse === ""){
            setMessage("Entrer votre adresse");
            return
        }

        if(logo === null){
            setMessage("Ajouter un logo");
            return
        }

        if(document === null){
            setMessage("Ajouter un document");
            return
        }
        setMessage(null)
        setLoading(true);
        
        const dataToSend = new FormData();

        dataToSend.append('adress', adresse);
        dataToSend.append('card', {
            name: document.name,
            uri: document.uri,
            type: document.mimeType,
        });
        dataToSend.append('logo', {
            name: logo.fileName,
            uri: logo.uri,
            type: 'image/jpeg',
        });

        console.log('data', dataToSend._parts);

        setLoading(true);
        await fetch(apiURL + 'became_announcer', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // 'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + myuser.token
            },
            body: JSON.stringify({
                'adress': adresse,
                'card': document.uri,
                'logo': logo.uri
            })
        })
        .then(response => response.json())
        .then(res => {
            console.log('response  ',res)
            if(res.status === 200){
                setLoading(false);
                navigation.goBack();
            }else{
                setLoading(false);
            }
        })
        .catch( (e) => {
            console.log(e);
            setLoading(false);
        })
    }

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <Animated.View entering={FadeIn.delay(400)} className="flex flex-row justify-between items-center px-3 mt-8">
                <View className="flex-row justify-center items-center">
                    <TouchableOpacity onPress={() =>{navigation.goBack()}} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center mr-3" style={{ height: 40, width: 40,}}>
                        <MaterialIcons name="keyboard-arrow-left" size={20} color="#000"/>
                    </TouchableOpacity>
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Devenir annonceur</Text>
                </View>
            </Animated.View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50}}>
                <EditInfoTextInputComponent title={"Adresse"} placeholder={"Cotonou"} value={adresse} onChangeText={(value) => setAdresse(value)} />
                
                <View className="h-28 mx-4 my-4 justify-center">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Logo</Text>

                    <TouchableOpacity onPress={() => {setVisible(true)}} style={{borderWidth: 0.7,}} className="h-28 rounded-lg bg-primary/10 border-secondary/30 justify-center items-center">
                        {
                            logo !== null?
                            <Image source={{uri: logo.uri}} resizeMode='cover' className="rounded-lg h-full w-full" />
                            :
                            <Feather name='camera' size={40} color={"#00ddb3"}/>
                        } 
                    </TouchableOpacity>
                </View>

                <View className="h-28 mx-4 mt-6 mb-4 justify-center">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Document</Text>

                    <TouchableOpacity onPress={() => {pickDocument()}} style={{borderWidth: 0.7,}} className="h-20 rounded-lg bg-primary/10 border-secondary/30 justify-center items-center">
                        {
                            document !== null?
                            // <Image source={{uri: logo}} resizeMode='cover' className="rounded-lg h-full w-full" />
                            <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">{document.name}</Text>
                            :
                            <Ionicons name='document' size={40} color={"#00ddb3"}/>
                        }
                    </TouchableOpacity>
                </View>

                {message && <Text className="text-[#E50506] font-['PoppinsRegular'] text-[14px] text-center mt-4">{message}</Text>}

                <TouchableOpacity onPress={() => {complete()}} className="bg-primary h-14 m-3 rounded-lg justify-center items-center">
                    {
                        loading?
                        <ActivityIndicator size={"small"} color={"#000"}/>
                        :
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Valider</Text>
                    }
                </TouchableOpacity>
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