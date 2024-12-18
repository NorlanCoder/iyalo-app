import { useEffect, useState } from 'react';
import { Text, View, TextInput, ScrollView, Image, TouchableOpacity, SafeAreaView, ActivityIndicator} from 'react-native'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker'
import moment from 'moment';
import { Dialog, } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import Header from '../../components/Header';
import { apiURL } from '../../api/api';
import { baseURL } from '../../api/api';

export default function UpdatePropertie(props){
    const navigation = useNavigation();

    const item = props.route.params.item;

    const location = useSelector((state) => state.appReducer.location)
    const token = useSelector((state) => state.userReducer.token)

    const [image, setImage] = useState({
        name: "",
        uri: item.cover_url,
        type: 'image/jpeg'
    });
    const [image0, setImage0] = useState({
        name: "",
        uri: item.media[0],
        type: 'image/jpeg'
    });
    const [image1, setImage1] = useState({
        name: "",
        uri: item.media[1],
        type: 'image/jpeg'
    });
    const [image2, setImage2] = useState({
        name: "",
        uri: item.media[2],
        type: 'image/jpeg'
    });
    const [image3, setImage3] = useState({
        name: "",
        uri: item.media[3],
        type: 'image/jpeg'
    });
    const [catVal, setCatVal] = useState(item.category_id);
    const [frequency, setFrequency] = useState(item.frequency);
    const [choix, setChoix] = useState(null);
    const [imgCoverErr, setImgCoverErr] = useState('')
    const [imgErr, setImgErr] = useState("")
    const [catErr, setCatErr] = useState("")
    const [freqErr, setFreqErr] = useState("")
    const [loading, setLoading] = useState(false);
    const [selectValue, setSelectValue] = useState({
        categorie: item.category_id,
        categorie_id: item.category_id
    })
    const [selectValue2, setSelectValue2] = useState({
        frequency: item.frequency,
        frequency_id: ""
    })
    const [categorie, setCategorie] = useState([]);
    const [visible, setVisible] = useState(false);

    const [imgChange, setImgChange] = useState(false);
    const [imgChange0, setImgChange0] = useState(false);
    const [imgChange1, setImgChange1] = useState(false);
    const [imgChange2, setImgChange2] = useState(false);
    const [imgChange3, setImgChange3] = useState(false);

    const hideDialog = () => setVisible(false);

    const getCategorie = async () => {
        await fetch(apiURL + 'list/category/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: 'Bearer ' + user.token
            }
        })
        .then(response => response.json())
        .then(res => {
        //   console.log(res)
          setCategorie(res.data)
        })
        .catch( (e) => {
            console.log(e);
        })
    }

    useEffect(() => {
        getCategorie();
    }, [])

    const onOpen = (img) => {
        setChoix(img)
        setVisible(true)
    };

    const FREQUENCE = [
        {
            id: 'A001',
            label: 'Jour',
            value: 'daily'
        },
        {
            id: 'A002',
            label: 'Mois',
            value: 'monthly'
        },
        {
            id: 'A003',
            label: 'Année',
            value: 'yearly'
        },
    ]

    const formValidation = Yup.object().shape({
        label: Yup
            .string()
            .required('Ajouter un label')
            .min(3, ({min}) => `Le label doit contenir au moins ${min} caratères`),
        city: Yup
            .string()
            .required("Ajouter une ville"),
        district: Yup
            .string()
            .required('Ajouter un quartier'),
        country: Yup
            .string()
            .required('Ajouter un pays'),
        rooms: Yup
            .string()
            .required('Ajouter le nombre de chambre'),
        bathrooms: Yup
            .string()
            .required('Ajouter le nombre de douche'),
        lounges: Yup
            .string()
            .required('Ajouter le nombre de séjour'),
        swingpools: Yup
            .string()
            .required('Ajouter le nombre de piscine'),
        prices: Yup
            .string()
            .required('Ajouter un prix'),
        visitePrices: Yup
            .string()
            .required('Ajouter un prix de visite'),
        // equipement: Yup
        //     .string()
        //     .required('Ajouter les équipements'),
        conditions: Yup
            .string()
            .required('Ajouter les conditions'),
        description: Yup
            .string()
            .required('Ajouter une description'),
    })

    const pickImage = async (img) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0.2,
            // base64: true
        });
        setVisible(false);

        // console.log(result.assets)

        if(result.canceled){

        }else{
            if(img === 0){
                setImage({
                    name: result.assets[0].fileName,
                    uri: result.assets[0].uri,
                    type: result.assets[0].type,
                })
                setImgChange(true)
            }else if(img === 1){
                setImage0({
                    name: result.assets[0].fileName,
                    uri: result.assets[0].uri,
                    type: result.assets[0].type,
                })
                setImgChange0(true)
            }else if(img === 2){
                setImage1({
                    name: result.assets[0].fileName,
                    uri: result.assets[0].uri,
                    type: result.assets[0].type,
                })
                setImgChange1(true)
            }else if(img === 3){
                setImage2({
                    name: result.assets[0].fileName,
                    uri: result.assets[0].uri,
                    type: result.assets[0].type,
                })
                setImgChange2(true)
            }else{
                setImage3({
                    name: result.assets[0].fileName,
                    uri: result.assets[0].uri,
                    type: result.assets[0].type,
                })
                setImgChange3(true)
            }
        }
    };

    const takeImage = async (img) => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0.2,
            // base64: true
        });
        setVisible(false);

        console.log(result.assets)

        if(result.canceled){

        }else{
            if(img === 0){
                setImage({
                    name: result.assets[0].fileName,
                    uri: result.assets[0].uri,
                    type: result.assets[0].type,
                })
                setImgChange(true)
            }else if(img === 1){
                setImage0({
                    name: result.assets[0].fileName,
                    uri: result.assets[0].uri,
                    type: result.assets[0].type,
                })
                setImgChange0(true)
            }else if(img === 2){
                setImage1({
                    name: result.assets[0].fileName,
                    uri: result.assets[0].uri,
                    type: result.assets[0].type,
                })
                setImgChange1(true)
            }else if(img === 3){
                setImage2({
                    name: result.assets[0].fileName,
                    uri: result.assets[0].uri,
                    type: result.assets[0].type,
                })
                setImgChange2(true)
            }else{
                setImage3({
                    name: result.assets[0].fileName,
                    uri: result.assets[0].uri,
                    type: result.assets[0].type,
                })
                setImgChange3(true)
            }
        }
    };

    const supPhot = (img) => {
        if(img === 0){
            setImage({
                name: "",
                uri: "",
                type: "",
            });
            setVisible(false);
            setImgChange(false)
        }else if(img === 1){
            setImage0({
                name: "",
                uri: "",
                type: "",
            });
            setVisible(false);
            setImgChange0(false)
        }else if(img === 2){
            setImage1({
                name: "",
                uri: "",
                type: "",
            });
            setVisible(false);
            setImgChange1(false)
        }else if(img === 3){
            setImage2({
                name: "",
                uri: "",
                type: "",
            });
            setVisible(false);
            setImgChange2(false)
        }else{
            setImage3({
                name: "",
                uri: "",
                type: "",
            });
            setVisible(false);
            setImgChange3(false)
        }
    }

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <Header title={"Modifier une propriété"} />

            <ScrollView contentContainerStyle={{paddingBottom: 90}} showsVerticalScrollIndicator={false} >
                <Formik
                    validationSchema={formValidation}
                    initialValues={{label: item.label, city: item.city, district: item.district, country: item.country, rooms: item.room, bathrooms: item.bathroom, lounges: item.lounge, swingpools: item.swingpool, prices: item.price, visitePrices: item.visite_price, conditions: item.conditions, description: item.description}}
                    onSubmit={values => {
                        // console.log(values)
                        if(catVal === "" ){
                            setCatErr('Ajouter une catégorie')
                            setLoading(false)
                            return
                        }

                        setCatErr(null);

                        if(!frequency.length ){
                            setFreqErr('Ajouter une fréquence')
                            setLoading(false)
                            return
                        }

                        setFreqErr(null)

                        // console.log('vdvdfbdf', image)

                        if(image.uri === ""){
                            setImgCoverErr('Ajouter une image pour le cover')
                            setLoading(false)
                            return
                        }

                        setImgCoverErr(null)

                        if(image0.uri === null){
                            setImgErr('Ajouter des images')
                            setLoading(false)
                            return
                        }

                        if(image1.uri === null){
                            setImgErr('Ajouter des images')
                            setLoading(false)
                            return
                        }

                        if(image2.uri === null){
                            setImgErr('Ajouter des images')
                            setLoading(false)
                            return
                        }

                        if(image3.uri === null){
                            setImgErr('Ajouter des images')
                            setLoading(false)
                            return
                        }
                        
                        setImgErr(null);

                        setLoading(true);

                        // console.log(values)

                        const imagesToSend = [];

                        if(image0.uri !== ""){
                            if(image0.uri.includes('file')){
                                imagesToSend.push({
                                    name: image0.name,
                                    uri: image0.uri,
                                    type: 'image/jpeg',
                                })
                            }else{
                                imagesToSend.push(image0.uri)
                            }
                        }

                        if(image1.uri !== ""){
                            if(image1.uri.includes('file')){
                                imagesToSend.push({
                                    name: image1.name,
                                    uri: image1.uri,
                                    type: 'image/jpeg',
                                })
                            }else{
                                imagesToSend.push(image1.uri)
                            }
                        }

                        if(image2.uri !== ""){
                            if(image2.uri.includes('file')){
                                imagesToSend.push({
                                    name: image2.name,
                                    uri: image2.uri,
                                    type: 'image/jpeg',
                                })
                            }else{
                                imagesToSend.push(image2.uri)
                            }
                        }

                        if(image3.uri !== ""){
                            if(image3.uri.includes('file')){
                                imagesToSend.push({
                                    name: image3.name,
                                    uri: image3.uri,
                                    type: 'image/jpeg',
                                })
                            }else{
                                imagesToSend.push(image3.uri)
                            }
                        }

                        const dataToSend = new FormData();

                        dataToSend.append('label', values.label);
                        dataToSend.append('category_id', catVal);
                        dataToSend.append('price', values.prices);
                        dataToSend.append('frequency', frequency);
                        dataToSend.append('city', values.city);
                        dataToSend.append('country', values.country);
                        dataToSend.append('district', values.district);
                        dataToSend.append('long', location.longitude);
                        dataToSend.append('lat', location.latitude);
                        dataToSend.append('description', values.description);
                        dataToSend.append('room', values.rooms);
                        dataToSend.append('bathroom', values.bathrooms);
                        dataToSend.append('lounge', values.lounges);
                        dataToSend.append('swingpool', values.swingpools);
                        dataToSend.append('visite_price', values.visitePrices);
                        dataToSend.append('conditions', values.conditions);
                        dataToSend.append('device', "FCFA");
                        if(image !== ""){
                            if(image.uri.includes('file')){
                                dataToSend.append('cover', {
                                    name: image.name,
                                    uri: image.uri,
                                    type: 'image/jpeg',
                                });
                            }else{
                                dataToSend.append('cover', image.uri);
                            }
                        }
                        
                        imagesToSend.forEach(image => {
                            dataToSend.append('images[]', image);
                        })

                        fetch(apiURL+'announcer/property/'+item.id+'/update', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                // 'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + token
                            },
                            body: dataToSend
                        })
                        .then(response => response.json())
                        .then(res => {
                            // console.log(token)
                            // console.log('>>>>>>>>>>>>>>>>>>>', res)
                            if(res.status === 200){
                                setLoading(false);
                                console.log('>>>>>>>>>1>>>>>>>>>>', res.message)
                                // showMessage({
                                //     message: "Succès",
                                //     description: res.message,
                                //     type: "success",
                                // });
                                navigation.goBack();
                            }else{
                                setLoading(false);
                                console.log('>>>>>>>>>2>>>>>>>>>>', res)
                                // showMessage({
                                //     message: "Erreur",
                                //     description: res.message,
                                //     type: "danger",
                                // });
                            }

                            if(res.message === "Unauthenticated."){
                                // dispatch({ type: DECONNEXION, value: true});
                                // dispatch({ type: DECONNEXIONDATA, value: true});
                                // dispatch({type: SWITCHAUTHSCREEN, value: "Login"})
                            }
                        })
                        .catch(e => {
                            console.log(e)
                            setLoading(false);
                            // console.log('>>>>>>>>>3>>>>>>>>>>', res.messag)
                            // showMessage({
                            //     message: "Erreur",
                            //     description: "Erreur de connexion",
                            //     type: "danger",
                            // });
                        })
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values, errors, isValid}) => (
                        <View>
                            <View className="h-24 mx-4 my-1 justify-center">
                                <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Label</Text>

                                <View style={{borderWidth: 0.7}} className={`h-12 rounded-lg  border-secondary`}>
                                    <TextInput
                                        className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                        placeholder="Label"
                                        placeholderTextColor={'gray'}
                                        autoCapitalize='sentences'
                                        textContentType="username"
                                        keyboardType="default"
                                        onChangeText={handleChange('label')}
                                        onBlur={handleBlur('label')}
                                        value={values.label}
                                    />
                                </View>
                                {errors.label &&
                                    <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{errors.label}</Text>
                                }
                            </View>

                            <View className="h-24 mx-4 my-1 justify-center">
                                <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Quartier</Text>

                                <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg  border-secondary">
                                    <TextInput
                                        className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                        placeholder="Quartier"
                                        placeholderTextColor={'gray'}
                                        autoCapitalize="sentences"
                                        textContentType="addressCityAndState"
                                        keyboardType="default"
                                        onChangeText={handleChange('district')}
                                        onBlur={handleBlur('district')}
                                        value={values.district}
                                    />
                                </View>
                                {errors.district &&
                                    <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{errors.district}</Text>
                                }
                            </View>

                            <View className="h-24 mx-4 my-1 justify-center">
                                <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Ville</Text>

                                <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg  border-secondary">
                                    <TextInput
                                        className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                        placeholder="Ville"
                                        placeholderTextColor={'gray'}
                                        autoCapitalize="sentences"
                                        textContentType="addressCityAndState"
                                        keyboardType="default"
                                        onChangeText={handleChange('city')}
                                        onBlur={handleBlur('city')}
                                        value={values.city}
                                    />
                                </View>
                                {errors.city &&
                                    <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{errors.city}</Text>
                                }
                            </View>

                            <View className="h-24 mx-4 my-1 justify-center">
                                <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Pays</Text>

                                <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg  border-secondary">
                                    <TextInput
                                        className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                        placeholder="Pays"
                                        placeholderTextColor={'gray'}
                                        autoCapitalize="sentences"
                                        textContentType="addressCityAndState"
                                        keyboardType="default"
                                        onChangeText={handleChange('country')}
                                        onBlur={handleBlur('country')}
                                        value={values.country}
                                    />
                                </View>
                                {errors.country &&
                                    <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{errors.country}</Text>
                                }
                            </View>

                            <View className="h-24 mx-4 my-1 justify-center">
                                <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Catégorie</Text>

                                <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg  border-secondary">
                                    <Picker
                                        selectedValue={selectValue.categorie}
                                        style={{borderRadius: 5, width: '100%', alignSelf: 'center', justifyContent: 'center',}}
                                        itemStyle={{height: 140, fontSize: 16, color: '#71B486', borderRadius: 5, }}
                                        onValueChange={(itemValue, id) => {
                                            console.log(itemValue, id)
                                                setSelectValue({
                                                    categorie: itemValue,
                                                    categorie_id: itemValue
                                                });
                                                setCatVal(itemValue)
                                            }
                                        }
                                    >
                                        <Picker.Item key="0" label="----- Choisir une categorie -----" value="" id="0" itemStyle ={{fontFamily: 'PoppinsRegular'}} />
                                        {
                                            categorie.map(item => <Picker.Item key={item.id} label={item.label} value={item.id} id={item.id} itemStyle ={{fontFamily: 'PoppinsRegular'}} />)   
                                        }
                                    </Picker>
                                </View>
                                {catErr &&
                                    <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{catErr}</Text>
                                }
                            </View>

                            <View className="flex flex-row w-full h-24">
                                <View style={{flex: 0.5}} className="h-24 mx-4 my-1 justify-center">
                                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Nombre de chambre</Text>

                                    <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg  border-secondary">
                                        <TextInput
                                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                            placeholder="0"
                                            placeholderTextColor={'gray'}
                                            textContentType="telephoneNumber"
                                            keyboardType="phone-pad"
                                            onChangeText={handleChange('rooms')}
                                            onBlur={handleBlur('rooms')}
                                            value={`${values.rooms}`}
                                        />
                                    </View>
                                    {errors.rooms &&
                                        <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{errors.rooms}</Text>
                                    }
                                </View>

                                <View style={{flex: 0.5}} className="h-24 mx-4 my-1 justify-center">
                                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Nombre de douche</Text>

                                    <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg  border-secondary">
                                        <TextInput
                                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                            placeholder="0"
                                            placeholderTextColor={'gray'}
                                            textContentType="telephoneNumber"
                                            keyboardType="phone-pad"
                                            onChangeText={handleChange('bathrooms')}
                                            onBlur={handleBlur('bathrooms')}
                                            value={`${values.bathrooms}`}
                                        />
                                    </View>
                                    {errors.bathrooms &&
                                        <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{errors.bathrooms}</Text>
                                    }
                                </View>
                            </View>

                            <View className="flex flex-row w-full h-24">
                                <View style={{flex: 0.5}} className="h-24 mx-4 my-1 justify-center">
                                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Nombre de salon</Text>

                                    <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg  border-secondary">
                                        <TextInput
                                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                            placeholder="0"
                                            placeholderTextColor={'gray'}
                                            textContentType="telephoneNumber"
                                            keyboardType="phone-pad"
                                            onChangeText={handleChange('lounges')}
                                            onBlur={handleBlur('lounges')}
                                            value={`${values.lounges}`}
                                        />
                                    </View>
                                    {errors.lounges &&
                                        <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{errors.lounges}</Text>
                                    }
                                </View>

                                <View style={{flex: 0.5}} className="h-24 mx-4 my-1 justify-center">
                                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Nombre de piscine</Text>

                                    <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg  border-secondary">
                                        <TextInput
                                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                            placeholder="0"
                                            placeholderTextColor={'gray'}
                                            textContentType="telephoneNumber"
                                            keyboardType="phone-pad"
                                            onChangeText={handleChange('swingpools')}
                                            onBlur={handleBlur('swingpools')}
                                            value={`${values.swingpools}`}
                                        />
                                    </View>
                                    {errors.swingpools &&
                                        <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{errors.swingpools}</Text>
                                    }
                                </View>
                            </View>

                            <View className="flex flex-row w-full">
                                <View style={{flex: 0.5}} className="h-24 mx-4 my-1 justify-center">
                                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Prix</Text>

                                    <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg  border-secondary">
                                        <TextInput
                                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                            placeholder="0"
                                            placeholderTextColor={'gray'}
                                            textContentType="telephoneNumber"
                                            keyboardType="phone-pad"
                                            onChangeText={handleChange('prices')}
                                            onBlur={handleBlur('prices')}
                                            value={`${values.prices}`}
                                        />
                                    </View>
                                    {errors.prices &&
                                        <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{errors.prices}</Text>
                                    }
                                </View>

                                <View style={{flex: 0.5}} className="h-24 mx-4 my-1 justify-center">
                                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Fréquence</Text>

                                    <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg  border-secondary">
                                        <Picker
                                            selectedValue={selectValue2.frequency}
                                            style={{borderRadius: 5, width: '100%', alignSelf: 'center', justifyContent: 'center',}}
                                            itemStyle={{height: 140, fontSize: 16, color: '#71B486', borderRadius: 5, }}
                                            onValueChange={(itemValue, id) => {
                                                console.log(itemValue, id)
                                                    setSelectValue2({
                                                        frequency: itemValue,
                                                        frequency_id: itemValue
                                                    });
                                                    setFrequency(itemValue)
                                                }
                                            }
                                        >
                                            <Picker.Item key="0" label="----- Choisir une fréquence -----" value="" id="0" itemStyle ={{fontFamily: 'PoppinsRegular'}} />
                                            {
                                                FREQUENCE.map(item => <Picker.Item key={item.id} label={item.label} value={item.value} id={item.label} itemStyle ={{fontFamily: 'PoppinsRegular'}} />)   
                                            }
                                        </Picker>
                                    </View>
                                    {freqErr &&
                                        <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{freqErr}</Text>
                                    }
                                </View>
                            </View>

                            <View className="h-24 mx-4 my-1 justify-center">
                                <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Prix de visite</Text>

                                <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg  border-secondary">
                                    <TextInput
                                        className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                        placeholder="0"
                                        placeholderTextColor={'gray'}
                                        textContentType="telephoneNumber"
                                        keyboardType="phone-pad"
                                        onChangeText={handleChange('visitePrices')}
                                        onBlur={handleBlur('visitePrices')}
                                        value={`${values.visitePrices}`}
                                    />
                                </View>
                                {errors.visitePrices &&
                                    <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{errors.visitePrices}</Text>
                                }
                            </View>

                            {/* <View className="h-34 mx-4 my-1">
                                <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Equipements</Text>

                                <View style={{borderWidth: 0.7,}} className="h-16 rounded-lg  border-secondary">
                                    <TextInput
                                        className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                        // value='Lorem Ipsum'
                                        placeholder="équipements"
                                        placeholderTextColor={'gray'}
                                        autoCapitalize="sentences"
                                        textContentType="username"
                                        keyboardType="default"
                                        multiline={true}
                                        maxLength={5000}
                                        onChangeText={handleChange('equipement')}
                                        onBlur={handleBlur('equipement')}
                                        value={values.equipement}
                                    />
                                </View>
                                {errors.equipement &&
                                    <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{errors.equipement}</Text>
                                }
                            </View> */}

                            <View className="h-38 mx-4 my-1">
                                <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Condition</Text>

                                <View style={{borderWidth: 0.7,}} className="h-28 rounded-lg  border-secondary">
                                    <TextInput
                                        className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                        placeholder="conditions"
                                        placeholderTextColor={'gray'}
                                        autoCapitalize="sentences"
                                        textContentType="username"
                                        keyboardType="default"
                                        multiline={true}
                                        maxLength={5000}
                                        onChangeText={handleChange('conditions')}
                                        onBlur={handleBlur('conditions')}
                                        value={values.conditions}
                                    />
                                </View>
                                {errors.conditions &&
                                    <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{errors.conditions}</Text>
                                }
                            </View>

                            <View className="h-38 mx-4 my-1">
                                <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Description</Text>

                                <View style={{borderWidth: 0.7}} className="h-28 rounded-lg  border-secondary">
                                    <TextInput
                                        className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                        placeholder="description"
                                        placeholderTextColor={'gray'}
                                        autoCapitalize="sentences"
                                        textContentType="username"
                                        keyboardType="default"
                                        multiline={true}
                                        maxLength={5000}
                                        onChangeText={handleChange('description')}
                                        onBlur={handleBlur('description')}
                                        value={values.description}
                                    />
                                </View>
                                {errors.description &&
                                    <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{errors.description}</Text>
                                }
                            </View>

                            <View className="h-28 mx-4 my-4 justify-center">
                                <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Image de couverture</Text>

                                <TouchableOpacity onPress={() => onOpen(0)} style={{borderWidth: 0.7,}} className="h-28 rounded-lg  border-secondary justify-center items-center">
                                    {
                                        image.uri !== ""?
                                        <Image source={imgChange? {uri: image.uri} : {uri: baseURL+`${image.uri}`}} resizeMode='cover' className="rounded-lg h-full w-full" />
                                        :
                                        <Feather name='camera' size={40} color={"#6C5248"}/>
                                    } 
                                </TouchableOpacity>
                                {imgCoverErr &&
                                    <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{imgCoverErr}</Text>
                                }
                            </View>

                            <View className="h-38 mx-4 my-1">
                                <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Image</Text>

                                <View className="flex-row justify-between">
                                    <TouchableOpacity onPress={() => onOpen(1)} style={{borderWidth: 0.7,}} className="h-20 w-20 rounded-lg  border-secondary justify-center items-center">
                                        {
                                            image0.uri !== ""?
                                            <Image source={imgChange0? {uri: image0.uri} : {uri: baseURL+`${image0.uri}`}} resizeMode='cover' className="h-20 w-20 rounded-lg" />
                                            :
                                            <Feather name='camera' size={40} color={"#6C5248"}/>
                                        } 
                                    </TouchableOpacity>
                
                                    <TouchableOpacity onPress={() => onOpen(2)} style={{borderWidth: 0.7,}} className="h-20 w-20 rounded-lg  border-secondary justify-center items-center">
                                        {
                                            image1.uri !== ""?
                                            <Image source={imgChange1? {uri: image1.uri} : {uri: baseURL+`${image1.uri}`}} resizeMode='cover' className="h-20 w-20 rounded-lg" />
                                            :
                                            <Feather name='camera' size={40} color={"#6C5248"}/>
                                        } 
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => onOpen(3)} style={{borderWidth: 0.7,}} className="h-20 w-20 rounded-lg  border-secondary justify-center items-center">
                                        {
                                            image2.uri !== ""?
                                            <Image source={imgChange2? {uri: image2.uri} : {uri: baseURL+`${image2.uri}`}} resizeMode='cover' className="h-20 w-20 rounded-lg" />
                                            :
                                            <Feather name='camera' size={40} color={"#6C5248"}/>
                                        } 
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => onOpen(4)} style={{borderWidth: 0.7,}} className="h-20 w-20 rounded-lg  border-secondary justify-center items-center">
                                        {
                                            image3.uri !== ""?
                                            <Image source={imgChange3? {uri: image3.uri} : {uri: baseURL+`${image3.uri}`}} resizeMode='cover' className="h-20 w-20 rounded-lg" />
                                            :
                                            <Feather name='camera' size={40} color={"#6C5248"}/>
                                        } 
                                    </TouchableOpacity>
                                </View>
                                {imgErr &&
                                    <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{imgErr}</Text>
                                }
                            </View>

                            <TouchableOpacity onPress={handleSubmit} className="h-12 w-52 bg-secondary m-4 self-center rounded-lg justify-center items-center">
                                {
                                    loading? 
                                    <ActivityIndicator size={20} color="#fff" />
                                    :
                                    <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[#FFFFFF] text-[16px] ">Modifier</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </ScrollView>

            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Choisir une image</Dialog.Title>
                <Dialog.Content>
                    <View style={{height: 120, flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => {takeImage(choix)}}  style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            {/* <Icon name='camera' type='ant-design' size={30} color="black"/> */}
                            <Image className="h-14 w-14 self-center opacity-80" source={require("../../assets/camera.png")}/>
                            <Text style={{marginTop: 10, fontFamily: 'PoppinsRegular'}} >Appareil photo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() =>{pickImage(choix)}} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Image className="h-14 w-14 self-center opacity-80" source={require('../../assets/image-gallery.png')}/>
                            {/* <MaterialIcons name="photo-library" size={30} color="black" /> */}
                            <Text style={{marginTop: 10, fontFamily: 'PoppinsRegular'}}>Gallerie</Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => supPhot(choix)} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Image className="h-14 w-14 self-center opacity-80" source={require("../../assets/delete.png")}/>
                            <Text style={{marginTop: 10, fontFamily: 'PoppinsRegular'}} >Supprimer</Text>
                        </TouchableOpacity>
                    </View>
                </Dialog.Content>
            </Dialog>
        </SafeAreaView>
    )
}