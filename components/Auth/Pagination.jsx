import { View, Text } from 'react-native'
import React from 'react'
import Dot from './Dot'

const Pagination = ({data, x}) => {
  return (
    <View className="flex flex-row h-20 justify-center items-center">
      {data.map((_,index) => {
        return <Dot key={index} index={index} x={x} />
      })}
    </View>
  )
}

export default Pagination