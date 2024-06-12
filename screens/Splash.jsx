import React, {useCallback, useEffect, useState} from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font';

const Splash = () => {

    const [appIsReady, setAppIsReady] = useState(false);

    const [fontsLoaded, fontError] = useFonts({
        KeepCalm: require('../assets/fonts/KeepCalm-Medium.ttf'),
        PoppinsLight: require('../assets/fonts/Poppins-ExtraLight.ttf'),
        PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf')
    });

    useEffect(() => {
        const prepare = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, [appIsReady]);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if ((!fontsLoaded && !fontError) || !appIsReady) {
        return null;
    }

    return (
        <SafeAreaView className='flex-1 flex-col' onLayout={onLayoutRootView}>
            <Image source={require("../assets/icon.png")}/>
        </SafeAreaView>
    )
}

export default Splash