import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Welcome, Login, Register, Forgot, NewPassword, Home, Notification, Search, Profile, Infos, EditInfos, Favoris, HomeAdmin} from './screens/root'; 
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import Index from './screens';
import { useTheme } from 'react-native-paper';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistStore } from 'redux-persist';
import store from './store/configureStore';
import { LOCATION } from './store/reducers/actionName';

// const Stack = createNativeStackNavigator();

const persistor = persistStore(store)

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
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider style={styles.container}>
          <StatusBar 
            backgroundColor="transparent"
            barStyle="white-content"
            translucent
          />
          <Index/>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
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
