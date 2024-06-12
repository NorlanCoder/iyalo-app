import {  StyleSheet, Text, View, TextInput} from 'react-native'

const EditInfoTextInputComponent = (props) => {

    return(
        <View className="m-3">
            <Text className="font-['PoppinsRegular'] text-[#000000] font-bold text-[16px] mb-2">{props.title}</Text>

            <View className="border-[1px] w-full h-14 border-[#85878a48] rounded-lg justify-center">
                <TextInput
                    placeholder={props.placeholder}
                    placeholderTextColor={'gray'}
                    autoCapitalize="sentences"
                    textContentType="name"
                    keyboardType='default'
                    // multiline={true}
                    // value={data.ingredients}
                    // onChangeText={(value) => setData({...data, ingredients: value})}
                    className="bg-[#FDFDFD] h-full rounded-lg px-2 font-['PoppinsRegular']"
                />
            </View>
        </View>
    )
}

export default EditInfoTextInputComponent;