import { StyleSheet, Text, View, useWindowDimensions} from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated'


export default function Dot({index, x}) {


	const {width} = useWindowDimensions()

    const animateDot = useAnimatedStyle(()=>{
		const widthAnimation = interpolate(
			x.value,
			[
				(index - 1) * width,
				(index) * width,
				(index + 1) * width,
			],
			[10,20,10],
			Extrapolate.CLAMP
		);

        const opacityAnimation = interpolate(
			x.value,
			[
				(index - 1) * width,
				(index) * width,
				(index + 1) * width,
			],
			[0.5,1,0.5],
			Extrapolate.CLAMP
		);

		return {
			opacity: opacityAnimation,
			width: widthAnimation,

		};
	})

    

    return <Animated.View className=" w-2 h-2 rounded-full mr-1 bg-slate-100" style={[animateDot]} />
}

const styles = StyleSheet.create({})