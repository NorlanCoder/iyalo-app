import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';

const NotificationComponent = () => {

    return(
        <View className="h-20 my-1 flex-row bg-slate-200">
            <View style={{flex: 0.2}} className="justify-center items-center">
                <Image source={require('../../assets/png-clipart.png')} className="rounded-full w-16 h-16" />
            </View>

            <View style={{flex: 0.8}} className="justify-center">
                <Text numberOfLines={2} className="text-black text-[14px] p-1" style={{fontFamily: 'PoppinsRegular'}}>Besoin d'un ménage impeccable ou d'un déménagement sans stress ? Contactez nos experts dès maintenant !</Text>
                <Text numberOfLines={2} className="text-[14px] text-gray-600 p-1 " style={{fontFamily: 'PoppinsRegular'}}>il y a 10 mins</Text>
            </View>
        </View>
    )
}

export default NotificationComponent;