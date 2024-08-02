import {  StyleSheet, Text, View, TextInput} from 'react-native'

const TextInputWithdrawComponent = (props) => {
    return(
        <View className="m-3">
            <Text className="font-['PoppinsRegular'] text-[#000000] font-bold text-[16px] mb-2">{props.title}</Text>

            <View className="border-[1px] w-full h-14 border-[#85878a48] bg-[#FDFDFD] rounded-lg justify-between items-center flex-row">
                <TextInput
                    placeholder={props.placeholder}
                    placeholderTextColor={'gray'}
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                    // value={data.ingredients}
                    // onChangeText={(value) => setData({...data, ingredients: value})}
                    className="bg-[#FDFDFD] h-full w-60 rounded-lg px-2 font-['PoppinsRegular']"
                />
                <Text className="font-['PoppinsRegular'] text-[#000000] font-bold text-[16px] mr-3">{props.devise}</Text>
            </View>
        </View>
    )
}

export default TextInputWithdrawComponent;