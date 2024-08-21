import {  StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'

const EditInfoTextInputComponent = ({title, placeholder, value, onChangeText, icon, onPress, isSecure}) => {

    return(
        <View className="m-3">
            <Text className="font-['PoppinsRegular'] text-[#000000] font-bold text-[16px] mb-2">{title}</Text>

            <View className="border-[1px] w-full h-14 border-[#85878a48] bg-[#FDFDFD] rounded-lg justify-center items-center flex-row">
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={'gray'}
                    autoCapitalize="sentences"
                    textContentType="name"
                    keyboardType='default'
                    // multiline={true}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={isSecure}
                    className="bg-[#FDFDFD] h-full rounded-lg px-2 font-['PoppinsRegular'] flex-1"
                />

                <TouchableOpacity onPress={onPress}>
                    {icon && (
                        <View className="flex items-center justify-center h-[38px] w-[38px] flex-1">
                            {icon}
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditInfoTextInputComponent;