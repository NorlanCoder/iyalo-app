import { useEffect, useState } from 'react';
import { Text, View, TextInput, ScrollView, Image, TouchableOpacity, SafeAreaView, ActivityIndicator} from 'react-native'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker'
import { Dialog, } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import Header from '../../components/Header';
import { apiURL } from '../../api/api';
import { GENERAL } from '../../store/reducers/actionName';

export default function AddProperties(){
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const location = useSelector((state) => state.appReducer.location)
    const token = useSelector((state) => state.userReducer.token)

    const [image, setImage] = useState(null);
    const [image0, setImage0] = useState(null);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [imageCover, setImageCover] = useState(null);
    const [catVal, setCatVal] = useState('');
    const [frequency, setFrequency] = useState('');
    const [choix, setChoix] = useState(null);
    const [imgCoverErr, setImgCoverErr] = useState('')
    const [imgErr, setImgErr] = useState("")
    const [catErr, setCatErr] = useState("")
    const [villeErr, setVilleErr] = useState("")
    const [freqErr, setFreqErr] = useState("")
    const [loading, setLoading] = useState(false);
    const [selectValue, setSelectValue] = useState({
        categorie: "",
        categorie_id: ""
    })
    const [selectValue2, setSelectValue2] = useState({
        frequency: "",
        frequency_id: ""
    })

    const [ville, setVille] = useState("abomey")
    const [listVille, setListVille] = useState([])

    const [categorie, setCategorie] = useState([]);
    const [visible, setVisible] = useState(false);

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

    const getVille = async () => {
        await fetch(apiURL + 'city', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(res => {
          setListVille(res.data)
        })
        .catch( (e) => {
            console.log(e);
        })
    }

    const getBilanGlobal = async () => {
        
        await fetch(apiURL + 'announcer/withdraw/bilan', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(res => {
            // console.log('=======================1', res)
            if(res.status === 200){
                dispatch({type: GENERAL, payload: {
                    properties: res.properties,
                    visits: res.visits,
                    all_cash: res.all_cash,
                    wallet: res.wallet
                }});
                
            }else{
                console.log('error', res)
            }
        })
        .catch( (e) => {
            console.log(e);
        })
    }

    const addProperty = async (id) => {
        console.log(user)
        await fetch(apiURL + 'announcer/property/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + myuser.token
            },
            body
        })
        .then(response => response.json())
        .then(res => {
            onRefresh();
        })
        .catch( (e) => {
            console.log(e);
            // setLoadAlaUne(false)
        })
    }

    useEffect(() => {
        getCategorie();
        getVille()
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
        district: Yup
            .string()
            .required('Ajouter un quartier'),
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

        console.log(result.assets)

        if(result.canceled){

        }else{
            if(img === 0){
                setImage(result.assets[0])
            }else if(img === 1){
                setImage0(result.assets[0])
            }else if(img === 2){
                setImage1(result.assets[0])
            }else if(img === 3){
                setImage2(result.assets[0])
            }else{
                setImage3(result.assets[0])
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
                setImage(result.assets[0])
            }else if(img === 1){
                setImage0(result.assets[0])
            }else if(img === 2){
                setImage1(result.assets[0])
            }else if(img === 3){
                setImage2(result.assets[0])
            }else{
                setImage3(result.assets[0])
            }
        }
    };

    const supPhot = (img) => {
        if(img === 0){
            setImage(null);
            setVisible(false);
        }else if(img === 1){
            setImage0(null);
            setVisible(false);
        }else if(img === 2){
            setImage1(null);
            setVisible(false);
        }else if(img === 3){
            setImage2(null);
            setVisible(false);
        }else{
            setImage3(null);
            setVisible(false);
        }
    }

    useEffect(()=> {
        console.log(location)
    },[])

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <Header title={"Ajouter une propriété"} />

            <ScrollView contentContainerStyle={{paddingBottom: 90}} showsVerticalScrollIndicator={false} >
                <Formik
                    validationSchema={formValidation}
                    initialValues={{label: "", district: "", rooms: "", bathrooms: "", lounges: "", swingpools: "", prices: "", visitePrices: "", conditions: "", description: ""}}
                    onSubmit={values => {

                        if(catVal === "" ){
                            setCatErr('Ajouter une catégorie')
                            setLoading(false)
                            return
                        }

                        setCatErr(null);

                        if(ville === "" ){
                            setVilleErr('Ajouter une ville')
                            setLoading(false)
                            return
                        }

                        setVilleErr(null);

                        if(!frequency.length ){
                            setFreqErr('Ajouter une fréquence')
                            setLoading(false)
                            return
                        }

                        setFreqErr(null)

                        // console.log('vdvdfbdf', image)

                        if(image === null){
                            setImgCoverErr('Ajouter une image pour le cover')
                            setLoading(false)
                            return
                        }

                        setImgCoverErr(null)

                        if(image0 === null){
                            setImgErr('Ajouter des images')
                            setLoading(false)
                            return
                        }

                        if(image1 === null){
                            setImgErr('Ajouter des images')
                            setLoading(false)
                            return
                        }

                        if(image2 === null){
                            setImgErr('Ajouter des images')
                            setLoading(false)
                            return
                        }

                        if(image3 === null){
                            setImgErr('Ajouter des images')
                            setLoading(false)
                            return
                        }
                        
                        setImgErr(null);

                        setLoading(true);

                        console.log(image)

                        const imagesToSend = [];
                        var cover = null, im1={}, im2={}, im3={}, im4={};

                        if(image !== null){
                            cover = {"name": image.fileName, "fileSize": image.fileSize, "height": image.height, "type": image.mimeType, "uri": image.uri, "width": image.width}
                        }


                        if(image0 !== null){
                            imagesToSend.push({
                                name: image0.fileName,
                                uri: image0.uri,
                                type: 'image/jpeg',
                            })
                        }

                        if(image1 !== null){
                            imagesToSend.push(imagesToSend.push({
                                name: image1.fileName,
                                uri: image1.uri,
                                type: 'image/jpeg',
                            }))
                        }
                        
                        if(image2 !== null){
                            imagesToSend.push(imagesToSend.push({
                                name: image2.fileName,
                                uri: image2.uri,
                                type: 'image/jpeg',
                            }))
                        }

                        if(image3 !== null){
                            imagesToSend.push(imagesToSend.push({
                                name: image3.fileName,
                                uri: image3.uri,
                                type: 'image/jpeg',
                            }))
                        }

                        // console.log(im3)

                        const dataToSend = new FormData();

                        dataToSend.append('label', values.label);
                        dataToSend.append('category_id', catVal);
                        dataToSend.append('price', values.prices);
                        dataToSend.append('frequency', frequency);
                        dataToSend.append('city', ville);
                        dataToSend.append('country', 'Bénin');
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
                        dataToSend.append('cover', {
                            name: image.fileName,
                            uri: image.uri,
                            type: 'image/jpeg',
                        });
                        imagesToSend.forEach(image => {
                            dataToSend.append('images[]', image);
                        })

                        fetch(apiURL+'announcer/property/create', {
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
                            console.log('>>>>>>>>>>>>>>>>>>>', res)
                            if(res.status === 200){
                                setLoading(false);
                                console.log('>>>>>>>>>1>>>>>>>>>>', res.message)
                                getBilanGlobal()
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

                                <View style={{borderWidth: 0.7}} className={`h-12 rounded-lg border-secondary`}>
                                    <TextInput
                                        className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                        placeholder="Label"
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

                                <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg border-secondary">
                                    <TextInput
                                        className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                        placeholder="Quartier"
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

                                <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg border-secondary">
                                    <Picker
                                        selectedValue={ville}
                                        style={{borderRadius: 5, width: '100%', alignSelf: 'center', justifyContent: 'center',}}
                                        itemStyle={{height: 140, fontSize: 16, color: '#71B486', borderRadius: 5, }}
                                        onValueChange={(itemValue, id) => {
                                            console.log(itemValue, id)
                                                setVille(itemValue);
                                            }
                                        }
                                    >
                                        {/* <Picker.Item key="0" label="----- Choisir une categorie -----" value="" id="0" itemStyle ={{fontFamily: 'PoppinsRegular'}} /> */}
                                        {
                                            listVille.map(item => <Picker.Item key={item.id} label={item.name} value={item.name} id={item.id} itemStyle ={{fontFamily: 'PoppinsRegular'}} />)   
                                        }
                                    </Picker>
                                </View>
                                {villeErr &&
                                    <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{villeErr}</Text>
                                }
                            </View>

                            <View className="h-24 mx-4 my-1 justify-center">
                                <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Catégorie</Text>

                                <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg border-secondary">
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

                                    <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg border-secondary">
                                        <TextInput
                                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                            placeholder="0"
                                            textContentType="telephoneNumber"
                                            keyboardType="phone-pad"
                                            onChangeText={handleChange('rooms')}
                                            onBlur={handleBlur('rooms')}
                                            value={values.rooms}
                                        />
                                    </View>
                                    {errors.rooms &&
                                        <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{errors.rooms}</Text>
                                    }
                                </View>

                                <View style={{flex: 0.5}} className="h-24 mx-4 my-1 justify-center">
                                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Nombre de douche</Text>

                                    <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg border-secondary">
                                        <TextInput
                                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                            placeholder="0"
                                            textContentType="telephoneNumber"
                                            keyboardType="phone-pad"
                                            onChangeText={handleChange('bathrooms')}
                                            onBlur={handleBlur('bathrooms')}
                                            value={values.bathrooms}
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

                                    <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg border-secondary">
                                        <TextInput
                                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                            placeholder="0"
                                            textContentType="telephoneNumber"
                                            keyboardType="phone-pad"
                                            onChangeText={handleChange('lounges')}
                                            onBlur={handleBlur('lounges')}
                                            value={values.lounges}
                                        />
                                    </View>
                                    {errors.lounges &&
                                        <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{errors.lounges}</Text>
                                    }
                                </View>

                                <View style={{flex: 0.5}} className="h-24 mx-4 my-1 justify-center">
                                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Nombre de piscine</Text>

                                    <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg border-secondary">
                                        <TextInput
                                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                            placeholder="0"
                                            textContentType="telephoneNumber"
                                            keyboardType="phone-pad"
                                            onChangeText={handleChange('swingpools')}
                                            onBlur={handleBlur('swingpools')}
                                            value={values.swingpools}
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

                                    <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg border-secondary">
                                        <TextInput
                                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                            placeholder="0"
                                            textContentType="telephoneNumber"
                                            keyboardType="phone-pad"
                                            onChangeText={handleChange('prices')}
                                            onBlur={handleBlur('prices')}
                                            value={values.prices}
                                        />
                                    </View>
                                    {errors.prices &&
                                        <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{errors.prices}</Text>
                                    }
                                </View>

                                <View style={{flex: 0.5}} className="h-24 mx-4 my-1 justify-center">
                                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Fréquence</Text>

                                    <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg border-secondary">
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

                                <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg border-secondary">
                                    <TextInput
                                        className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                        placeholder="0"
                                        textContentType="telephoneNumber"
                                        keyboardType="phone-pad"
                                        onChangeText={handleChange('visitePrices')}
                                        onBlur={handleBlur('visitePrices')}
                                        value={values.visitePrices}
                                    />
                                </View>
                                {errors.visitePrices &&
                                    <Text className="text-red-500 text-md" style={{ fontFamily: 'PoppinsRegular' }}>{errors.visitePrices}</Text>
                                }
                            </View>

                            {/* <View className="h-34 mx-4 my-1">
                                <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Equipements</Text>

                                <View style={{borderWidth: 0.7,}} className="h-16 rounded-lg border-secondary">
                                    <TextInput
                                        className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                        // value='Lorem Ipsum'
                                        placeholder="équipements
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

                                <View style={{borderWidth: 0.7,}} className="h-28 rounded-lg border-secondary">
                                    <TextInput
                                        className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                        placeholder="conditions"
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

                                <View style={{borderWidth: 0.7}} className="h-28 rounded-lg border-secondary">
                                    <TextInput
                                        className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                        placeholder="description"
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

                                <TouchableOpacity onPress={() => onOpen(0)} style={{borderWidth: 0.7,}} className="h-28 rounded-lg border-secondary justify-center items-center">
                                    {
                                        image !== null?
                                        <Image source={{uri: image.uri}} resizeMode='cover' className="rounded-lg h-full w-full" />
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
                                    <TouchableOpacity onPress={() => onOpen(1)} style={{borderWidth: 0.7,}} className="h-20 w-20 rounded-lg border-secondary justify-center items-center">
                                        {
                                            image0 !== null?
                                            <Image source={{uri: image0.uri}} resizeMode='cover' className="h-20 w-20 rounded-lg" />
                                            :
                                            <Feather name='camera' size={40} color={"#6C5248"}/>
                                        } 
                                    </TouchableOpacity>
                
                                    <TouchableOpacity onPress={() => onOpen(2)} style={{borderWidth: 0.7,}} className="h-20 w-20 rounded-lg border-secondary justify-center items-center">
                                        {
                                            image1 !== null?
                                            <Image source={{uri: image1.uri}} resizeMode='cover' className="h-20 w-20 rounded-lg" />
                                            :
                                            <Feather name='camera' size={40} color={"#6C5248"}/>
                                        } 
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => onOpen(3)} style={{borderWidth: 0.7,}} className="h-20 w-20 rounded-lg border-secondary justify-center items-center">
                                        {
                                            image2 !== null?
                                            <Image source={{uri: image2.uri}} resizeMode='cover' className="h-20 w-20 rounded-lg" />
                                            :
                                            <Feather name='camera' size={40} color={"#6C5248"}/>
                                        } 
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => onOpen(4)} style={{borderWidth: 0.7,}} className="h-20 w-20 rounded-lg border-secondary justify-center items-center">
                                        {
                                            image3 !== null?
                                            <Image source={{uri: image3.uri}} resizeMode='cover' className="h-20 w-20 rounded-lg" />
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
                                    <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[#FFFFFF] text-[16px] ">Créer</Text>
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