import { View, Text, SafeAreaView, useWindowDimensions, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { CATEGORY } from '../../utils/data/categoriedata';
import CategoryComponent from '../../components/Visitor/CategoryComponent';
import PropertyResultComponent from '../../components/Visitor/PropertyResultComponent';
import PubComponent from '../../components/Visitor/PubComponent';
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import { apiURL } from '../../api/api';

const PropertyListCat = (props) => {
    const item = props.route.params.item

    const navigation = useNavigation()

    const {width} = useWindowDimensions()

    const [data, setData] = useState([]);

    const getCatItem = async () => {
        await fetch(apiURL + 'list/category/property/' + item.id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: 'Bearer ' + user.token
            }
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            setData(res.data)
        })
        .catch( (e) => {
            console.log(e);
            // setLoadAlaUne(false)
        })
    }

    const setFavorite = async (id) => {
        console.log(id)
        await fetch(apiURL + 'toggle/favoris/' + user.id + '/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: 'Bearer ' + user.token
            }
        })
        .then(response => response.json())
        .then(res => {
            
        })
        .catch( (e) => {
            console.log(e);
            // setLoadAlaUne(false)
        })
    }

    useEffect(() => {
        getCatItem()
    }, [])

    const rendercategory = ({ item }) => (
        <TouchableOpacity key={item.id} onPress={() => {}}>
            <CategoryComponent name={item.nom} id={item.id_} />
        </TouchableOpacity>
    );

    const renderproperty = ({ item }) => (
        <TouchableOpacity className="flex flex-col items-center" key={item.id} onPress={() => {navigation.navigate('Details', {item: item})}}>
            <PropertyResultComponent item={item} setFavorite={setFavorite} name={item.nom} id={item.id_} />
        </TouchableOpacity>
    );

    const HeaderListComponent = () => {
        return (
            <View>

                {/* En tête */}
                <View className="flex flex-row justify-between items-center px-3 mb-3" style={{width: width }}>
                    <View className='flex flex-row items-center' style={{ alignSelf: 'flex-start'}} >
                        <TouchableOpacity onPress={() =>{navigation.goBack()}} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center" style={{ height: 40, width: 40}}>
                            <Feather name="chevron-left" size={22} color="#555"/>
                        </TouchableOpacity>
                        <Text className="text-lg text-gray-700 font-bold ml-3" style={{fontFamily: 'PoppinsRegular'}}>Bureau</Text>
                    </View>
                    <View className="flex flex-row gap-x-1">
                        <TouchableOpacity onPress={() =>{}} className="h-full w-full bg-secondary rounded-xl items-center justify-center" style={{ height: 40, width: 40,}}>
                            <Feather name="search" size={22} color="#fff"/>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* PUB */}
                <View className='p-4 mx-1 rounded-xl bg-black flex flex-col mb-2'>
                    <View className="flex flex-row gap-x-1 items-center">
                        <Text className="text-white font-bold text-base" style={{fontFamily: 'KeepCalm'}}>Démenagement - Ménage</Text>
                        <MaterialIcons name="cleaning-services" size={15} color="#fff" />
                    </View>
                    <View className="">
                        
                        <Pressable onPress={() =>{}} className="rounded-full w-auto">
                            <Text className="text-white my-1 font-thin text-sm" style={{fontFamily: 'PoppinsRegular'}}>
                                Besoin d'un ménage impeccable ou d'un déménagement sans stress ? Contactez nos experts dès maintenant !
                            </Text>
                            <Text className="text-primary font-bold">Tout voir</Text>
                        </Pressable>
                    </View>
                    
                </View>

                {/* Category List */}
                <View className='flex flex-col my-2'>
                    <FlatList
                        data={CATEGORY}
                        renderItem={rendercategory}
                        horizontal={true}
                        keyExtractor={(item, index) => item.id}
                        showsHorizontalScrollIndicator={false}
                        nestedScrollEnabled
                    />
                </View>


            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-slate-100" style={{width: width}}>
            {/* En tête */}
            <View className="flex flex-row justify-between items-center px-3 mb-2 mt-10" style={{width: width }}>
                <View className='flex flex-row items-center' style={{ alignSelf: 'flex-start'}} >
                    <TouchableOpacity onPress={() =>{navigation.goBack()}} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center" style={{ height: 40, width: 40}}>
                        <Feather name="chevron-left" size={22} color="#555"/>
                    </TouchableOpacity>
                    <Text className="text-lg text-gray-700 font-bold ml-3" style={{fontFamily: 'PoppinsRegular'}}>{item.label}</Text>
                </View>
                <View className="flex flex-row gap-x-1">
                    <TouchableOpacity onPress={() =>{navigation.navigate('Search')}} className="h-full w-full bg-secondary rounded-xl items-center justify-center" style={{ height: 40, width: 40,}}>
                        <Feather name="search" size={22} color="#fff"/>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View className=" px-1 w-screen">

                <FlatList
                    data={data}
                    // ListHeaderComponent={HeaderListComponent}
                    horizontal={false}
                    renderItem={renderproperty}
                    keyExtractor={(item, index) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 100, justifyContent: 'center'}}
                />

            </View>
        </SafeAreaView>
    )
}

export default PropertyListCat