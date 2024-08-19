
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export function DisplayLoading(){

    return(
        <View style={styles.loading_container}>
            <LottieView
                source={require('../assets/lottie/loading.json')}
                autoPlay
                loop
                style={{width: 200, height: 200}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    loading_container: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
