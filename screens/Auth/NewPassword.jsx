import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Feather, Ionicons } from '@expo/vector-icons';
import ButtonLogin from '../../components/Auth/ButtonLogin';
import React, {useState} from 'react'

const NewPassword = () => {

    const [passwordSecured, setPasswordSecured] = useState(true);
    const [loading, setLoading] = useState(false);

    return (
        <SafeAreaView className="flex-1 h-full w-full bg-slate-100">
            <View style={{height: Dimensions.get('window').height*0.32, width:  Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center', alignContent: 'center',}}>

                <Animated.View entering={FadeInUp.delay(200).duration(600).springify()} 
                className='absolute flex flex-row gap-x-3 items-center'
                style={{top: 40, left: 20, alignSelf: 'flex-start'}}
                >
                    <TouchableOpacity onPress={() =>{}} className="h-full w-full bg-gray-600 rounded-md items-center justify-center" style={{ height: 32, width: 32,}}>
                        <Feather name="chevron-left" size={22} color="#fff"/>
                    </TouchableOpacity>
                    <Text className="text-lg text-gray-600 font-bold" style={{fontFamily: 'PoppinsRegular'}}>Réinitialiser mot de passe</Text>
                </Animated.View>
            
                <View className="absolute top-20">
                    <ScrollView contentContainerStyle={{justifyContent: 'center', flex: 1}} className="bg-slate-100 py-10 px-4" automaticallyAdjustKeyboardInsets={true}>
                        <View className=" my-5">
                            <Text className="text-primary text-5xl mb-3 mt-8" style={{fontFamily: 'KeepCalm'}}>Réinitialiser mot de passe ?</Text>
                            <Text className="text-lg text-gray-400" style={{fontFamily: 'PoppinsRegular'}}>Vous êtes à quelques pas d'accéder à nouveau à votre compte.</Text>
                        </View>

                        <View className="flex flex-row items-center px-2 border border-black rounded-xl mb-5">
                            <Ionicons name="lock-closed-outline" size={24} color="black" />
                            <TextInput
                                type="password"
                                autoCapitalize='none'
                                textContentType={'password'}
                                secureTextEntry={passwordSecured}
                                placeholder="Nouveau mot de passe"
                                className=" px-3 py-3 text-lg "
                                style={{fontFamily: 'PoppinsRegular', width: '85%'}}
                            />
                            <TouchableOpacity className=" w-20" onPress={()=>setPasswordSecured(!passwordSecured)}>
                                {
                                    passwordSecured ? 
                                    <Ionicons name="eye-off" size={20} color="black"/>
                                    :
                                    <Ionicons name="eye" size={20} color="black"/>
                                }
                            </TouchableOpacity>
                        </View>

                        <View className="flex flex-row items-center px-2 border border-black rounded-xl mb-5">
                            <Ionicons name="lock-closed-outline" size={24} color="black" />
                            <TextInput
                                type="password"
                                autoCapitalize='none'
                                textContentType={'password'}
                                secureTextEntry={passwordSecured}
                                placeholder="Confirmer mot de passe"
                                className=" px-3 py-3 text-lg "
                                style={{fontFamily: 'PoppinsRegular', width: '85%'}}
                            />
                            <TouchableOpacity className=" w-20" onPress={()=>setPasswordSecured(!passwordSecured)}>
                                {
                                    passwordSecured ? 
                                    <Ionicons name="eye-off" size={20} color="black"/>
                                    :
                                    <Ionicons name="eye" size={20} color="black"/>
                                }
                            </TouchableOpacity>
                        </View>
                        <View className="mb-5">
                            <ButtonLogin name="Changer mot de passe" load={loading} />
                        </View>
                    </ScrollView>
                </View>
                
        </View>
        </SafeAreaView>
    )
}

export default NewPassword