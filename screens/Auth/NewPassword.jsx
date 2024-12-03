import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Feather, Ionicons } from '@expo/vector-icons';
import ButtonLogin from '../../components/Auth/ButtonLogin';
import React, {useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { apiURL } from '../../api/api';

const NewPassword = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const {email} = route.params
    const [passwordSecured, setPasswordSecured] = useState(true);
    const [loading, setLoading] = useState(false);

    const resetValidationSchema = Yup.object().shape({
        password: Yup
          .string()
          .min(8, ({ min }) => `Le mot de passe doit contenir ${min} caractère`)
          .required('Mot de passe obligatoire'),
        confirm: Yup.string()
        .oneOf(
            [Yup.ref('password')],
            'Les mots de passe doivent correspondre',
        )
        .required('La confirmation du mot de passe est requise'),
    })

    const changePassword = async (payload) => {
        setLoading(true)
        console.log(email)
        await fetch(apiURL + 'reset', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + user.token
          },
          body: JSON.stringify({
            email: email,
            password: payload.password,
            confirm: payload.confirm
          })
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            if(res.status===200) {
                navigation.navigate('Login')
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

                        <Formik
                            validationSchema={resetValidationSchema}
                            validateOnChange={false}
                            initialValues={{ confirm: '', password:'' }}
                            onSubmit={values => {
                                setLoading(true);
                                changePassword(values)
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                                <>
                                    {errors.password && (
                                        <Text
                                            className="text-red-500 text-md "
                                            style={{ fontFamily: 'PoppinsRegular' }}
                                        >
                                            {errors.password}
                                        </Text>
                                    )}
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

                                    {errors.confirm && (
                                        <Text
                                            className="text-red-500 text-md "
                                            style={{ fontFamily: 'PoppinsRegular' }}
                                        >
                                            {errors.confirm}
                                        </Text>
                                    )}
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
                                        <ButtonLogin name="Changer mot de passe" press={handleSubmit} load={loading} />
                                </View>
                                </>
                            )}
                        </Formik>
                    </ScrollView>
                </View>
                
        </View>
        </SafeAreaView>
    )
}

export default NewPassword