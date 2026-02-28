import { colors } from '@/constants/colors'
import {
  BusinessSumaryCard,
  NetResultCard,
  TrucksSumaryCard,
} from '@/features/reports'
import { useBusinessMovementStore } from '@/store/useBusinessMovementStore'
import { useTruckStore } from '@/store/useTruckStore'
import { calculateBalance, calculateBusinessBalance } from '@/utils/finance'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function reportes() {
  const { movements } = useBusinessMovementStore()
  const { trucks } = useTruckStore()

  // Estado para el mes que se esta viendo (por defecto hoy)
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  // Funciones para cambiar el mes
  const nextMonth = () => {
    const next = new Date(selectedMonth)
    next.setMonth(next.getMonth() + 1)
    setSelectedMonth(next)
  }
  const prevMonth = () => {
    const prev = new Date(selectedMonth)
    prev.setMonth(prev.getMonth() - 1)
    setSelectedMonth(prev)
  }

  //Calculo camiones (TAB 1)
  const {
    balance: balanceTrucks,
    adelanto,
    comisiones,
  } = calculateBalance(trucks.flatMap((truck) => truck.movements))

  const formattedTruckBalance =
    balanceTrucks > 0
      ? `$-${balanceTrucks.toLocaleString('es-AR')}`
      : `$+${Math.abs(balanceTrucks).toLocaleString('es-AR')}`

  //Calculo emprendimiento (TAB 2)
  const { businessBalance, ingresos, gastos } =
    calculateBusinessBalance(movements)

  //RESULTADO FINAL
  const resultadoNeto = businessBalance - balanceTrucks

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>Balance Global 📈</Text>

        {/* Card Resultado Neto */}
        <NetResultCard resultadoNeto={resultadoNeto} />

        {/* Card Resumen Camiones */}
        <TrucksSumaryCard
          adelanto={adelanto}
          comisiones={comisiones}
          balance={formattedTruckBalance}
        />

        {/* Card Resumen Emprendimiento */}
        <BusinessSumaryCard
          ingresos={ingresos}
          gastos={gastos}
          businessBalance={businessBalance}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: 20,
  },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
})
