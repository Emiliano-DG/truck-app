import { colors } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Truck } from '../types/truck'

export default function TruckCard({ item }: { item: Truck }) {
  return (
    <Link href={{ pathname: '/truck/[id]', params: { id: item.id } }} asChild>
      <Pressable style={styles.card}>
        <View>
          <Text style={styles.modelText}>{item.model}</Text>
          <Text style={styles.driverNameText}>{item.driverName}</Text>
        </View>
        {/* Indicador visual de que se puede entrar a ver mas */}
        {/* <Text style={styles.arrowText}>{'>'}</Text> */}
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.accent.light}
        />
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  listPadding: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.background.card,
    padding: 20,
    borderRadius: 15,
    borderColor: colors.background.surface,
    borderWidth: 1,
    marginBottom: 12,
    flexDirection: 'row', // pone los textos y la flecha en linea
    justifyContent: 'space-between', // separa los textos de la flecha
    alignItems: 'center',
    // sombras para ios y android
    elevation: 3, // android
    shadowColor: '#000', // ios
    shadowOffset: { width: 0, height: 2 }, // ios
    shadowOpacity: 0.1, // ios
    shadowRadius: 4, // ios
  },
  modelText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  driverNameText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  arrowText: {
    fontSize: 18,
    color: colors.text.secondary,
  },
  balanceText: {},
  balanceLabel: {},
})
