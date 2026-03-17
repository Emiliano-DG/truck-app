import { colors } from '@/constants/colors'
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

interface LoadingViewProps {
  message?: string
}

export function LoadingView({ message = 'Cargando...' }: LoadingViewProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary.main} />
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.main, // O el color que uses de fondo
  },
  text: {
    marginTop: 10,
    color: colors.text.muted,
    fontSize: 16,
  },
})
