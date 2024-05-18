import { View, Text, useWindowDimensions, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import Animated,{ Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'

const SplashScreenItem = ({item, index, x}) => {

	const {width} = useWindowDimensions()

	const circleAnimation = useAnimatedStyle(()=>{
		const scale = interpolate(
			x.value,
			[
				(index - 1) * width,
				(index) * width,
				(index + 1) * width,
			],
			[1,4,4],
			Extrapolate.CLAMP
		);
		return {
			transform: [{scale: scale}],
		};
	})

	return (
		<View className=" flex-1 justify-center px-10" style={{width: width}}>
			{/* {console.log("ddd",x.value)} */}
			<View style={{...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'flex-end'}}>
				<Animated.View className="rounded-full" style={[{width: width, height: width , backgroundColor: item.backgoundColor}, circleAnimation]} />
			</View>

			<View className="flex flex-row justify-center w-full">
				<LottieView
					source={item.animation}
					style={{width: width * 0.9 , height: width * 0.9}}
					autoPlay
					loop
				/>
			</View>
			<Text className="text-white text-4xl mt-5 mb-2" style={{fontFamily: 'KeepCalm'}}>{item.title}.</Text>
			<Text className="text-white text-lg leading-5 text-left" style={{fontFamily: 'PoppinsRegular'}}>{item.text} </Text>
			<View></View>
		</View>
	)
}


export default SplashScreenItem