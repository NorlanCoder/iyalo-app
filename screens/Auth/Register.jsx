import { StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import ButtonLogin from '../../components/Auth/ButtonLogin';
import BlockSocial from '../../components/Auth/BlockSocial';
import React, {useState} from 'react';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { apiURL } from '../../api/api';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

const Register = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {width} = useWindowDimensions()
    const [passwordSecured, setPasswordSecured] = useState(true)
    const [loading, setLoading] = useState(false);


    const inscription = async (payload) => {
        await fetch(apiURL + 'register', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + user.token
          },
          body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(res => {
            if(res.errors) {
                
                if(res.errors.name) {
                    showMessage({
                        message: "Erreur",
                        description: res.errors.name,
                        type: "danger",
                    });
                }
                else if(res.errors.email) {
                    showMessage({
                        message: "Erreur",
                        description: res.errors.email,
                        type: "danger",
                    });
                }
                else if(res.errors.phone) {
                    showMessage({
                        message: "Erreur",
                        description: res.errors.phone,
                        type: "danger",
                    });
                }
                else if(res.errors.password) {
                    showMessage({
                        message: "Erreur",
                        description: res.errors.password,
                        type: "danger",
                    });
                }
                else if(res.errors.confirm) {
                    showMessage({
                        message: "Erreur",
                        description: res.errors.confirm,
                        type: "danger",
                    });
                }
                else {
                    showMessage({
                        message: "Erreur",
                        description: res.errors,
                        type: "danger",
                    });
                }
                console.log(res);
                
                setLoading(false);
            } else{
                showMessage({
                    message: "Succès",
                    description: "Compte créer avec succès",
                    type: "success",
                });
                // console.log("Compte créer avec succès");
                // console.log(res);

                // dispatch({type: 'AUTHENTICATED', payload: true});
                // dispatch({type: 'USER', payload: res.data.user});
                // dispatch({type: 'SETTOKEN', payload: res.data.token});
                // if(res.data.user.role=="announcer") dispatch({type: ISADMIN, payload: true});
                // navigation.navigate('Tab', { screen: 'Home' })
                navigation.goBack();

                setLoading(false);
            }
            
        })
        .catch( (e) => {
            console.log(e);
        })
    }

    return (
        <SafeAreaView className="flex-1 bg-slate-100" style={{width: width}}>
            <ScrollView contentContainerStyle={{justifyContent: 'center', flex: 1}} className="bg-slate-100 py-10 px-4" automaticallyAdjustKeyboardInsets={true}>
                <View className="mb-5">
                    <Text className="text-primary text-5xl mb-3 mt-8" style={{fontFamily: 'KeepCalm'}}>Créer un compte</Text>
                    <Text className="text-lg text-gray-400" style={{fontFamily: 'PoppinsRegular'}}>Créer votre compte sur IYALO et plonger dans une diversité de biens immmobilier</Text>
                </View>

                <Formik
                    // validationSchema={loginValidationSchema}
                    validateOnChange={false}
                    initialValues={{ name: '', email:'', phone: '', password: '', confirm: '', }}
                    onSubmit={values => {
                        setLoading(true);
                        inscription(values)
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                        <View className="mb-10">

                            <View className="flex flex-row items-center px-2 border border-black rounded-xl mb-5">
                                <Feather name="user" size={24} color="black" />
                                <TextInput
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    autoCapitalize='none'
                                    textContentType='name'
                                    keyboardType='email-address'
                                    placeholder="Nom et Prénoms"
                                    className="w-full px-3 py-3 text-lg"
                                    style={{fontFamily: 'PoppinsRegular'}}
                                />
                            </View>

                            <View className="flex flex-row items-center px-2 border border-black rounded-xl mb-5">
                                <Ionicons name="mail" size={24} color="black" />
                                <TextInput
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    autoCapitalize='none'
                                    textContentType='emailAddress'
                                    keyboardType='email-address'
                                    placeholder="Email"
                                    className="w-full px-3 py-3 text-lg"
                                    style={{fontFamily: 'PoppinsRegular'}}
                                />
                            </View>

                            <View className="flex flex-row items-center px-2 border border-black rounded-xl mb-5">
                                <Feather name="phone" size={24} color="black" />
                                <TextInput
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    value={values.phone}
                                    textContentType='telephoneNumber'
                                    keyboardType='number-pad'
                                    placeholder="Téléphone"
                                    className="w-full px-3 py-3 text-lg"
                                    style={{fontFamily: 'PoppinsRegular'}}
                                />
                            </View>

                            <View className="flex flex-row items-center px-2 border border-black rounded-xl mb-5">
                                <Ionicons name="lock-closed-outline" size={24} color="black" />
                                <TextInput
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
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

                            <View className="flex flex-row items-center px-2 border border-black rounded-xl mb-5">
                                <Ionicons name="lock-closed-outline" size={24} color="black" />
                                <TextInput
                                    onChangeText={handleChange('confirm')}
                                    onBlur={handleBlur('confirm')}
                                    value={values.confirm}
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
                                <ButtonLogin name="S'inscrire" press={handleSubmit} load={loading} />
                            </View>

                            <View className="flex flex-row justify-between items-center mb-5">
                                <View className="border-b w-2/5 border-gray-200"></View>
                                <Text>OU</Text>
                                <View className="border-b w-2/5 border-gray-200"></View>
                            </View>

                            {/* <View className="w-100 justify-center px-2">
                                <BlockSocial name="Google" />
                            </View> */}

                            <View className="flex-row items-center justify-center mt-5">
                                <Text className="font-['PoppinsRegular'] text-[#646982] text-[14px] mr-2">Vous avez déjà un compte? </Text>
                                
                                <TouchableOpacity onPress={() => {navigation.push('Login')}}>
                                    <Text className="font-['PoppinsRegular'] font-extrabold text-[14px] text-primary">Se connecter</Text>
                                </TouchableOpacity>
                    
                            </View>
                            
                        </View>
                    )}
                </Formik>  
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default Register

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