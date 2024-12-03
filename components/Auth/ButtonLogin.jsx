import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'

const ButtonLogin = ({name,load,press,payload}) => {
  return (
    <>
      {
        payload ?
        ( <TouchableOpacity onPress={()=>press(payload)} className="rounded-xl h-14 bg-black border border-primary flex-row items-center justify-center">
          { load ?
            <ActivityIndicator size={30} color="#fff" />
            :
            <Text className="text-lg text-white" style={{fontFamily: 'PoppinsRegular'}}>{name}</Text>
          }
            
        </TouchableOpacity>)
        :
      (  <TouchableOpacity onPress={()=>press()} className="rounded-xl h-14 bg-black border border-primary flex-row items-center justify-center">
          { load ?
            <ActivityIndicator size={30} color="#fff" />
            :
            <Text className="text-lg text-white" style={{fontFamily: 'PoppinsRegular'}}>{name}</Text>
          }
            
        </TouchableOpacity>)
      }
    </>
  )
}

export default ButtonLogin

const styles = StyleSheet.create({})