// app/login.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Lib/firebaseConfig';
import { useRouter } from 'expo-router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();

        console.log('User logged in:', userCredential.user.email);
        console.log('ID Token:', token);

      // Navigate to todo list screen (you'll create this later)
    //   router.replace('/todos');
    } catch (error: any) {
        Alert.alert('Login Failed', error.message);
    }
    };

    return (
        <View style={{ padding: 20 }}>
        <Text style={{ marginBottom: 10, fontSize: 18 }}>Login</Text>

        <Text>Email</Text>
        <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        />

        <Text>Password</Text>
        <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
        />

        <Button title="Login" onPress={handleLogin} />
        </View>
    );
}
