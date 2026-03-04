import { colors } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          headerShown: false,
          headerShadowVisible: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
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
                color={colors.accent.light}
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
                color={colors.accent.light}
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
                color={colors.accent.light}
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
    height: 70,
    paddingBottom: 10,
    borderTopWidth: 0,
    elevation: 15, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  tabBarItem: {},
})
