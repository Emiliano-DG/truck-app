import { colors } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'

export default function BackButton() {
  const navigation = useNavigation()
  return (
    <Pressable
      style={({ pressed }) => [
        styles.backButton,
        { opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="arrow-back" size={24} color="#fff" />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.background.card, // Un círculo sutil de fondo
  },
})
