import { useState } from 'react';
import {  Text, View, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, {FadeIn} from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import EditInfoTextInputComponent from '../../components/Visitor/EditInfoTextImputComponent';
import { apiURL } from '../../api/api';

export default function SecurityAdmin(){
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const myuser = useSelector((state) => state.userReducer)

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [secureText1, setSecureText1] = useState(true);
    const [secureText2, setSecureText2] = useState(true);
    const [secureText3, setSecureText3] = useState(true);
    const [loading2, setLoading2] = useState(false);
    const [message2, setMessage2] = useState(null);

    const updatePassword = async () => {
        if(!oldPass){
            setMessage2("Entrer votre ancien mot de passe");
            return
        }

        if(!newPass){
            setMessage2("Entrer un nouveau mot de passe");
            return
        }

        if(!confirmPass){
            setMessage2("Confirmer le mot de passe");
            return
        }

        setMessage2(null)

        setLoading2(true);
        await fetch(apiURL + 'update_pass', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + myuser.token
            },
            body: JSON.stringify({
                "older": oldPass,
                "password": newPass,
                "confirm": confirmPass,
            })
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            if(res.status === 200){
                setLoading2(false);
                navigation.goBack();
            }else{
                setLoading2(false);
            }
        })
        .catch( (e) => {
            console.log(e);
            setLoading2(false);
        })
    }

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <Animated.View entering={FadeIn.delay(400)} className="flex flex-row justify-between items-center px-3 mt-8">
                <View className="flex-row justify-center items-center">
                    <TouchableOpacity onPress={() =>{navigation.goBack()}} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center mr-3" style={{ height: 40, width: 40,}}>
                        <MaterialIcons name="keyboard-arrow-left" size={20} color="#000"/>
                    </TouchableOpacity>
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Changer mot de passe</Text>
                </View>
            </Animated.View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50}}>
                <EditInfoTextInputComponent 
                    title={"Ancien mot de passe"} 
                    placeholder={"*****"} 
                    onChangeText={(value) => setOldPass(value)} 
                    isSecure={secureText1}
                    icon={
                        secureText1 ? 
                        <Ionicons name="eye-off" size={20} color="black"/>
                        :
                        <Ionicons name="eye" size={20} color="black"/>
                    }
                    onPress={() => {setSecureText1(!secureText1)}}
                />
                <EditInfoTextInputComponent 
                    title={"Nouveau mot de passe"} 
                    placeholder={"*****"} 
                    onChangeText={(value) => setNewPass(value)} 
                    isSecure={secureText2}
                    icon={
                        secureText2 ? 
                        <Ionicons name="eye-off" size={20} color="black"/>
                        :
                        <Ionicons name="eye" size={20} color="black"/>
                    }
                    onPress={() => {setSecureText2(!secureText2)}}
                />
                <EditInfoTextInputComponent 
                    title={"Confirmer mot de passe"} 
                    placeholder={"*****"} 
                    onChangeText={(value) => setConfirmPass(value)} 
                    isSecure={secureText3}
                    icon={
                        secureText3 ? 
                        <Ionicons name="eye-off" size={20} color="black"/>
                        :
                        <Ionicons name="eye" size={20} color="black"/>
                    }
                    onPress={() => {setSecureText3(!secureText3)}}
                />

                {message2 && <Text className="text-[#E50506] font-['PoppinsRegular'] text-[14px] text-center">{message2}</Text>}

                <TouchableOpacity onPress={() => {updatePassword()}} className="bg-primary h-14 m-3 rounded-lg justify-center items-center">
                    {
                        loading2?
                        <ActivityIndicator size={"small"} color={"#000"}/>
                        :
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Modifier</Text>
                    }
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}