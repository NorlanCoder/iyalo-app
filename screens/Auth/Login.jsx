import { StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ButtonLogin from '../../components/Auth/ButtonLogin';
import BlockSocial from '../../components/Auth/BlockSocial';
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();

    const {width} = useWindowDimensions()
    const [passwordSecured, setPasswordSecured] = useState(true)
    const [loading, setLoading] = useState(false);


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
            <ScrollView contentContainerStyle={{justifyContent: 'center', flex: 1}}  automaticallyAdjustKeyboardInsets={true}>
                <View className="mb-5">
                    <Text className="text-primary text-5xl mb-3" style={{fontFamily: 'KeepCalm'}}>Bienvenu</Text>
                    <Text className="text-lg text-gray-400" style={{fontFamily: 'PoppinsRegular'}}>Connectez vous pour accéder à toute nos fonctionnalités</Text>
                </View>

                <View className="mb-10">
                    <View className="flex flex-row items-center px-2 border border-black rounded-xl mb-5">
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

                    <View className="flex flex-row items-center px-2 border border-black rounded-xl mb-5">
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

                        <TouchableOpacity onPress={() => {navigation.navigate('Forgot')}}>
                            <Text className="pl-2 font-extrabold text-primary" style={{fontFamily: 'PoppinsRegular'}}>Mot de passe oublié</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="mb-5">
                        <ButtonLogin name="Se connecter" load={loading} />
                    </View>

                    <View className="flex flex-row justify-between items-center mb-5">
                        <View className="border-b w-2/5 border-gray-200"></View>
                        <Text>OU</Text>
                        <View className="border-b w-2/5 border-gray-200"></View>
                    </View>

                    <View className="w-100 justify-center px-2">
                        <BlockSocial name="Se connecter avec Google" />
                    </View>

                    <View className="flex-row items-center justify-center mt-5">
                        <Text className="font-['PoppinsRegular'] text-[#646982] text-[14px] mr-2">Vous n'avez pas de compte? </Text>
                        
                        <TouchableOpacity onPress={() => {navigation.push('Register')}}>
                            <Text className="font-['PoppinsRegular'] font-extrabold text-primary">Inscrivez-vous</Text>
                        </TouchableOpacity>
            
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