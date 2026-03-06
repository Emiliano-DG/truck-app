import { AddBusinessModal } from '@/components/AddBusinessModal'
import { FabButton } from '@/components/FabButton'
import MovementCard from '@/components/MovementCard'
import { ScreenHeader } from '@/components/ScreenHeader'
import { colors } from '@/constants/colors'
import { useBusinessMovementStore } from '@/store/useBusinessMovementStore'
import { BusinessMovement } from '@/types/truck'
import { calculateBusinessBalance } from '@/utils/finance'
import React, { useState } from 'react'
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function emprendimiento() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { movements, deleteBusinessMovement } = useBusinessMovementStore(
    (state) => state,
  )

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
          onPress: () => deleteBusinessMovement(item.id),
        },
      ],
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <ScreenHeader
          title="Emprendimiento"
          subtitle="Lista de Gastos Generales"
          icon="💸"
        />
        {/* <Text style={styles.title}>Gastos Generales 💸</Text> */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total:</Text>
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
  container: { flex: 1, backgroundColor: colors.background.main },
  headerContainer: { padding: 10 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  totalCard: {
    backgroundColor: colors.background.surface,

    borderWidth: 1,
    padding: 20,
    borderRadius: 15,
  },
  totalLabel: {
    color: colors.text.primary,
    fontSize: 12,
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
