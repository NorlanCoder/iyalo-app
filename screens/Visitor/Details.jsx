import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, Image, ScrollView, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Details(props){
    const navigation = useNavigation();

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <ScrollView className="" showsVerticalScrollIndicator={false}>
                <View className="flex flex-row justify-between relative">
                    <Image source={require('../../assets/IMG-20230904-WA0019.jpg')} className=" h-80 w-screen" />
                    <View className="absolute top-0 left-0 bg-black/40 h-full w-full"></View>
                    <View className="absolute bottom-3 left-2 rounded-full flex flex-col justify-end h-full p-2">
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="text-[13px] text-white">Meublé Fidrissè</Text>
                        <View className="rounded-full bg-terre/60 px-3 py-3 justify-center items-center">
                            <Text numberOfLines={2} style={{fontFamily: 'PoppinsRegular'}} className="text-[13px] text-white">Cotonou - Fidjrossè</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {}} className="absolute bottom-10 right-2 flex items-center justify-center rounded-full">
                        <Octicons name="heart" size={18} color="white" />
                    </TouchableOpacity>
                </View>

                <View className="px-4 pt-4 flex flex-row justify-between items-center">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-lg text-terre3">Appartement - (20.000 XOF) </Text>

                    {/* <TouchableOpacity disabled={true} onPress={() => {}} className="h-10 w-24 items-center justify-center rounded-full bg-primary">
                        <Text style={{fontFamily: 'PoppinsRegular', color: "#53535E"}} className="text-[14px] ">Modifier</Text>
                    </TouchableOpacity> */}
                </View>

                <View className="px-4 pt-4 flex flex-row items-center">
                    <View className="h-8 w-28 items-center justify-center rounded-lg bg-secondary">
                        <Text adjustsFontSizeToFit style={{fontFamily: 'PoppinsRegular', color: "#FFFFFF"}} className="text-[16px] ">20.000 XOF</Text>
                    </View>
                    <Text style={{fontFamily: 'PoppinsRegular', color: "#3D405B"}} className="text-[16px] ml-5">Devise : XOF</Text>
                </View>

                <View className="px-4 mt-4 pt-4 border-t border-t-black/10 flex flex-col">
                    <View className="flex flex-row justify-between items-center my-1">
                        <Text style={{fontFamily: 'PoppinsRegular', color: "#3D405B"}} className="text-[12px]">Publier le 12 Juin 2024 </Text>
                        <View style={{backgroundColor: "#FFFFFF"}} className="h-9 items-center justify-center rounded-lg px-5 border border-secondary/60">
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[14px] text-secondary ">Cotonou - Fidjrossè</Text>
                        </View>
                    </View>
                    
                    <View className="flex flex-row justify-between items-center my-1">
                        <Text style={{fontFamily: 'PoppinsRegular', color: "#3D405B"}} className="text-[12px]">Catégorie </Text>
                        <View style={{borderWidth: 0.7, backgroundColor: "#FFFFFF"}} className="h-9 items-center justify-center rounded-lg px-5 border border-secondary/60">
                            <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[14px] text-secondary">Appartement</Text>
                        </View>
                    </View>
                </View>

                <View className="px-4 mt-4 pt-4 border-t border-t-black/10 flex flex-col">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-xl mb-4 text-mygray">Equipements</Text>
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-semibold text-[13px] text-justify text-dark">2 Chambres, 1 salle de bain</Text>
                </View>

                <View className="px-4 mt-4 pt-4 border-t border-t-black/10 flex flex-col">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-xl mb-4 text-mygray">Description</Text>
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-semibold text-[13px] text-justify text-dark">Appartement meublé avec un staff de luxe à la française.</Text>
                </View>

                <View className="px-4 mt-4 pt-4 border-t border-t-black/10 flex flex-col">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-xl mb-4 text-mygray">Conditions</Text>
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="font-semibold text-[13px] text-justify text-dark">S'aquiter des frais de loyer payer sur un préavis de 6 mois.</Text>
                </View>

                <View className="px-4 border-t border-t-black/10 mb-4 pt-4 flex flex-col">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-xl mb-4">Photos</Text>

                    <View className="flex-row">
                        <TouchableOpacity onPress={() => {}} className="h-24 w-24 bg-slate-800 mr-2">
                            <Image source={require('../../assets/IMG-20230904-WA0019.jpg')} className="h-24 w-24" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} className="h-24 w-24 bg-slate-800 mr-2">
                            <Image source={require('../../assets/IMG-20230904-WA0019.jpg')} className="h-24 w-24" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} className="h-24 w-24 bg-slate-800 mr-2">
                            <Image source={require('../../assets/IMG-20230904-WA0019.jpg')} className="h-24 w-24" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} className="h-24 w-24 bg-slate-800 mr-2">
                            <Image source={require('../../assets/IMG-20230904-WA0019.jpg')} className="h-24 w-24" />
                        </TouchableOpacity>
                    </View>
                    
                </View>

                <View className="px-4 border-t border-t-black/10 mb-4 pt-4 flex flex-col">
                    <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-xl mb-4">Annonceur</Text>
                    <View className="flex flex-row items-center gap-x-5">
                        <Image source={require('../../assets/png-clipart.png')} className='rounded-full h-10 w-10' />
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-semibold text-lg mb-2">John Doe</Text>
                    </View>
                    <View className="flex flex-row items-center mt-4 pl-4 gap-x-5">
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-lg">Tel:</Text>
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-semibold text-[15px]">+22999999999</Text>
                    </View>
                    <View className="flex flex-row items-center my-4 pl-4 gap-x-5">
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-bold text-lg">Email:</Text>
                        <Text numberOfLines={1} style={{fontFamily: 'PoppinsRegular'}} className="font-semibold text-[15px]">johndoe@gmail.com</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => {}} className="h-12 w-52 bg-primary m-4 self-center rounded-lg justify-center items-center">
                    <Text style={{fontFamily: 'PoppinsRegular'}} className="text-[#FFFFFF] text-[18px] ">Réserver</Text>   
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}