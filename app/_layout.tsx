import { colors } from '@/constants/colors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

export default function Layout() {
  useEffect(() => {
    // Ocultás el splash una vez que el componente montó
    // En este punto React ya pintó el fondo azul
    SplashScreen.hideAsync()
  }, [])

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.background.main }}
    >
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <StatusBar
            style="light"
            backgroundColor={colors.background.main}
            translucent={false}
          />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: colors.background.main },
              headerTintColor: colors.text.primary,
              headerShadowVisible: false,
              headerShown: false,
              contentStyle: { backgroundColor: colors.background.main },
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="truck/[id]" />
          </Stack>
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  splash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 180,
    height: 180,
  },
})
