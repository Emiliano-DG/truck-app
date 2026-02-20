import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Details() {
  const { id } = useLocalSearchParams<{ id: string }>()
  return (
    <View style={styles.container}>
      <Text>Detalles del camión {id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
