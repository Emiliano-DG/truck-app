import { colors } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface BusinessSumaryCardProps {
  ingresos: number
  gastos: number
  businessBalance: number
}

export function BusinessSumaryCard({
  ingresos,
  gastos,
  businessBalance,
}: BusinessSumaryCardProps) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Operaciones</Text>
      <View style={styles.sectionRow}>
        <View style={styles.arrow}>
          <Ionicons name="arrow-up" size={17} color={colors.status.success} />
          <Text style={styles.sectionText}>Ingresos</Text>
        </View>
        <Text style={styles.green}>${ingresos.toLocaleString('es-AR')}</Text>
      </View>
      <View style={styles.sectionRow}>
        <View style={styles.arrow}>
          <Ionicons name="arrow-down" size={17} color={colors.status.danger} />
          <Text style={styles.sectionText}>Gastos</Text>
        </View>
        <Text style={styles.red}>${gastos.toLocaleString('es-AR')}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: colors.background.card,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.background.surface,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 13,
    color: colors.primary.soft,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  arrow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  green: { color: colors.status.success, fontWeight: '600' },
  red: { color: colors.status.danger, fontWeight: '600' },
  // resultBalance: {
  //   fontWeight: 'bold',
  //   fontSize: 16,
  //   color: colors.text.secondary,
  // },
  // subtotal: {
  //   borderTopWidth: 1,
  //   borderTopColor: colors.text.muted,
  //   paddingTop: 10,
  //   marginTop: 5,
  // },
})
