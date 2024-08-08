import { useState } from 'react';
import {  StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity, Platform, Pressable, SafeAreaView, FlatList} from 'react-native'
import { Feather, MaterialIcons, Entypo, Ionicons, FontAwesome, Fontisto } from '@expo/vector-icons';
import { Dialog } from 'react-native-paper';
import moment from 'moment'
import 'moment/locale/fr'
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { ModalPopup } from '../../components/Admin/ModalPopup';

moment.locale('fr')

export default function Visites(){
    const navigation = useNavigation();

    const [visible, setVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateDebut, setDateDebut] = useState() 

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'ios' ? 'spinner' : 'default');
        setShow(false);
        setDate(currentDate);
        setDateDebut(currentDate)
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
        setShow(true)
    };
    const showTimepicker = () => {
        showMode('time');
        setShow(true)
    };

    const hideDialog = () => setVisible(false);

    const close = () => {
        setVisible(!visible)
    }


    return(
        <SafeAreaView className="flex-1 bg-slate-100">
            <Header title={"Liste visites"} 
                right= {
                    <TouchableOpacity onPress={() =>{setVisible(true)}} className="h-full w-full bg-gray-300 rounded-xl items-center justify-center" style={{ height: 40, width: 40,}}>
                        <MaterialIcons name="add" size={20} color="#000"/>
                    </TouchableOpacity>
                }
            />
            
            <ModalPopup visible={visible}>
                <View className="">
                    <View className="h-12 w-full m-1 p-2 flex-row items-center justify-between">
                        <Text className="font-['PoppinsRegular'] text-[16px] my-1">Programer une visite</Text>

                        <TouchableOpacity onPress={() =>{close()}}>
                            <View className="h-9 w-9 bg-slate-300 rounded-full items-center justify-center">
                                <Ionicons name="close" size={20} color="#000"/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="flex flex-row justify-between">
                        <View style={{flex: 1, padding: 5}}>
                            <Text className="font-['KeepCalm'] text-[16px] my-1">Date</Text>
                            <TouchableOpacity onPress={showDatepicker} className="flex flex-row items-center px-2 border border-gray-500 rounded-lg h-11">
                                <TouchableOpacity
                                    onPress={showDatepicker}
                                    className="flex flex-row justify-between items-center"
                                >
                                    <Fontisto name="date" size={25} color="#00ddb3"/>
                                    <Text adjustsFontSizeToFit numberOfLines={1} className="font-['KeepCalm'] text-[16px] mx-2">{moment(date).format('Do MMM YYYY')}</Text>
                                </TouchableOpacity>
                                {show && (
                                    <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display={Platform.OS === 'ios' ? 'default' : 'default'}
                                    onChange={onChange}
                                    // style={Platform.OS === 'ios' ? {justifyContent: 'center', alignItems: 'flex-start', width: 320, height: 260, display: 'flex', marginLeft: -370, marginTop: 70} : null}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                        

                        <View style={{flex: 1, padding: 5}}>
                            <Text className="font-['KeepCalm'] text-[16px] my-1">Heure</Text>
                            <TouchableOpacity onPress={showTimepicker} className="flex flex-row items-center px-2 border border-gray-500 rounded-lg h-11">
                                <TouchableOpacity
                                    onPress={showTimepicker}
                                    className="flex flex-row justify-between items-center"
                                >
                                    <Entypo name="clock" size={25} color="#00ddb3"/>
                                    <Text adjustsFontSizeToFit numberOfLines={1} className="font-['KeepCalm'] text-[16px] mx-2">{moment(date).format('HH:mm')}</Text>
                                </TouchableOpacity>
                                {show && (
                                    <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display={Platform.OS === 'ios' ? 'default' : 'default'}
                                    onChange={onChange}
                                    // style={Platform.OS === 'ios' ? {justifyContent: 'center', alignItems: 'flex-start', width: 320, height: 260, display: 'flex', marginLeft: -370, marginTop: 70} : null}
                                    />
                                )}
                                {/* <FontAwesome name="calendar" size={25} color="#71B486"/> */}
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            </ModalPopup>
        </SafeAreaView>
    )
}
