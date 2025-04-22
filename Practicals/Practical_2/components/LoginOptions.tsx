import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, Text } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from '@rneui/themed'
import MagicLinkLogin from './MagicLink'
import { useNavigation } from '@react-navigation/native'

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation() // Hook for navigation

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  async function signInWithMagicLink() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) Alert.alert(error.message)
    else Alert.alert('Check your email for the magic link!')
    setLoading(false)

    // Navigate to MagicLinkLogin page
    navigation.navigate('MagicLinkLogin')  // Assuming you've set up MagicLinkLogin in the navigation stack

  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={signInWithEmail} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={signUpWithEmail} />
      </View>

      {/* Magic Link Section */}
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text style={styles.orText}>or</Text>
        <Text style={styles.altText}>You can also log in with</Text>
        <Button
          title="Login with Magic Link"
          disabled={loading}
          onPress={signInWithMagicLink}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: 'center', // horizontal center

  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  orText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  altText: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
})

