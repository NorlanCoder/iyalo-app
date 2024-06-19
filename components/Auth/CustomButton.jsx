import { StyleSheet, Text, TouchableWithoutFeedback, View, useWindowDimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React, {useEffect} from 'react'
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { useDispatch } from 'react-redux'
import { ONBOARDING } from '../../store/reducers/actionName';

const CustomButton = ({flatlistRef, flatlistIndex, dataLength, x}) => {
    const dispatch = useDispatch()
    const {width} = useWindowDimensions();

    const buttonAnimationStyle = useAnimatedStyle(() => {
        return {
            height: 40,
            width: flatlistIndex.value === (dataLength - 1) ?
            withSpring(120) : withSpring(60)
        }
    })

    const arrowAnimationStyle = useAnimatedStyle(() => {
        return {
            width: 20,
            height: 20,
            opacity:  flatlistIndex.value === (dataLength - 1) ? withTiming(0) : withTiming(1),
            transform: [{
                translateX: flatlistIndex.value === (dataLength - 1) ? withTiming(150) : withTiming(0),
            }]
        }
    })

    const textAnimationStyle = useAnimatedStyle(() => {
        return {
            opacity:  flatlistIndex.value === (dataLength - 1) ? withTiming(1) : withTiming(0),
            transform: [{
                translateX: flatlistIndex.value === (dataLength - 1) ? withTiming(0) : withTiming(-100),
            }]
        }
    })

    return (
        <TouchableWithoutFeedback
            onPress={()=>{
                if(flatlistIndex.value < (dataLength - 1)) {
                    flatlistRef.current?.scrollToIndex({index: flatlistIndex.value + 1})
                }else{
                    dispatch({ type: ONBOARDING, payload: false});
                }
            }}
        >
            <Animated.View className=" bg-black rounded-full overflow-hidden flex flex-row items-center justify-center" style={[buttonAnimationStyle]}>
                <Animated.Text style={[{fontFamily: 'PoppinsRegular', fontSize: 14}, textAnimationStyle]} className="text-white absolute uppercase">Commencer</Animated.Text>
                <Animated.View style={[arrowAnimationStyle]}>
                    <AntDesign name="arrowright" size={20} color="white" />
                </Animated.View>
            </Animated.View>
        
        </TouchableWithoutFeedback>
    )
}

export default CustomButton

const styles = StyleSheet.create({})