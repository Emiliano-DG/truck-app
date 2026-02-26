import { AddExpenseModal } from '@/components/AddExpenseModal'
import { FabButton } from '@/components/FabButton'
import { colors } from '@/constants/colors'
import { useGeneralExpenseStore } from '@/store/useGeneralExpenseStore'
import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function emprendimiento() {
  const { expenses } = useGeneralExpenseStore()
  const [isModalVisible, setIsModalVisible] = useState(false)

  //Calculamos el total de gastos para mostrar un mini resumen arriba
  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0,
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Gastos Generales</Text>
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>
            {' '}
            ${totalExpenses.toLocaleString('es-AR')}
          </Text>
        </View>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <View>
              <Text style={styles.categoryBadge}>{item.category}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text style={styles.amount}>
              -${item.amount.toLocaleString('es-AR')}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay gastos registrados</Text>
        }
      />

      <FabButton onPress={() => setIsModalVisible(true)} />
      <AddExpenseModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  headerContainer: { padding: 10 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 15 },
  totalCard: { backgroundColor: '#1C1C1E', padding: 20, borderRadius: 15 },
  totalLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  totalAmount: { color: 'white', fontSize: 32, fontWeight: 'bold' },
  list: { paddingHorizontal: 20, paddingBottom: 100 },
  expenseItem: {
    backgroundColor: colors.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  description: { fontSize: 16, fontWeight: '500' },
  date: { fontSize: 12, color: colors.textSecondary },
  amount: { fontSize: 18, fontWeight: 'bold', color: '#FF3B30' },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#8E8E93' },
})
