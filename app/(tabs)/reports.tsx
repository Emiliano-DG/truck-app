import MovementCard from '@/components/MovementCard'
import { colors } from '@/constants/colors'
import { BusinessSumaryCard, NetResultCard } from '@/features/reports'
import { useBusinessMovementStore } from '@/store/useBusinessMovementStore'
import { calculateBusinessBalance } from '@/utils/finance'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function reportes() {
  const { movements } = useBusinessMovementStore()

  const [selectedMonth, setSelectedMonth] = useState(new Date())

  // Funciones para cambiar el mes
  const changeMonth = (offset: number) => {
    const newDate = new Date(selectedMonth)
    newDate.setMonth(newDate.getMonth() + offset)
    setSelectedMonth(newDate)
  }
  // Filtrar movimientos del mes seleccionado
  const filteredMovements = movements.filter((movement) => {
    const movementDate = new Date(movement.date)
    return (
      movementDate.getMonth() === selectedMonth.getMonth() &&
      movementDate.getFullYear() === selectedMonth.getFullYear()
    )
  })

  //Calculamos balance global, ingresos y gastos del mes seleccionado
  const { businessBalance, ingresos, gastos } =
    calculateBusinessBalance(filteredMovements)

  // Formatear el mes para mostrarlo en la UI
  const monthLabel = selectedMonth.toLocaleString('es-AR', {
    month: 'long',
    year: 'numeric',
  })

  //  Agrupar gastos por categoría
  const gastosPorCategoria = filteredMovements
    .filter((m) => m.type === 'gasto') // Solo nos interesan los gastos
    .reduce(
      (acc, current) => {
        const categoria = current.category || 'Otros'
        if (!acc[categoria]) {
          acc[categoria] = 0
        }
        acc[categoria] += current.amount
        return acc
      },
      {} as Record<string, number>,
    )

  //  Convertir a un array para poder usar .map()
  const categoriasArray = Object.entries(gastosPorCategoria)

  return (
    <SafeAreaView style={styles.container}>
      {/* Selector de fecha */}
      <View style={styles.header}>
        {/* Boton para cambiar al mes anteior */}
        <Pressable onPress={() => changeMonth(-1)} style={styles.navBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.primary.soft} />
        </Pressable>

        <Pressable style={styles.dateDisplay}>
          <Text style={styles.monthLabelText}>
            {monthLabel.toLocaleUpperCase()}
          </Text>
        </Pressable>

        {/* Boton para cambiar al mes siguiente */}
        <Pressable onPress={() => changeMonth(1)} style={styles.navBtn}>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.primary.soft}
          />
        </Pressable>
      </View>
      <FlatList
        data={filteredMovements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovementCard
            category={item.category}
            description={item.description}
            date={item.date}
            amount={item.amount}
            type={item.type}
            showOptions={true}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        contentContainerStyle={styles.scroll}
        ListHeaderComponent={
          <>
            {/* Card Resultado Neto */}
            <NetResultCard resultadoNeto={businessBalance} />

            {/* Card Resumen */}
            <BusinessSumaryCard
              ingresos={ingresos}
              gastos={gastos}
              businessBalance={businessBalance}
            />

            {/* Categorías */}
            {categoriasArray.length > 0 && (
              <View style={styles.categorySection}>
                <Text style={styles.listTitle}>Gastos por Categoría</Text>

                <View style={styles.categoryCard}>
                  {categoriasArray.map(([nombre, total]) => {
                    const porcentaje = gastos > 0 ? (total / gastos) * 100 : 0

                    return (
                      <View key={nombre} style={styles.categoryRow}>
                        <View style={styles.categoryInfo}>
                          <Text style={styles.categoryNameText}>{nombre}</Text>
                          <Text style={styles.categoryAmountText}>
                            ${total.toLocaleString('es-AR')}
                          </Text>
                        </View>

                        <View style={styles.barBackground}>
                          <View
                            style={[
                              styles.barFill,
                              {
                                width: `${porcentaje}%`,
                                backgroundColor: colors.status.success,
                              },
                            ]}
                          />
                        </View>
                      </View>
                    )
                  })}
                </View>
              </View>
            )}

            {/* TU listSection */}
            <View style={styles.listSection}>
              <Text style={styles.listTitle}>Movimientos de {monthLabel}</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay movimientos registrados</Text>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background.main,
  },
  dateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  monthLabelText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text.secondary,
  },
  navBtn: { padding: 4 },
  scroll: {
    padding: 20,
  },
  monthSelector: {
    padding: 5,
  },
  monthTitle: { fontSize: 16, fontWeight: 'bold', color: colors.text.primary },
  // mainLabel: {
  //   fontSize: 28,
  //   fontWeight: 'bold',
  //   marginBottom: 20,
  //   color: colors.text.primary,
  // },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary.soft,
  },
  categorySection: {
    marginTop: 20,
    marginBottom: 10,
  },
  categoryCard: {
    backgroundColor: colors.background.card, // Un azul oscuro que combine con tu modo oscuro
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.background.surface, // Un borde sutil
  },
  categoryRow: {
    marginBottom: 15,
  },
  categoryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  categoryNameText: {
    color: '#94A3B8', // Texto secundario claro
    fontSize: 14,
    fontWeight: '600',
  },
  categoryAmountText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  barBackground: {
    height: 6,
    backgroundColor: colors.background.main, // Fondo de la barra (bien oscuro)
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  listSection: { marginTop: 20, marginBottom: 10 },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text.secondary,
  },
  movementItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: colors.background.card,
    borderRadius: 10,
    marginBottom: 8,
  },
  descText: { fontSize: 16, fontWeight: '500' },
  dateText: { fontSize: 12, color: colors.text.primary },
  amountText: { fontSize: 16, fontWeight: 'bold' },
  incomeAmount: { color: colors.status.success },
  expenseAmount: { color: colors.status.danger },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: colors.text.secondary,
  },
})
