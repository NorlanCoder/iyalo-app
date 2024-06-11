import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Welcom, Login, Register, Forgot, NewPassword, Home, Notification, Search, Profile, Infos, EditInfos } from './screens/root'; 
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {

  const [loaded] = useFonts({
    KeepCalm: require('./assets/fonts/KeepCalm-Medium.ttf'),
    PoppinsLight: require('./assets/fonts/Poppins-ExtraLight.ttf'),
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf')
  });

  if (!loaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar 
        backgroundColor="transparent"
        barStyle="white-content"
        translucent
      />
      {/* <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false, animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer> */}
      
      {/* <Home /> */}
      {/* <Notification/> */}
      <Search/>
      {/* <Profile/> */}
      {/* <Infos/> */}
      {/* <EditInfos/> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
