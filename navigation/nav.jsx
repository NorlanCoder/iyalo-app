import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Favoris, Search, Profile, Notification } from '../screens/root';

const Stack = createNativeStackNavigator();

export default function Navigation(){

    return(
        <View className="flex-1">
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{headerShown: false, animation: 'slide_from_right'}}
                />
                <Stack.Screen
                    name="Notification"
                    component={Notification}
                    options={{
                    headerShown: false,
                    animation: 'slide_from_right',
                    }}
                />
                <Stack.Screen
                    name="Search"
                    component={Search}
                    options={{
                    headerShown: false,
                    animation: 'slide_from_right',
                    }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                    headerShown: false,
                    animation: 'slide_from_right',
                    }}
                />
            </Stack.Navigator>
        </View>
    )
}

