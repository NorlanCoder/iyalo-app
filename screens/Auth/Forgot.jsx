import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import ButtonLogin from '../../components/Auth/ButtonLogin';
import React, {useState} from 'react'
import { OtpInput } from 'react-native-otp-entry';

const Forgot = () => {

    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false);

    return (
        <SafeAreaView className="flex-1 h-full w-full bg-slate-100">
            <View style={{height: Dimensions.get('window').height*0.32, width:  Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center', alignContent: 'center',}}>

                <Animated.View entering={FadeInUp.delay(200).duration(600).springify()} 
                    className='absolute flex flex-row gap-x-3 items-center'
                    style={{top: 40, left: 20, alignSelf: 'flex-start'}}
                >
                    <TouchableOpacity onPress={() =>{}} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center" style={{ height: 40, width: 40,}}>
                        <Feather name="chevron-left" size={22} color="#555"/>
                    </TouchableOpacity>
                    <Text className="text-lg text-gray-600 font-bold" style={{fontFamily: 'PoppinsRegular'}}>Mot de passe oublié</Text>
                </Animated.View>
            
                {/* <View className="absolute top-20">
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
                                />
                            </View>
                            <View className="mb-5">
                                <ButtonLogin name="Envoyer" />
                            </View>
                        </View>
                    </ScrollView>
                </View> */}

                <View className="absolute top-20">
                    <ScrollView contentContainerStyle={{justifyContent: 'center', flex: 1}} className="bg-slate-100 py-10 px-4" automaticallyAdjustKeyboardInsets={true}>
                        <View className=" my-5">
                            <Text className="text-primary text-5xl mb-3 mt-8" style={{fontFamily: 'KeepCalm'}}>Vérification OTP</Text>
                            <Text className="text-lg text-gray-400" style={{fontFamily: 'PoppinsRegular'}}>Vous avez reçu un code à 6 chiffres. Saisissez le pour réinitialiser votre mot de passe.</Text>
                        </View>

                        <View className=" mb-2">
                            <OtpInput numberOfDigits={6} focusColor="#00ddb3" autoFocus={true} hideStick onTextChange={(text) => setOtp(text)} />
                        </View>

                        <TouchableOpacity onPress={() => {setLoading(true)}} className=" mb-5 flex flex-row justify-end">
                            <Text className="text-md font-bold text-primary" style={{fontFamily: 'PoppinsRegular'}}>Renvoyer</Text>
                        </TouchableOpacity>

                        <View className="mb-5">
                            <ButtonLogin name="Vérifier" load={loading} />
                        </View>
                    </ScrollView>
                </View>
        </View>
        </SafeAreaView>
    )
}

export default Forgot