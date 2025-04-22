    import React, { useState } from 'react'
    import { Alert, StyleSheet, View, Button } from 'react-native'
    import { supabase } from '../lib/supabase'
    import { Input } from '@rneui/base'

    export default function MagicLinkLogin() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    async function signInWithMagicLink() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            shouldCreateUser: true, // auto-create account if not exists
            emailRedirectTo: 'exp://192.168.207.198:8081' // app's deep link (to be configured)
        }
        })

        if (error) {
        Alert.alert('Error', error.message)
        } else {
        Alert.alert('Check your email for the login link!')
        }

        setLoading(false)
    }

    return (
        <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
            <Input
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={setEmail}
            value={email}
            placeholder="Enter your email"
            autoCapitalize="none"
            />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button
            title={loading ? 'Sending Magic Link...' : 'Send Magic Link'}
            onPress={signInWithMagicLink}
            disabled={loading}
            />
        </View>
        </View>
    )
    }

    const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
    })