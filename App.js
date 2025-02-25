import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen 
          name="LandingPage" 
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{ headerShown: true, title: 'Login' }}
        />
        <Stack.Screen 
          name="Signup" 
          component={Signup}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}