import { colors } from '@/constants/colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface NetResultCardProps {
  resultadoNeto: number
}

export function NetResultCard({ resultadoNeto }: NetResultCardProps) {
  return (
    <View
      style={[
        styles.mainCard,
        {
          backgroundColor:
            resultadoNeto >= 0 ? colors.status.success : colors.status.danger,
        },
      ]}
    >
      <Text style={styles.mainLabel}>Resultado Neto Acumulado</Text>
      <Text style={styles.mainAmount}>
        $ {resultadoNeto.toLocaleString('es-AR')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainCard: { padding: 30, borderRadius: 20, marginBottom: 25, elevation: 4 },
  mainLabel: {
    color: colors.text.secondary,
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  mainAmount: {
    color: colors.text.primary,
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 5,
  },
})
