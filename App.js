import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Welcome, Login, Register, Forgot, NewPassword, Home, PropertyListCat } from './screens/root'; 
import { useFonts } from 'expo-font';

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
    <View style={styles.container}>
		<StatusBar 
			backgroundColor="transparent"
			barStyle="white-content"
			translucent
		/>
      	<Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
