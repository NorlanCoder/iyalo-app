import { View, Text } from 'react-native'
import React from 'react'

const CategoryComponent = ({name, id}) => {

    const bgStyle = id==1 ? 'bg-primary rounded-full py-2 px-4 ml-1 mr-2 flex justify-center items-center' : 'bg-slate-300 rounded-full py-2 px-4 mr-2 flex justify-center items-center'
    
    return (
        <View className={bgStyle}>
            <Text style={{fontFamily: 'PoppinsRegular'}} className="pt-1">{name}</Text>
        </View>
    )
}

export default CategoryComponent