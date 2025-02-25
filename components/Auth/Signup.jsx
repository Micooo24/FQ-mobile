import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import baseURL from '../../assets/common/baseurl';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(false);
    setBirthday(currentDate);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleSignup = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('birthday', birthday.toISOString().split('T')[0]);
    if (image) {
      const uriParts = image.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('img', {
        uri: image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    try {
      const response = await axios.post(`${baseURL}/users/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Success', 'User registered successfully');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Error', 'Failed to register user');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Signup</Text>
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
          label="Username"
          value={username}
          onChangeText={setUsername}
          mode="outlined"
          left={<TextInput.Icon name={() => <Icon name="person" size={24} color="white" />} />}
          style={styles.input}
          theme={{ colors: { text: 'white', placeholder: 'white', primary: 'white' } }}
        />
        <TextInput
          label="Birthday"
          value={birthday.toDateString()}
          onFocus={showDatePickerModal}
          mode="outlined"
          left={<TextInput.Icon name={() => <Icon name="cake" size={24} color="white" />} />}
          style={styles.input}
          theme={{ colors: { text: 'white', placeholder: 'white', primary: 'white' } }}
        />
        {showDatePicker && (
          <DateTimePicker
            value={birthday}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
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
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Text style={styles.imagePickerText}>Upload Image</Text>
        </TouchableOpacity>
        {image && <Text style={styles.imageText}>Image selected</Text>}
        <Button mode="contained" onPress={handleSignup} style={styles.signupButton}>
          Signup
        </Button>
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.profileImage}
          />
        )}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
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
  datePicker: {
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
  },
  datePickerText: {
    color: '#472751',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePicker: {
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#472751',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  signupButton: {
    marginTop: 20,
    backgroundColor: 'black',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
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
});

export default Signup;