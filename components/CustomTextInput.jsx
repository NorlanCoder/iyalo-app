import React from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";

export const CustomTextInput = ({label, onChangeText, icon, IsSecureText, keyboardType, placeholder, onPress, value}) => {
    return(
        <View className="flex justify-start w-full mb-4">
            {
                label && (
                    <Text className="text-[#000000] mb-2 text-[13px] font-['PoppinsRegular'] "> {label} </Text>
                )
            }

            <View className="w-full bg-mygreen/10 border-[#e19eee50] border rounded-lg h-[55px] p-1 flex justify-center items-center flex-row">
                <TextInput className="flex flex-1 bg-transparent text-md text-['#ffffff'] text-[14px] h-[50px] pl-2 font-[PoppinsRegular] "
                    onChangeText={onChangeText} secureTextEntry={IsSecureText}  keyboardType={keyboardType} placeholder={placeholder}
                    placeholderTextColor={"gray"} autoCapitalize="none" value={value}
                />

                <Pressable onPress={onPress}>
                    {icon && (
                        <View className="flex items-center justify-center h-[38px] w-[38px]">
                            {icon}
                        </View>
                    )}
                </Pressable>

                
            </View>
        </View>
    )
}