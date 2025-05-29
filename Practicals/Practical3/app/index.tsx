import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Lib/firebaseConfig';
import { router } from 'expo-router';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'User created!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }

  };

  return (
  <View style={{ padding: 20 }}>
    <Text>Email:</Text>
    <TextInput
      autoCapitalize="none"
      value={email}
      onChangeText={setEmail}
      style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
    />

    <Text>Password:</Text>
    <TextInput
      secureTextEntry
      value={password}
      onChangeText={setPassword}
      style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
    />

    <Button title="Sign Up" onPress={handleSignUp} />

    <View style={{ marginTop: 20 }}>
      <Text style={{ textAlign: 'center', marginBottom: 5 }}>
        Already have an account?
        </Text>
    <Button title="Login" onPress={() => router.push('/login')} />
    </View>

  </View>
);

}
