import { colors } from '@/constants/colors'
import { BusinessSumaryCard, NetResultCard } from '@/features/reports'
import { useBusinessMovementStore } from '@/store/useBusinessMovementStore'
import { calculateBusinessBalance } from '@/utils/finance'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function reportes() {
  const { movements } = useBusinessMovementStore()

  // Estado para mostrar u ocultar el DatePicker
  // const [showDatePicker, setShowDatePicker] = useState(false)

  // Estado para el mes que se esta viendo (por defecto hoy)
  const [selectedMonth, setSelectedMonth] = useState(new Date())

  // Función para manejar el cambio de fecha del DatePicker
  // const onDateChange = (event: any, selectedDate?: Date) => {
  //   setShowDatePicker(false)
  //   if (selectedDate) {
  //     setSelectedMonth(selectedDate)
  //   }
  // }
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Selector de fecha */}
      <View style={styles.header}>
        {/* Boton para cambiar al mes anteior */}
        <Pressable onPress={() => changeMonth(-1)} style={styles.navBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </Pressable>

        <Pressable
          // onPress={() => setShowDatePicker(true)}
          style={styles.dateDisplay}
        >
          <Text style={styles.monthLabelText}>
            {monthLabel.toLocaleUpperCase()}
          </Text>
          {/* <Ionicons
            name="calendar-outline"
            size={20}
            color={colors.primary}
            style={{ marginLeft: 6 }}
          /> */}
        </Pressable>

        {/* {showDatePicker && (
          <DateTimePicker
            value={selectedMonth}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )} */}

        {/* Boton para cambiar al mes siguiente */}
        <Pressable onPress={() => changeMonth(1)} style={styles.navBtn}>
          <Ionicons name="chevron-forward" size={24} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.mainLabel}>Reporte Mensual 📈</Text>

        {/* Card Resultado Neto */}
        <NetResultCard resultadoNeto={businessBalance} />

        {/* Card Resumen Emprendimiento */}
        <BusinessSumaryCard
          ingresos={ingresos}
          gastos={gastos}
          businessBalance={businessBalance}
        />

        {/* Lista movimientos del mes */}
        <View style={styles.listSection}>
          <Text style={styles.listTitle}>Movimientos de {monthLabel}</Text>
          {filteredMovements.length === 0 ? (
            <Text style={{ marginTop: 10, color: colors.textLight }}>
              No hay movimientos registrados este mes.
            </Text>
          ) : (
            filteredMovements.map((movement) => (
              <View key={movement.id} style={styles.movementItem}>
                <View>
                  <Text style={styles.descText}>{movement.description}</Text>
                  <Text style={styles.dateText}>{movement.date}</Text>
                </View>
                <Text
                  style={[
                    styles.amountText,
                    movement.type === 'ingreso'
                      ? styles.incomeAmount
                      : styles.expenseAmount,
                  ]}
                >
                  ${movement.amount.toLocaleString('es-AR')}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  monthLabelText: { fontSize: 13, fontWeight: '700', color: colors.primary },
  navBtn: { padding: 4 },
  scroll: {
    padding: 20,
  },
  monthSelector: {
    padding: 5,
  },
  monthTitle: { fontSize: 16, fontWeight: 'bold', color: colors.primary },
  mainLabel: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listSection: { marginTop: 20 },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
  },
  movementItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: colors.card,
    borderRadius: 10,
    marginBottom: 8,
  },
  descText: { fontSize: 16, fontWeight: '500' },
  dateText: { fontSize: 12, color: colors.textLight },
  amountText: { fontSize: 16, fontWeight: 'bold' },
  incomeAmount: { color: colors.income },
  expenseAmount: { color: colors.expense },
})
