import { colors } from '@/constants/colors'
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
      <Text style={styles.sectionTitle}>Operacion de Emprendimiento</Text>
      <View style={styles.sectionRow}>
        <Text>Ingresos</Text>
        <Text style={styles.green}>${ingresos.toLocaleString('es-AR')}</Text>
      </View>
      <View style={styles.sectionRow}>
        <Text>Gastos</Text>
        <Text style={styles.red}>${gastos.toLocaleString('es-AR')}</Text>
      </View>
      <View style={[styles.sectionRow, styles.subtotal]}>
        <Text style={styles.resultBalance}>Balance Emprendimiento</Text>
        <Text style={styles.resultBalance}>
          ${businessBalance.toLocaleString('es-AR')}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  green: { color: colors.income, fontWeight: '600' },
  red: { color: colors.expense, fontWeight: '600' },
  resultBalance: { fontWeight: 'bold', fontSize: 16, color: colors.text },
  subtotal: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
    marginTop: 5,
  },
})
