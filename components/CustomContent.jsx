import { MenuOption } from "react-native-popup-menu";
import { Text, View } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Switch } from 'react-native-paper';
import { SimpleLineIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

export const Explore = ({ text, onPress, iconName }) => (
    <MenuOption
        onSelect={onPress}
        customStyles={{
            optionWrapper: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10
            },
        }}
    >
        <Text style={{fontFamily: 'KeepCalm'}}>{text}</Text>
        <Entypo name={iconName} size={24} color="black" />
    </MenuOption>
);
  
export const Edit = ({ text, onPress, iconName }) => (
    <MenuOption
        onSelect={onPress}
        customStyles={{
            optionWrapper: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10
            },
        }}
    >
        <Text style={{fontFamily: 'KeepCalm'}}>{text}</Text>
        <Entypo name={iconName} size={24} color="black" />
    </MenuOption>
);

export const Add = ({ text, onPress, iconName }) => (
    <MenuOption
        onSelect={onPress}
        customStyles={{
            optionWrapper: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10
            },
        }}
    >
        <Text style={{fontFamily: 'KeepCalm'}}>{text}</Text>
        <Entypo name={iconName} size={24} color="black" />
    </MenuOption>
);

export const ListVisite = ({ text, onPress, iconName }) => (
    <MenuOption
        onSelect={onPress}
        customStyles={{
            optionWrapper: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10
            },
        }}
    >
        <Text style={{fontFamily: 'KeepCalm'}}>{text}</Text>
        <Entypo name={iconName} size={24} color="black" />
    </MenuOption>
);

export const ListDisponibilites = ({ text, onPress, iconName }) => (
    <MenuOption
        onSelect={onPress}
        customStyles={{
            optionWrapper: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10
            },
        }}
    >
        <Text style={{fontFamily: 'KeepCalm'}}>{text}</Text>
        <Entypo name={iconName} size={24} color="black" />
    </MenuOption>
);

export const Delete = ({ text, onPress, iconName }) => (
    <MenuOption
        onSelect={onPress}
        customStyles={{
            optionWrapper: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10
            },
        }}
    >
        <Text style={{fontFamily: 'KeepCalm'}}>{text}</Text>
        <AntDesign name={iconName} size={24} color="red" />
    </MenuOption>
);

export const Activate = ({ text, toggle, iconName, val, id }) => (
    <MenuOption
        onSelect={()=>toggle(id)}
        customStyles={{
            optionWrapper: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10
            },
        }}
    >
        <Text style={{fontFamily: 'KeepCalm'}}>{text}</Text>
        {/* <Entypo name={iconName} size={24} color="green" /> */}
        <Switch color="green" onChange={()=>toggle(id)} value={val} style={{height: 20,}} />
        
    </MenuOption>
);