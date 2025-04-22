import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { supabase } from './lib/supabase'
import Auth from './components/LoginOptions'
import Account from './components/Account'
import MagicLinkLogin from './components/MagicLink'
import { Session } from '@supabase/supabase-js'

const Stack = createNativeStackNavigator()

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    supabase.auth.onAuthStateChange((_event, session) => setSession(session))
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session ? (
          <Stack.Screen name="Account" options={{ headerShown: false }}>
            {() => <Account session={session} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
            <Stack.Screen name="MagicLinkLogin" component={MagicLinkLogin} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
