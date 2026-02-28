import { colors } from '@/constants/colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface TrucksSumaryCardProps {
  adelanto: number
  comisiones: number
  balance: string
}

export function TrucksSumaryCard({
  adelanto,
  comisiones,
  balance,
}: TrucksSumaryCardProps) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Operacion de Camiones</Text>
      <View style={styles.sectionRow}>
        <Text>Adelantos</Text>
        <Text style={styles.green}>${adelanto.toLocaleString('es-AR')}</Text>
      </View>
      <View style={styles.sectionRow}>
        <Text>Comisiones</Text>
        <Text style={styles.red}>${comisiones.toLocaleString('es-AR')}</Text>
      </View>
      <View style={[styles.sectionRow, styles.subtotal]}>
        <Text style={styles.resultBalance}>Balance Camiones</Text>
        <Text style={styles.resultBalance}>{balance}</Text>
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
