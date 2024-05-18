import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const BlockSocial = ({name, icon}) => {
  return (
    <TouchableOpacity className="rounded-xl h-14 border border-gray-200 flex-row items-center justify-center">
        <Image source={icon} width={20} height={20} />
        <Text className="text-lg text-white" style={{fontFamily: 'PoppinsRegular'}}>{name}</Text>
    </TouchableOpacity>
  )
}

export default BlockSocial

const styles = StyleSheet.create({})