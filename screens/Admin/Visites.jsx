import { useState } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, {FadeIn} from 'react-native-reanimated';
import Header from '../../components/Header';

export default function Visites(){

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <Header title={"Visites"} />

            
        </SafeAreaView>
    )
}