import { colors } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function RootLayout() {
  const insets = useSafeAreaInsets()

  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          headerShown: false,
          headerShadowVisible: false,
          tabBarStyle: [
            styles.tabBar,
            {
              // En Android con Edge-to-Edge, insets.bottom es el tamaño de la barra del sistema
              // Ajustamos la altura para acomodar el safe area bottom
              height: Platform.OS === 'android' ? 80 + insets.bottom : 80,
              paddingBottom: Platform.OS === 'android' ? insets.bottom + 10 : 10,
            },
          ],

          tabBarActiveTintColor: colors.primary.light,
          tabBarInactiveTintColor: colors.text.muted,

          tabBarLabelStyle: styles.LabelStyle,

          tabBarItemStyle: {
            paddingVertical: 8,
          },
        }}
      >
        <Tabs.Screen
          name="trucks"
          options={{
            title: 'Camiones',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'car' : 'car-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="business"
          options={{
            title: 'Emprendimiento',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'briefcase' : 'briefcase-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="reports"
          options={{
            title: 'Reportes',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'stats-chart' : 'stats-chart-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background.card,
    height: 80,
    paddingBottom: 10,
    borderTopWidth: 0,
    elevation: 15, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    // borderTopLeftRadius: 13,
    // borderTopRightRadius: 13,
  },
  LabelStyle: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: -2,
  },
})
