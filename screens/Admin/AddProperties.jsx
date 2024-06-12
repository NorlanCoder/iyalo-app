import { useState } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import Animated, {FadeIn} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CATEGORY } from '../../utils/data/categoriedata';
import Header from '../../components/Header';

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
    const [categorie, setCategorie] = useState([])
    const [selectValue, setSelectValue] = useState({
        categorie: "",
        categorie_id: ""
    })

    const onOpen = (img) => {
        setChoix(img)
        // modalizeRef.current?.open();
    };

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <Header title={"Ajouter une propriété"} />

            <ScrollView>
                <View className="h-24 mx-4 my-1 justify-center">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Nom</Text>

                    <View style={{borderWidth: 0.7}} className="h-12 rounded-lg bg-primary/10 border-secondary/30 ">
                        <TextInput
                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                            placeholder="nom"
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
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Adresse</Text>

                    <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg bg-primary/10 border-secondary/30">
                        <TextInput
                            className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                            placeholder="adresse"
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
                                CATEGORY.map(item => <Picker.Item key={item.id} label={item.nom} value={item.id} id={item.id} itemStyle ={{fontFamily: 'PoppinsRegular'}} />)   
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
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-[18px] py-2">Prix</Text>

                        <View style={{borderWidth: 0.7,}} className="h-12 rounded-lg bg-primary/10 border-secondary/30">
                            <TextInput
                                className="h-full w-full rounded-lg p-2 font-['PoppinsRegular']"
                                placeholder="0"
                                placeholderTextColor={'gray'}
                                textContentType="telephoneNumber"
                                keyboardType="phone-pad"
                                // onChangeText={handleChange('prix')}
                                // onBlur={handleBlur('prix')}
                                // value={values.prix}
                            />
                        </View>
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

                <View className="mx-20 my-1 flex-row justify-between">
                    <RadioButton.Item
                        label={"Vendre"}
                        value="Vendre"
                        status={ checked === 'Vendre' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('Vendre')}
                        position='leading'
                        color='#00ddb3'
                        uncheckedColor='#00ddb3'
                    />
                    <RadioButton.Item
                        label={"Louer"}
                        value="Louer"
                        status={ checked === 'Louer' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('Louer')}
                        position='leading'
                        color='#00ddb3'
                        uncheckedColor='#00ddb3'
                    />
                    {/* <RadioButton.Item
                        label={"Acheter"}
                        value="Acheter"
                        status={ checked === 'Acheter' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('Acheter')}
                        position='leading'
                        color='#AD5526'
                        uncheckedColor='#AD5526'
                    /> */}
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