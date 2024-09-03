import { useState } from 'react';
import {  Text, View, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, {FadeIn} from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import EditInfoTextInputComponent from '../../components/Visitor/EditInfoTextImputComponent';
import { apiURL } from '../../api/api';

export default function EditInfosAdmin(){
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const myuser = useSelector((state) => state.userReducer)

    const [name, setName] = useState(myuser.user.name);
    const [phone, setPhone] = useState(myuser.user.phone);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const updateInfo = async () => {
        if(!name){
            setMessage("Entrer votre nom");
            return
        }

        if(!phone){
            setMessage("Entrer votre contact");
            return
        }

        setMessage(null)

        setLoading(true)
        await fetch(apiURL + 'update_info', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + myuser.token
            },
            body: JSON.stringify({
                "name": name,
                "phone": phone,
                "email": myuser.user.email,
                "birthday": "",
            })
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            if(res.status === 200){
                getUser()
            }else{
                setLoading(false)
            }
        })
        .catch( (e) => {
            console.log(e);
            setLoading(false);
        })
    }

    const getUser = async () => {
        await fetch(apiURL + 'getinfo', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + myuser.token
            },
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            if(res.status === 200){
                setLoading(false)
                dispatch({type: 'AUTHENTICATED', payload: true});
                dispatch({type: 'USER', payload: res.data});
                navigation.goBack();
            }else{
                setLoading(false)
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
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Modifier mes infos</Text>
                </View>
            </Animated.View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50}}>

                <EditInfoTextInputComponent title={"Nom"} placeholder={"Doe"} value={name} onChangeText={(value) => setName(value)} />

                {/* <EditInfoTextInputComponent title={"Prénom"} placeholder={"John"} value={myuser.user.name} /> */}

                <EditInfoTextInputComponent title={"Téléphone"} placeholder={"+229..."} value={phone} onChangeText={(value) => setPhone(value)} />

                {message && <Text className="text-[#E50506] font-['PoppinsRegular'] text-[14px] text-center">{message}</Text>}

                <TouchableOpacity onPress={() => {updateInfo()}} className="bg-primary h-14 m-3 rounded-lg justify-center items-center">
                    {
                        loading?
                        <ActivityIndicator size={"small"} color={"#000"}/>
                        :
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] ">Modifier</Text>
                    }
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}