import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const RequestAuth = () => {

    const navigation = useNavigation();

    return (
        <View className="flex-1 bg-slate-100 px-4 flex flex-col justify-center items-center">

            <Text style={{fontFamily: 'KeepCalm'}} className="text-xl text-black mb-5">Veuillez-vous authentifier</Text>

            <Image source={require('../../assets/png-clipart.png')} className="h-28 w-28 rounded-full" />

            <TouchableOpacity onPress={() => {navigation.navigate('Login')}} className="rounded-xl h-14 bg-black border border-primary flex-row items-center justify-center w-full mt-5">
                <Text className="text-white text-lg">Se connecter</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('Register')}} className="rounded-xl h-14 bg-primary border border-black flex-row items-center justify-center w-full mt-2">
                <Text className="text-black text-lg">Créer un compte</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RequestAuth