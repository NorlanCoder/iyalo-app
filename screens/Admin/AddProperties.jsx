import { useEffect, useState } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import Animated, {FadeIn} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CATEGORY } from '../../utils/data/categoriedata';
import Header from '../../components/Header';
import { apiURL } from '../../api/api';

export default function AddProperties(){

    const [checked, setChecked] = useState('Vendre');

    const [image, setImage] = useState(null);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [catVal, setCatVal] = useState('');
    const [choix, setChoix] = useState(null);
    const [imgErr, setImgErr] = useState('')
    const [catErr, setCatErr] = useState('')
    const [loading, setLoading] = useState(false);
    const [selectValue, setSelectValue] = useState({
        categorie: "",
        categorie_id: ""
    })
    const [categorie, setCategorie] = useState([]);

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
    }, [])

    const onOpen = (img) => {
        setChoix(img)
        // modalizeRef.current?.open();
    };

    const FREQUENCE = [
        {
            id: 'A001',
            label: 'Jour'
        },
        {
            id: 'A002',
            label: 'Mois'
        }
    ]

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <Header title={"Ajouter une propriété"} />

            <ScrollView contentContainerStyle={{paddingBottom: 90}}>
                <View className="h-24 mx-4 my-1 justify-center">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Label</Text>

                    <View style={{borderWidth: 0.7}} className="h-12 rounded-lg bg-primary/10 border-secondary/30 ">
                        <TextInput
                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                            placeholder="Label"
                            placeholderTextColor={'gray'}
                            autoCapitalize='sentences'
                            textContentType="username"
                            keyboardType="default"
                            // onChangeText={handleChange('nom')}
                            // onBlur={handleBlur('nom')}
                            // value={values.nom}
                        />
                    </View>
                </View>

                <View className="h-24 mx-4 my-1 justify-center">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Quartier</Text>

                    <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg bg-primary/10 border-secondary/30">
                        <TextInput
                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                            placeholder="Quartier"
                            placeholderTextColor={'gray'}
                            autoCapitalize="sentences"
                            textContentType="addressCityAndState"
                            keyboardType="default"
                            // onChangeText={handleChange('adresse')}
                            // onBlur={handleBlur('adresse')}
                            // value={values.adresse}
                        />
                    </View>
                </View>

                <View className="h-24 mx-4 my-1 justify-center">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Ville</Text>

                    <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg bg-primary/10 border-secondary/30">
                        <TextInput
                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                            placeholder="Ville"
                            placeholderTextColor={'gray'}
                            autoCapitalize="sentences"
                            textContentType="addressCityAndState"
                            keyboardType="default"
                            // onChangeText={handleChange('adresse')}
                            // onBlur={handleBlur('adresse')}
                            // value={values.adresse}
                        />
                    </View>
                </View>

                <View className="h-24 mx-4 my-1 justify-center">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Catégorie</Text>

                    <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg bg-primary/10 border-secondary/30">
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
                </View>

                

                <View className="flex flex-row w-full">
                    <View style={{flex: 0.5}} className="h-24 mx-4 my-1 justify-center">
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Nombre de chambre</Text>

                        <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg bg-primary/10 border-secondary/30">
                            <TextInput
                                className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                placeholder="0"
                                placeholderTextColor={'gray'}
                                textContentType="telephoneNumber"
                                keyboardType="phone-pad"
                                // onChangeText={handleChange('nombreChambre')}
                                // onBlur={handleBlur('nombreChambre')}
                                // value={values.nombreChambre}
                            />
                        </View>
                    </View>

                    <View style={{flex: 0.5}} className="h-24 mx-4 my-1 justify-center">
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Nombre de douche</Text>

                        <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg bg-primary/10 border-secondary/30">
                            <TextInput
                                className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                placeholder="0"
                                placeholderTextColor={'gray'}
                                textContentType="telephoneNumber"
                                keyboardType="phone-pad"
                                // onChangeText={handleChange('nombreChambre')}
                                // onBlur={handleBlur('nombreChambre')}
                                // value={values.nombreChambre}
                            />
                        </View>
                    </View>

                    
                </View>

                <View className="flex flex-row w-full">
                    <View style={{flex: 0.5}} className="h-24 mx-4 my-1 justify-center">
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Nombre de salon</Text>

                        <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg bg-primary/10 border-secondary/30">
                            <TextInput
                                className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                placeholder="0"
                                placeholderTextColor={'gray'}
                                textContentType="telephoneNumber"
                                keyboardType="phone-pad"
                                // onChangeText={handleChange('nombreChambre')}
                                // onBlur={handleBlur('nombreChambre')}
                                // value={values.nombreChambre}
                            />
                        </View>
                    </View>

                    <View style={{flex: 0.5}} className="h-24 mx-4 my-1 justify-center">
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Nombre de piscine</Text>

                        <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg bg-primary/10 border-secondary/30">
                            <TextInput
                                className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                placeholder="0"
                                placeholderTextColor={'gray'}
                                textContentType="telephoneNumber"
                                keyboardType="phone-pad"
                                // onChangeText={handleChange('nombreChambre')}
                                // onBlur={handleBlur('nombreChambre')}
                                // value={values.nombreChambre}
                            />
                        </View>
                    </View>

                    
                </View>

                <View className="flex flex-row w-full">
                    <View style={{flex: 0.5}} className="h-24 mx-4 my-1 justify-center">
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Prix</Text>

                        <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg bg-primary/10 border-secondary/30">
                            <TextInput
                                className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                placeholder="0"
                                placeholderTextColor={'gray'}
                                textContentType="telephoneNumber"
                                keyboardType="phone-pad"
                                // onChangeText={handleChange('nombreChambre')}
                                // onBlur={handleBlur('nombreChambre')}
                                // value={values.nombreChambre}
                            />
                        </View>
                    </View>

                    <View style={{flex: 0.5}} className="h-24 mx-4 my-1 justify-center">
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Fréquence</Text>

                        <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg bg-primary/10 border-secondary/30">
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
                                <Picker.Item key="0" label="----- Choisir une fréquence -----" value="" id="0" itemStyle ={{fontFamily: 'PoppinsRegular'}} />
                                {
                                    FREQUENCE.map(item => <Picker.Item key={item.id} label={item.label} value={item.label} id={item.label} itemStyle ={{fontFamily: 'PoppinsRegular'}} />)   
                                }
                            </Picker>
                        </View>
                    </View>

                    
                </View>

                
                <View className="h-24 mx-4 my-1 justify-center">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Prix de visite</Text>

                    <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg bg-primary/10 border-secondary/30">
                        <TextInput
                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                            placeholder="0"
                            placeholderTextColor={'gray'}
                            textContentType="telephoneNumber"
                            keyboardType="phone-pad"
                            // onChangeText={handleChange('nombreChambre')}
                            // onBlur={handleBlur('nombreChambre')}
                            // value={values.nombreChambre}
                        />
                    </View>
                </View>

                <View className="h-34 mx-4 my-1">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Equipements</Text>

                    <View style={{borderWidth: 0.7,}} className="h-16 rounded-lg bg-primary/10 border-secondary/30">
                        <TextInput
                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                            // value='Lorem Ipsum'
                            placeholder="équipements"
                            placeholderTextColor={'gray'}
                            autoCapitalize="sentences"
                            textContentType="username"
                            keyboardType="default"
                            multiline={true}
                            // maxLength={5000}
                            // onChangeText={handleChange('equipement')}
                            // onBlur={handleBlur('equipement')}
                            // value={values.equipement}
                        />
                    </View>
                </View>

                <View className="h-38 mx-4 my-1">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Condition</Text>

                    <View style={{borderWidth: 0.7,}} className="h-28 rounded-lg bg-primary/10 border-secondary/30">
                        <TextInput
                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                            placeholder="conditions"
                            placeholderTextColor={'gray'}
                            autoCapitalize="sentences"
                            textContentType="username"
                            keyboardType="default"
                            multiline={true}
                            // maxLength={5000}
                            // onChangeText={handleChange('condition')}
                            // onBlur={handleBlur('condition')}
                            // value={values.condition}
                        />
                    </View>
                </View>

                <View className="h-38 mx-4 my-1">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Description</Text>

                    <View style={{borderWidth: 0.7}} className="h-28 rounded-lg bg-primary/10 border-secondary/30">
                        <TextInput
                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                            placeholder="description"
                            placeholderTextColor={'gray'}
                            autoCapitalize="sentences"
                            textContentType="username"
                            keyboardType="default"
                            multiline={true}
                            // maxLength={5000}
                            // onChangeText={handleChange('description')}
                            // onBlur={handleBlur('description')}
                            // value={values.description}
                        />
                    </View>
                </View>

                <View className="h-28 mx-4 my-4 justify-center">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Image de couverture</Text>

                    <TouchableOpacity onPress={() => onOpen(1)} style={{borderWidth: 0.7,}} className="h-28 rounded-lg bg-primary/10 border-secondary/30 justify-center items-center">
                        {
                            image !== null?
                            <Image source={{uri: image}} resizeMode='cover' className="h-20 w-20 rounded-lg" />
                            :
                            <Feather name='camera' size={40} color={"#00ddb3"}/>
                        } 
                    </TouchableOpacity>
                </View>

                <View className="h-38 mx-4 my-1">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Image</Text>

                    <View className="flex-row justify-between">
                        <TouchableOpacity onPress={() => onOpen(1)} style={{borderWidth: 0.7,}} className="h-20 w-20 rounded-lg bg-primary/10 border-secondary/30 justify-center items-center">
                            {
                                image !== null?
                                <Image source={{uri: image}} resizeMode='cover' className="h-20 w-20 rounded-lg" />
                                :
                                <Feather name='camera' size={40} color={"#00ddb3"}/>
                            } 
                        </TouchableOpacity>
    
                        <TouchableOpacity onPress={() => onOpen(2)} style={{borderWidth: 0.7,}} className="h-20 w-20 rounded-lg bg-primary/10 border-secondary/30 justify-center items-center">
                            {
                                image1 !== null?
                                <Image source={{uri: image1}} resizeMode='cover' className="h-20 w-20 rounded-lg" />
                                :
                                <Feather name='camera' size={40} color={"#00ddb3"}/>
                            } 
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => onOpen(3)} style={{borderWidth: 0.7,}} className="h-20 w-20 rounded-lg bg-primary/10 border-secondary/30 justify-center items-center">
                            {
                                image2 !== null?
                                <Image source={{uri: image2}} resizeMode='cover' className="h-20 w-20 rounded-lg" />
                                :
                                <Feather name='camera' size={40} color={"#00ddb3"}/>
                            } 
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => onOpen(4)} style={{borderWidth: 0.7,}} className="h-20 w-20 rounded-lg bg-primary/10 border-secondary/30 justify-center items-center">
                            {
                                image3 !== null?
                                <Image source={{uri: image3}} resizeMode='cover' className="h-20 w-20 rounded-lg" />
                                :
                                <Feather name='camera' size={40} color={"#00ddb3"}/>
                            } 
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={() =>{}} className="h-12 w-52 bg-primary m-4 self-center rounded-lg justify-center items-center">
                    {
                        loading? 
                        <ActivityIndicator size={20} color="#fff" />
                        :
                        <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[#FFFFFF] text-[16px] ">Créer</Text>
                    }
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}