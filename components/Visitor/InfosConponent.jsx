import {  StyleSheet, Text, View} from 'react-native'

const InfosComponent = (props) => {

    return(
        <View className="m-3">
            <Text className="font-['PoppinsRegular'] text-[#000000] font-bold text-[16px] mb-2">{props.title}</Text>

            <View className="border-[1px] w-full h-14 border-[#85878a48] rounded-lg justify-center p-2">
                <Text className="font-['PoppinsRegular'] text-[#000000] text-[16px]">{props.name}</Text>
            </View>
        </View>
    )
}

export default InfosComponent;