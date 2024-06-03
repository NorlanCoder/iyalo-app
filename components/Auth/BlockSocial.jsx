import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import googlepng from '../../assets/social/google.png'

const BlockSocial = ({name, icon}) => {
  return (
    <TouchableOpacity className="rounded-xl h-14 border border-gray-300 flex-row items-center justify-center gap-x-2">
        <Image source={googlepng} className="w-5 h-5" />
        <Text className="text-lg text-black" style={{fontFamily: 'PoppinsRegular'}}>{name}</Text>
    </TouchableOpacity>
  )
}

export default BlockSocial

const styles = StyleSheet.create({})