import {  StyleSheet, Text, View, TextInput} from 'react-native'

const TextInputWithdrawComponent = ({data,setData,devise,title,placeholder}) => {
    return(
        <View className="m-3 mb-0">
            <Text className="font-['PoppinsRegular'] text-[#000000] font-bold text-[16px] mb-2">{title}</Text>

            <View className="border-[1px] w-full h-14 border-secondary bg-[#FDFDFD] rounded-lg justify-between items-center flex-row">
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={'gray'}
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                    value={data}
                    onChangeText={(value) => setData(value)}
                    className="bg-[#FDFDFD] h-full w-60 rounded-lg px-2 font-['PoppinsRegular'] border-none"
                />
                <Text className="font-['PoppinsRegular'] text-[#000000] font-bold text-[16px] mr-3">{devise}</Text>
            </View>
        </View>
    )
}

export default TextInputWithdrawComponent;