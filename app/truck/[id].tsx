import { colors } from '@/constants/colors'
import { useTruckStore } from '@/store/useTruckStore'
import { calculateBalance } from '@/utils/finance'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function DetailsTrucks() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const truck = useTruckStore((state) =>
    state.trucks.find((truck) => truck.id === id),
  )

  //Si no se encuentra el camion, mostrar un mensaje de error
  if (!truck) {
    return (
      <View style={styles.container}>
        <Text>Camión no encontrado</Text>
      </View>
    )
  }

  const { balance } = calculateBalance(truck.movements)

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con balance */}
      <View style={styles.balanceCard}>
        <Text style={styles.truckTitle}>{truck.model}</Text>
        <Text style={styles.driverSub}>{truck.driverName}</Text>

        {/* Balance */}
        <View style={styles.row}>
          <Text style={styles.label}>Balance Actual</Text>
          <Text
            style={[
              styles.mainBalance,
              { color: balance >= 0 ? '#34C759' : '#FF3B30' },
            ]}
          >
            {balance}
          </Text>
        </View>

        {/* Lista de movimientos */}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  balanceCard: {
    backgroundColor: colors.card,
    padding: 25,
    margin: 15,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  truckTitle: { fontSize: 22, fontWeight: 'bold' },
  driverSub: { color: '#8E8E93', marginBottom: 15 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: { fontSize: 12, color: '#8E8E93', textTransform: 'uppercase' },
  mainBalance: { fontSize: 32, fontWeight: 'bold' },
})
