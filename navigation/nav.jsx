import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign, MaterialIcons, Feather, Entypo, Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Home, Favoris, Search, Profile, Notification, Transaction, HomeAdmin, AddProperties, Details, Explore, NotificationAdmin, ProfileAdmin, Properties, Annonces, Visites, Infos, EditInfos, Welcome, Login, Register, Forgot, NewPassword, PropertyListCat, InfoAdmin } from '../screens/root';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { firstTime } from '../store/reducers/appReducer';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const Tabs = () => { 
    const {width} = useWindowDimensions()
    return  (
        <Tab.Navigator
            activeColor="#000"
            inactiveColor="#6C5248"
            initialRouteName='Home'
            labeled={false}
            barStyle={{ 
                backgroundColor: '#ddd', height: 70, borderRadius: 15, width: width - 50,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 20, // Adjust as needed
                left: (width - (width - 50)) / 2
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    // tabBarBadge: true,
                    
                    tabBarIcon: ({ color }) => (
                        <AntDesign name='home' color={color} size={25} />
                    )
                }} 
            />
            <Tab.Screen
                name="Favoris"
                component={Favoris} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name='favorite-outline' color={color} size={25} />
                    )
                }} 
            />
            <Tab.Screen
                name="Explore"
                component={Explore} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="map-marked-alt" size={25} color={color} />
                    )
                }} 
            />
            <Tab.Screen
                name="Transaction"
                component={Transaction}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home-map-marker" size={24} color={color}/>
                    )
                }} 
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name='user' color={color} size={25} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const AdminTab = () => { 
    const {width} = useWindowDimensions()
    return (
        <Tab.Navigator
            activeColor="#6C5248"
            inactiveColor="#3e2465"
            initialRouteName='Home'
            labeled={false}
            barStyle={{ backgroundColor: '#ddd', height: 70, borderRadius: 15, width: width - 50,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 20, // Adjust as needed
                left: (width - (width - 50)) / 2
            }}
        >
        
            <Tab.Screen
                name="Home"
                component={HomeAdmin}
                options={{
                    tabBarBadge: true,
                    tabBarIcon: ({ color }) => (
                        <AntDesign name='home' color={color} size={25} />
                    )
                }} 
            />
            {/* <Tab.Screen
                name="Messages"
                component={Chat} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="chatbubbles" size={25} color={color} />
                    )
                }} 
            /> */}
            <Tab.Screen
                name="Add"
                component={AddProperties} 
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Feather name='plus-square' size={25} color={color}/>
                    )
                }} 
            />

            <Tab.Screen
                name="NotificationsAdmin"
                component={NotificationAdmin}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name='bell' color={color} size={25} />
                    )
                }}
            />
            
            <Tab.Screen
                name="ProfileAdmin"
                component={ProfileAdmin} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name='user' color={color} size={25} />
                        // <FontAwesome5 name='user-alt' color={color} size={25} />
                    )
                }} 
            />
        </Tab.Navigator>
    )
}

export default function Navigation(){
    const onboarding = useSelector((state) => state.appReducer.onboarding)
    const isAuthenticated = useSelector((state) => state.userReducer)
    const admin = useSelector((state) => state.userReducer.isAdmin)
    const user = useSelector((state) => state.userReducer)

    // console.log("<<<<<<<<<<<<<<", user)

    if(onboarding){
        return <Welcome/>
    }else{
        return(
            <View className="flex-1">
                {
                    
                    admin ?
                    <Stack.Navigator>
                        <Stack.Screen name='AdminTab' component={AdminTab} options={{headerShown: false}} />
                        <Stack.Screen name='AddProperties' component={AddProperties} options={{headerShown: false, animation: 'slide_from_right',}} />
                        <Stack.Screen name='Properties' component={Properties} options={{headerShown: false, animation: 'slide_from_right',}} />
                        <Stack.Screen name='Annonces' component={Annonces} options={{headerShown: false, animation: 'slide_from_right',}} />
                        <Stack.Screen name='Visites' component={Visites} options={{headerShown: false, animation: 'slide_from_right',}} />
                        <Stack.Screen name='InfoProfile' component={InfoAdmin} options={{headerShown: false, animation: 'slide_from_right',}} />
                        <Stack.Screen name="Login" 
                            component={Login} 
                            options={{headerShown: false, headerTintColor: "transparent", animation: 'slide_from_right'}} 
                        />
                        <Stack.Screen 
                            name="Register" 
                            component={Register} 
                            options={{headerShown: false, headerTintColor: "transparent", animation: 'slide_from_right'}} 
                        />
                        <Stack.Screen 
                            name="Forgot" 
                            component={Forgot} 
                            options={{headerShown: false, headerTintColor: "transparent", animation: 'slide_from_right'}} 
                        />
                    </Stack.Navigator>
                    :
                    <Stack.Navigator>
                        
                        <Stack.Screen name='Tab' component={Tabs} options={{headerShown: false, headerTintColor: "transparent"}} />
                        <Stack.Screen
                            name="Notification"
                            component={Notification}
                            options={{
                            headerShown: false,
                            headerTintColor: "transparent",
                            animation: 'slide_from_right',
                            }}
                        />
                        <Stack.Screen
                            name="Search"
                            component={Search}
                            options={{
                            headerShown: false,
                            headerTintColor: "transparent",
                            animation: 'slide_from_right',
                            }}
                        />
                        <Stack.Screen
                            name="Profile"
                            component={Profile}
                            options={{
                            headerShown: false,
                            headerTintColor: "transparent",
                            animation: 'slide_from_right',
                            }}
                        />
                        <Stack.Screen
                            name="Details"
                            component={Details}
                            options={({navigation}) => ({
                                headerShown: false,
                                animation: 'slide_from_right',
                                headerBackVisible: true, 
                                headerTintColor: "#FFFFFF",
                                headerTransparent: true, 
                                headerTitle: '',
                            })}
                        />
                        
                        <Stack.Screen
                            name="InfoProfil"
                            component={Infos}
                            options={{
                                headerShown: false,
                                headerTintColor: "transparent",
                                animation: 'slide_from_right',
                            }}
                            
                        />
    
                        <Stack.Screen
                            name="EditProfil"
                            component={EditInfos}
                            options={{
                                headerShown: false,
                                headerTintColor: "transparent",
                                animation: 'slide_from_right',
                            }}
                        />
                        <Stack.Screen
                            name="Login" 
                            component={Login} 
                            options={{headerShown: false, headerTintColor: "transparent", animation: 'slide_from_right'}} 
                        />
                        <Stack.Screen 
                            name="Register" 
                            component={Register} 
                            options={{headerShown: false, headerTintColor: "transparent", animation: 'slide_from_right'}} 
                        />
                        <Stack.Screen 
                            name="Forgot" 
                            component={Forgot} 
                            options={{headerShown: false, headerTintColor: "transparent", animation: 'slide_from_right'}} 
                        />
                        <Stack.Screen
                            name="PropertyListCat"
                            component={PropertyListCat}
                            options={{
                                headerShown: false,
                                headerTintColor: "transparent",
                                animation: 'slide_from_right',
                            }}
                        />
                    </Stack.Navigator>
                }
            </View>
        )
    }
    
}