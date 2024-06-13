import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Welcome, Login, Register, Forgot, NewPassword, Home, Notification, Search, Profile, Infos, EditInfos, Favoris, HomeAdmin} from './screens/root'; 
import { useFonts } from 'expo-font';
import Navigation from './navigation/nav';
import { useTheme } from 'react-native-paper';

// const Stack = createNativeStackNavigator();

export default function App() {

  const theme = useTheme();
  theme.colors.secondaryContainer = "transaprent"

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
        <Navigation />
      </NavigationContainer> */}
      
      {/* <Home /> */}
      {/* <Notification/> */}
      {/* <Search/> */}
      {/* <Profile/> */}
      {/* <Infos/> */}
      {/* <EditInfos/> */}
      {/* <HomeAdmin/> */}
      {/* <Favoris/> */}
      <Welcome/>
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
