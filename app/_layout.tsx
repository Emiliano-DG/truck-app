import { colors } from '@/constants/colors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as NavigationBar from 'expo-navigation-bar'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const queryClient = new QueryClient()

export default function Layout() {
  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.background.card }}
    >
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <StatusBar style="light" />
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
