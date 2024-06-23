import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import Navigation from '../navigation/nav';
import { NavigationContainer } from '@react-navigation/native';
import { LOCATION } from '../store/reducers/actionName';

export default function Index(){
    const isAuthenticated = useSelector((state) => state.appReducer.isAuthenticated)

    const dispatch = useDispatch()

    const getPosition = async () =>{
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status)
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        };
        try{
            let location = await Location.getCurrentPositionAsync({});
            console.log(location)
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
    
    useEffect(() => {
        if(!isAuthenticated){
            getPosition()
        }
    }, [isAuthenticated])

    return(
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    )
}