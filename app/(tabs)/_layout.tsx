import { colors } from '@/constants/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
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
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            color: '#fff',
          },
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: {
            paddingVertical: 8,
          },
          tabBarActiveTintColor: colors.tabActiveCircle,
          tabBarInactiveTintColor: colors.tabInactive,
        }}
      >
        <Tabs.Screen
          name="trucks"
          options={{
            title: 'Camiones',
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name="truck-outline"
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
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="briefcase-outline"
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
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="chart-bar"
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
    backgroundColor: '#fff',
    height: 70,
    paddingBottom: 10,
    borderTopWidth: 0,
    elevation: 10, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  tabBarItem: {},
})
