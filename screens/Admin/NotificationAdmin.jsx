import { useState } from 'react';
import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, {FadeIn} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CATEGORY } from '../../utils/data/categoriedata';
import { ROOM } from '../../utils/data/roomdata';
import { BATH } from '../../utils/data/bathdata';
import CategoryComponent from '../../components/Visitor/CategoryComponent';
import RangeSlider from '../../components/RangeSliderComponent';

export default function NotificationAdmin(){

    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            
        </SafeAreaView>
    )
}