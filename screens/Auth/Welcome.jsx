import { View, Text, FlatList } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { HOME } from '../../utils/data/homedata'
import SplashScreenItem from '../../components/Auth/SplashScreenItem'
import Pagination from '../../components/Auth/Pagination'
import CustomButton from '../../components/Auth/CustomButton'

const Welcome = () => {

  const flatlistRef = useAnimatedRef();
  const x = useSharedValue(0);
  const flatlistIndex = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x
    }
  })

  const onViewableItemsChanged = ({viewableItems}) => {
    if(viewableItems[0].index !== null) {
      flatlistIndex.value = viewableItems[0].index
    }
  }

  return (
    <View className="flex-1 h-screen w-screen">
        {/* <Text className="text-black">jcdn,cdic</Text> */}
        <Animated.FlatList 
            ref={flatlistRef}
            onScroll={onScroll}
            data={HOME}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
                return <SplashScreenItem item={item} index={index} x={x} />;
            }}
            scrollEventThrottle={16}
            horizontal={true}
            bounces={false}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
              minimumViewTime: 300,
              viewAreaCoveragePercentThreshold: 10
            }}
        />

        <View className="absolute bottom-10 left-0 right-0 mx-6 py-6 flex flex-row items-center justify-between">
            <Pagination data={HOME} x={x} />
            <CustomButton flatlistRef={flatlistRef} flatlistIndex={flatlistIndex} dataLength={HOME.length} x={x} />
        </View>

    </View>
  )
}

export default Welcome