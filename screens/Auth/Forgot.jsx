import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import ButtonLogin from '../../components/Auth/ButtonLogin';
import React, {useState} from 'react'
import { OtpInput } from 'react-native-otp-entry';
import { useNavigation } from '@react-navigation/native';
import { apiURL } from '../../api/api';

const Forgot = () => {
    const navigation = useNavigation();

    const [otp, setOtp] = useState('')
    const [email, setEmail] = useState('')
    const [showOtp, setShowOtp] = useState(false)
    const [loading, setLoading] = useState(false);

    const forgot = async (payload) => {
        setLoading(true)
        await fetch(apiURL + 'forget', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + user.token
          },
          body: JSON.stringify({email: payload})
        })
        .then(response => response.json())
        .then(res => {
            if(res.message) {
                if(res.message=="Email is sending") {
                    setShowOtp(true)
                } else {
                    console.log('Aucun compte associé à cette adresse email')
                } 
                setLoading(false)
            } else {
                setLoading(false)
            }
            
        })
        .catch( (e) => {
            console.log(e);
        })
    }

    const verifyotp = async (payload) => {
        setLoading(true)
        await fetch(apiURL + 'validate_token ', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + user.token
          },
          body: JSON.stringify({email: payload.email, token: payload.otp})
        })
        .then(response => response.json())
        .then(res => {
            if(res.message) {
                if(res.message=="Successful") {
                    setShowOtp(false)
                    navigation.navigate('NewPassword',{email: email})
                } else {
                    console.log('Aucun compte associé à cette adresse email')
                } 
                setLoading(false)
            } else {
                setLoading(false)
            }
            
        })
        .catch( (e) => {
            console.log(e);
        })
    }

    return (
        <SafeAreaView className="flex-1 h-full w-full bg-slate-100">
            <View style={{height: Dimensions.get('window').height*0.32, width:  Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center', alignContent: 'center',}}>

                <Animated.View entering={FadeInUp.delay(200).duration(600).springify()} 
                    className='absolute flex flex-row items-center'
                    style={{top: 40, left: 10, alignSelf: 'flex-start'}}
                >
                    <TouchableOpacity onPress={() =>{navigation.goBack()}} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center" style={{ height: 40, width: 40}}>
                        <Feather name="chevron-left" size={22} color="#555"/>
                    </TouchableOpacity>
                    <Text className="text-lg text-gray-700 font-bold ml-3" style={{fontFamily: 'PoppinsRegular'}}>Mot de passe oublié</Text>
                </Animated.View>

                {
                    !showOtp ? (
                        <View className="absolute top-20">
                            <ScrollView contentContainerStyle={{justifyContent: 'center', flex: 1}} className="bg-slate-100 py-10 px-4" automaticallyAdjustKeyboardInsets={true}>
                                <View className=" mt-10">
                                    <Text className="text-primary text-5xl mb-3 mt-8" style={{fontFamily: 'KeepCalm'}}>Mot de passe oublié ? </Text>
                                    <Text className="text-lg text-gray-400" style={{fontFamily: 'PoppinsRegular'}}>Entrez votre adresse email. Vous recevrez un code pour réinitialiser votre mot de passe</Text>
                                </View>

                                <View className="my-5">

                                    <View className="flex flex-row items-center px-2 border border-black rounded-xl mb-5">
                                        <Feather name="mail" size={24} color="black" />
                                        <TextInput
                                            autoCapitalize='none'
                                            textContentType='emailAddress'
                                            keyboardType='email-address'
                                            placeholder="Email"
                                            className="w-full px-3 py-3 text-lg"
                                            style={{fontFamily: 'PoppinsRegular'}}
                                            value={email}
                                            onChangeText={(value)=>setEmail(value)}
                                        />
                                    </View>
                                    <View className="mb-5">
                                        <ButtonLogin name="Envoyer" press={forgot} payload={email} load={loading} />
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    ) : (
                        <View className="absolute top-20">
                            <ScrollView contentContainerStyle={{justifyContent: 'center', flex: 1}} className="bg-slate-100 py-10 px-4" automaticallyAdjustKeyboardInsets={true}>
                                <View className=" my-5">
                                    <Text className="text-primary text-5xl mb-3 mt-8" style={{fontFamily: 'KeepCalm'}}>Vérification OTP</Text>
                                    <Text className="text-lg text-gray-400" style={{fontFamily: 'PoppinsRegular'}}>Vous avez reçu un code à 6 chiffres. Saisissez le pour réinitialiser votre mot de passe.</Text>
                                </View>

                                <View className=" mb-2">
                                    <OtpInput numberOfDigits={6} focusColor="#00ddb3" autoFocus={true} hideStick onTextChange={(text) => setOtp(text)} />
                                </View>

                                {/* <TouchableOpacity onPress={() => {setLoading(true)}} className=" mb-5 flex flex-row justify-end">
                                    <Text className="text-md font-bold text-primary" style={{fontFamily: 'PoppinsRegular'}}>Renvoyer</Text>
                                </TouchableOpacity> */}

                                <View className="mb-5 mt-3">
                                    <ButtonLogin name="Vérifier" press={verifyotp} payload={{email: email, otp: otp}} load={loading} />
                                </View>
                            </ScrollView>
                        </View>
                    )
                }
            
            </View>
        </SafeAreaView>
    )
}

export default Forgot