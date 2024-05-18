import { StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ButtonLogin from '../../components/Auth/ButtonLogin';
import React, {useState} from 'react'

const Login = () => {

    const {width} = useWindowDimensions()
    const [passwordSecured, setPasswordSecured] = useState(true)

    function MyCheckbox() {
        const [checked, setChecked] = useState(false);
        return (
          <Pressable
            style={[styles.checkboxBase, checked && styles.checkboxChecked]}
            onPress={() => setChecked(!checked)}>
            {checked && <Ionicons name="checkmark" size={17} color="white" />}
          </Pressable>
          
        );
      }

    return (
        <SafeAreaView className="flex-1 bg-slate-100 py-10 px-4 justify-center" style={{width: width}}>
            <ScrollView className="flex-1 " automaticallyAdjustKeyboardInsets={true}>
                <View className="mb-5">
                    <Text className="text-primary text-5xl mb-3" style={{fontFamily: 'KeepCalm'}}>Welcome</Text>
                    <Text className="text-xl text-gray-400" style={{fontFamily: 'PoppinsRegular'}}>Connectez vous pour accéder à toute les fonctionnalités</Text>
                </View>

                <View className="mb-10">
                    <View className="flex flex-row items-center px-2 border border-black rounded-xl mb-3">
                        <Ionicons name="mail" size={24} color="black" />
                        <TextInput
                            autoCapitalize='none'
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            placeholder="E-mail"
                            className="w-full px-3 py-3 text-lg"
                            style={{fontFamily: 'PoppinsRegular'}}
                        />
                    </View>

                    <View className="flex flex-row items-center px-2 border border-black rounded-xl mb-3">
                        <Ionicons name="lock-closed-outline" size={24} color="black" />
                        <TextInput
                            type="password"
                            autoCapitalize='none'
                            textContentType={'password'}
                            secureTextEntry={passwordSecured}
                            placeholder="Mot de passe"
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

                    <View className="mb-5" style={[styles.checkboxContainer,{justifyContent: 'space-between'}]}>
                        <View className="flex-row items-center">
                            <MyCheckbox />
                            <Text className="pl-2 text-gray-400" style={{fontFamily: 'PoppinsRegular'}}>Se souvenir</Text>
                        </View>
                        <Text className="pl-2 font-extrabold text-primary" style={{fontFamily: 'PoppinsRegular'}}>Mot de passe oublié</Text>
                        
                    </View>

                    <View className="mb-5">
                        <ButtonLogin name="Se connecter" />
                    </View>

                    <View className="flex flex-row justify-between items-center">
                        <View className="border-b w-2/5 border-gray-200"></View>
                        <Text>OU</Text>
                        <View className="border-b w-2/5 border-gray-200"></View>
                    </View>
                    
                </View>

            </ScrollView>
            
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    checkboxBase: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: 'transparent',
        marginLeft: 5
    },
    checkboxChecked: {
        backgroundColor: '#000',
    },
    appContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    appTitle: {
        marginVertical: 16,
        fontWeight: 'bold',
        fontSize: 24,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxLabel: {
      marginLeft: 8,
      fontWeight: '500',
      fontSize: 18,
    }
})