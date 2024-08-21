import { useState } from 'react';
import {  Text, View, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
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

    const [adresse, setAdresse] = useState("");
    const [card, setCard] = useState("");
    const [logo, setLogo] = useState("");
    const [loading, setLoading] = useState("");
    const [message, setMessage] = useState(null);

    const complete = async () => {
        // if(!oldPass){
        //     setMessage2("Entrer votre ancien mot de passe");
        //     return
        // }

        // if(!newPass){
        //     setMessage2("Entrer un nouveau mot de passe");
        //     return
        // }

        // if(!confirmPass){
        //     setMessage2("Confirmer le mot de passe");
        //     return
        // }

        setMessage(null)

        setLoading(true);
        await fetch(apiURL + 'became_announcer', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + myuser.token
            },
            body: JSON.stringify({
                "adress": adresse,
                "card": card,
                "logo": logo,
            })
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
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
                <EditInfoTextInputComponent title={"Adresse"} placeholder={"Cotonou"} value={adresse} onChangeText={(value) => setAdresse(value)} />
                <EditInfoTextInputComponent title={"Adresse"} placeholder={"Cotonou"} value={adresse} onChangeText={(value) => setAdresse(value)} />

                {message && <Text className="text-[#E50506] font-['PoppinsRegular'] text-[14px] text-center">{message}</Text>}

                <TouchableOpacity onPress={() => {complete()}} className="bg-primary h-14 m-3 rounded-lg justify-center items-center">
                    {
                        loading?
                        <ActivityIndicator size={"small"} color={"#000"}/>
                        :
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Valider</Text>
                    }
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}