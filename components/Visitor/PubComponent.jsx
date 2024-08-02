import { View, Text, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

import React from 'react'

const PubComponent = () => {
    return (
        <View>
            {/* PUB */}
            <View className='p-4 mx-1 rounded-xl bg-black flex flex-col mb-2'>
                <View className="flex flex-row gap-x-1 items-center">
                    <Text className="text-white font-bold text-base" style={{fontFamily: 'KeepCalm'}}>Démenagement - Ménage</Text>
                    <MaterialIcons name="cleaning-services" size={15} color="#fff" />
                </View>
                <View className="">
                    
                    <Pressable onPress={() =>{}} className="rounded-full w-auto">
                        <Text className="text-white my-1 font-thin text-sm" style={{fontFamily: 'PoppinsRegular'}}>
                            Besoin d'un ménage impeccable ou d'un déménagement sans stress ? Contactez nos experts dès maintenant !
                        </Text>
                        <Text className="text-primary font-bold">Tout voir</Text>
                    </Pressable>
                </View>
                
            </View>
        </View>
    )
}

export default PubComponent