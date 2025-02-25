import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          left={<TextInput.Icon name={() => <Icon name="email" size={24} color="white" />} />}
          style={styles.input}
          theme={{ colors: { text: 'white', placeholder: 'white', primary: 'white' } }}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          left={<TextInput.Icon name={() => <Icon name="lock" size={24} color="white" />} />}
          style={styles.input}
          theme={{ colors: { text: 'white', placeholder: 'white', primary: 'white' } }}
        />
        <Button mode="contained" onPress={() => {}} style={styles.loginButton}>
          Login
        </Button>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Need an account? Go to Signup</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#472751',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#9867c5',
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: 'black',
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#472751',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Login;