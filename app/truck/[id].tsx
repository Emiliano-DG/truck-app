import { AddMovementModal } from '@/components/AddMovementModal'
import BackButton from '@/components/BackButton'
import MovementCard from '@/components/MovementCard'
import { colors } from '@/constants/colors'
import { useTruckStore } from '@/store/useTruckStore'
import { calculateBalance } from '@/utils/finance'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function DetailsTrucks() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const truck = useTruckStore((state) =>
    state.trucks.find((truck) => truck.id === id),
  )

  const [modalVisible, setModalVisible] = useState(false)

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
      {/* Bonton volver */}
      <View style={styles.headerTop}>
        <BackButton />
      </View>

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
              {
                color:
                  balance > 0 ? colors.status.danger : colors.status.success,
              },
            ]}
          >
            ${balance.toLocaleString('es-AR')}
          </Text>
        </View>
      </View>

      {/* Lista de movimientos */}

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Movimientos</Text>
      </View>
      <FlatList
        data={truck.movements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovementCard
            description={item.description}
            date={item.date}
            amount={item.amount}
            type={item.type}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay movimientos registrados</Text>
        }
      />

      {/* Boton para agregar */}
      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Cargar Movimiento</Text>
      </Pressable>
      <AddMovementModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        truckId={id}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  headerTop: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Un círculo sutil de fondo
  },
  balanceCard: {
    backgroundColor: colors.background.surface,
    padding: 25,
    margin: 15,

    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  truckTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text.secondary,
  },
  driverSub: { color: colors.text.muted, marginBottom: 15 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 13,
    color: colors.primary.soft,
    textTransform: 'uppercase',
  },
  mainBalance: { fontSize: 28, fontWeight: 'bold' },
  listContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  addButton: {
    backgroundColor: colors.primary.light,
    margin: 35,
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.background.main,
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: colors.background.surface,
  },
  list: { paddingHorizontal: 20, paddingBottom: 100 },
})
