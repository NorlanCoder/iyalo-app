import React, { useEffect, useState, useRef } from 'react';
import { Platform, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';
import Navigation from '../navigation/nav';
import { NavigationContainer } from '@react-navigation/native';
import { GENERAL, LOCATION, WITHDRAW } from '../store/reducers/actionName';
import { apiURL } from '../api/api';
import Toast from 'react-native-toast-message';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

// YbV^7TD5^UW973T

export default function Index(){

    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated)
    const tokenAuth = useSelector((state) => state.userReducer.token)

    const dispatch = useDispatch()

    const [expoPushToken, setExpoPushToken] = useState('');
    const [channels, setChannels] = useState([]);
    const [notification, setNotification] = useState(undefined);
    const notificationListener = useRef();
    const responseListener = useRef();

    const getPosition = async () =>{
        let { status } = await Location.requestForegroundPermissionsAsync();
        // console.log(status)
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        };
        try{
            let location = await Location.getCurrentPositionAsync({});
            // console.log(location)
            dispatch({type: LOCATION, payload: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }});
        }catch{
            // return null
            try{
                let location = await Location.getLastKnownPositionAsync({});
                dispatch({type: LOCATION, payload: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                }});
            }catch{
                null
            }
        }
    }

    const sendNotifToken = (token) => {
        
    }

    const NotificationListner = () => {
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
            // navigation.navigate(remoteMessage.data.type);
        });
      
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });
      
        messaging().onMessage(async remoteMessage => {
            console.log('Forground notif', remoteMessage);
            Notifications.scheduleNotificationAsync({
                content: {
                    title: remoteMessage.notification?.title,
                    body: remoteMessage.notification?.body,
                    priority: "high"
                    // sound: 'mySoundFile.wav', // Provide ONLY the base filename
                },
                trigger: {
                    seconds: 1,
                },
            });
        })
    }

    const getBilanGlobal = async () => {
        
        await fetch(apiURL + 'announcer/withdraw/bilan', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenAuth}`
            }
        })
        .then(response => response.json())
        .then(res => {
            // console.log('=======================1', res)
            if(res.status === 200){
                dispatch({type: GENERAL, payload: {
                    properties: res.properties,
                    visits: res.visits,
                    all_cash: res.all_cash,
                    wallet: res.wallet
                }});
                
            }else{
                console.log('error', res)
            }
        })
        .catch( (e) => {
            console.log(e);
        })
    }

    const getWithdrawHistory = async () => {
        
        await fetch(apiURL + 'announcer/withdraw', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenAuth}`
            }
        })
        .then(response => response.json())
        .then(res => {
            // console.log('=======================1', res)
            if(res.status === 200){
                dispatch({type: WITHDRAW, payload: {
                    wallet: res.wallet,
                    data: res.data.data,
                    next: res.data.next_page_url
                }});
                
            }else{
                console.log('error', res)
            }
        })
        .catch( (e) => {
            console.log(e);
        })
    }
    
    useEffect(() => {
        if(isAuthenticated){
            getPosition();
            NotificationListner();
        }
    }, [isAuthenticated])

    async function registerForPushNotificationsAsync() {
        let token;
      
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
      
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            // Learn more about projectId:
            // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
            // EAS projectId is used here.
            try {
                const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
                if (!projectId) {
                    throw new Error('Project ID not found');
                }

                // token = (await Notifications.getExpoPushTokenAsync({projectId}) ).data;

                token = (await Notifications.getDevicePushTokenAsync()).data;

                console.log('Mon token', token)
                
                fetch(apiURL+'save_token', {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + tokenAuth
                    },
                    body: JSON.stringify({
                        'token_notify': token
                    })
                })
                .then(response => response.json())
                .then(res => {
                    console.log('token', res)
                    if(res.status === 200){
        
                    }else{
        
                    }
                })
                .catch(e => {
                    console.log(e)
                })
            } catch (e) {
                token = `${e}`;
            }
        } else {
            alert('Must use physical device for Push Notifications');
        }
      
        return token;
    }

    useEffect(() => {
        if(isAuthenticated){
            getBilanGlobal()
            getWithdrawHistory()
            // console.log("get token ")
            registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));
        
            if (Platform.OS === 'android') {
                Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
            }
            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification);
            });
        
            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                console.log('my response', response);
            });
        
            return () => {
                notificationListener.current &&
                    Notifications.removeNotificationSubscription(notificationListener.current);
                responseListener.current &&
                    Notifications.removeNotificationSubscription(responseListener.current);
            };
        }
    }, [isAuthenticated]);

    return(
        <NavigationContainer>
            <Toast />
            <Navigation />
        </NavigationContainer>
    )
}

// "main": "node_modules/expo/AppEntry.js",