import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonLogin = ({name}) => {
  return (
    <TouchableOpacity className="rounded-xl h-14 bg-primary flex-row items-center justify-center">
        <Text className="text-lg text-white" style={{fontFamily: 'PoppinsRegular'}}>{name}</Text>
    </TouchableOpacity>
  )
}

export default ButtonLogin

const styles = StyleSheet.create({})