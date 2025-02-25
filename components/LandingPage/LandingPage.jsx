import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const LandingPage = () => {
  const [fontsLoaded] = useFonts({
    'GravitasOne-Regular': require('../../assets/fonts/GravitasOne-Regular.ttf'),
    'LilitaOne-Regular': require('../../assets/fonts/LilitaOne-Regular.ttf'),
  });

  const navigation = useNavigation();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = () => {
    // Navigate to login screen
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#472751" barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.headlineText}>
          MASTER YOUR FINANCES, ONE QUEST AT A TIME
        </Text>
        <Text style={styles.subText}>
          Learn to budget, save, and invest through engaging real-life scenarios.
        </Text>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#472751',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    fontFamily: 'GravitasOne-Regular',
  },
  headlineText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'GravitasOne-Regular',
  },
  subText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'LilitaOne-Regular',
  },
  loginButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
  },
  loginButtonText: {
    color: '#472751',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'GravitasOne-Regular',
  },
});

export default LandingPage;