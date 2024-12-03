import {  StyleSheet, Text, View, useWindowDimensions, StatusBar, TextInput, ScrollView, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import moment from 'moment'
import 'moment/locale/fr'

// moment.locale('fr')

const NotificationComponent = ({item}) => {


    return(
        <View className="h-20 mt-2 flex-row bg-slate-200 items-center rounded-lg " style={{elevation: 5}}>
            <View style={{flex: 0.2}} className="justify-center items-center w-16 h-16 rounded-full">
                <Image resizeMode="cover" source={require('../../assets/notification.png')} className="w-10 h-10" />
            </View>

            <View style={{flex: 0.8}} className="flex-col justify-center h-full">
                <Text numberOfLines={3} className="text-black text-[12px]" style={{fontFamily: 'KeepCalm'}}>{item.body}</Text>
                <Text numberOfLines={2} className="text-[14px] text-gray-600 " style={{fontFamily: 'PoppinsRegular'}}>{moment(item.created_at).fromNow()}</Text>
            </View>


        </View>
    )
}

export default NotificationComponent;