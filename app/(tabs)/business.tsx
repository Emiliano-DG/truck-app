import { AddBusinessModal } from '@/components/AddBusinessModal'
import { FabButton } from '@/components/FabButton'
import { LoadingView } from '@/components/LoadingView'
import MovementCard from '@/components/MovementCard'
import { colors } from '@/constants/colors'
import { useDeleteBusinessMovement, useMovement } from '@/hooks/useMovement'
import { useBusinessMovementStore } from '@/store/useBusinessMovementStore'
import { BusinessMovement } from '@/types/truck'
import { calculateBusinessBalance } from '@/utils/finance'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function emprendimiento() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { deleteBusinessMovement } = useBusinessMovementStore((state) => state)

  // Hook para obtener los movimientos de la base de datos y mantenerlos actualizados
  const { data: movements = [], isLoading } = useQuery(useMovement())

  // Hook para eliminar un movimiento de la base de datos y actualizar la cache automaticamente
  const { mutate: borrarEnSupabase } = useDeleteBusinessMovement()

  const { businessBalance } = calculateBusinessBalance(movements)

  const onOpenOptions = (item: BusinessMovement) => {
    Alert.alert(
      'Borrar movimiento',
      `¿Estás seguro que quieres eliminar ${item.description} por $${item.amount.toLocaleString('es-AR')}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            borrarEnSupabase(item.id) // Elimina de Supabase
          },
        },
      ],
    )
  }

  // Mostrar pantalla de carga mientras se obtienen los movimientos
  if (isLoading) {
    return <LoadingView message="Cargando datos..." />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Balance</Text>
          <Text
            style={[
              styles.totalAmount,
              {
                color:
                  businessBalance < 0
                    ? colors.status.danger
                    : colors.status.success,
              },
            ]}
          >
            {' '}
            ${businessBalance.toLocaleString('es-AR')}
          </Text>
        </View>
      </View>

      <FlatList
        data={movements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovementCard
            category={item.category}
            description={item.description}
            date={item.date}
            amount={item.amount}
            type={item.type}
            showOptions={true}
            onOptionsPress={() => onOpenOptions(item)}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay gastos registrados</Text>
        }
      />

      <FabButton onPress={() => setIsModalVisible(true)} />
      <AddBusinessModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
    paddingTop: 20,
  },
  headerContainer: { padding: 10 },

  totalCard: {
    backgroundColor: colors.background.surface,
    alignItems: 'center',
    borderWidth: 1,
    padding: 20,
    borderRadius: 15,
  },
  totalLabel: {
    color: colors.primary.soft,
    fontSize: 15,
    textTransform: 'uppercase',
  },
  totalAmount: { fontSize: 32, fontWeight: 'bold' },
  list: { paddingHorizontal: 20, paddingBottom: 100 },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: colors.text.secondary,
  },
})
