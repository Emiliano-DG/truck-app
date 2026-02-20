import { colors } from '@/constants/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 24, color: colors.titleHeader },
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: '#f5f5f5',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 70,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#8e8e93',
      }}
    >
      <Tabs.Screen
        name="trucks"
        options={{
          title: 'Camiones',
          tabBarIcon: ({ color, size }) => (
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
  )
}
