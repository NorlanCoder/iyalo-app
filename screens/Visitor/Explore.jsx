import { StyleSheet, View, Text, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Dimensions, TextInputProps, ScrollView, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps";

export default function Explore(){

    const _map = useRef(null);

    return(
        <View className="flex-1">
            <MapView className="flex-1"
                ref={_map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true} 
                followsUserLocation={true}
                initialRegion={{
                    latitude: Number(6.45000000),
                    longitude: Number(2.35000000),
                    latitudeDelta: 0.04864195044303443,
                    longitudeDelta: 0.040142817690068,
                }}
            >
                
            </MapView>
        </View>
    )
}